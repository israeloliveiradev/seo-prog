/**
 * app/api/admin/metrics/route.ts — Endpoint de métricas do dashboard.
 * Retorna contagem de páginas por status.
 */

import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('generated_pages')
      .select('status');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const counts = {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      ERROR: 0,
    };

    (data ?? []).forEach((row) => {
      if (row.status in counts) {
        counts[row.status as keyof typeof counts]++;
      }
    });

    return NextResponse.json({ counts });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro interno ao buscar métricas' },
      { status: 500 }
    );
  }
}
