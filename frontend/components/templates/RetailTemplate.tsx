'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { HeroSection } from '../landing/HeroSection';
import { BentoGrid } from '../landing/BentoGrid';
import { PremiumTestimonials } from '../landing/PremiumTestimonials';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';
import { ThemeToggle } from '../theme-toggle';
import { landingConfig } from '@/config/landing.config';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RetailTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Inter';

  const heroData = {
    badge: `Ofertas em ${page?.location || 'sua região'}`,
    title: page?.service_name || "Economia e Qualidade",
    titleAccent: brand?.company_name || client.name,
    description: brand?.description || page?.meta_description || "As melhores ofertas e produtos selecionados para você e sua família.",
    ctaText: "Ver Encarte",
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000"
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-red-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />

      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Destaques da Semana"
            title="Tudo o que você precisa"
            subtitle="Conheça nossa seleção exclusiva de produtos e serviços para sua casa."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader 
          badge="Por que o Varejo"
          title="Vantagens Exclusivas"
          subtitle="Preço baixo, qualidade e o melhor atendimento da região."
        />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader 
          badge="Clientes Satisfeitos"
          title="Quem economiza, aprova"
          subtitle="Veja o que os moradores da região dizem sobre nossa loja."
        />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      {/* Footer simplificado seguindo o padrão único */}
      <footer className="py-20 px-6 border-t border-border text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-red-500 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">
           © {new Date().getFullYear()} {client.name} — Retail Excellence
         </p>
      </footer>
    </div>
  );
};
