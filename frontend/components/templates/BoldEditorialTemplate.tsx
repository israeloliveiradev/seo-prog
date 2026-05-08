'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const BoldEditorialTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#e11d48'; // Rosa choque por padrão
  
  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      <GoogleFontsLoader fontFamily="Outfit" />
      
      {/* 1. HERO - BOLD TYPOGRAPHY */}
      <header className="min-h-screen grid lg:grid-cols-2">
         <div className="flex flex-col justify-center p-8 md:p-20 space-y-12">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
               <span className="text-xs font-black uppercase tracking-[0.4em] border-b-4 border-black pb-1">Regional Edition</span>
               <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase italic">
                  {page?.service_name} <br/>
                  <span style={{ color: primaryColor }}>{page?.location}</span>
               </h1>
            </motion.div>
            <p className="text-xl font-bold max-w-md leading-tight uppercase">
               {page?.meta_description || brand?.description}
            </p>
            <div className="pt-8">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="inline-block px-12 py-6 text-white font-black uppercase tracking-widest text-sm hover:scale-110 transition-transform -rotate-2"
               >
                 Contact Now_
               </a>
            </div>
         </div>
         <div className="bg-slate-100 relative overflow-hidden">
            <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800'} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Bold" />
            <div className="absolute top-10 right-10 bg-black text-white p-8 w-40 h-40 flex items-center justify-center text-center font-black leading-none rounded-full rotate-12">
               EST. <br/> 2024
            </div>
         </div>
      </header>

      {/* 2. ASYMMETRIC GRID */}
      <Section className="py-40 bg-black text-white">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-20">
            <div className="space-y-10 md:pt-40">
               <h2 className="text-5xl font-black uppercase italic leading-none">Visão <br/> Radical.</h2>
               <p className="text-white/60 font-medium leading-relaxed">Não fazemos o comum. Redefinimos o que é {page?.service_name.toLowerCase()} em {page?.location} através de uma abordagem editorial e precisa.</p>
            </div>
            <div className="md:col-span-2 grid md:grid-cols-2 gap-10">
               {[
                 { t: "Criação", d: "Design de processos impecável." },
                 { t: "Escala", d: "Crescimento sustentável e veloz." },
                 { t: "União", d: "Foco total na experiência do cliente." },
                 { t: "Arte", d: "Cada detalhe é uma obra-prima." }
               ].map((item, i) => (
                 <div key={i} className="p-12 border border-white/20 hover:bg-white hover:text-black transition-all group">
                    <h3 className="text-4xl font-black uppercase italic mb-4">{item.t}</h3>
                    <p className="text-sm opacity-60 group-hover:opacity-100">{item.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </Section>

      {/* IA CONTENT WITH BIG QUOTE STYLE */}
      {page?.ai_content && (
        <Section className="py-40 bg-white">
           <div className="max-w-5xl mx-auto px-6 relative">
              <div className="absolute -top-20 -left-10 text-[20rem] font-black opacity-[0.03] select-none">“</div>
              <div className="prose prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-p:font-bold prose-p:italic" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER BOLD */}
      <footer className="py-24 border-t-8 border-black text-center px-6">
         <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-12">{client.name}</h2>
         <div className="flex justify-center gap-12 font-black uppercase tracking-widest text-xs">
            <span className="cursor-pointer border-b-2 border-transparent hover:border-black">About</span>
            <span className="cursor-pointer border-b-2 border-transparent hover:border-black">Work</span>
            <span className="cursor-pointer border-b-2 border-transparent hover:border-black">Connect</span>
         </div>
      </footer>
    </div>
  );
};
