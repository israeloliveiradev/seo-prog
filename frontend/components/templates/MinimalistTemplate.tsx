import React from 'react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#6366f1';
  const features = brand?.features_enabled || {};

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30">
      {/* Grainy Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Minimal */}
        <header className="mb-32 space-y-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-1" style={{ backgroundColor: primaryColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Premium Service</span>
           </div>
           <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
             {page?.service_name || client.name} <br />
             <span className="text-white/20 font-normal not-italic">{page?.location || 'Official Portal'}</span>
           </h1>
           <p className="max-w-2xl text-xl text-white/50 font-light leading-relaxed">
             {page?.meta_description || 'Excelência técnica e compromisso com resultados industriais.'}
           </p>
        </header>

        {/* Conteúdo IA (Se for página interna) */}
        {page?.ai_content && (
          <article className="mb-40 prose prose-invert max-w-none">
             <div 
               className="text-white/80 leading-loose text-lg space-y-6"
               dangerouslySetInnerHTML={{ __html: page.ai_content }} 
             />
          </article>
        )}

        {/* Lista de Páginas (Se for a Home) */}
        {pages && pages.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {pages.map((p) => (
              <a 
                key={p.id}
                href={`/${p.slug}`}
                className="group p-12 bg-[#050508] hover:bg-white/[0.02] transition-all flex flex-col justify-between aspect-video md:aspect-square"
              >
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{p.location}</span>
                <h3 className="text-3xl font-black uppercase italic group-hover:text-indigo-400 transition-colors">
                  {p.service_name}
                </h3>
                <div className="flex items-center gap-2 pt-8">
                  <div className="w-8 h-px bg-white/20 group-hover:w-16 transition-all" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Explorar</span>
                </div>
              </a>
            ))}
          </section>
        )}

        {/* Contato & Mapa */}
        <section className="mt-40 grid lg:grid-cols-2 gap-20 items-end">
           <div className="space-y-12">
              <h2 className="text-4xl font-black uppercase italic tracking-tight">Contato Industrial</h2>
              <div className="space-y-6">
                 <div>
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Localização</p>
                   <p className="text-xl">{brand?.address || 'Disponível em toda região.'}</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Conexão Direta</p>
                   <a 
                    href={`https://wa.me/${brand?.contact_whatsapp}`}
                    className="text-3xl font-black text-indigo-400 hover:text-white transition-colors"
                   >
                     {brand?.contact_whatsapp}
                   </a>
                 </div>
              </div>
           </div>

           {features.show_maps && brand?.google_maps_embed && (
             <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale invert opacity-50 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-1000">
                <iframe 
                  src={brand.google_maps_embed} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                />
             </div>
           )}
        </section>

        {/* Footer */}
        <footer className="mt-60 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 opacity-20 hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-black uppercase tracking-widest">{client.name} © {new Date().getFullYear()}</span>
           <div className="flex gap-8">
              {brand?.social_links?.instagram && <a href={brand.social_links.instagram} className="text-[10px] font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">Instagram</a>}
              {brand?.social_links?.facebook && <a href={brand.social_links.facebook} className="text-[10px] font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">Facebook</a>}
           </div>
        </footer>
      </main>
    </div>
  );
};
