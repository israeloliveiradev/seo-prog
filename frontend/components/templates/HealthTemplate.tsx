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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Top Info Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-50 border-b border-slate-100 py-3 px-6 text-center text-[11px] font-medium text-slate-500 uppercase tracking-widest"
      >
         Atendimento especializado em {page?.location || 'Toda a Região'}
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-5 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
             </div>
             <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">{client.name}</span>
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-slate-900/10"
          >
            Agendar Consulta
          </a>
        </div>
      </motion.header>

      {/* Hero Saúde */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[100px] hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Excelência em Saúde</span>
             </div>
             <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1]">
               Cuidado completo para sua <br />
               <span className="italic text-sky-600 font-medium">{page?.service_name || 'Saúde e Bem-estar'}</span>
             </h1>
             <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
               {brand?.description || page?.meta_description || 'Oferecemos um atendimento humanizado com tecnologia de ponta para garantir o melhor diagnóstico e tratamento em nossa região.'}
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-2xl shadow-sky-500/20">
                   Nossas Especialidades
                </button>
             </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
             <div className="absolute -inset-4 bg-sky-500/5 blur-3xl rounded-full" />
             <img 
               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop" 
               alt="Médico" 
               className="relative rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
             />
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                <p className="text-4xl font-serif text-sky-600 mb-1">98%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pacientes Satisfeitos</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de Especialidades (Páginas) */}
      {pages && pages.length > 0 && (
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
               <h2 className="text-4xl font-serif text-slate-900">Especialidades em {page?.location || 'Região'}</h2>
               <p className="text-slate-500">Corpo clínico qualificado para atender todas as suas necessidades de saúde.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 bg-white rounded-[40px] border border-slate-100 hover:border-sky-200 transition-all shadow-sm hover:shadow-2xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 mb-8 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all">
                     ⚕️
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{p.service_name}</h3>
                  <p className="text-sm text-slate-400 mb-6">{p.location}</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 flex items-center gap-2">
                    Saiba Mais <span className="translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Saúde */}
      <footer className="bg-white border-t border-slate-100 py-24">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-12 text-center lg:text-left">
            <div className="col-span-2 space-y-8">
               <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">✚</div>
                  <span className="text-xl font-bold uppercase">{client.name}</span>
               </div>
               <p className="text-slate-400 max-w-md mx-auto lg:mx-0">Promovendo saúde e qualidade de vida com responsabilidade social e excelência técnica.</p>
            </div>
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">Unidade</h4>
               <p className="text-sm font-medium leading-relaxed">{brand?.address || 'Localização centralizada para seu conforto.'}</p>
            </div>
            <div className="space-y-6 text-center lg:text-right">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">Contato 24h</h4>
               <p className="text-2xl font-serif text-slate-900">{brand?.contact_whatsapp}</p>
            </div>
         </div>
      </footer>
    </div>
  );
};
