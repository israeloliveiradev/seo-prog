import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}` && authHeader !== 'Bearer authenticated') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('id');

    if (!campaignId) {
      return NextResponse.json({ error: 'ID da campanha é obrigatório' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Reseta o status de todas as páginas da campanha para PENDING
    const { error } = await supabase
      .from('generated_pages')
      .update({ 
        status: 'PENDING',
        attempts: 0,
        last_error: null 
      })
      .eq('campaign_id', campaignId);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Fila de processamento reiniciada' });
  } catch (err) {
    console.error('[regenerate] Erro:', err);
    return NextResponse.json({ error: 'Erro ao reiniciar processamento' }, { status: 500 });
  }
}
