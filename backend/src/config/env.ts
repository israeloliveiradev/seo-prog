/**
 * env.ts — Validação rigorosa de variáveis de ambiente com Zod.
 * Falha rapidamente (fail-fast) se qualquer variável estiver ausente.
 * Princípio: Separation of Concerns — toda config centralizada aqui.
 */
import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Carrega .env a partir do diretório do backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  // Supabase
  SUPABASE_URL:             z.string().url({ message: 'SUPABASE_URL deve ser uma URL válida' }),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20, { message: 'SUPABASE_SERVICE_ROLE_KEY inválida' }),

  // Google Gemini
  GEMINI_API_KEY: z.string().min(10, { message: 'GEMINI_API_KEY inválida' }),

  // Worker
  CRON_SCHEDULE:  z.string().default('*/2 * * * *'),   // A cada 2 minutos
  BATCH_SIZE:     z.coerce.number().int().positive().default(5),
  MAX_ATTEMPTS:   z.coerce.number().int().positive().default(3),

  // Node
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Parse e valida — lança ZodError com mensagens claras se inválido
const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  console.error('❌ [Config] Variáveis de ambiente inválidas ou ausentes:');
  _parsed.error.errors.forEach((err) => {
    console.error(`   • ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

export const env = _parsed.data;

export type Env = typeof env;
