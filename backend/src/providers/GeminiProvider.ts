/**
 * GeminiProvider.ts — Abstração da SDK do Google Gemini.
 * 
 * Princípios aplicados:
 * - SRP: responsável exclusivamente pela comunicação com o Gemini.
 * - OCP: aberto para extensão (modelos, configurações) sem alteração.
 * - Retry com Exponential Backoff para resiliência.
 * 
 * O System Prompt força o modelo a retornar EXCLUSIVAMENTE HTML semântico,
 * sem introduções, conclusões ou blocos de Markdown.
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { env } from '../config/env';
import { createLogger } from '../utils/logger';

const logger = createLogger('GeminiProvider');

// System prompt rigoroso — garante HTML puro e semântico
const SYSTEM_PROMPT = `Você é um redator técnico especializado em SEO Local. 
Sua única função é gerar EXCLUSIVAMENTE blocos de HTML semântico válido.

REGRAS ABSOLUTAS (nunca viole):
1. Retorne APENAS tags HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>. NADA mais.
2. PROIBIDO: introduções, conclusões, comentários, marcações de Markdown (\`\`\`), DOCTYPE, <html>, <head>, <body>.
3. Cada resposta DEVE iniciar com uma tag <h2> contendo o serviço e localidade.
4. MÍNIMO: 3 seções H2, cada uma com 2+ parágrafos e uma lista UL com 4+ itens.
5. Conteúdo focado em: benefícios locais, diferenciais de mercado, casos de uso regionais.
6. Tom: profissional, autoritativo, otimizado para SEO local.
7. NUNCA comece com "Claro!", "Certamente!" ou qualquer saudação.`;

interface GenerateContentOptions {
  serviceName: string;
  location: string;
  keywords: string[];
  clientName: string;
  targetAudience: string;
}

interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
}

/**
 * Implementa Exponential Backoff com jitter para evitar thundering herd.
 */
async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions,
  attemptNumber = 1
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attemptNumber >= options.maxAttempts) {
      throw error;
    }

    const baseDelay = options.baseDelayMs * Math.pow(2, attemptNumber - 1);
    const jitter = Math.random() * 1000;
    const delay = baseDelay + jitter;

    logger.warn(
      `Tentativa ${attemptNumber}/${options.maxAttempts} falhou. Aguardando ${Math.round(delay)}ms...`,
      { error: (error as Error).message }
    );

    await new Promise((resolve) => setTimeout(resolve, delay));
    return withExponentialBackoff(fn, options, attemptNumber + 1);
  }
}

export class GeminiProvider {
  private client: GoogleGenerativeAI;
  private modelName = 'gemini-flash-lite-latest';

  constructor() {
    this.client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    logger.info(`GeminiProvider inicializado com modelo: ${this.modelName}`);
  }

  /**
   * Gera conteúdo HTML semântico para uma página de serviço local.
   * Inclui retry interno com backoff exponencial.
   */
  async generatePageContent(options: GenerateContentOptions): Promise<string> {
    const { serviceName, location, keywords, clientName, targetAudience } = options;

    const userPrompt = `
Gere conteúdo HTML completo e otimizado para SEO sobre:

EMPRESA: ${clientName}
PÚBLICO-ALVO: ${targetAudience}
SERVIÇO: ${serviceName}
LOCALIDADE: ${location}
PALAVRAS-CHAVE OBRIGATÓRIAS: ${keywords.join(', ')}

Diretriz: O texto deve ser escrito em nome da empresa "${clientName}", focando nas dores do público "${targetAudience}".
Lembre-se: retorne APENAS HTML semântico conforme as regras do sistema.
Mínimo de 600 palavras. Inclua dados específicos sobre ${location} quando relevante.
    `.trim();

    logger.info(`Gerando conteúdo para: "${serviceName}" em "${location}"`);

    const model = this.client.getGenerativeModel({
      model: this.modelName,
      systemInstruction: SYSTEM_PROMPT,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
    });

    const content = await withExponentialBackoff(
      async () => {
        const result = await model.generateContent(userPrompt);
        const text = result.response.text();

        if (!text || text.trim().length < 100) {
          throw new Error('Resposta do Gemini vazia ou muito curta.');
        }

        // Sanitiza blocos de markdown residuais (garantia extra)
        return text
          .replace(/```html?\n?/gi, '')
          .replace(/```\n?/g, '')
          .trim();
      },
      {
        maxAttempts: 3,
        baseDelayMs: 2000,
      }
    );

    logger.info(`Conteúdo gerado com sucesso. Tamanho: ${content.length} chars`);
    return content;
  }

  /**
   * Gera meta description concisa para SEO.
   */
  async generateMetaDescription(serviceName: string, location: string): Promise<string> {
    const model = this.client.getGenerativeModel({
      model: this.modelName,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 100,
      },
    });

    const prompt = `Crie uma meta description de SEO com exatamente 150-160 caracteres para:
Serviço: ${serviceName} em ${location}.
Responda APENAS com o texto da meta description, sem aspas ou formatação.`;

    const result = await withExponentialBackoff(
      async () => {
        const res = await model.generateContent(prompt);
        return res.response.text().trim().replace(/"/g, '');
      },
      { maxAttempts: 2, baseDelayMs: 1000 }
    );

    return result;
  }
}
