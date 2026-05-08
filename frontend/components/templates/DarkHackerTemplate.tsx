'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Terminal, Code2, ShieldAlert, Cpu, ChevronRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const DarkHackerTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#00ff41'; // Verde Matrix clássico
  
  return (
    <div className="bg-black text-[#00ff41] font-mono selection:bg-[#00ff41]/20 overflow-hidden">
      <GoogleFontsLoader fontFamily="JetBrains Mono" />
      
      {/* 1. HERO TERMINAL STYLE */}
      <header className="pt-32 pb-24 px-6 relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.05),transparent)] pointer-events-none" />
         
         <div className="max-w-5xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-3 px-4 py-1 border border-[#00ff41]/20 rounded bg-[#00ff41]/5 text-[10px] uppercase tracking-[0.2em]"
            >
               <span className="w-2 h-2 bg-[#00ff41] animate-pulse" />
               System Status: Active • {page?.location}
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
               {page?.service_name} <br/>
               <span className="opacity-40">{'>'} EXECUTING...</span>
            </h1>

            <div className="p-8 bg-black border border-[#00ff41]/20 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.05)] relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41]/40 to-transparent animate-scan" />
               <p className="text-lg md:text-xl text-[#00ff41]/60 leading-relaxed font-medium">
                  {page?.meta_description || brand?.description}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="h-14 px-10 flex items-center justify-center bg-[#00ff41] text-black font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all"
               >
                 Incentive Protocol
               </a>
               <button className="h-14 px-10 flex items-center justify-center border border-[#00ff41]/40 text-[#00ff41] font-black uppercase tracking-widest text-xs hover:bg-[#00ff41]/5 transition-all">
                 Read Docs_
               </button>
            </div>
         </div>
      </header>

      {/* 2. GRID TECH */}
      <Section className="py-32 border-y border-[#00ff41]/10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-1px bg-[#00ff41]/10 border border-[#00ff41]/10">
            {[
               { icon: Code2, title: "Algoritmos", desc: "Otimização máxima de recursos em " + page?.location },
               { icon: ShieldAlert, title: "Segurança", desc: "Criptografia de ponta a ponta garantida." },
               { icon: Cpu, title: "Hardware", desc: "Infraestrutura de alta performance." }
            ].map((item, i) => (
               <div key={i} className="p-12 bg-black hover:bg-[#00ff41]/5 transition-all space-y-6 group">
                  <item.icon size={32} className="group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">{item.title}</h3>
                  <p className="text-[#00ff41]/40 text-sm leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 bg-black">
           <div className="max-w-4xl mx-auto px-6 border-l-2 border-[#00ff41]/20 pl-12">
              <div className="prose prose-invert max-w-none prose-headings:text-[#00ff41] prose-headings:uppercase prose-p:text-[#00ff41]/60" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER TERMINAL */}
      <footer className="py-20 border-t border-[#00ff41]/10 text-center">
         <div className="max-w-xl mx-auto space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">{client.name}</h2>
            <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-[#00ff41]/40">
               <span className="hover:text-[#00ff41] cursor-pointer">/Root</span>
               <span className="hover:text-[#00ff41] cursor-pointer">/User</span>
               <span className="hover:text-[#00ff41] cursor-pointer">/Logs</span>
            </div>
            <p className="text-[10px] text-[#00ff41]/20 uppercase tracking-[0.5em]">
               © {new Date().getFullYear()} — SYSTEM_VER_8.0.4 — IsraelOliveiraDev
            </p>
         </div>
      </footer>

      <style jsx global>{`
         @keyframes scan {
            from { transform: translateY(-100%); }
            to { transform: translateY(1000%); }
         }
         .animate-scan {
            animation: scan 3s linear infinite;
         }
      `}</style>
    </div>
  );
};
