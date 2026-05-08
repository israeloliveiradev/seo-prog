'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { HeroSection } from '../landing/HeroSection';
import { BentoGrid } from '../landing/BentoGrid';
import { PremiumTestimonials } from '../landing/PremiumTestimonials';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';
import { landingConfig } from '@/config/landing.config';

import { ThemeToggle } from '../theme-toggle';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const ModernTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Inter';

  // Merge database data with config defaults
  const heroData = {
    badge: brand?.company_name || landingConfig.hero.badge,
    title: page?.service_name || landingConfig.hero.title,
    titleAccent: `em ${page?.location || 'sua região'}`,
    description: brand?.description || page?.meta_description || landingConfig.hero.description,
    ctaText: landingConfig.hero.ctaText,
    ctaLink: `https://wa.me/${brand?.contact_whatsapp}`,
    imageUrl: brand?.hero_image || landingConfig.hero.imageUrl
  };

  const testimonialsData = brand?.testimonials?.length > 0 
    ? brand.testimonials 
    : landingConfig.testimonials.items;

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      {/* Premium Hero */}
      <HeroSection {...heroData} />

      {/* IA Content Section (The core of programmatic SEO) */}
      {page?.ai_content && (
        <Section className="pt-0">
          <SectionHeader 
            badge="Conteúdo Exclusivo"
            title="Especialistas no Assunto"
            subtitle="Conheça nossa abordagem detalhada e técnica para garantir o melhor resultado."
          />
          <div className="max-w-4xl mx-auto">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      {/* Bento Grid Features */}
      <Section id="features" dark>
        <SectionHeader {...landingConfig.features.header} />
        <BentoGrid items={landingConfig.features.items} />
      </Section>

      {/* Social Proof */}
      <Section id="testimonials">
        <SectionHeader {...landingConfig.testimonials.header} />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      {/* Map & Location */}
      <Section id="location" dark>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-10">
              <SectionHeader 
                align="left"
                badge="Onde Estamos"
                title={`Atendimento Local em ${page?.location}`}
                subtitle="Nossa base física garante a segurança e proximidade que você precisa."
              />
              <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
                 <p className="text-sm font-black uppercase tracking-widest text-white/30">Endereço Principal</p>
                 <p className="text-xl md:text-2xl font-black italic text-white">{brand?.address || 'Consulte nossa localização'}</p>
              </div>
           </div>
           <div className="h-[400px] md:h-[600px] bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src={publicMapUrl} 
                className="grayscale invert opacity-50 contrast-125 hover:opacity-100 transition-opacity duration-700"
              />
           </div>
        </div>
      </Section>

      {/* Pages Explorer (SEO Internal Linking) */}
      {pages && pages.length > 0 && (
        <Section id="explore">
          <SectionHeader 
            badge="Explorar Região"
            title="Outras Localidades"
            subtitle="Atendemos em diversos pontos para sua maior conveniência."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pages.map((p, i) => (
              <motion.a 
                key={p.id} 
                href={`/${p.slug}`}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center group hover:bg-white/5 hover:border-indigo-500/30 transition-all"
              >
                <p className="text-[10px] font-black uppercase text-white/20 mb-2 group-hover:text-indigo-400">{p.location}</p>
                <h4 className="text-sm font-bold uppercase italic tracking-tight">{p.service_name}</h4>
              </motion.a>
            ))}
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-indigo-500 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">
           © {new Date().getFullYear()} {client.name} — Programmatic Authority
         </p>
      </footer>
    </div>
  );
};
