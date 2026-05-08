'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { CheckCircle2, BarChart3, Users, Zap, ArrowRight, Play } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const SaaSTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#4f46e5'; 
  
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-100">
      <GoogleFontsLoader fontFamily="Inter" />
      
      {/* HERO SECTION - SAAS STYLE */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest"
          >
            🚀 Nova Versão 2.0 em {page?.location}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none text-slate-900"
          >
            Escalone sua operação <br/>
            <span style={{ color: primaryColor }}>com {page?.service_name}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
          >
            {page?.meta_description || brand?.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
          >
            <a 
              href={`https://wa.me/${brand?.contact_whatsapp}`}
              style={{ backgroundColor: primaryColor }}
              className="h-14 px-10 flex items-center justify-center rounded-xl text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
            >
              Começar Teste Grátis
            </a>
            <button className="h-14 px-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all flex items-center gap-2">
              <Play size={16} fill="currentColor" /> Ver Demo
            </button>
          </motion.div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="max-w-6xl mx-auto mt-20 p-4 bg-slate-200/50 rounded-[32px] border border-slate-200 shadow-2xl">
           <div className="bg-white rounded-[20px] aspect-video overflow-hidden shadow-inner relative">
              <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'} className="w-full h-full object-cover" alt="Dashboard" />
           </div>
        </div>
      </header>

      {/* LOGO WALL */}
      <div className="py-12 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Confiado por empresas líderes em {page?.location}</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale">
               {['LOGO 1', 'LOGO 2', 'LOGO 3', 'LOGO 4', 'LOGO 5'].map(l => (
                  <span key={l} className="font-black italic tracking-tighter text-2xl">{l}</span>
               ))}
            </div>
         </div>
      </div>

      {/* FEATURES GRID */}
      <Section className="py-32">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
               { icon: Zap, title: "Integração Instantânea", desc: "Conecte seus processos em segundos sem atrito." },
               { icon: BarChart3, title: "Analytics Real-time", desc: "Acompanhe cada métrica de sucesso em tempo real." },
               { icon: Users, title: "Multi-Usuário", desc: "Colabore com todo o seu time de forma fluida." }
            ].map((item, i) => (
               <div key={i} className="space-y-6">
                  <div style={{ color: primaryColor }} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                     <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  <ul className="space-y-3">
                     {['Recurso exclusivo', 'Suporte 24/7', 'Escalabilidade'].map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                           <CheckCircle2 size={16} className="text-green-500" /> {f}
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="bg-slate-50 py-32 border-y border-slate-100">
           <div className="max-w-4xl mx-auto px-6">
              <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* CTA FOOTER */}
      <footer className="py-40 text-center px-6">
         <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">Pronto para acelerar em {page?.location}?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="h-16 px-12 flex items-center justify-center rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20"
               >
                 Começar Agora <ArrowRight size={18} className="ml-2" />
               </a>
            </div>
            <p className="text-slate-400 text-xs">Sem cartão de crédito necessário. Cancele quando quiser.</p>
         </div>
      </footer>
    </div>
  );
};
