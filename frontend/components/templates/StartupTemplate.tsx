'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Rocket, Zap, Heart, TrendingUp, ArrowRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const StartupTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#6366f1'; // Indigo Startup
  
  return (
    <div className="bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      <GoogleFontsLoader fontFamily="Outfit" />
      
      {/* HERO STARTUP - HIGH ENERGY */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
               <Rocket size={14} /> Lançamento em {page?.location}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]">
               O futuro do <br/>
               <span style={{ color: primaryColor }}>{page?.service_name}</span> <br/>
               chegou aqui.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
               {page?.meta_description || brand?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="h-16 px-10 flex items-center justify-center rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:scale-105 hover:rotate-1 transition-all shadow-xl shadow-indigo-500/20"
               >
                 Testar Agora <ArrowRight size={18} className="ml-2" />
               </a>
               <div className="flex items-center gap-4 px-6">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />
                     ))}
                  </div>
                  <span className="text-xs font-bold text-slate-400">Junte-se a 500+ em {page?.location}</span>
               </div>
            </div>
          </motion.div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/10 rounded-[40px] blur-3xl -z-10" />
             <div className="bg-white p-6 rounded-[40px] shadow-2xl border border-slate-100 relative group overflow-hidden">
                <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800'} className="w-full h-[500px] object-cover rounded-[32px] group-hover:scale-110 transition-transform duration-1000" alt="Startup" />
                <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 space-y-2 animate-bounce">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white">
                      <Zap size={24} fill="white" />
                   </div>
                   <p className="text-xs font-black uppercase tracking-widest">+99% Eff.</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. STATS GRID */}
      <Section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
               { icon: TrendingUp, val: "10x", label: "Mais Rápido" },
               { icon: Heart, val: "24/7", label: "Suporte Real" },
               { icon: Zap, val: "0ms", label: "Latência" },
               { icon: Rocket, val: "100%", label: "Cloud Native" }
            ].map((stat, i) => (
               <div key={i} className="text-center space-y-2">
                  <div style={{ color: primaryColor }} className="flex justify-center mb-4">
                     <stat.icon size={32} />
                  </div>
                  <div className="text-4xl font-black tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
               </div>
            ))}
         </div>
      </Section>

      {/* 3. IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 bg-slate-50">
           <div className="max-w-4xl mx-auto px-6">
              <div className="prose prose-indigo max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-lg" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER STARTUP */}
      <footer className="py-24 border-t border-slate-100 text-center px-6">
         <div className="max-w-xl mx-auto space-y-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">{client.name}</h2>
            <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span className="hover:text-indigo-500 cursor-pointer transition-colors">Manifesto</span>
               <span className="hover:text-indigo-500 cursor-pointer transition-colors">Vagas</span>
               <span className="hover:text-indigo-500 cursor-pointer transition-colors">Press</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">
               Building the future of {page?.location} • {new Date().getFullYear()}
            </p>
         </div>
      </footer>
    </div>
  );
};
