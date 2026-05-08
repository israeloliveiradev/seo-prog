'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { ThemeToggle } from '../theme-toggle';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Outfit';
  const primaryColor = brand?.primary_color || '#ff0055';
  
  const testimonialsData = brand?.testimonials?.length > 0
    ? brand.testimonials
    : [
        { name: brand?.company_name || client.name, role: "Partner", content: "Resultados explosivos e design que chama a atenção de verdade!" }
      ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans selection:bg-black selection:text-white transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-8 right-8 z-[100]">
        <ThemeToggle />
      </div>

      {/* 1. HERO NEO-BRUTALISM */}
      <header className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-20 space-y-10 bg-white border-b-8 lg:border-b-0 lg:border-r-8 border-black">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="inline-block px-4 py-2 bg-black text-white font-black uppercase text-xs tracking-widest self-start"
          >
            {brand?.company_name || 'Creative Force'}
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
            {page?.service_name} <br />
            <span style={{ color: primaryColor }} className="drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              {page?.location}
            </span>
          </h1>

          <p className="text-xl font-bold leading-relaxed border-l-8 border-black pl-6 max-w-xl">
            {page?.meta_description || brand?.description}
          </p>

          <div className="pt-10">
            <a 
              href={`https://wa.me/${brand?.contact_whatsapp}`}
              className="inline-block px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-lg hover:translate-x-2 hover:-translate-y-2 transition-transform shadow-[8px_8px_0_rgba(0,0,0,0.2)] hover:shadow-[12px_12px_0_rgba(0,0,0,1)]"
              style={{ backgroundColor: primaryColor }}
            >
              Falar com Especialista
            </a>
          </div>
        </div>

        <div className="bg-[#e0e0e0] flex items-center justify-center p-10 relative overflow-hidden">
           {/* Grafismo de Fundo */}
           <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-black" />
              ))}
           </div>
           
           <motion.div 
             initial={{ rotate: -5, scale: 0.8 }}
             animate={{ rotate: 5, scale: 1 }}
             transition={{ repeat: Infinity, duration: 5, repeatType: 'reverse' }}
             className="w-full max-w-md aspect-square bg-white border-8 border-black shadow-[20px_20px_0_rgba(0,0,0,1)] relative z-10 flex items-center justify-center p-12 overflow-hidden"
           >
              {brand?.hero_image ? (
                <img src={brand.hero_image} className="w-full h-full object-cover" />
              ) : (
                <div className="text-9xl font-black italic opacity-10 uppercase break-all">
                  {page?.service_name}
                </div>
              )}
           </motion.div>
        </div>
      </header>

      {/* 2. CONTEÚDO IA - Estilo "Zine" */}
      {page?.ai_content && (
        <Section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto border-8 border-black p-10 md:p-20 shadow-[16px_16px_0_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform">
             <div className="prose-creative font-bold uppercase tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      {/* 3. TESTEMUNHOS - Cards Bold */}
      <Section id="testimonials" className="py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto space-y-20">
          <h2 className="text-6xl font-black uppercase text-center italic drop-shadow-[2px_2px_0_#000]">Impacto Real</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonialsData.map((t: any, i: number) => (
              <div key={i} className="p-8 bg-white border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
                <p className="text-xl font-black mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t-4 border-black">
                  <div className="font-black">
                    <p className="uppercase text-sm">{t.name}</p>
                    <p className="text-[10px] opacity-50 uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. MAPA - Estilo Brutalista */}
      <Section id="location" className="py-32 bg-white border-y-8 border-black">
        <div className="grid md:grid-cols-2 gap-20">
           <div className="space-y-10">
              <h3 className="text-6xl font-black uppercase italic leading-none">Visite nosso <br/> QG Local.</h3>
              <div className="p-8 bg-black text-white border-8 border-black inline-block">
                 <p className="font-black text-2xl italic">{brand?.address || 'São Paulo, BR'}</p>
              </div>
           </div>
           <div className="border-8 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] grayscale contrast-150">
              <iframe 
                width="100%" height="400" frameBorder="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(brand?.address || 'São Paulo')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
           </div>
        </div>
      </Section>

      {/* INTERNAL LINKING - Heavy Grid */}
      {pages && pages.length > 0 && (
        <Section id="explore" className="bg-[#eee] py-32">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {pages.map((p, i) => (
              <a 
                key={p.id} 
                href={`/${p.slug}`}
                className="p-6 bg-white border-4 border-black font-black uppercase text-center hover:bg-black hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-[8px_8px_0_rgba(0,0,0,1)]"
              >
                <p className="text-[10px] opacity-50 mb-2">{p.service_name}</p>
                <span className="text-sm italic">{p.location}</span>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* FOOTER */}
      <footer className="py-20 bg-black text-white text-center">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">{client.name}</h2>
        <p className="text-[10px] tracking-[1em] opacity-30 uppercase font-black">
          © {new Date().getFullYear()} — CREATIVE CORE
        </p>
      </footer>
    </div>
  );
};
