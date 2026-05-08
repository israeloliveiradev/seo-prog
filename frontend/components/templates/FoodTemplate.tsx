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

export const FoodTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Montserrat';

  const heroData = {
    badge: `Sabor Autêntico em ${page?.location || 'sua região'}`,
    title: page?.service_name || "A Melhor Gastronomia",
    titleAccent: brand?.company_name || client.name,
    description: brand?.description || page?.meta_description || "Ingredientes frescos, tempero único e uma experiência inesquecível para o seu paladar.",
    ctaText: "Ver Cardápio",
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000"
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />

      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Nossa Cozinha"
            title="Sabor que apaixona"
            subtitle="Descubra o segredo por trás de cada prato que preparamos com dedicação."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader 
          badge="Diferenciais"
          title="Por que nos escolher?"
          subtitle="Ambiente acolhedor, entrega rápida e o melhor sabor da cidade."
        />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader 
          badge="Experiências"
          title="O que nossos clientes amam"
          subtitle="Histórias reais de quem provou e se encantou com nossa gastronomia."
        />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      <footer className="py-20 px-6 border-t border-border text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">
           © {new Date().getFullYear()} {client.name} — Food Experience
         </p>
      </footer>
    </div>
  );
};
