'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Shield, Award, Briefcase, BarChart } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#1e3a8a'; // Azul Marinho Corporativo
  
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-hidden">
      <GoogleFontsLoader fontFamily="Inter" />
      
      {/* 1. TOP NAVBAR SIMULATION (PREMIUM) */}
      <div className="bg-slate-900 text-white py-3 px-6 text-[10px] font-bold uppercase tracking-[0.2em] flex justify-between items-center">
         <div className="flex gap-6">
            <span>Matriz: São Paulo</span>
            <span>Unidade: {page?.location}</span>
         </div>
         <div className="hidden md:block">Segunda a Sexta: 08h às 18h</div>
      </div>

      {/* 2. HERO -权威 STYLE */}
      <header className="relative py-24 md:py-40 px-6 bg-slate-50 border-b border-slate-200">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
               <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
                  Excelência e <br/>
                  <span style={{ color: primaryColor }}>Autoridade Legal.</span>
               </h1>
               <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-blue-900 pl-8 italic font-medium">
                  {page?.meta_description || brand?.description}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={`https://wa.me/${brand?.contact_whatsapp}`}
                    style={{ backgroundColor: primaryColor }}
                    className="h-14 px-10 flex items-center justify-center text-white font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-lg shadow-blue-900/20"
                  >
                    Agendar Consultoria
                  </a>
               </div>
            </motion.div>
            <div className="relative">
               <div className="absolute inset-0 bg-blue-900/10 rounded-2xl -rotate-3" />
               <div className="relative bg-white p-4 shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
                  <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800'} className="w-full h-[400px] object-cover" alt="Corporate" />
               </div>
            </div>
         </div>
      </header>

      {/* 3. TRUST INDICATORS */}
      <div className="py-16 bg-white border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
               { icon: Shield, title: "Segurança Jurídica", val: "Compromisso Total" },
               { icon: Award, title: "Certificações", val: "Nacionais e Internacionais" },
               { icon: Briefcase, title: "Expertise", val: "Anos de Mercado" },
               { icon: BarChart, title: "Resultados", val: "Performance Provada" }
            ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center space-y-3">
                  <div style={{ color: primaryColor }} className="p-3 bg-slate-50 rounded-full">
                     <item.icon size={24} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">{item.title}</h4>
                  <p className="font-bold text-sm text-slate-800">{item.val}</p>
               </div>
            ))}
         </div>
      </div>

      {/* 4. IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 bg-white">
           <div className="max-w-4xl mx-auto px-6">
              <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:uppercase" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER CORPORATE */}
      <footer className="bg-slate-900 text-white py-24 px-6">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-20">
            <div className="space-y-6">
               <h2 className="text-3xl font-black tracking-tighter uppercase italic">{client.name}</h2>
               <p className="text-slate-400 text-sm leading-relaxed">Referência em {page?.service_name.toLowerCase()} em toda a localidade de {page?.location}. Compromisso com a verdade e resultados.</p>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Compliance</h4>
               <ul className="text-sm space-y-3 text-slate-400">
                  <li className="hover:text-white cursor-pointer">Termos de Uso</li>
                  <li className="hover:text-white cursor-pointer">Política de Privacidade</li>
                  <li className="hover:text-white cursor-pointer">Ética e Conduta</li>
               </ul>
            </div>
            <div className="flex flex-col justify-end items-end space-y-4">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Registrado em {page?.location}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">© {new Date().getFullYear()} — Corporate Group</p>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
