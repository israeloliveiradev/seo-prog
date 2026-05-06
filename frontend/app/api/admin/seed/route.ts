/**
 * app/api/admin/seed/route.ts — Bulk insert de páginas SEO.
 * 
 * Recebe: { locations: string[], serviceName: string, campaignId: string }
 * Gera slugs e faz upsert idempotente (ON CONFLICT slug → ignorar).
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase';

// Schema de validação do payload
const seedSchema = z.object({
  locations: z.array(z.string().trim().min(2).max(100)).min(1).max(500),
  serviceName: z.string().trim().min(2).max(150),
  campaignId: z.string().uuid({ message: 'campaign_id deve ser um UUID válido' }),
});

// Replicamos slugify no servidor (sem dependência extra)
function generateSlug(location: string, serviceName: string): string {
  return `${location} ${serviceName}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validação de payload
    const parsed = seedSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Payload inválido', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { locations, serviceName, campaignId } = parsed.data;
    const supabase = createServiceClient();

    // Prepara registros para inserção com slugs únicos
    const pages = locations.map((location) => ({
      campaign_id: campaignId,
      service_name: serviceName,
      location: location.trim(),
      slug: generateSlug(location.trim(), serviceName),
      status: 'PENDING' as const,
      attempts: 0,
    }));

    // Upsert idempotente: slugs duplicados são ignorados
    const { data, error } = await supabase
      .from('generated_pages')
      .upsert(pages, {
        onConflict: 'slug',
        ignoreDuplicates: true,
      })
      .select('id');

    if (error) {
      console.error('[seed] Erro no upsert:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const inserted = (data ?? []).length;
    const skipped = pages.length - inserted;
    const total = pages.length;

    console.log(`[seed] ${inserted} inseridos, ${skipped} ignorados de ${total} total.`);

    return NextResponse.json({ inserted, skipped, total });
  } catch (err) {
    console.error('[seed] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
