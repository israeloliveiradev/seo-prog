import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2),
  subdomain: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Subdomínio inválido (use apenas letras minúsculas e hífens)'),
  custom_domain: z.string().optional().nullable(),
  brand_settings: z.object({
    primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#6366f1'),
    company_name: z.string().min(2),
    logo_url: z.string().url().optional().nullable(),
    contact_whatsapp: z.string().optional().nullable()
  }).optional()
});

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = clientSchema.parse(body);
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('clients')
      .insert([validatedData])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
