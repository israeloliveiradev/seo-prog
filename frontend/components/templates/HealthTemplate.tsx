'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const HealthTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#0ea5e9';
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Top Info Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-50 border-b border-slate-100 py-2.5 px-4 text-center text-[9px] md:text-[11px] font-medium text-slate-500 uppercase tracking-widest"
      >
         Atendimento especializado em {page?.location || 'Toda a Região'} • Agende pelo WhatsApp
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 md:px-10 py-4 md:py-5 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
             </div>
             <span className="text-lg md:text-xl font-bold tracking-tight text-slate-800 uppercase">{client.name}</span>
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-4 md:px-6 py-2 md:py-2.5 bg-slate-900 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-slate-900/10"
          >
            Agendar
          </a>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative py-12 md:py-32 overflow-hidden px-4">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[100px] hidden lg:block" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Atendimento Humanizado</span>
             </div>
             <h1 className="text-4xl md:text-7xl font-serif text-slate-900 leading-[1.1]">
               Sua saúde em <br />
               <span className="italic text-sky-600 font-medium">{page?.location || 'Boas Mãos'}</span>
             </h1>
             <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg">
               {brand?.description || page?.meta_description || 'Oferecemos um atendimento humanizado com tecnologia de ponta para garantir o melhor diagnóstico e tratamento em nossa região.'}
             </p>
             <button className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-2xl shadow-sky-500/20">
               Nossas Especialidades
             </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <img 
               src={brand?.hero_image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000"} 
               alt="Médico" 
               className="relative rounded-[40px] shadow-2xl w-full aspect-square md:aspect-[4/3] object-cover"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block">
                <p className="text-3xl md:text-4xl font-serif text-sky-600 mb-1">98%</p>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">Satisfação dos <br />Pacientes</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-16 md:py-24 px-4 md:px-10 bg-slate-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 md:mb-6">Cuidando de histórias reais</h2>
              <p className="text-slate-500 text-sm md:text-base">A confiança de nossos pacientes é o nosso maior patrimônio em {page?.location}.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(brand?.testimonials?.length > 0 ? brand.testimonials : [1, 2, 3]).map((test: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-10 bg-slate-50 rounded-[40px] border border-slate-100"
                >
                  <p className="text-slate-600 mb-8 italic text-base md:text-lg leading-relaxed">
                    {test.content || `"O atendimento foi excelente. Me senti acolhido desde a recepção até a consulta final. Recomendo muito o ${client.name} em ${page?.location}!"`}
                  </p>
                  <div className="flex items-center gap-4">
                    {test.image_url ? (
                      <img src={test.image_url} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" alt={test.name} />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] text-sky-600 font-bold">
                        {test.name ? test.name[0] : 'P'}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800 text-sm md:text-base">{test.name || 'Paciente'}</p>
                      <p className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-widest">{test.role || page?.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="h-[350px] md:h-[500px] rounded-[40px] overflow-hidden border border-slate-200 shadow-2xl">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src={publicMapUrl}
                    className="opacity-90 contrast-75"
                 />
              </div>
              <div className="space-y-10 md:space-y-12 text-center lg:text-left">
                 <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">Visite nossa clínica <br /><span className="text-sky-600 italic">em {page?.location}</span></h2>
                 <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 group">
                       <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl mx-auto lg:mx-0 group-hover:bg-sky-500 group-hover:text-white transition-all">📍</div>
                       <p className="text-base md:text-lg font-medium text-slate-600">{brand?.address || 'Endereço disponível sob consulta'}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 group">
                       <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl mx-auto lg:mx-0 group-hover:bg-sky-500 group-hover:text-white transition-all">💬</div>
                       <p className="text-base md:text-lg font-medium text-slate-600">{brand?.contact_whatsapp || 'Fale agora pelo WhatsApp'}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="bg-white py-16 md:py-24 px-4 md:px-10 border-t border-slate-100">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs">✚</div>
               <span className="text-xl font-bold uppercase tracking-tight text-slate-800">{client.name}</span>
            </div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">© {new Date().getFullYear()} — Excelência & Cuidado</p>
         </div>
      </footer>
    </div>
  );
};
