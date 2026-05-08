'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { CreditCard, Smartphone, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const FintechTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#000000'; 
  
  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      <GoogleFontsLoader fontFamily="Outfit" />
      
      {/* 1. HERO FINTECH - HIGH CONTRAST */}
      <header className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Digital First • {page?.location}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              {page?.service_name} <br/>
              <span className="opacity-20">Inteligente.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl">
               {page?.meta_description || brand?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                className="h-16 px-10 flex items-center justify-center rounded-2xl bg-black text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl"
               >
                 Abrir Chamado <ArrowRight size={18} className="ml-2" />
               </a>
               <div className="flex items-center gap-4 px-6 text-slate-400">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />
                     ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">+1k Clientes</span>
               </div>
            </div>
          </motion.div>
          
          <div className="relative flex justify-center lg:justify-end">
             <div className="absolute inset-0 bg-slate-100 rounded-[60px] rotate-3 -z-10" />
             <div className="w-[300px] h-[600px] bg-black rounded-[50px] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden relative">
                <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600'} className="w-full h-full object-cover opacity-80" alt="App" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-8 space-y-4">
                   <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-md" />
                   <div className="h-4 w-3/4 bg-white/40 rounded-full" />
                   <div className="h-4 w-1/2 bg-white/20 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. CARD SECTION */}
      <Section className="bg-slate-50 py-32">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
               { icon: Smartphone, title: "Mobile Ready", desc: "Tudo na palma da sua mão com agilidade total." },
               { icon: ShieldCheck, title: "Total Trust", desc: "Segurança de nível bancário em cada serviço." },
               { icon: Zap, title: "Fast Action", desc: "Otimizado para velocidade e eficiência local." }
            ].map((item, i) => (
               <div key={i} className="p-10 bg-white rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                     <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="text-slate-500 font-medium">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 bg-white">
           <div className="max-w-4xl mx-auto px-6">
              <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER FINTECH STYLE */}
      <footer className="py-24 bg-black text-white px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">{client.name}</h2>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
               <span className="hover:text-white cursor-pointer transition-colors">Termos</span>
               <span className="hover:text-white cursor-pointer transition-colors">Privacidade</span>
               <span className="hover:text-white cursor-pointer transition-colors">Segurança</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
               © {new Date().getFullYear()} — Future of Service.
            </p>
         </div>
      </footer>
    </div>
  );
};
