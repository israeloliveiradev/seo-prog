'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-white/20 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <header className="px-6 md:px-10 py-8 md:py-12 flex justify-between items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-1.5 h-6 md:h-8 bg-white" />
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">{client.name}</span>
        </motion.div>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-1 hover:border-white transition-all"
        >
          Falar Agora
        </motion.a>
      </header>

      <main className="px-6 md:px-10 pt-16 md:pt-32 pb-20 md:pb-40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:mb-40"
          >
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 md:mb-12">
              Atuação em {page?.location || 'Setor Regional'}
            </p>
            <h1 className="text-[14vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 md:mb-24">
              {page?.service_name || 'Premium'} <br />
              <span className="text-white/20 italic">em {page?.location}</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/40 font-light leading-relaxed max-w-3xl">
              {brand?.description || page?.meta_description || 'Soluções de alta performance desenhadas sob medida para o mercado de nossa região.'}
            </p>
          </motion.div>

          {/* Dynamic Content */}
          {page?.ai_content && (
            <div className="max-w-4xl mb-32 md:mb-60">
               <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
            </div>
          )}

          {/* Map & Social Proof Combined (Minimalist style) */}
          <div className="grid lg:grid-cols-2 gap-20 md:gap-40 items-start">
             <div className="space-y-20 md:space-y-40">
                <div className="space-y-12">
                   <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white/20">Presença <br />Local</h2>
                   <div className="h-[350px] md:h-[500px] bg-white/5 border border-white/5 rounded-2xl overflow-hidden grayscale contrast-150 opacity-50 hover:opacity-100 transition-opacity">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={publicMapUrl}
                        className="invert"
                      />
                   </div>
                   <p className="text-lg md:text-xl font-light text-white/60">{brand?.address || 'Disponível em toda a região.'}</p>
                </div>

                <div className="space-y-12">
                   <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white/20">Depoimentos</h2>
                   <div className="space-y-10">
                      {[1, 2].map(i => (
                        <div key={i} className="border-l border-white/10 pl-8 space-y-4">
                           <p className="text-lg md:text-2xl font-light italic text-white/80">"A referência absoluta em {page?.location}. Resultados que falam por si."</p>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Cliente Executivo — {page?.location}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             
             {/* Pages Grid */}
             {pages && pages.length > 0 && (
               <div className="space-y-12">
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white/20">Explorar</h2>
                  <div className="grid gap-4">
                    {pages.map((p, i) => (
                      <motion.a 
                        key={p.id} 
                        href={`/${p.slug}`}
                        className="p-8 md:p-12 bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all duration-500 group flex justify-between items-end"
                      >
                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-widest mb-4 text-white/20 group-hover:text-black/40">{p.location}</p>
                          <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">{p.service_name}</h3>
                        </div>
                        <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </motion.a>
                    ))}
                  </div>
               </div>
             )}
          </div>
        </div>
      </main>

      <footer className="px-6 md:px-10 py-20 border-t border-white/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/20 flex flex-col md:flex-row justify-between gap-10">
        <div>© {new Date().getFullYear()} {client.name} — All Rights Reserved</div>
        <div className="flex gap-10">
           <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="hover:text-white transition-colors">WhatsApp</a>
           <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
};
