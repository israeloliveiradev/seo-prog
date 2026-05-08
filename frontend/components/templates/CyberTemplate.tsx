'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Zap, Cpu, Shield, Globe, ChevronRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const CyberTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#ff00ff'; // Rosa Neon
  
  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-[#ff00ff]/30 overflow-hidden">
      <GoogleFontsLoader fontFamily="JetBrains Mono" />
      
      {/* GLITCH OVERLAY SIMULATION */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* 1. HERO CYBER - NEON STYLE */}
      <header className="relative pt-40 pb-32 px-6">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-[#ff00ff]/10 blur-[120px] -z-10 animate-pulse" />
         
         <div className="max-w-7xl mx-auto text-center space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 border border-[#ff00ff]/40 bg-[#ff00ff]/5 text-[#ff00ff] text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_0_15px_rgba(255,0,255,0.2)]"
            >
               Protocol 2077 • Active in {page?.location}
            </motion.div>

            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none uppercase italic">
               {page?.service_name} <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#ffff00]">
                  Cyber_Next
               </span>
            </h1>

            <p className="text-xl md:text-3xl text-white/40 max-w-3xl mx-auto font-mono leading-tight">
               {page?.meta_description || brand?.description}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="h-16 px-12 flex items-center justify-center bg-transparent border-2 border-[#ff00ff] text-[#ff00ff] font-black uppercase tracking-widest text-xs hover:bg-[#ff00ff] hover:text-black hover:shadow-[0_0_30px_#ff00ff] transition-all relative group"
               >
                 Execute Command_
                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
            </div>
         </div>
      </header>

      {/* 2. GRID TECH CARDS */}
      <Section className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
               { icon: Cpu, title: "Neural Link", desc: "Processamento de alta fidelidade em " + page?.location, color: "#00ffff" },
               { icon: Zap, title: "Speed Core", desc: "Latência zero em cada etapa do processo.", color: "#ff00ff" },
               { icon: Shield, title: "Firewall", desc: "Proteção absoluta de nível corporativo.", color: "#ffff00" }
            ].map((item, i) => (
               <div key={i} className="p-12 bg-white/5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -z-10" style={{ backgroundColor: item.color }} />
                  <div className="space-y-6">
                     <div style={{ color: item.color }} className="drop-shadow-[0_0_10px_currentColor]">
                        <item.icon size={40} />
                     </div>
                     <h3 className="text-3xl font-black uppercase italic tracking-tighter">{item.title}</h3>
                     <p className="text-white/40 font-mono text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: item.color }} />
               </div>
            ))}
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32">
           <div className="max-w-4xl mx-auto px-6 border-2 border-white/5 p-12 md:p-20 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff00ff]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff00ff]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff00ff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff00ff]" />
              <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:italic prose-p:font-mono prose-p:text-white/60" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER CYBER */}
      <footer className="py-32 border-t border-white/5 bg-[#080808] text-center px-6">
         <div className="max-w-xl mx-auto space-y-12">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">{client.name}</h2>
            <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
               <span className="hover:text-[#00ffff] cursor-pointer">Connect</span>
               <span className="hover:text-[#ff00ff] cursor-pointer">Protocol</span>
               <span className="hover:text-[#ffff00] cursor-pointer">Archive</span>
            </div>
            <p className="text-[10px] font-mono text-white/10 pt-12">
               EST_2077 // {page?.location} // ALL RIGHTS RESERVED
            </p>
         </div>
      </footer>
    </div>
  );
};
