'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Check, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const AppleTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#0071e3';
  const borderRadius = brand?.border_radius || '2.5rem';
  const fontSans = brand?.font_family || 'Inter';
  
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-blue-200">
      <GoogleFontsLoader fontFamily={fontSans} />
      
      {/* HERO MINIMALISTA APPLE STYLE */}
      <header className="pt-32 pb-20 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05]">
            {page?.service_name} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black/80 to-black/40">{page?.location}</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] font-medium max-w-2xl mx-auto">
            {page?.meta_description || brand?.description}
          </p>
          <div className="flex justify-center gap-8 pt-8">
            <a 
              href={`https://wa.me/${brand?.contact_whatsapp}`} 
              style={{ color: primaryColor, borderRadius: borderRadius }} 
              className="font-bold flex items-center gap-1 hover:underline text-lg group"
            >
              {brand?.cta_text || 'Solicitar Agora'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </header>

      {/* BENTO GRID SECTIONS */}
      <Section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
          
          {/* Main Bento Card */}
          <div 
            style={{ borderRadius: borderRadius }}
            className="md:col-span-2 md:row-span-2 bg-white p-12 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-black/5 relative group"
          >
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Destaque</span>
              <h2 className="text-4xl font-black tracking-tight">{page?.service_name} com perfeição absoluta.</h2>
              <p className="text-[#86868b] max-w-sm">Utilizamos tecnologia de ponta para garantir o melhor resultado em cada detalhe do serviço.</p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#f5f5f7] rounded-full group-hover:scale-110 transition-transform duration-700" />
            <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800'} className="relative z-10 w-full h-48 object-cover rounded-2xl mt-12 shadow-2xl" alt="Feature" />
          </div>

          {/* Small Bento Cards */}
          <div style={{ borderRadius: borderRadius }} className="bg-white p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-sm border border-black/5">
            <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center">
              <Zap style={{ color: primaryColor }} />
            </div>
            <h3 className="font-bold text-lg leading-tight">Velocidade <br/> Extrema</h3>
          </div>

          <div style={{ borderRadius: borderRadius }} className="bg-white p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-sm border border-black/5">
            <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center">
              <Shield style={{ color: primaryColor }} />
            </div>
            <h3 className="font-bold text-lg leading-tight">Segurança <br/> Certificada</h3>
          </div>

          {/* Horizontal Bento Card */}
          <div style={{ borderRadius: borderRadius }} className="md:col-span-2 bg-white p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-black/5">
             <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black">Disponível em toda {page?.location}</h3>
                <p className="text-[#86868b] text-sm">Cobertura completa com unidades móveis equipadas.</p>
             </div>
             <div className="w-32 h-32 rounded-3xl bg-black flex items-center justify-center text-white font-black text-3xl">
                {page?.location?.[0]}
             </div>
          </div>

        </div>
      </Section>

      {/* IA CONTENT SECTION */}
      {page?.ai_content && (
        <Section className="bg-white py-32 border-t border-black/5">
          <div className="max-w-4xl mx-auto px-6">
             <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-lg prose-p:text-[#86868b]" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      {/* CTA FINAL */}
      <footer className="py-40 bg-[#f5f5f7] text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">Pronto para começar?</h2>
        <a 
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          style={{ backgroundColor: primaryColor }}
          className="inline-flex h-16 px-12 items-center justify-center rounded-full text-white font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-2xl shadow-blue-500/20 transition-all"
        >
          Falar com Especialista
        </a>
      </footer>
    </div>
  );
};
