'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { HeroSection } from '../landing/HeroSection';
import { SectionHeader } from '../landing/SectionHeader';
import { Section } from '../landing/Section';
import { defaultLandingConfig } from '@/config/landing.config';
import { ThemeToggle } from '../theme-toggle';

const ProblemSection = dynamic(() => import('../landing/ProblemSection').then(mod => mod.ProblemSection), { ssr: true });
const SolutionSection = dynamic(() => import('../landing/SolutionSection').then(mod => mod.SolutionSection), { ssr: true });
const BentoGrid = dynamic(() => import('../landing/BentoGrid').then(mod => mod.BentoGrid), { ssr: true });
const PremiumTestimonials = dynamic(() => import('../landing/PremiumTestimonials').then(mod => mod.PremiumTestimonials), { ssr: true });
const FAQSection = dynamic(() => import('../landing/FAQSection').then(mod => mod.FAQSection), { ssr: true });
const FinalCTASection = dynamic(() => import('../landing/FinalCTASection').then(mod => mod.FinalCTASection), { ssr: true });

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RetailTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const fontFamily = brand?.font_family || 'Poppins';

  const config = defaultLandingConfig;

  const heroData = {
    badge: brand?.company_name || 'Varejo Inteligente',
    title: page?.service_name || config.sections.hero.title,
    titleAccent: 'em ' + (page?.location || 'sua região'),
    description: brand?.description || page?.meta_description || config.sections.hero.description,
    ctaText: config.sections.hero.ctaPrimary.text,
    ctaLink: 'https://wa.me/' + brand?.contact_whatsapp,
    imageUrl: brand?.hero_image || config.sections.hero.imageUrl
  };

  const testimonialsData = brand?.testimonials?.length > 0
    ? brand.testimonials
    : config.sections.features.items;

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(mapAddress) + '&t=&z=13&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-300">
      <GoogleFontsLoader fontFamily={fontFamily} />
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <HeroSection {...heroData} />
      <ProblemSection data={config.sections.problem} />
      <SolutionSection data={config.sections.solution} />

      {page?.ai_content && (
        <Section className="pt-0 border-t border-border">
          <SectionHeader 
            badge="Especialistas no Assunto"
            title="Conhecimento Técnico"
            subtitle="Nossa abordagem detalhada garante os melhores resultados."
          />
          <div className="max-w-4xl mx-auto mt-12">
             <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </Section>
      )}

      <Section id="features" dark>
        <SectionHeader {...config.sections.features} />
        <BentoGrid items={config.sections.features.items} />
      </Section>

      <Section id="testimonials">
        <SectionHeader {...config.sections.testimonials} />
        <PremiumTestimonials testimonials={testimonialsData} />
      </Section>

      <FAQSection config={config.sections.faq} faqs={brand?.faqs} />

      <Section id="location" dark>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-10">
              <SectionHeader 
                align="left"
                badge="Onde Estamos"
                title={'Atendimento Local em ' + page?.location}
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

      {pages && pages.length > 0 && (
        <Section id="explore">
          <SectionHeader 
            badge="Explorar Região"
            title="Outras Localidades"
            subtitle="Atendemos em diversos pontos para sua maior conveniência."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {pages.map((p, i) => (
              <motion.a 
                key={p.id} 
                href={'/' + p.slug}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-muted/30 border border-border rounded-2xl text-center group hover:bg-muted hover:border-emerald-500/30 transition-all"
              >
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-2 group-hover:text-emerald-500">{p.location}</p>
                <h4 className="text-sm font-bold uppercase italic tracking-tight">{p.service_name}</h4>
              </motion.a>
            ))}
          </div>
        </Section>
      )}

      <FinalCTASection data={config.sections.finalCta} />

      <footer className="py-20 px-6 bg-background text-center space-y-10">
         <div className="flex items-center justify-center gap-3">
            <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
            <span className="text-2xl font-black italic uppercase tracking-tighter text-foreground">{client.name}</span>
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50 italic">
           © {new Date().getFullYear()} {client.name} — Programmatic Authority
         </p>
      </footer>
    </div>
  );
};
