import React from 'react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const ModernTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#6366f1';
  const features = brand?.features_enabled || {};

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header Fixo */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {brand?.logo_url ? (
              <img src={brand.logo_url} alt={client.name} className="h-8 object-contain" />
            ) : (
              <span className="text-xl font-bold tracking-tight text-slate-900">{client.name}</span>
            )}
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:opacity-90 shadow-lg shadow-indigo-200"
            style={{ backgroundColor: primaryColor }}
          >
            Falar com Especialista
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 space-y-8">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Atendimento em {page?.location || 'Sua Região'}
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {page?.service_name || 'Serviços Especializados'} <br />
              <span className="text-slate-400 font-medium">com Qualidade Premium</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              {brand?.description || page?.meta_description || 'Oferecemos as melhores soluções do mercado com foco em excelência e satisfação total do cliente.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button 
                className="px-8 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: primaryColor }}
               >
                 Solicitar Orçamento Grátis
               </button>
            </div>
          </div>
          <div className="relative">
            <div 
              className="absolute -inset-4 rounded-[40px] blur-3xl opacity-10"
              style={{ backgroundColor: primaryColor }}
            />
            <img 
              src={brand?.hero_image || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop'} 
              alt="Serviço"
              className="relative rounded-[32px] shadow-2xl object-cover aspect-video lg:aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Grid de Páginas / Serviços (Se for a Home) */}
      {pages && pages.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Áreas que Atendemos</h2>
            <p className="text-slate-500">Encontre {client.name} nas principais cidades.</p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            {pages.map((p) => (
              <a 
                key={p.id}
                href={`/${p.slug}`}
                className="p-8 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600">{p.service_name}</h3>
                <p className="text-sm text-slate-400">Em {p.location}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Mapa (Se habilitado) */}
      {features.show_maps && brand?.google_maps_embed && (
        <section className="py-24 max-w-7xl mx-auto px-6">
           <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-[450px]">
             <iframe 
                src={brand.google_maps_embed} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              />
           </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-6">{client.name}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{brand?.address || 'Endereço não informado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contato</h4>
            <p className="text-slate-400 text-sm">WhatsApp: {brand?.contact_whatsapp}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              {brand?.social_links?.instagram && <a href={brand.social_links.instagram} className="text-slate-400 hover:text-white">Instagram</a>}
              {brand?.social_links?.facebook && <a href={brand.social_links.facebook} className="text-slate-400 hover:text-white">Facebook</a>}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-[10px] text-slate-600 uppercase tracking-widest">
           © {new Date().getFullYear()} {client.name} | Desenvolvido por Rankia.cloud
        </div>
      </footer>
    </div>
  );
};
