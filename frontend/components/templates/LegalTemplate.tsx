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

export const LegalTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Playfair Display';

  const heroData = {
    badge: `Segurança Jurídica em ${page?.location || 'sua região'}`,
    title: page?.service_name || "Advocacia de Resultados",
    titleAccent: brand?.company_name || client.name,
    description: brand?.description || page?.meta_description || "Defesa técnica especializada e compromisso inegociável com os direitos de nossos clientes.",
    ctaText: "Consultar Advogado",
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000"
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-slate-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />

      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Expertise Técnica"
            title="Sua defesa estratégica"
            subtitle="Análise profunda e soluções jurídicas personalizadas para cada caso."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader 
          badge="Nossos Pilares"
          title="Excelência Jurídica"
          subtitle="Ética, agilidade e transparência em todas as instâncias."
        />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader 
          badge="Reconhecimento"
          title="O que dizem nossos clientes"
          subtitle="A confiança depositada em nosso trabalho é nosso maior patrimônio."
        />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      <footer className="py-20 px-6 border-t border-border text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-slate-400 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 italic">
           © {new Date().getFullYear()} {client.name} — Legal Excellence
         </p>
      </footer>
    </div>
  );
};
