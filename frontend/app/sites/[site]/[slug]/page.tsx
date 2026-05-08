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
import { AppleTemplate } from '@/components/templates/AppleTemplate';
import { LinearTemplate } from '@/components/templates/LinearTemplate';
import { StripeTemplate } from '@/components/templates/StripeTemplate';
import { AirbnbTemplate } from '@/components/templates/AirbnbTemplate';
import { FintechTemplate } from '@/components/templates/FintechTemplate';
import { SaaSTemplate } from '@/components/templates/SaaSTemplate';
import { MinimalBlancTemplate } from '@/components/templates/MinimalBlancTemplate';
import { DarkHackerTemplate } from '@/components/templates/DarkHackerTemplate';
import { BoldEditorialTemplate } from '@/components/templates/BoldEditorialTemplate';
import { OrganicSoftTemplate } from '@/components/templates/OrganicSoftTemplate';
import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { GlassTemplate } from '@/components/templates/GlassTemplate';
import { RetroTemplate } from '@/components/templates/RetroTemplate';
import { LuxuryTemplate } from '@/components/templates/LuxuryTemplate';
import { StartupTemplate } from '@/components/templates/StartupTemplate';
import { CyberTemplate } from '@/components/templates/CyberTemplate';
import { ModularTemplate } from '@/components/templates/ModularTemplate';

interface SitePageProps {
  params: Promise<{ site: string; slug: string }>;
}

export const revalidate = 3600;

async function getTenantData(site: string, slug: string) {
  try {
    // Sanitização para evitar problemas com DirectAdmin/Proxy headers
    const cleanSite = site.split(':')[0].toLowerCase().trim();
    console.log(`[DIAGNOSTICO] Buscando dados para Site: ${cleanSite}, Slug: ${slug}`);
    const supabase = createServiceClient();

    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .or(`subdomain.eq.${cleanSite},custom_domain.eq.${cleanSite}`)
      .single();

    if (clientError || !client) {
      console.error(`[DIAGNOSTICO] Cliente não encontrado: ${site}`, clientError);
      return null;
    }

    const { data: page, error: pageError } = await supabase
      .from('generated_pages')
      .select('*')
      .eq('client_id', client.id)
      .eq('slug', slug)
      .eq('status', 'COMPLETED')
      .single();

    if (pageError || !page) {
      console.error(`[DIAGNOSTICO] Página não encontrada ou não concluída: ${slug}`, pageError);
      return null;
    }

    const { data: relatedPages } = await supabase
      .from('generated_pages')
      .select('service_name, location, slug')
      .eq('client_id', client.id)
      .eq('status', 'COMPLETED')
      .neq('slug', slug)
      .limit(8);

    return { client, page, relatedPages: relatedPages || [] };
  } catch (error) {
    console.error('[DIAGNOSTICO] Erro crítico no getTenantData:', error);
    return null;
  }
}

export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const { site, slug } = await params;
  const data = await getTenantData(site, slug);
  if (!data) return { title: 'Não encontrado' };

  const { client, page } = data;
  const brand = client.brand_settings;
  
  // Lógica de Template de Título
  let title = `${page.service_name} em ${page.location} | ${brand?.company_name || client.name}`;
  if (brand?.meta_title_template) {
    title = brand.meta_title_template
      .replace('{{service}}', page.service_name)
      .replace('{{location}}', page.location)
      .replace('{{brand}}', brand?.company_name || client.name);
  }

  return {
    title,
    description: page.meta_description,
    icons: brand?.favicon_url ? { icon: brand.favicon_url } : undefined
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
    apple: AppleTemplate,
    linear: LinearTemplate,
    stripe: StripeTemplate,
    airbnb: AirbnbTemplate,
    fintech: FintechTemplate,
    saas: SaaSTemplate,
    minimal_blanc: MinimalBlancTemplate,
    dark_hacker: DarkHackerTemplate,
    bold_editorial: BoldEditorialTemplate,
    organic_soft: OrganicSoftTemplate,
    corporate: CorporateTemplate,
    glass: GlassTemplate,
    retro: RetroTemplate,
    luxury: LuxuryTemplate,
    startup: StartupTemplate,
    cyber: CyberTemplate,
    modular: ModularTemplate,
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
