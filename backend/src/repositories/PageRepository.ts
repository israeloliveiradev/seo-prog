/**
 * PageRepository.ts — Repositório de acesso a dados para generated_pages.
 * 
 * Princípios:
 * - Repository Pattern: isola a lógica de dados do domínio de negócio.
 * - Idempotência: operações de upsert garantem consistência.
 * - Queries otimizadas aproveitando os índices parciais criados no schema.
 */

import { SupabaseClient } from '@supabase/supabase-js';
import type { GeneratedPage, PageStatus } from '../types/database.types';
import { createLogger } from '../utils/logger';

const logger = createLogger('PageRepository');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = SupabaseClient<any>;

export class PageRepository {
  constructor(private db: AnyClient) {}

  /**
   * Busca um lote de páginas prontas para processamento.
   * Usa o índice parcial idx_generated_pages_pending_processing.
   */
  async fetchPendingBatch(limit: number): Promise<any[]> {
    const { data, error } = await this.db
      .from('generated_pages')
      .select(`
        *,
        campaigns (
          name,
          target_audience,
          core_keywords,
          clients (
            name,
            brand_settings
          )
        )
      `)
      .in('status', ['PENDING', 'ERROR'])
      .lt('attempts', 3)
      .order('updated_at', { ascending: true })
      .limit(limit);

    if (error) {
      logger.error('Erro ao buscar batch PENDING.', { error: error.message });
      throw new Error(`PageRepository.fetchPendingBatch: ${error.message}`);
    }

    return (data ?? []) as GeneratedPage[];
  }

  /**
   * Marca uma página como PROCESSING (impede processamento duplo).
   * Idempotente: se já estiver PROCESSING, não altera.
   */
  async markAsProcessing(id: string): Promise<void> {
    const { error } = await this.db
      .from('generated_pages')
      .update({ status: 'PROCESSING' as PageStatus })
      .eq('id', id)
      .in('status', ['PENDING', 'ERROR']);

    if (error) {
      logger.error(`Erro ao marcar ${id} como PROCESSING.`, { error: error.message });
      throw new Error(`PageRepository.markAsProcessing: ${error.message}`);
    }
  }

  /**
   * Salva o conteúdo gerado e marca como COMPLETED.
   */
  async markAsCompleted(
    id: string,
    aiContent: string,
    metaDescription: string
  ): Promise<void> {
    const { error } = await this.db
      .from('generated_pages')
      .update({
        status: 'COMPLETED' as PageStatus,
        ai_content: aiContent,
        meta_description: metaDescription,
        last_error: null,
      })
      .eq('id', id);

    if (error) {
      logger.error(`Erro ao marcar ${id} como COMPLETED.`, { error: error.message });
      throw new Error(`PageRepository.markAsCompleted: ${error.message}`);
    }
  }

  /**
   * Registra falha de processamento com backoff de tentativas.
   * Após MAX_ATTEMPTS, marca como ERROR permanente.
   */
  async markAsError(id: string, errorMessage: string, currentAttempts: number): Promise<void> {
    const newAttempts = currentAttempts + 1;
    const newStatus: PageStatus = newAttempts >= 3 ? 'ERROR' : 'PENDING';

    const { error } = await this.db
      .from('generated_pages')
      .update({
        status: newStatus,
        attempts: newAttempts,
        last_error: errorMessage.slice(0, 500),
      })
      .eq('id', id);

    if (error) {
      logger.error(`Erro ao registrar falha para ${id}.`, { error: error.message });
      throw new Error(`PageRepository.markAsError: ${error.message}`);
    }

    logger.warn(
      `Página ${id} falhou (tentativa ${newAttempts}/3). Status: ${newStatus}`,
      { errorMessage }
    );
  }

  /**
   * Busca uma página pelo slug — utilizado pelo frontend Next.js.
   */
  async findBySlug(slug: string): Promise<GeneratedPage | null> {
    const { data, error } = await this.db
      .from('generated_pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'COMPLETED')
      .single();

    if (error && error.code !== 'PGRST116') {
      logger.error(`Erro ao buscar slug: ${slug}`, { error: error.message });
      throw new Error(`PageRepository.findBySlug: ${error.message}`);
    }

    return (data as GeneratedPage) ?? null;
  }

  /**
   * Retorna todos os slugs completados — usado no generateStaticParams do Next.js.
   */
  async getAllCompletedSlugs(): Promise<string[]> {
    const { data, error } = await this.db
      .from('generated_pages')
      .select('slug')
      .eq('status', 'COMPLETED');

    if (error) {
      logger.error('Erro ao buscar slugs completados.', { error: error.message });
      throw new Error(`PageRepository.getAllCompletedSlugs: ${error.message}`);
    }

    return ((data ?? []) as Array<{ slug: string }>).map((row) => row.slug);
  }

  /**
   * Bulk insert de novas páginas com proteção contra duplicatas.
   */
  async bulkInsert(
    pages: Array<{ campaign_id: string; service_name: string; location: string; slug: string }>
  ): Promise<{ inserted: number; skipped: number }> {
    const insertData = pages.map((p) => ({
      ...p,
      status: 'PENDING' as PageStatus,
      attempts: 0,
    }));

    const { data, error } = await this.db
      .from('generated_pages')
      .upsert(insertData, {
        onConflict: 'slug',
        ignoreDuplicates: true,
      })
      .select('id');

    if (error) {
      logger.error('Erro no bulk insert.', { error: error.message });
      throw new Error(`PageRepository.bulkInsert: ${error.message}`);
    }

    const inserted = (data ?? []).length;
    const skipped = pages.length - inserted;

    logger.info(`Bulk insert: ${inserted} inseridos, ${skipped} ignorados (duplicatas).`);
    return { inserted, skipped };
  }

  /**
   * Contagem de páginas por status — usado no Dashboard de Métricas.
   */
  async getStatusCounts(): Promise<Record<PageStatus, number>> {
    const { data, error } = await this.db
      .from('generated_pages')
      .select('status');

    if (error) {
      logger.error('Erro ao contar status.', { error: error.message });
      throw new Error(`PageRepository.getStatusCounts: ${error.message}`);
    }

    const counts: Record<PageStatus, number> = {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      ERROR: 0,
    };

    ((data ?? []) as Array<{ status: string }>).forEach((row) => {
      const s = row.status as PageStatus;
      if (s in counts) counts[s]++;
    });

    return counts;
  }
}
