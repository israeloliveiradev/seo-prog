'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { HeroSection } from './landing/HeroSection';
import { BentoGrid } from './landing/BentoGrid';
import { PremiumTestimonials } from './landing/PremiumTestimonials';
import { SectionHeader } from './landing/SectionHeader';
import { Section } from './landing/Section';
import { ThemeToggle } from '../theme-toggle';
import { landingConfig } from '@/config/landing.config';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RealEstateTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Playfair Display';

  const heroData = {
    badge: `Imóveis Exclusivos em ${page?.location || 'sua região'}`,
    title: page?.service_name || "O Lar dos Seus Sonhos",
    titleAccent: brand?.company_name || client.name,
    description: brand?.description || page?.meta_description || "Encontre o imóvel perfeito com curadoria especializada e atendimento personalizado de alto nível.",
    ctaText: "Ver Imóveis",
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-amber-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />

      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Consultoria"
            title="Sua melhor escolha"
            subtitle="Expertise de mercado e portfólio selecionado para o seu próximo grande passo."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader 
          badge="Exclusivo"
          title="Por que investir conosco?"
          subtitle="Segurança, valorização e as melhores oportunidades do mercado imobiliário."
        />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader 
          badge="Relatos"
          title="Clientes realizados"
          subtitle="A felicidade de quem encontrou o lugar ideal para viver ou investir."
        />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      <footer className="py-20 px-6 border-t border-border text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-amber-600 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">
           © {new Date().getFullYear()} {client.name} — Luxury Real Estate
         </p>
      </footer>
    </div>
  );
};
