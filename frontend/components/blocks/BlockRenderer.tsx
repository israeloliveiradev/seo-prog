'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../landing/Section';
import { SectionHeader } from '../landing/SectionHeader';
import { Check, Star, Zap, Shield, Smartphone, Globe, Box, Info, LayoutGrid, Users, Trophy, CreditCard, ArrowRight, ChevronDown } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../landing/BentoGrid';

const IconMap: Record<string, any> = {
  zap: Zap,
  shield: Shield,
  phone: Smartphone,
  globe: Globe,
  box: Box,
  info: Info,
  star: Star,
  check: Check,
  grid: LayoutGrid,
  users: Users,
  trophy: Trophy,
  card: CreditCard
};

// --- BLOCO 1: HERO ADAPTATIVO ---
export const HeroBlock = ({ data, brand }: any) => {
  const isGlass = brand.design_mode === 'glass';
  const isCyber = brand.design_mode === 'cyber';
  
  return (
    <header className="pt-32 pb-20 px-6 text-center lg:text-left overflow-hidden relative">
      {/* Background Organic Shape */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
             {data.badge || 'Novidade'}
          </div>
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] md:text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter leading-[0.95] md:leading-[0.85] uppercase italic" style={{ fontFamily: 'var(--font-sans)', color: isCyber ? 'white' : 'var(--foreground)' }}>
            {data.title}
          </h1>
          <p className="text-xl opacity-60 font-medium leading-relaxed max-w-xl">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <a 
              href={data.ctaLink || '#'} 
              style={{ 
                backgroundColor: brand.primary_color, 
                borderRadius: brand.border_radius,
                boxShadow: isCyber ? `0 0 20px ${brand.primary_color}66` : 'var(--shadow-xl)'
              }} 
              className="h-16 px-10 flex items-center justify-center text-white font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
             >
               {data.ctaText || brand.cta_text || 'Falar com Especialista'}
               <ArrowRight size={16} className="ml-2" />
             </a>
          </div>
        </motion.div>
        <div className="relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <img 
            src={data.imageUrl || brand.hero_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200'} 
            className="w-full h-[550px] object-cover relative z-10 transition-transform duration-700 group-hover:scale-[1.02]" 
            style={{ 
              borderRadius: brand.border_radius,
              boxShadow: 'var(--shadow-xl)',
              clipPath: brand.design_mode === 'luxury' ? 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' : 'none'
            }} 
            alt="Hero" 
           />
        </div>
      </div>
    </header>
  );
};

// --- BLOCO 2: ESPECIFICAÇÕES TÉCNICAS ---
export const SpecsBlock = ({ data, brand }: any) => {
  const isCyber = brand.design_mode === 'cyber';
  return (
    <Section style={{ backgroundColor: isCyber ? '#0a0a0f' : 'transparent' }}>
       <SectionHeader 
        title={data.title || "Especificações Técnicas"} 
        subtitle={data.subtitle || "Tudo o que você precisa saber sobre o produto."} 
       />
       <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.items || []).map((item: any, i: number) => (
             <div 
              key={i} 
              className={`flex justify-between p-6 border transition-all ${
                isCyber ? 'bg-white/5 border-white/10 text-white' : 'bg-background border-border shadow-sm'
              }`} 
              style={{ borderRadius: 'var(--border-radius)' }}
             >
                <span className={`font-black uppercase tracking-widest text-[10px] ${isCyber ? 'text-indigo-400' : 'text-muted-foreground'}`}>{item.label}</span>
                <span className="font-bold">{item.value}</span>
             </div>
          ))}
       </div>
    </Section>
  );
};

// --- BLOCO 3: GALERIA ---
export const GalleryBlock = ({ data, brand }: any) => {
  const isCyber = brand.design_mode === 'cyber';
  return (
    <Section>
       <SectionHeader 
        title={data.title || "Nossos Destaques"} 
        subtitle={data.subtitle || "Confira o que temos de melhor para oferecer."} 
       />
       <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.items || []).map((item: any, i: number) => (
             <div 
              key={i} 
              className={`group overflow-hidden border transition-all hover:-translate-y-2 ${
                isCyber ? 'bg-white/5 border-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : 'bg-background border-border shadow-sm hover:shadow-xl'
              }`} 
              style={{ borderRadius: 'var(--border-radius)' }}
             >
                <div className="aspect-square overflow-hidden relative">
                   <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 space-y-2">
                   <h4 className="text-xl font-black tracking-tight">{item.title}</h4>
                   <p className={`text-sm font-medium ${isCyber ? 'text-white/40' : 'text-muted-foreground'}`}>{item.description}</p>
                   {item.price && <p className="text-lg font-black pt-2" style={{ color: 'var(--primary)' }}>{item.price}</p>}
                </div>
             </div>
          ))}
       </div>
    </Section>
  );
};

