/**
 * app/api/admin/campaigns/route.ts — Lista e edita campanhas.
 */

import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('campaigns')
      .select('*, clients(name, subdomain)')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaigns: data ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro interno ao buscar campanhas' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, target_audience, core_keywords, custom_prompt } = body;

    if (!id || !name || !target_audience) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from('campaigns')
      .update({ name, target_audience, core_keywords, custom_prompt })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro interno ao atualizar campanha' },
      { status: 500 }
    );
  }
}
