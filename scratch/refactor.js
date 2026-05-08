const fs = require('fs');
const path = require('path');

const templates = [
  { name: 'Automotive', font: 'Oswald', badge: 'Performance Automotiva', color: 'red' },
  { name: 'Creative', font: 'Outfit', badge: 'Criatividade Ilimitada', color: 'fuchsia' },
  { name: 'Education', font: 'Merriweather', badge: 'Educação do Futuro', color: 'blue' },
  { name: 'Food', font: 'Playfair Display', badge: 'Sabor Excepcional', color: 'orange' },
  { name: 'Health', font: 'Plus Jakarta Sans', badge: 'Saúde em Primeiro Lugar', color: 'teal' },
  { name: 'Legal', font: 'Libre Baskerville', badge: 'Excelência Jurídica', color: 'slate' },
  { name: 'Minimalist', font: 'Inter', badge: 'Simplicidade Elegante', color: 'gray' },
  { name: 'RealEstate', font: 'Montserrat', badge: 'Imóveis de Alto Padrão', color: 'amber' },
  { name: 'Retail', font: 'Poppins', badge: 'Varejo Inteligente', color: 'emerald' },
];

const dir = path.join(__dirname, '../frontend/components/templates');

templates.forEach(t => {
  const file = path.join(dir, t.name + 'Template.tsx');
  
  const content = "'use client';\n\n" +
"import React from 'react';\n" +
"import dynamic from 'next/dynamic';\n" +
"import { motion } from 'framer-motion';\n" +
"import { GoogleFontsLoader } from './GoogleFontsLoader';\n" +
"import { HeroSection } from '../landing/HeroSection';\n" +
"import { SectionHeader } from '../landing/SectionHeader';\n" +
"import { Section } from '../landing/Section';\n" +
"import { defaultLandingConfig } from '@/config/landing.config';\n" +
"import { ThemeToggle } from '../theme-toggle';\n\n" +

"const ProblemSection = dynamic(() => import('../landing/ProblemSection').then(mod => mod.ProblemSection), { ssr: true });\n" +
"const SolutionSection = dynamic(() => import('../landing/SolutionSection').then(mod => mod.SolutionSection), { ssr: true });\n" +
"const BentoGrid = dynamic(() => import('../landing/BentoGrid').then(mod => mod.BentoGrid), { ssr: true });\n" +
"const PremiumTestimonials = dynamic(() => import('../landing/PremiumTestimonials').then(mod => mod.PremiumTestimonials), { ssr: true });\n" +
"const FAQSection = dynamic(() => import('../landing/FAQSection').then(mod => mod.FAQSection), { ssr: true });\n" +
"const FinalCTASection = dynamic(() => import('../landing/FinalCTASection').then(mod => mod.FinalCTASection), { ssr: true });\n\n" +

"interface TemplateProps {\n" +
"  client: any;\n" +
"  page?: any;\n" +
"  pages?: any[];\n" +
"}\n\n" +

"export const " + t.name + "Template: React.FC<TemplateProps> = ({ client, page, pages }) => {\n" +
"  const brand = client.brand_settings;\n" +
"  const fontFamily = brand?.font_family || '" + t.font + "';\n\n" +
  
"  const config = defaultLandingConfig;\n\n" +

"  const heroData = {\n" +
"    badge: brand?.company_name || '" + t.badge + "',\n" +
"    title: page?.service_name || config.sections.hero.title,\n" +
"    titleAccent: 'em ' + (page?.location || 'sua região'),\n" +
"    description: brand?.description || page?.meta_description || config.sections.hero.description,\n" +
"    ctaText: config.sections.hero.ctaPrimary.text,\n" +
"    ctaLink: 'https://wa.me/' + brand?.contact_whatsapp,\n" +
"    imageUrl: brand?.hero_image || config.sections.hero.imageUrl\n" +
"  };\n\n" +

"  const testimonialsData = brand?.testimonials?.length > 0\n" +
"    ? brand.testimonials\n" +
"    : config.sections.features.items;\n\n" +

"  const mapAddress = brand?.address || 'São Paulo, Brasil';\n" +
"  const publicMapUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(mapAddress) + '&t=&z=13&ie=UTF8&iwloc=&output=embed';\n\n" +

"  return (\n" +
"    <div className=\"min-h-screen bg-background text-foreground font-sans selection:bg-" + t.color + "-500/30 overflow-x-hidden transition-colors duration-300\">\n" +
"      <GoogleFontsLoader fontFamily={fontFamily} />\n" +
      
"      <div className=\"fixed top-6 right-6 z-[100]\">\n" +
"        <ThemeToggle />\n" +
"      </div>\n\n" +

"      <HeroSection {...heroData} />\n" +
"      <ProblemSection data={config.sections.problem} />\n" +
"      <SolutionSection data={config.sections.solution} />\n\n" +

"      {page?.ai_content && (\n" +
"        <Section className=\"pt-0 border-t border-border\">\n" +
"          <SectionHeader \n" +
"            badge=\"Especialistas no Assunto\"\n" +
"            title=\"Conhecimento Técnico\"\n" +
"            subtitle=\"Nossa abordagem detalhada garante os melhores resultados.\"\n" +
"          />\n" +
"          <div className=\"max-w-4xl mx-auto mt-12\">\n" +
"             <div className=\"prose-seo\" dangerouslySetInnerHTML={{ __html: page.ai_content }} />\n" +
"          </div>\n" +
"        </Section>\n" +
"      )}\n\n" +

"      <Section id=\"features\" dark>\n" +
"        <SectionHeader {...config.sections.features} />\n" +
"        <BentoGrid items={config.sections.features.items} />\n" +
"      </Section>\n\n" +

"      <Section id=\"testimonials\">\n" +
"        <SectionHeader {...config.sections.testimonials} />\n" +
"        <PremiumTestimonials testimonials={testimonialsData} />\n" +
"      </Section>\n\n" +

"      <FAQSection config={config.sections.faq} faqs={brand?.faqs} />\n\n" +

"      <Section id=\"location\" dark>\n" +
"        <div className=\"grid lg:grid-cols-2 gap-20 items-center\">\n" +
"           <div className=\"space-y-10\">\n" +
"              <SectionHeader \n" +
"                align=\"left\"\n" +
"                badge=\"Onde Estamos\"\n" +
"                title={'Atendimento Local em ' + page?.location}\n" +
"                subtitle=\"Nossa base física garante a segurança e proximidade que você precisa.\"\n" +
"              />\n" +
"              <div className=\"p-8 bg-white/5 border border-white/10 rounded-[32px] space-y-4\">\n" +
"                 <p className=\"text-sm font-black uppercase tracking-widest text-white/30\">Endereço Principal</p>\n" +
"                 <p className=\"text-xl md:text-2xl font-black italic text-white\">{brand?.address || 'Consulte nossa localização'}</p>\n" +
"              </div>\n" +
"           </div>\n" +
"           <div className=\"h-[400px] md:h-[600px] bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl\">\n" +
"              <iframe \n" +
"                width=\"100%\" \n" +
"                height=\"100%\" \n" +
"                src={publicMapUrl} \n" +
"                className=\"grayscale invert opacity-50 contrast-125 hover:opacity-100 transition-opacity duration-700\"\n" +
"              />\n" +
"           </div>\n" +
"        </div>\n" +
"      </Section>\n\n" +

"      {pages && pages.length > 0 && (\n" +
"        <Section id=\"explore\">\n" +
"          <SectionHeader \n" +
"            badge=\"Explorar Região\"\n" +
"            title=\"Outras Localidades\"\n" +
"            subtitle=\"Atendemos em diversos pontos para sua maior conveniência.\"\n" +
"          />\n" +
"          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4 mt-12\">\n" +
"            {pages.map((p, i) => (\n" +
"              <motion.a \n" +
"                key={p.id} \n" +
"                href={'/' + p.slug}\n" +
"                whileHover={{ scale: 1.02 }}\n" +
"                className=\"p-6 bg-muted/30 border border-border rounded-2xl text-center group hover:bg-muted hover:border-" + t.color + "-500/30 transition-all\"\n" +
"              >\n" +
"                <p className=\"text-[10px] font-black uppercase text-muted-foreground mb-2 group-hover:text-" + t.color + "-500\">{p.location}</p>\n" +
"                <h4 className=\"text-sm font-bold uppercase italic tracking-tight\">{p.service_name}</h4>\n" +
"              </motion.a>\n" +
"            ))}\n" +
"          </div>\n" +
"        </Section>\n" +
"      )}\n\n" +

"      <FinalCTASection data={config.sections.finalCta} />\n\n" +

"      <footer className=\"py-20 px-6 bg-background text-center space-y-10\">\n" +
"         <div className=\"flex items-center justify-center gap-3\">\n" +
"            <div className=\"w-1.5 h-8 bg-" + t.color + "-500 rounded-full\" />\n" +
"            <span className=\"text-2xl font-black italic uppercase tracking-tighter text-foreground\">{client.name}</span>\n" +
"         </div>\n" +
"         <p className=\"text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50 italic\">\n" +
"           © {new Date().getFullYear()} {client.name} — Programmatic Authority\n" +
"         </p>\n" +
"      </footer>\n" +
"    </div>\n" +
"  );\n" +
"};\n";

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
