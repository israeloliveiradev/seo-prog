import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  
  // Permite o token 'authenticated' (do nosso login) ou a API KEY real
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}` && authHeader !== 'Bearer authenticated') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('clients')
    .select('id, name, subdomain, custom_domain')
    .order('name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
