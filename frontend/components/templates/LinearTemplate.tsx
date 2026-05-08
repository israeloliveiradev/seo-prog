'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Layers, Shield, Cpu, Zap, ChevronRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const LinearTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#8b5cf6'; // Violeta por padrão Linear
  
  return (
    <div className="bg-[#050508] text-white font-sans selection:bg-violet-500/30 overflow-hidden">
      <GoogleFontsLoader fontFamily="Inter" />
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* HERO SECTION */}
      <header className="relative pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Atendimento Prioritário em {page?.location}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
          >
            {page?.service_name} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Redefinido.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            {page?.meta_description || brand?.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <a 
              href={`https://wa.me/${brand?.contact_whatsapp}`}
              className="h-14 px-10 flex items-center justify-center rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-2xl shadow-white/10"
            >
              Começar Agora
            </a>
            <button className="h-14 px-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all group">
              Ver Diferenciais <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* FEATURE GRID */}
      <Section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Cpu, title: "Tecnologia", desc: "Processos automatizados e precisos." },
            { icon: Layers, title: "Modular", desc: "Adaptável a qualquer necessidade." },
            { icon: Shield, title: "Seguro", desc: "Protocolos de segurança máxima." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all space-y-4 group">
               <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-violet-500/20 transition-all">
                 <item.icon size={24} />
               </div>
               <h3 className="text-xl font-bold">{item.title}</h3>
               <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* IA CONTENT WITH GRADIENT BORDER */}
      {page?.ai_content && (
        <Section className="px-6 py-32">
          <div className="max-w-4xl mx-auto p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-[#050508] rounded-[22px] p-12 md:p-20">
              <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-white/60" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
            </div>
          </div>
        </Section>
      )}

      {/* FOOTER */}
      <footer className="py-32 border-t border-white/5 text-center px-6">
         <div className="max-w-xl mx-auto space-y-8">
            <h2 className="text-4xl font-black italic tracking-tighter">Próximo Nível.</h2>
            <div className="flex justify-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
               <span>SLA 99.9%</span>
               <span className="w-1 h-1 rounded-full bg-white/20 mt-1.5" />
               <span>24/7 Suporte</span>
               <span className="w-1 h-1 rounded-full bg-white/20 mt-1.5" />
               <span>Global</span>
            </div>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest pt-12">
               © {new Date().getFullYear()} — {client.name} — Direitos Reservados
            </p>
         </div>
      </footer>
    </div>
  );
};
