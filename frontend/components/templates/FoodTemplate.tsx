'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const FoodTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#ea580c';
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-[#fffcf5] text-stone-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#fffcf5]/80 backdrop-blur-md border-b border-stone-200 px-8 py-6 sticky top-0 z-50 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
           <span className="text-2xl font-black tracking-tighter uppercase italic text-orange-600">{client.name}</span>
        </div>
        <a 
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="px-8 py-3 bg-orange-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-orange-600/20"
        >
          Pedir Agora
        </a>
      </motion.header>

      {/* Hero */}
      <section className="relative py-24 lg:py-40 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
           >
              <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-stone-900">
                A Arte da <br />
                <span className="text-orange-600">Boa Mesa</span>
              </h1>
              <p className="text-xl text-stone-500 font-light leading-relaxed max-w-lg italic">
                {brand?.description || page?.meta_description}
              </p>
           </motion.div>
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
           >
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" className="rounded-[60px] shadow-2xl" alt="Food" />
           </motion.div>
        </div>
      </section>

      {/* Grid */}
      {pages && pages.length > 0 && (
        <section className="py-40 bg-white px-8">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group space-y-6"
                >
                  <div className="aspect-square rounded-[40px] overflow-hidden shadow-lg">
                    <img src={`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&sig=${p.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.service_name} />
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">{p.service_name}</h3>
                </motion.a>
              ))}
           </div>
        </section>
      )}

      <footer className="bg-stone-900 text-white py-32 px-8 text-center">
         <span className="text-4xl font-black italic tracking-tighter uppercase text-orange-600">{client.name}</span>
         <p className="text-stone-700 text-[10px] font-black uppercase tracking-[0.5em] mt-10">© {new Date().getFullYear()} — Fine Dining Experience</p>
      </footer>
    </div>
  );
};
