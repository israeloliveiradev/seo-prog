'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const FoodTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#ea580c';
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#fffcf5] text-stone-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#fffcf5]/80 backdrop-blur-md border-b border-stone-200 px-4 md:px-8 py-4 md:py-6 sticky top-0 z-50 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
           <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-orange-600">{client.name}</span>
        </div>
        <a 
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="px-6 md:px-8 py-2 md:py-3 bg-orange-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-orange-600/20 active:scale-95 transition-transform"
        >
          Pedir Agora
        </a>
      </motion.header>

      {/* Hero */}
      <section className="relative py-12 md:py-40 px-4 md:px-8 overflow-hidden bg-stone-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
          >
             <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] text-white">
                O Sabor <br />
                <span className="text-orange-500">Autêntico</span> <br />
                <span className="text-white/20 not-italic text-2xl md:text-4xl tracking-normal">em {page?.location}</span>
             </h1>
             <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-lg">
                {brand?.description || page?.meta_description || 'Descubra a melhor experiência gastronômica da região. Ingredientes frescos e paixão em cada prato.'}
             </p>
             <button className="w-full md:w-auto px-10 py-5 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20 active:scale-95">Ver Cardápio</button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="absolute inset-0 bg-orange-500 rounded-full blur-[100px] opacity-20" />
             <img 
               src={brand?.hero_image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000"} 
               className="relative rounded-[40px] md:rounded-[80px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 w-full aspect-square object-cover" 
               alt="Food" 
             />
          </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-16 md:py-24 px-4 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof / Appetite */}
      <section className="py-20 md:py-32 bg-stone-900 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4 md:mb-6 leading-none">Quem provou, <br /><span className="text-orange-600">amou!</span></h2>
              <p className="text-white/40 font-medium italic">Confira as experiências em {page?.location}</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(brand?.testimonials?.length > 0 ? brand.testimonials : [1, 2, 3]).map((test: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 bg-white/5 border border-white/5 rounded-[40px] hover:border-orange-500/30 transition-all"
              >
                <p className="text-white/70 italic text-lg mb-8">
                  {test.content || `"Simplesmente a melhor comida de ${page?.location}. O tempero é único e o ambiente é maravilhoso!"`}
                </p>
                <div className="flex items-center gap-4">
                  {test.image_url ? (
                    <img src={test.image_url} className="w-12 h-12 rounded-full object-cover border border-orange-500/30 shadow-lg shadow-orange-500/10" alt={test.name} />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] text-orange-400 font-bold">
                      {test.name ? test.name[0] : 'G'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-black uppercase italic text-white">{test.name || 'Gourmet'}</p>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{test.role || page?.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 md:py-40 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <div className="space-y-10 md:space-y-12">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.8] text-stone-900">Onde estamos <br /><span className="text-orange-600">em {page?.location}</span></h2>
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-orange-600/30">📍</div>
                    <div>
                       <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-1">Endereço</p>
                       <p className="text-lg md:text-2xl font-bold text-stone-800">{brand?.address || 'Consulte nosso delivery'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-orange-600/30">⏰</div>
                    <div>
                       <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-1">Horário</p>
                       <p className="text-lg md:text-2xl font-bold text-stone-800">Aberto todos os dias</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="h-[400px] md:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden border-8 border-white shadow-2xl rotate-1 md:rotate-2">
              <iframe 
                 width="100%" 
                 height="100%" 
                 src={publicMapUrl}
                 className="opacity-90 contrast-125"
              />
           </div>
        </div>
      </section>

      {/* Other Pages */}
      {pages && pages.length > 0 && (
        <section className="py-24 bg-white px-4">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-12">Nosso Cardápio Digital em {page?.location}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {pages.map((p, i) => (
                   <motion.a 
                     key={p.id} 
                     href={`/${p.slug}`}
                     className="group space-y-4"
                   >
                     <div className="aspect-square rounded-[30px] md:rounded-[40px] overflow-hidden shadow-lg">
                       <img src={`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&sig=${p.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.service_name} />
                     </div>
                     <h3 className="text-lg font-black uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">{p.service_name}</h3>
                   </motion.a>
                 ))}
              </div>
           </div>
        </section>
      )}

      <footer className="bg-stone-900 text-white py-20 md:py-32 px-4 text-center">
         <span className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-orange-600">{client.name}</span>
         <p className="text-stone-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mt-10 md:mt-16">© {new Date().getFullYear()} — Experiência Gastronômica</p>
      </footer>
    </div>
  );
};
