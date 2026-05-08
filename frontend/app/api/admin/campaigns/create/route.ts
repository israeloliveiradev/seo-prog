/**
 * app/api/admin/campaigns/create/route.ts — Criação de novas campanhas.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase';

const campaignSchema = z.object({
  name: z.string().min(3).max(100),
  client_id: z.string().uuid(),
  target_audience: z.string().min(5).max(200),
  core_keywords: z.array(z.string()).min(1),
  custom_prompt: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = campaignSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos', details: parsed.error.issues }, { status: 400 });
    }

    const { name, client_id, target_audience, core_keywords, custom_prompt } = parsed.data;
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('campaigns')
      .insert([
        { 
          name, 
          client_id,
          target_audience, 
          core_keywords,
          custom_prompt 
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data });
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
