/**
 * lib/supabase.ts — Cliente Supabase para o frontend Next.js.
 * Usa a chave ANON para acesso público (sujeito a RLS).
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente server-side com service_role para rotas de API do Next.js.
 * NUNCA expor SUPABASE_SERVICE_ROLE_KEY no client bundle.
 */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export interface GeneratedPage {
  id: string;
  campaign_id: string;
  service_name: string;
  location: string;
  slug: string;
  ai_content: string | null;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  meta_description: string | null;
  attempts: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  target_audience: string;
  core_keywords: string[];
  created_at: string;
}
