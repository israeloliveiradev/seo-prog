/**
 * worker.ts — Motor de Automação Principal (Worker Service).
 * 
 * Orquestra o ciclo de vida completo do processamento de SEO:
 * 1. node-cron dispara o job no schedule configurado
 * 2. Busca batch de páginas PENDING/ERROR do Supabase
 * 3. Processa cada página via ContentGenerationService
 * 4. Idempotente: lock simples via status PROCESSING evita duplicidade
 * 
 * Infraestrutura: Tolerante a falhas — um job com erro não derruba o próximo.
 */

import cron from 'node-cron';
import { env } from '../config/env';
import { getSupabaseClient } from '../lib/supabase';
import { GeminiProvider } from '../providers/GeminiProvider';
import { PageRepository } from '../repositories/PageRepository';
import { ContentGenerationService } from '../services/ContentGenerationService';
import { createLogger } from '../utils/logger';

const logger = createLogger('Worker');

// Flag para evitar execuções paralelas do mesmo job (guard)
let isRunning = false;

/**
 * Composição de dependências (Dependency Injection via construtor).
 * Cada execução do cron usa a mesma instância de providers/repositórios.
 */
function createComposition() {
  const supabase = getSupabaseClient();
  const pageRepo = new PageRepository(supabase);
  const geminiProvider = new GeminiProvider();
  const contentService = new ContentGenerationService(geminiProvider, pageRepo);

  return { pageRepo, contentService };
}

/**
 * Job principal de processamento em batch.
 */
async function runProcessingJob(): Promise<void> {
  // Guard: Não inicia se o job anterior ainda está rodando
  if (isRunning) {
    logger.warn('Job anterior ainda em execução. Pulando este ciclo.');
    return;
  }

  isRunning = true;
  const startTime = Date.now();

  try {
    logger.info(`🚀 Iniciando ciclo de processamento. Batch size: ${env.BATCH_SIZE}`);

    const { pageRepo, contentService } = createComposition();

    // Busca batch de páginas pendentes
    const pendingPages = await pageRepo.fetchPendingBatch(env.BATCH_SIZE);

    if (pendingPages.length === 0) {
      logger.info('💤 Nenhuma página pendente. Worker em espera.');
      return;
    }

    // Obtém keywords da campanha da primeira página do batch
    // (assumindo campanha única por batch — pode ser expandido)
    const supabase = getSupabaseClient();
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('core_keywords')
      .eq('id', pendingPages[0].campaign_id)
      .single();

    const keywords: string[] = (campaign?.core_keywords as string[]) ?? [];

    // Processa o batch
    await contentService.processBatch(pendingPages, keywords);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.info(`✅ Ciclo concluído em ${elapsed}s. Páginas processadas: ${pendingPages.length}`);
  } catch (error) {
    logger.error('❌ Erro crítico no ciclo de processamento.', {
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
  } finally {
    isRunning = false;
  }
}

/**
 * Inicializa o Worker Service com o scheduler cron.
 */
export function startWorker(): void {
  logger.info('🟢 SEO Programático Worker iniciado.');
  logger.info(`📅 Schedule: ${env.CRON_SCHEDULE}`);
  logger.info(`📦 Batch size: ${env.BATCH_SIZE}`);
  logger.info(`🔁 Max attempts: ${env.MAX_ATTEMPTS}`);

  // Executa imediatamente na inicialização
  runProcessingJob();

  // Agenda execuções subsequentes
  cron.schedule(env.CRON_SCHEDULE, () => {
    logger.info(`⏰ Disparo agendado: ${new Date().toISOString()}`);
    runProcessingJob();
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('📴 SIGTERM recebido. Aguardando job atual terminar...');
  // O guard `isRunning` garante que o processo não será encerrado abruptamente
  const checkInterval = setInterval(() => {
    if (!isRunning) {
      clearInterval(checkInterval);
      logger.info('👋 Worker encerrado com segurança.');
      process.exit(0);
    }
  }, 1000);
});

process.on('unhandledRejection', (reason) => {
  logger.error('🔴 UnhandledRejection detectado.', { reason: String(reason) });
});

process.on('uncaughtException', (error) => {
  logger.error('🔴 UncaughtException detectado. Encerrando.', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});
