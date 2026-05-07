import { createServiceClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { RetailTemplate } from '@/components/templates/RetailTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { HealthTemplate } from '@/components/templates/HealthTemplate';
import { LegalTemplate } from '@/components/templates/LegalTemplate';
import { RealEstateTemplate } from '@/components/templates/RealEstateTemplate';
import { AutomotiveTemplate } from '@/components/templates/AutomotiveTemplate';
import { EducationTemplate } from '@/components/templates/EducationTemplate';
import { FoodTemplate } from '@/components/templates/FoodTemplate';

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

  // Seleção dinâmica de template (A Fábrica de 10!)
  const templates: { [key: string]: any } = {
    minimalist: MinimalistTemplate,
    modern: ModernTemplate,
    retail: RetailTemplate,
    creative: CreativeTemplate,
    health: HealthTemplate,
    legal: LegalTemplate,
    realestate: RealEstateTemplate,
    automotive: AutomotiveTemplate,
    education: EducationTemplate,
    food: FoodTemplate,
  };

  const TemplateComponent = templates[client.template_id || 'minimalist'] || MinimalistTemplate;

  return <TemplateComponent client={client} pages={pages || []} />;
}
