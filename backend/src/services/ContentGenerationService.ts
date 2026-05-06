/**
 * ContentGenerationService.ts — Motor de geração de conteúdo.
 * 
 * Orquestra o fluxo completo de geração de uma página:
 * 1. Marca como PROCESSING (idempotência)
 * 2. Chama GeminiProvider para gerar conteúdo HTML
 * 3. Salva resultado ou registra falha com contagem de tentativas
 * 
 * Princípios: SRP, DI (recebe dependências via construtor), Fail-safe.
 */

import { GeminiProvider } from '../providers/GeminiProvider';
import { PageRepository } from '../repositories/PageRepository';
import type { GeneratedPage } from '../types/database.types';
import { createLogger } from '../utils/logger';

const logger = createLogger('ContentGenerationService');

export class ContentGenerationService {
  constructor(
    private readonly gemini: GeminiProvider,
    private readonly pageRepo: PageRepository,
  ) {}

  /**
   * Processa uma única página com tratamento de erros robusto.
   * O status PROCESSING garante que outro worker não reprocesse a mesma página.
   */
  async processPage(page: GeneratedPage, keywords: string[]): Promise<void> {
    const { id, service_name, location, attempts } = page;

    logger.info(`Iniciando processamento da página: "${service_name}" em "${location}"`, {
      id,
      attempt: attempts + 1,
    });

    try {
      // PASSO 1: Marca como PROCESSING para evitar processamento duplo
      await this.pageRepo.markAsProcessing(id);

      // PASSO 2: Gera conteúdo e meta description em paralelo
      const [aiContent, metaDescription] = await Promise.all([
        this.gemini.generatePageContent({ serviceName: service_name, location, keywords }),
        this.gemini.generateMetaDescription(service_name, location),
      ]);

      // PASSO 3: Persiste resultado e marca como COMPLETED
      await this.pageRepo.markAsCompleted(id, aiContent, metaDescription);

      logger.info(`✅ Página "${service_name}" em "${location}" concluída com sucesso.`, { id });
    } catch (error) {
      const errorMessage = (error as Error).message ?? 'Erro desconhecido';

      logger.error(`❌ Falha ao processar página "${service_name}" em "${location}".`, {
        id,
        attempt: attempts + 1,
        error: errorMessage,
      });

      // Registra falha e incrementa tentativas
      await this.pageRepo.markAsError(id, errorMessage, attempts);
    }
  }

  /**
   * Processa um batch completo de páginas sequencialmente.
   * Sequencial (não paralelo) para respeitar rate limits da API Gemini.
   */
  async processBatch(pages: GeneratedPage[], keywords: string[]): Promise<void> {
    if (pages.length === 0) {
      logger.info('Nenhuma página pendente para processar. Aguardando próximo ciclo.');
      return;
    }

    logger.info(`🔄 Iniciando processamento de batch com ${pages.length} página(s).`);

    for (const page of pages) {
      await this.processPage(page, keywords);
      // Pequena pausa entre requisições para evitar rate limit
      await new Promise((r) => setTimeout(r, 500));
    }

    logger.info(`✅ Batch de ${pages.length} página(s) processado.`);
  }
}
