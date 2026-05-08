'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { ShieldCheck, Star, Diamond, Crown } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const LuxuryTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#d4af37'; // Ouro metálico
  
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] font-serif selection:bg-[#d4af37]/20 overflow-hidden">
      <GoogleFontsLoader fontFamily="Playfair Display" />
      
      {/* 1. HERO LUXURY - ELITE STYLE */}
      <header className="min-h-screen relative flex items-center justify-center text-center px-6">
         {/* Subtle radial glow */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
         
         <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-5xl space-y-12 relative z-10"
         >
            <div className="flex justify-center gap-2 text-[#d4af37]">
               {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#d4af37]">Private Selection • {page?.location}</span>
            <h1 className="text-6xl md:text-[9rem] font-normal leading-[0.8] tracking-tighter italic">
               {page?.service_name} <br/>
               <span className="opacity-30">Exclusividade.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/40 max-w-2xl mx-auto italic leading-relaxed">
               {page?.meta_description || brand?.description}
            </p>
            <div className="pt-10 flex justify-center">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="h-16 px-16 flex items-center justify-center border border-[#d4af37]/40 text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#d4af37] hover:text-black transition-all duration-700"
               >
                 Inquiry • Request Access
               </a>
            </div>
         </motion.div>
      </header>

      {/* 2. STATS / FEATURES - ELITE CARDS */}
      <Section className="py-40 border-y border-white/5 bg-[#0d0d0d]">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-20">
            {[
               { icon: Crown, title: "Autoridade", desc: "Líder indiscutível em " + page?.location },
               { icon: Diamond, title: "Qualidade", desc: "Padrões de excelência sem precedentes." },
               { icon: ShieldCheck, title: "Discrição", desc: "Confidencialidade e respeito total." }
            ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                  <div className="w-20 h-20 rounded-full border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/5 transition-all duration-700">
                     <item.icon size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-normal italic uppercase tracking-widest">{item.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed font-light">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* 3. IA CONTENT - ELEGANT TYPOGRAPHY */}
      {page?.ai_content && (
        <Section className="py-40 px-6">
           <div className="max-w-4xl mx-auto border-l border-[#d4af37]/30 pl-12 md:pl-24">
              <div className="prose prose-invert max-w-none prose-headings:font-normal prose-headings:italic prose-headings:text-[#d4af37] prose-p:text-xl prose-p:font-light prose-p:italic prose-p:text-white/50" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER LUXURY */}
      <footer className="py-32 bg-black border-t border-white/5 text-center px-6">
         <div className="max-w-xl mx-auto space-y-12">
            <h2 className="text-4xl font-normal italic tracking-tighter uppercase text-[#d4af37]">{client.name}</h2>
            <div className="flex justify-center gap-12 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
               <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Bespoke</span>
               <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Legacy</span>
               <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Atelier</span>
            </div>
            <p className="text-[9px] font-light italic text-white/10 uppercase tracking-widest pt-12">
               © {new Date().getFullYear()} — Reserved for the few.
            </p>
         </div>
      </footer>
    </div>
  );
};
