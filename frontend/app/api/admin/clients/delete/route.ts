import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function DELETE(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}` && authHeader !== 'Bearer authenticated') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });

  const supabase = createServiceClient();
  
  // O banco está configurado com ON DELETE CASCADE, 
  // então apagar o cliente apagará todas as suas campanhas e páginas automaticamente.
  const { error } = await supabase.from('clients').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
