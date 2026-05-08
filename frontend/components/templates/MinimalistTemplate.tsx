'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { ThemeToggle } from '../theme-toggle';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';

const FAQSection = dynamic(() => import('../landing/FAQSection').then(mod => mod.FAQSection), { ssr: true });

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Inter';
  
  const testimonialsData = brand?.testimonials?.length > 0
    ? brand.testimonials
    : [
        { name: brand?.company_name || client.name, role: "Cliente", content: "Excelência e simplicidade definem o serviço. Fomos atendidos com total profissionalismo." }
      ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-8 right-8 z-[100]">
        <ThemeToggle />
      </div>

      {/* 1. HERO MINIMALISTA - Tipografia Gigante */}
      <header className="min-h-screen flex flex-col items-center justify-center px-6 text-center max-w-6xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] font-medium text-gray-400 block mb-4">
            {brand?.company_name || 'Premium Service'}
          </span>
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-[0.85] text-slate-900">
            {page?.service_name} <br />
            <span className="font-serif italic font-normal text-slate-400">em {page?.location}</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl font-light text-slate-500 max-w-2xl leading-relaxed mt-16"
        >
          {page?.meta_description || brand?.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="group relative inline-flex items-center gap-6 px-16 py-8 border border-slate-200 hover:border-black transition-all duration-700"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold">Solicitar Orçamento</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </a>
        </motion.div>
      </header>

      {/* 2. CONTEÚDO IA - Estilo Artigo de Luxo */}
      {page?.ai_content && (
        <Section className="py-40 bg-slate-50/50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto">
             <div className="prose prose-slate prose-xl font-light leading-loose" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      {/* 3. TESTEMUNHOS - Minimal List */}
      <Section id="testimonials" className="py-40">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300 mb-20 text-center">Reconhecimento</p>
          <div className="grid md:grid-cols-2 gap-32">
            {testimonialsData.map((t: any, i: number) => (
              <div key={i} className="space-y-10">
                <p className="text-3xl font-light leading-tight text-slate-700 italic">"{t.content}"</p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-slate-300" />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black text-slate-900">{t.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. MAPA - Full Clean */}
      <Section id="location" className="py-40 border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <h2 className="text-5xl font-light tracking-tighter">Onde você <br/><span className="text-slate-400 italic font-serif">pode nos encontrar.</span></h2>
            <p className="text-slate-400 font-light max-w-xs">{brand?.address || 'Atendimento exclusivo na região de ' + page?.location}</p>
          </div>
          <div className="h-[500px] w-full grayscale border border-slate-100 shadow-sm overflow-hidden">
            <iframe 
              width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(brand?.address || 'São Paulo')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </Section>

      {/* 5. INTERNAL LINKING - Grid Sofisticado */}
      {pages && pages.length > 0 && (
        <Section id="explore" className="bg-slate-950 text-white py-40">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-light tracking-tighter mb-20">Nossa presença <br/><span className="text-slate-500 italic font-serif">na região.</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
              {pages.map((p, i) => (
                <a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  className="group block space-y-4"
                >
                  <p className="text-[9px] uppercase tracking-[0.5em] text-slate-600 group-hover:text-white transition-colors">{p.service_name}</p>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 group-hover:border-white transition-colors">
                    <span className="text-lg font-light tracking-tight">{p.location}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* FOOTER */}
      <footer className="py-32 text-center bg-white">
        <div className="space-y-8">
          <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-slate-900">{client.name}</h2>
          <div className="w-8 h-px bg-slate-200 mx-auto" />
          <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase font-light italic">
            © {new Date().getFullYear()} — Programmatic Identity
          </p>
        </div>
      </footer>
    </div>
  );
};
