import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('generated_pages')
      .select('*, campaigns(name, clients(subdomain))')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ pages: data ?? [] });
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno ao buscar páginas' }, { status: 500 });
  }
}
