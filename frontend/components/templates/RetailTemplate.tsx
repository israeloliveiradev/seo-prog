'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { ThemeToggle } from '../theme-toggle';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';
import { ShoppingCart, Tag, Clock, ShieldCheck } from 'lucide-react';

const FAQSection = dynamic(() => import('../landing/FAQSection').then(mod => mod.FAQSection), { ssr: true });

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RetailTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Montserrat';
  const primaryColor = brand?.primary_color || '#e11d48'; // Vermelho varejo por padrão
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      {/* 1. TOP BAR - Senso de Urgência */}
      <div style={{ backgroundColor: primaryColor }} className="py-2 text-center text-white text-[10px] font-black uppercase tracking-[0.3em]">
        Ofertas exclusivas para {page?.location} — Aproveite hoje!
      </div>

      {/* 2. HERO VAREJO - Foco em Produto e CTA */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[10px] font-bold uppercase">
              <Tag size={12} /> Melhores Preços da Região
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95]">
              {page?.service_name} <br/>
              <span style={{ color: primaryColor }}>{page?.location}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              {page?.meta_description || brand?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={`https://wa.me/${brand?.contact_whatsapp}`}
                style={{ backgroundColor: primaryColor }}
                className="px-10 py-5 rounded-xl text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl shadow-rose-500/20"
              >
                <ShoppingCart size={18} /> Chamar no WhatsApp
              </a>
              <div className="flex items-center gap-3 px-6 text-slate-400">
                <Clock size={20} /> <span className="text-[10px] font-bold uppercase">Resposta em 5 min</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-slate-200/50 rounded-[40px] -rotate-2" />
            <div className="relative bg-white border-4 border-white shadow-2xl rounded-[32px] overflow-hidden aspect-video">
               <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800'} className="w-full h-full object-cover" alt="Retail" />
            </div>
          </div>
        </div>
      </header>

      {/* 3. CONTEÚDO IA - Grid de Benefícios */}
      {page?.ai_content && (
        <Section className="bg-white">
          <div className="max-w-4xl mx-auto">
             <div className="prose prose-rose max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      {/* 4. TRUST BADGES */}
      <div className="bg-slate-900 text-white py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: ShieldCheck, title: "Garantia Total", desc: "Segurança no serviço" },
             { icon: Tag, title: "Menor Preço", desc: "Cobrimos orçamentos" },
             { icon: Clock, title: "Rápido", desc: "Atendimento imediato" },
             { icon: ShoppingCart, title: "Completo", desc: "Tudo que você precisa" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 group">
               <div style={{ color: primaryColor }} className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                 <item.icon size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest">{item.title}</p>
                 <p className="text-[9px] text-white/40 uppercase">{item.desc}</p>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* 5. LOCALIZAÇÃO - Foco no Mapa */}
      <Section id="location" className="bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-center">
           <div className="lg:col-span-1 space-y-6">
              <h3 className="text-4xl font-black uppercase italic leading-none">Estamos pertinho <br/> de você.</h3>
              <p className="text-slate-500 font-medium">Venha nos visitar ou solicite atendimento domiciliar em toda a região de {page?.location}.</p>
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                 <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Endereço</p>
                 <p className="font-bold">{brand?.address || 'Consulte localização via WhatsApp'}</p>
              </div>
           </div>
           <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <iframe 
                width="100%" height="100%" frameBorder="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(brand?.address || 'São Paulo')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
           </div>
        </div>
      </Section>

      {/* 6. INTERNAL LINKING - Cartões de Categoria */}
      {pages && pages.length > 0 && (
        <Section id="explore" className="bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              badge="Nossas Filiais"
              title="Atendimento Regional"
              subtitle="Encontre a unidade mais próxima de você para um atendimento imediato."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {pages.map((p, i) => (
                <a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group"
                >
                  <p style={{ color: primaryColor }} className="text-[10px] font-black uppercase mb-4 opacity-50 group-hover:opacity-100">{p.service_name}</p>
                  <span className="text-lg font-black uppercase italic tracking-tighter">{p.location}</span>
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* FOOTER VAREJO */}
      <footer className="py-20 bg-slate-900 text-white text-center border-t border-white/5">
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">{client.name}</h2>
          <div className="flex justify-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">W</div>
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">I</div>
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">F</div>
          </div>
          <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-bold">
            © {new Date().getFullYear()} — Varejo Inteligente
          </p>
        </div>
      </footer>
    </div>
  );
};
