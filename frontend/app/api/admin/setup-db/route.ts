import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createServiceClient();
    
    // Tentamos adicionar a coluna custom_prompt via RPC se o usuário tiver configurado
    // Como nem sempre run_sql está disponível, usamos uma query direta de teste
    const { error } = await supabase.rpc('run_sql', { 
        sql: 'ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS custom_prompt TEXT;' 
    });
    
    if (error) {
        console.error('Erro ao executar SQL via RPC:', error);
        return NextResponse.json({ 
            error: 'Não foi possível atualizar o banco automaticamente via RPC. Por favor, execute manualmente: ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS custom_prompt TEXT;',
            details: error.message 
        }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Coluna custom_prompt adicionada com sucesso!' });
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
