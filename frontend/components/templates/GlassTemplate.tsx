'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Sparkles, Zap, Shield, Globe } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const GlassTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#8b5cf6'; // Violeta vibrante
  
  return (
    <div className="bg-[#050508] text-white font-sans selection:bg-violet-500/30 min-h-screen relative overflow-hidden">
      <GoogleFontsLoader fontFamily="Outfit" />
      
      {/* 1. ANIMATED BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/20 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full" />
      </div>

      {/* 2. HERO GLASS */}
      <header className="relative pt-40 pb-32 px-6">
         <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[48px] p-12 md:p-24 text-center space-y-10 shadow-2xl"
         >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest">
               <Sparkles size={14} className="text-yellow-400" /> Digital Evolution • {page?.location}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
               {page?.service_name} <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Transparente.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
               {page?.meta_description || brand?.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="h-14 px-12 flex items-center justify-center rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
               >
                 Acessar Agora
               </a>
            </div>
         </motion.div>
      </header>

      {/* 3. FEATURE CARDS (GLASS STYLE) */}
      <Section className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
            {[
               { icon: Zap, title: "Instantâneo", desc: "Velocidade de resposta em tempo real." },
               { icon: Shield, title: "Seguro", desc: "Proteção total dos seus dados." },
               { icon: Globe, title: "Global", desc: "Presença em toda a região." },
               { icon: Sparkles, title: "Elite", desc: "O melhor de " + page?.location }
            ].map((item, i) => (
               <div key={i} className="p-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                     <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* 4. IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 relative">
           <div className="max-w-4xl mx-auto px-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-20">
              <div className="prose prose-invert max-w-none prose-headings:font-black prose-p:text-white/60" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER GLASS */}
      <footer className="py-32 text-center px-6">
         <div className="max-w-xl mx-auto space-y-10">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">{client.name}</h2>
            <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/30">
               <span className="hover:text-white cursor-pointer transition-colors">Future</span>
               <span className="hover:text-white cursor-pointer transition-colors">Vision</span>
               <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 pt-12">
               © {new Date().getFullYear()} — Made with light.
            </p>
         </div>
      </footer>
    </div>
  );
};
