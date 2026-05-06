/**
 * app/api/admin/campaigns/route.ts — Lista campanhas para o BulkSeeder.
 */

import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('campaigns')
      .select('id, name')
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
