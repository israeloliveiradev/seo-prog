'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Music, Sun, Coffee, Smile } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RetroTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#ff8c42'; // Laranja retrô
  
  return (
    <div className="bg-[#fff9f0] text-[#4a2c2a] font-sans selection:bg-[#ff8c42]/20 overflow-hidden">
      <GoogleFontsLoader fontFamily="Montserrat" />
      
      {/* 1. HERO RETRO - FUNKY STYLE */}
      <header className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
         {/* Decorative Circles */}
         <div className="absolute top-[-10%] left-[-5%] w-80 h-80 bg-[#ff8c42]/10 rounded-full blur-3xl" />
         <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-[#f9c74f]/20 rounded-full blur-3xl" />

         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-10 relative z-10"
         >
            <div className="inline-block px-6 py-2 rounded-full border-4 border-[#4a2c2a] bg-[#f9c74f] text-[#4a2c2a] text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#4a2c2a]">
               Good Vibes Only • {page?.location}
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase">
               {page?.service_name} <br/>
               <span className="text-[#ff8c42] italic">Groovy.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#4a2c2a]/70 max-w-2xl mx-auto font-bold italic leading-tight">
               {page?.meta_description || brand?.description}
            </p>
            <div className="pt-8 flex justify-center">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="h-16 px-12 flex items-center justify-center bg-[#4a2c2a] text-[#fff9f0] font-black uppercase tracking-widest text-xs hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[8px_8px_0px_#ff8c42] active:shadow-none active:translate-x-0 active:translate-y-0"
               >
                 Let's Talk_
               </a>
            </div>
         </motion.div>
      </header>

      {/* 2. ICON GRID - RETRO STYLE */}
      <Section className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
            {[
               { icon: Smile, title: "Alegria", desc: "Serviço com sorriso no rosto sempre." },
               { icon: Sun, title: "Energia", desc: "Vibe positiva em cada atendimento." },
               { icon: Coffee, title: "Pausa", desc: "Respeitamos seu tempo e ritmo." },
               { icon: Music, title: "Ritmo", desc: "Sincronia total com sua necessidade." }
            ].map((item, i) => (
               <div key={i} className="p-10 bg-[#f9c74f]/10 border-4 border-[#4a2c2a] rounded-3xl space-y-4 hover:bg-[#f9c74f]/20 transition-all shadow-[8px_8px_0px_#4a2c2a]">
                  <div className="w-14 h-14 rounded-2xl bg-[#ff8c42] border-4 border-[#4a2c2a] flex items-center justify-center text-[#4a2c2a]">
                     <item.icon size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic">{item.title}</h3>
                  <p className="text-sm font-bold opacity-70 leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* 3. IA CONTENT - PAPER STYLE */}
      {page?.ai_content && (
        <Section className="py-32">
           <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white border-4 border-[#4a2c2a] p-12 md:p-20 shadow-[16px_16px_0px_#f9c74f]">
                 <div className="prose prose-stone max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-p:font-bold prose-p:text-lg" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
              </div>
           </div>
        </Section>
      )}

      {/* FOOTER RETRO */}
      <footer className="py-24 bg-[#4a2c2a] text-[#fff9f0] text-center px-6">
         <div className="max-w-xl mx-auto space-y-10">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase">{client.name}</h2>
            <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest opacity-40">
               <span className="hover:text-[#ff8c42] cursor-pointer transition-colors">History</span>
               <span className="hover:text-[#ff8c42] cursor-pointer transition-colors">Vibes</span>
               <span className="hover:text-[#ff8c42] cursor-pointer transition-colors">Contact</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 pt-12">
               © 1970 - {new Date().getFullYear()} • Stay Groovy.
            </p>
         </div>
      </footer>
    </div>
  );
};
