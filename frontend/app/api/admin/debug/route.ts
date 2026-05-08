import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET() {
  const diagnostics = {
    env: {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING',
      supabase_service_role: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK' : 'MISSING',
      node_env: process.env.NODE_ENV,
    },
    database_test: 'Starting...',
    error: null as any
  };

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('clients').select('count').limit(1);
    
    if (error) {
      diagnostics.database_test = 'FAILED';
      diagnostics.error = error;
    } else {
      diagnostics.database_test = 'SUCCESS';
    }
  } catch (err: any) {
    diagnostics.database_test = 'CRASHED';
    diagnostics.error = err.message;
  }

  return NextResponse.json(diagnostics);
}
