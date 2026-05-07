'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const LegalTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#1e293b';
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-slate-900 font-serif selection:bg-slate-200 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header Jurídico */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 backdrop-blur-md border-b border-slate-200 px-6 md:px-10 py-6 md:py-8 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start">
             <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-slate-900">{client.name}</span>
             <span className="text-[8px] md:text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 mt-1">Advocacia & Consultoria</span>
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-700 transition-all"
          >
            Agendar
          </a>
        </div>
      </motion.header>

      {/* Hero Jurídico */}
      <section className="relative py-20 md:py-48 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12 relative z-10"
        >
           <h1 className="text-4xl md:text-8xl font-medium leading-[1.1] text-slate-900 italic">
             Excelência Jurídica em <br />
             <span className="text-slate-400 not-italic uppercase text-3xl md:text-6xl tracking-widest block mt-4 md:mt-6">
               {page?.location || 'Todo o Brasil'}
             </span>
           </h1>
           <p className="text-lg md:text-xl text-slate-600 font-sans font-light leading-loose max-w-2xl mx-auto">
             {brand?.description || page?.meta_description || 'Compromisso com a ética e a justiça. Nossa equipe está pronta para defender seus direitos com o rigor técnico que sua causa exige.'}
           </p>
        </motion.div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-20 md:py-32 px-4 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo font-sans" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof / Prestige */}
      <section className="py-24 md:py-40 px-4 md:px-10 bg-[#1e293b] text-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <h2 className="text-4xl md:text-6xl italic leading-tight">Tradição e resultados comprovados <br /><span className="text-slate-400 not-italic uppercase text-2xl md:text-3xl tracking-widest block mt-4">em {page?.location}</span></h2>
                 <p className="text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed">Centenas de causas resolvidas com transparência e foco no cliente. Sua segurança jurídica é nossa prioridade.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                 {[1, 2, 3, 4].map(i => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl"
                    >
                       <p className="text-3xl md:text-4xl font-bold mb-2">+{i * 150}</p>
                       <p className="text-[10px] md:text-xs uppercase font-black tracking-widest text-slate-400">Casos em {page?.location}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="h-[350px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <iframe 
               width="100%" 
               height="100%" 
               src={publicMapUrl}
               className="grayscale contrast-125 opacity-90"
            />
          </div>
          <div className="space-y-10 md:space-y-12 order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl italic leading-tight text-slate-900">Sede <br /><span className="text-slate-400 not-italic uppercase text-2xl md:text-3xl tracking-widest block mt-4">{page?.location}</span></h2>
            <div className="space-y-8 md:space-y-10">
               <div className="space-y-3">
                  <p className="text-[10px] md:text-xs uppercase font-black tracking-widest text-slate-400">Localização</p>
                  <p className="text-lg md:text-xl font-sans text-slate-700">{brand?.address || 'Consulte nosso escritório central'}</p>
               </div>
               <div className="space-y-3">
                  <p className="text-[10px] md:text-xs uppercase font-black tracking-widest text-slate-400">Atendimento</p>
                  <p className="text-lg md:text-xl font-sans text-slate-700">Segunda a Sexta, das 09h às 18h</p>
               </div>
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="inline-block px-10 py-4 bg-[#1e293b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg shadow-xl"
               >
                 Solicitar Consultoria
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      {pages && pages.length > 0 && (
        <section className="py-32 bg-[#f8f5f0] px-4 md:px-10">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl italic text-slate-900 mb-16 border-l-4 border-slate-900 pl-6">Outras áreas em {page?.location}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-xl">
                {pages.map((p, i) => (
                  <motion.a 
                    key={p.id} 
                    href={`/${p.slug}`}
                    className="p-10 md:p-12 bg-white group hover:bg-[#f8f5f0] transition-all"
                  >
                    <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-4 group-hover:italic transition-all">{p.service_name}</h3>
                    <p className="text-[9px] md:text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">{p.location}</p>
                  </motion.a>
                ))}
              </div>
           </div>
        </section>
      )}

      <footer className="py-20 md:py-32 px-4 md:px-10 bg-white border-t border-slate-100 text-center">
         <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-slate-900 mb-10">{client.name}</p>
         <p className="text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-slate-300">© {new Date().getFullYear()} — Prestígio & Justiça Legal</p>
      </footer>
    </div>
  );
};
