'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const ModernTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#6366f1';
  const features = brand?.features_enabled || {};
  const fontFamily = brand?.font_family || 'Inter';

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Navbar Animada */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {brand?.logo_url ? (
              <img src={brand.logo_url} alt={client.name} className="h-8 object-contain" />
            ) : (
              <span className="text-xl font-bold tracking-tight text-slate-900">{client.name}</span>
            )}
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:opacity-90 shadow-lg shadow-indigo-200"
            style={{ backgroundColor: primaryColor }}
          >
            Falar com Especialista
          </a>
        </div>
      </motion.nav>

      {/* Hero Section com Revelação Escalada */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 space-y-8"
          >
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Atendimento em {page?.location || 'Sua Região'}
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {page?.service_name || 'Serviços Especializados'} <br />
              <span className="text-slate-400 font-medium italic">com Qualidade Premium</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              {brand?.description || page?.meta_description || 'Oferecemos as melhores soluções do mercado com foco em excelência e satisfação total do cliente.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button 
                className="px-10 py-5 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl"
                style={{ backgroundColor: primaryColor }}
               >
                 Solicitar Orçamento Grátis
               </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div 
              className="absolute -inset-10 rounded-[40px] blur-[100px] opacity-20 animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
            <img 
              src={brand?.hero_image || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop'} 
              alt="Serviço"
              className="relative rounded-[40px] shadow-2xl object-cover aspect-video lg:aspect-square"
            />
          </motion.div>
        </div>
      </section>

      {/* Grid de Páginas com Micro-interações */}
      {pages && pages.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold tracking-tight mb-4">Áreas que Atendemos</motion.h2>
            <motion.p {...fadeInUp} className="text-slate-500">Encontre {client.name} nas principais cidades.</motion.p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            {pages.map((p, i) => (
              <motion.a 
                key={p.id}
                href={`/${p.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-xl"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">{p.service_name}</h3>
                <p className="text-sm text-slate-400 font-medium">Em {p.location}</p>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* Mapa */}
      {features.show_maps && brand?.google_maps_embed && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 max-w-7xl mx-auto px-6"
        >
           <div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl h-[500px]">
             <iframe 
                src={brand.google_maps_embed} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              />
           </div>
        </motion.section>
      )}

      {/* Footer Industrial */}
      <footer className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-20 border-b border-white/5 pb-20 mb-20">
          <div className="space-y-8">
            <h4 className="text-2xl font-bold italic tracking-tighter uppercase">{client.name}</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{brand?.address || 'Consulte nossa área de atendimento local.'}</p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Contato Central</h4>
            <p className="text-2xl font-bold tracking-tight">{brand?.contact_whatsapp}</p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Conecte-se</h4>
            <div className="flex gap-6">
              {brand?.social_links?.instagram && <a href={brand.social_links.instagram} className="text-slate-400 hover:text-white transition-colors">Instagram</a>}
              {brand?.social_links?.facebook && <a href={brand.social_links.facebook} className="text-slate-400 hover:text-white transition-colors">Facebook</a>}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-[10px] text-slate-600 uppercase tracking-[0.5em] font-bold">
           © {new Date().getFullYear()} {client.name} | Premium Tenant Infra by Rankia.cloud
        </div>
      </footer>
    </div>
  );
};
