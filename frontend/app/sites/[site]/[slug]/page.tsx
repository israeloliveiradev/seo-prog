import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase';

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

  // Interlinking: Busca outras 6 páginas do mesmo cliente para criar autoridade
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
    title: `${page.service_name} em ${page.location} | ${client.brand_settings?.company_name}`,
    description: page.meta_description,
  };
}

export default async function UltraPremiumTenantPage({ params }: SitePageProps) {
  const { site, slug } = await params;
  const data = await getTenantData(site, slug);

  if (!data) notFound();

  const { client, page, relatedPages } = data;
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#6366f1';

  return (
    <div 
      className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30"
      style={{ '--client-primary': primaryColor } as React.CSSProperties}
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-10 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
          
          {/* Coluna Esquerda: Conteúdo */}
          <section>
            {/* Breadcrumb Industrial */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-12">
              <span>Home</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span style={{ color: primaryColor }}>{page.location}</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-white/60">{page.service_name}</span>
            </nav>

            <header className="mb-16">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic mb-8">
                {page.service_name} <br />
                <span className="text-white/30 font-normal not-italic text-3xl md:text-5xl block mt-4">
                  em {page.location}
                </span>
              </h1>
              <div 
                className="w-24 h-2 rounded-full mb-8"
                style={{ backgroundColor: primaryColor }}
              />
              <p className="text-xl text-white/50 leading-relaxed max-w-2xl font-medium">
                {page.meta_description}
              </p>
            </header>

            {/* Conteúdo Gerado pela IA */}
            <article className="relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div
                className="prose-industrial"
                dangerouslySetInnerHTML={{ __html: page.ai_content ?? '' }}
              />
            </article>

            {/* Seção de Interlinking (SEO POWER) */}
            {relatedPages.length > 0 && (
              <section className="mt-20">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-white/10" />
                  Outras Regiões Atendidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPages.map((rp: any) => (
                    <a 
                      key={rp.slug}
                      href={`/${rp.slug}`}
                      className="group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase mb-1">{rp.service_name}</p>
                        <p className="font-bold text-white/80 group-hover:text-white transition-colors">{rp.location}</p>
                      </div>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                        style={{ backgroundColor: primaryColor }}
                      >
                        →
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </section>

          {/* Coluna Direita: Sidebar Sticky */}
          <aside className="lg:sticky lg:top-12 space-y-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0d0d16] shadow-2xl relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -mr-16 -mt-16 transition-all group-hover:opacity-40"
                style={{ backgroundColor: primaryColor }}
              />
              
              <div className="relative">
                {brand?.logo_url ? (
                    <img src={brand.logo_url} alt={brand.company_name} className="h-10 mb-8 object-contain" />
                ) : (
                    <div className="text-xl font-black italic tracking-tighter mb-8 uppercase">
                        {brand.company_name}
                    </div>
                )}

                <h4 className="text-lg font-bold mb-4">Agende agora em {page.location}</h4>
                <p className="text-sm text-white/40 mb-8 leading-relaxed">
                  Fale diretamente com um especialista e garanta o melhor serviço da região.
                </p>

                <a 
                  href={`https://wa.me/${brand.contact_whatsapp}`}
                  className="block w-full py-4 text-center text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  Falar no WhatsApp
                </a>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Disponível Agora</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Atendimento Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge de Segurança */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                 🛡️
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Garantia de Qualidade</p>
                 <p className="text-xs font-bold">Protocolo de Segurança 2024</p>
               </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 py-12 px-8 mt-20 grayscale opacity-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
          <span>{brand.company_name} © 2024</span>
          <span>Rankia System Tenant</span>
        </div>
      </footer>
    </div>
  );
}