// --- BLOCO 4: TABELA DE PREÇOS / PLANOS ---
export const PricingBlock = ({ data, brand }: any) => {
  const isGlass = brand.design_mode === 'glass';
  const isCyber = brand.design_mode === 'cyber';

  return (
    <Section className={isCyber ? 'bg-[#0a0a0f]' : 'bg-slate-50/50'}>
       <SectionHeader title={data.title || "Nossos Planos"} subtitle={data.subtitle || "Escolha a melhor opção para você."} />
       <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(data.items || []).map((item: any, i: number) => (
             <div 
              key={i} 
              className={`p-8 flex flex-col h-full relative transition-all hover:-translate-y-2 ${
                isGlass ? 'bg-white/5 backdrop-blur-xl border-white/10' : 
                isCyber ? 'bg-white/5 border-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]' :
                'bg-white border-slate-100 shadow-sm'
              }`} 
              style={{ 
                borderRadius: brand.border_radius,
                boxShadow: (isGlass || isCyber) ? 'none' : 'var(--shadow-xl)'
              }}
             >
                {item.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full" style={{ backgroundColor: brand.primary_color }}>
                    Mais Popular
                  </div>
                )}
                <div className="mb-8">
                   <h4 className="text-sm font-black uppercase tracking-widest opacity-40 mb-2">{item.name}</h4>
                   <p className="text-5xl font-black italic tracking-tighter">{item.price}</p>
                   <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">{item.period || 'por mês'}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                   {(item.features || []).map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80">
                         <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check size={12} />
                         </div> 
                         {f}
                      </li>
                   ))}
                </ul>
                <button className="w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02]" style={{ backgroundColor: brand.primary_color, borderRadius: brand.border_radius }}>
                   Contratar Agora
                </button>
             </div>
          ))}
       </div>
    </Section>
  );
};

// --- BLOCO 5: LOGOS DE CONFIANÇA (Social Proof) ---
export const TrustBlock = ({ data, brand }: any) => {
  return (
    <div className="py-12 border-y border-slate-100 bg-white">
       <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-slate-300 mb-8">{data.title || 'Empresas que confiam em nós'}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
             {(data.items || []).map((item: any, i: number) => (
                <img key={i} src={item.imageUrl} alt="Partner" className="h-6 md:h-8 w-auto" />
             ))}
          </div>
       </div>
    </div>
  );
};
// --- BLOCO 6: PERGUNTAS FREQUENTES (FAQ) ---
export const FAQBlock = ({ data, brand }: any) => {
  return (
    <Section className="bg-white">
       <SectionHeader title={data.title || "Perguntas Frequentes"} subtitle={data.subtitle || "Tudo o que você precisa saber."} />
       <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {(data.items || []).map((item: any, i: number) => (
             <details key={i} className="group p-6 bg-slate-50 border border-slate-100 open:bg-white open:shadow-xl transition-all" style={{ borderRadius: brand.border_radius }}>
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                   <span className="text-lg">{item.title}</span>
                   <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-500 leading-relaxed text-sm">{item.description}</p>
             </details>
          ))}
       </div>
    </Section>
  );
};

// --- BLOCO 7: BENTO GRID ---
export const BentoGridBlock = ({ data, brand }: any) => {
  return (
    <Section style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
       <SectionHeader title={data.title || "Vantagens"} subtitle={data.subtitle || "Por que nos escolher?"} />
       <div className="max-w-7xl mx-auto mt-12">
          <BentoGrid>
             {(data.items || []).map((item: any, i: number) => {
                const Icon = IconMap[item.icon || 'zap'] || Zap;
                return (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header || <div className="h-full w-full bg-slate-100/50 rounded-xl" />}
                    icon={<Icon size={24} className="text-primary" style={{ color: brand.primary_color }} />}
                    className={item.className || (i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1")}
                    color={item.color || brand.primary_color}
                  />
                );
             })}
          </BentoGrid>
       </div>
    </Section>
  );
};

export const BlockRenderer = ({ layout, sectionsData, brand, page }: any) => {
  if (!layout || layout.length === 0) return null;

  return (
    <div className="modular-engine" style={{ '--primary-color': brand.primary_color } as any}>
      {layout.map((blockId: string, index: number) => {
        const blockData = sectionsData?.[blockId] || {};
        
        switch (blockData.type) {
          case 'hero':
            return (
              <HeroBlock 
                key={index} 
                data={{ 
                  ...blockData, 
                  title: blockData.title || page?.service_name, 
                  description: blockData.description || page?.meta_description 
                }} 
                brand={brand} 
              />
            );
          case 'specs':
            return <SpecsBlock key={index} data={blockData} brand={brand} />;
          case 'gallery':
            return <GalleryBlock key={index} data={blockData} brand={brand} />;
          case 'pricing':
            return <PricingBlock key={index} data={blockData} brand={brand} />;
          case 'trust':
            return <TrustBlock key={index} data={blockData} brand={brand} />;
          case 'faq':
            return <FAQBlock key={index} data={blockData} brand={brand} />;
          case 'bento':
            return <BentoGridBlock key={index} data={blockData} brand={brand} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
