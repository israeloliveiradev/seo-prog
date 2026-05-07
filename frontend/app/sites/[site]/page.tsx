import { createServiceClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';

export default async function SiteHomePage({ params }: { params: { site: string } }) {
  const supabase = createServiceClient();
  const { site } = params;

  // Busca os dados completos do cliente
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .or(`subdomain.eq.${site},custom_domain.eq.${site}`)
    .single();

  if (!client) notFound();

  // Busca as páginas geradas para este cliente (para a seção de cidades/serviços)
  const { data: pages } = await supabase
    .from('generated_pages')
    .select('*')
    .eq('client_id', client.id)
    .eq('status', 'COMPLETED')
    .order('created_at', { ascending: false });

  // Seleção dinâmica de template
  const templates: { [key: string]: any } = {
    minimalist: MinimalistTemplate,
    modern: ModernTemplate,
  };

  const TemplateComponent = templates[client.template_id || 'minimalist'] || MinimalistTemplate;

  return <TemplateComponent client={client} pages={pages || []} />;
}
