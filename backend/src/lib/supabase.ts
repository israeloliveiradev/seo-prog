/**
 * supabase.ts — Cliente Supabase singleton com service_role.
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import WebSocket from 'ws';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _instance: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseClient(): SupabaseClient<any> {
  if (!_instance) {
    _instance = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        global: {
          // Garante compatibilidade de fetch em Node.js
          fetch: globalThis.fetch,
        },
        realtime: {
          // Necessário para Node.js < 22
          // @ts-ignore
          WebSocket,
        },
      }
    );
    console.log('[Supabase] Cliente inicializado com service_role e suporte a WebSocket.');
  }
  return _instance;
}
