'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Leaf, Heart, Sun, Wind } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const OrganicSoftTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#86a789'; // Verde menta suave
  
  return (
    <div className="bg-[#fcfaf7] text-[#4a4947] font-sans selection:bg-[#86a789]/20 overflow-hidden">
      <GoogleFontsLoader fontFamily="Outfit" />
      
      {/* BACKGROUND DECORATIVE BLOBS */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
         <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#d2e3c8] rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#ebf3e8] rounded-full blur-[100px]" />
      </div>

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 px-6 text-center">
         <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto space-y-8"
         >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#86a789] text-xs font-bold shadow-sm border border-[#ebf3e8]">
               <Leaf size={14} /> Naturalmente de {page?.location}
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-[#4a4947] leading-[1.1]">
               Cuidando de você <br/>
               <span style={{ color: primaryColor }} className="italic font-normal serif">com leveza.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#7a7977] max-w-2xl mx-auto font-medium">
               {page?.meta_description || brand?.description}
            </p>
            <div className="pt-6 flex justify-center gap-4">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="px-10 py-5 rounded-full text-white font-black uppercase tracking-widest text-xs hover:shadow-xl hover:scale-105 transition-all"
               >
                 Agendar Agora
               </a>
            </div>
         </motion.div>
      </header>

      {/* FEATURE SECTION - ROUNDED CARDS */}
      <Section className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            {[
               { icon: Heart, title: "Cuidado", desc: "Atenção plena em cada detalhe." },
               { icon: Sun, title: "Energia", desc: "Revitalize seus dias com a gente." },
               { icon: Wind, title: "Leveza", desc: "Processos sem estresse." },
               { icon: Leaf, title: "Puro", desc: "Ingredientes e métodos limpos." }
            ].map((item, i) => (
               <div key={i} className="p-10 bg-white rounded-[48px] shadow-sm hover:shadow-lg transition-all text-center space-y-4 border border-[#f5f5f5]">
                  <div style={{ color: primaryColor }} className="w-16 h-16 bg-[#fcfaf7] rounded-full mx-auto flex items-center justify-center">
                     <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="text-sm text-[#7a7977]">{item.desc}</p>
               </div>
            ))}
         </div>
      </Section>

      {/* IA CONTENT WITH CURVED DECORATION */}
      {page?.ai_content && (
        <Section className="py-32 relative">
           <div className="max-w-4xl mx-auto px-6 relative z-10">
              <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-sm border border-[#f5f5f5]">
                 <div className="prose prose-stone max-w-none prose-headings:font-black prose-p:text-lg" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
              </div>
           </div>
        </Section>
      )}

      {/* FOOTER ORGANIC */}
      <footer className="py-24 bg-[#ebf3e8]/30 text-center px-6 border-t border-[#ebf3e8]">
         <div className="max-w-xl mx-auto space-y-10">
            <h2 className="text-3xl font-black tracking-tight">{client.name}</h2>
            <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-[#7a7977]">
               <span className="hover:text-black cursor-pointer">Nossa História</span>
               <span className="hover:text-black cursor-pointer">Sustentabilidade</span>
               <span className="hover:text-black cursor-pointer">Contato</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">
               Feito com amor em {page?.location} • {new Date().getFullYear()}
            </p>
         </div>
      </footer>
    </div>
  );
};
