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

export const CreativeTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Outfit';

  const heroData = {
    badge: `Criatividade em ${page?.location || 'sua região'}`,
    title: page?.service_name || "Design que Inspira",
    titleAccent: brand?.company_name || client.name,
    description: brand?.description || page?.meta_description || "Transformamos ideias em experiências digitais memoráveis e de alto impacto visual.",
    ctaText: "Ver Projetos",
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000"
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-fuchsia-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />

      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Processo Criativo"
            title="Ideias sem limites"
            subtitle="Conheça como unimos arte e estratégia para criar o extraordinário."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader 
          badge="Inovação"
          title="O Futuro é Criativo"
          subtitle="Nossas ferramentas e mindset estão à frente do mercado."
        />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader 
          badge="Impacto"
          title="O que nossos parceiros dizem"
          subtitle="Histórias de sucesso que nasceram de grandes ideias."
        />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      <footer className="py-20 px-6 border-t border-border text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-fuchsia-500 to-indigo-500 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">
           © {new Date().getFullYear()} {client.name} — Creative Studio
         </p>
      </footer>
    </div>
  );
};
