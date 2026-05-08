'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { ShieldCheck, Zap, Globe, CreditCard, ChevronRight } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const StripeTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#635bff'; // Roxo Stripe original
  
  return (
    <div className="bg-white text-[#424770] font-sans selection:bg-[#635bff]/20 overflow-hidden">
      <GoogleFontsLoader fontFamily="Inter" />
      
      {/* STRIPE MESH GRADIENT HEADER */}
      <div className="relative pt-32 pb-48 px-6 bg-[#f6f9fc] -skew-y-6 origin-top-left overflow-hidden">
        <div className="absolute inset-0 skew-y-6 origin-top-left">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#635bff] via-[#80e9ff] to-[#f6f9fc] opacity-10 blur-[100px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto skew-y-6 origin-top-left relative z-10 grid lg:grid-cols-2 gap-20 items-center"
        >
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#0a2540] leading-none">
               {page?.service_name} <br/>
               <span style={{ color: primaryColor }}>{page?.location}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#424770] font-medium leading-relaxed max-w-xl">
               A infraestrutura completa para {page?.service_name.toLowerCase()} de alto nível na sua região. 
               Focado em resultados e performance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="h-12 px-8 flex items-center justify-center rounded-full text-white font-black uppercase tracking-widest text-[10px] hover:brightness-110 shadow-xl shadow-indigo-500/20 transition-all"
               >
                 Começar agora <ChevronRight size={14} className="ml-2" />
               </a>
               <button className="h-12 px-8 flex items-center justify-center rounded-full bg-[#f6f9fc] border border-[#d8e2ef] text-[#0a2540] font-black uppercase tracking-widest text-[10px] hover:bg-[#eef3f8] transition-all">
                 Saiba mais
               </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
             <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border border-[#e6ebf1] overflow-hidden">
                <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'} className="w-full h-full object-cover" alt="Hero" />
             </div>
          </div>
        </motion.div>
      </div>

      {/* TRUST SECTION */}
      <Section className="py-20 bg-white relative z-10 -mt-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-[#e6ebf1] pb-12">
               {[
                 { icon: ShieldCheck, title: "Segurança", desc: "Processos certificados" },
                 { icon: Zap, title: "Velocidade", desc: "Resposta em minutos" },
                 { icon: Globe, title: "Escala", desc: "Toda a região" },
                 { icon: CreditCard, title: "Transparência", desc: "Sem taxas ocultas" }
               ].map((item, i) => (
                 <div key={i} className="space-y-4">
                    <div style={{ color: primaryColor }}>
                       <item.icon size={28} />
                    </div>
                    <h3 className="text-lg font-black text-[#0a2540]">{item.title}</h3>
                    <p className="text-sm text-[#424770]">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </Section>

      {/* IA CONTENT */}
      {page?.ai_content && (
        <Section className="py-32 bg-white">
           <div className="max-w-4xl mx-auto px-6">
              <div className="prose prose-indigo max-w-none prose-headings:font-black prose-headings:text-[#0a2540] prose-p:text-lg" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
           </div>
        </Section>
      )}

      {/* FOOTER STRIPE STYLE */}
      <footer className="py-32 bg-[#f6f9fc] border-t border-[#e6ebf1]">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-20">
            <div className="md:col-span-1 space-y-6">
               <h2 className="text-2xl font-black text-[#0a2540] italic tracking-tighter">{client.name}</h2>
               <p className="text-sm">Infraestrutura completa de serviços para sua localidade.</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0a2540]">Links Úteis</h4>
               <ul className="text-sm space-y-2">
                  <li className="hover:text-[#635bff] cursor-pointer">Início</li>
                  <li className="hover:text-[#635bff] cursor-pointer">Sobre</li>
                  <li className="hover:text-[#635bff] cursor-pointer">Contato</li>
               </ul>
            </div>
            <div className="md:col-span-2 flex flex-col items-end justify-end">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#0a2540] opacity-40">
                  © {new Date().getFullYear()} — Todos os direitos reservados.
               </p>
            </div>
         </div>
      </footer>
    </div>
  );
};
