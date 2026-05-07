import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase';
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

interface SitePageProps {
  params: Promise<{ site: string; slug: string }>;
}

export const revalidate = 3600;

async function getTenantData(site: string, slug: string) {
  const supabase = createServiceClient();

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .or(`subdomain.eq.${site},custom_domain.eq.${site}`)
    .single();

  if (!client) return null;

  const { data: page } = await supabase
    .from('generated_pages')
    .select('*')
    .eq('client_id', client.id)
    .eq('slug', slug)
    .eq('status', 'COMPLETED')
    .single();

  if (!page) return null;

  // Interlinking: Busca outras 6 páginas do mesmo cliente
  const { data: relatedPages } = await supabase
    .from('generated_pages')
    .select('service_name, location, slug')
    .eq('client_id', client.id)
    .eq('status', 'COMPLETED')
    .neq('slug', slug)
    .limit(8);

  return { client, page, relatedPages: relatedPages || [] };
}

export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const { site, slug } = await params;
  const data = await getTenantData(site, slug);
  if (!data) return { title: 'Não encontrado' };

  const { client, page } = data;
  return {
    title: `${page.service_name} em ${page.location} | ${client.brand_settings?.company_name || client.name}`,
    description: page.meta_description,
  };
}

export default async function TenantDynamicPage({ params }: SitePageProps) {
  const { site, slug } = await params;
  const data = await getTenantData(site, slug);

  if (!data) notFound();

  const { client, page, relatedPages } = data;

  // Seleção dinâmica de template
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

  return (
    <TemplateComponent 
      client={client} 
      page={page} 
      pages={relatedPages} 
    />
  );
}
