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

export const MinimalBlancTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#1a1a1a'; 
  
  return (
    <div className="bg-white text-[#1a1a1a] font-serif selection:bg-slate-200">
      <GoogleFontsLoader fontFamily="Playfair Display" />
      
      {/* HEADER MINIMAL BLANC */}
      <header className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl space-y-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Edição Limitada • {page?.location}</span>
          <h1 className="text-6xl md:text-9xl font-normal leading-[0.9] tracking-tighter italic">
            {page?.service_name} <br/>
            <span className="opacity-30">Pura Essência.</span>
          </h1>
          <p className="text-xl md:text-3xl font-light text-slate-400 max-w-2xl leading-relaxed">
            {page?.meta_description || brand?.description}
          </p>
          <div className="pt-8">
             <a 
              href={`https://wa.me/${brand?.contact_whatsapp}`}
              className="group flex items-center gap-6 text-lg font-bold tracking-widest uppercase italic"
             >
               <span className="w-20 h-[1px] bg-black group-hover:w-32 transition-all duration-500" />
               Solicitar Consulta
             </a>
          </div>
        </motion.div>
      </header>

      {/* PHILOSOPHY SECTION */}
      <Section className="py-40 bg-slate-50/50">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
            <div className="aspect-[3/4] bg-slate-200 overflow-hidden rounded-[2px] shadow-sm grayscale hover:grayscale-0 transition-all duration-1000">
               <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800'} className="w-full h-full object-cover" alt="Minimal" />
            </div>
            <div className="space-y-12">
               <h2 className="text-4xl md:text-6xl font-normal leading-tight italic">Excelência em cada <br/> detalhe invisível.</h2>
               <div className="space-y-8 text-slate-500 text-lg font-light leading-relaxed">
                  <p>Acreditamos que o luxo está na simplicidade absoluta. Nosso trabalho em {page?.location} é pautado pela precisão e pelo respeito ao tempo de cada cliente.</p>
                  <p>Não entregamos apenas {page?.service_name.toLowerCase()}, entregamos tranquilidade e estética impecável.</p>
               </div>
               <div className="grid grid-cols-2 gap-12 pt-12">
                  {[
                     { label: "Curadoria", val: "100%" },
                     { label: "Satisfação", val: "4.9/5" }
                  ].map(stat => (
                     <div key={stat.label} className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-30">{stat.label}</p>
                        <p className="text-4xl font-normal italic">{stat.val}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-40 bg-white">
           <div className="max-w-3xl mx-auto px-6 text-center">
              <div className="prose prose-slate max-w-none prose-p:text-xl prose-p:font-light prose-p:italic prose-p:text-slate-400" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER MINIMAL BLANC */}
      <footer className="py-24 border-t border-slate-100 text-center px-6">
         <div className="max-w-xl mx-auto space-y-12">
            <h2 className="text-3xl font-normal italic tracking-tighter uppercase">{client.name}</h2>
            <div className="flex justify-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] opacity-40">
               <span className="cursor-pointer hover:opacity-100 transition-opacity">Instagram</span>
               <span className="cursor-pointer hover:opacity-100 transition-opacity">Journal</span>
               <span className="cursor-pointer hover:opacity-100 transition-opacity">Contact</span>
            </div>
            <p className="text-[10px] font-light italic text-slate-300">
               Sua visão, nossa execução. {new Date().getFullYear()}
            </p>
         </div>
      </footer>
    </div>
  );
};
