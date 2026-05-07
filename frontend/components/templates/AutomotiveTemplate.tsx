import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const AutomotiveTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#facc15';
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <motion.header 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="relative z-50 border-b border-white/5 bg-[#111111]/80 backdrop-blur-md px-6 py-5"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center skew-x-[-10deg]">
                <span className="text-black font-black text-2xl skew-x-[10deg]">{client.name[0]}</span>
             </div>
             <span className="text-2xl font-black italic tracking-tighter uppercase">{client.name}</span>
          </div>
          <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all skew-x-[-10deg]">
            <span className="inline-block skew-x-[10deg]">WhatsApp</span>
          </a>
        </div>
      </motion.header>

      <section className="relative py-24 lg:py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
           >
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
                {page?.service_name || 'Potência &'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Performance</span>
              </h1>
              <p className="text-xl text-white/40 font-light leading-relaxed max-w-lg">
                {brand?.description || page?.meta_description}
              </p>
           </motion.div>
           <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
           >
              <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000" className="rounded-3xl shadow-2xl skew-x-[-2deg]" alt="Auto" />
           </motion.div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="py-32 px-6 border-t border-white/5">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-yellow-400/50 transition-all"
                >
                  <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-yellow-400 transition-colors">{p.service_name}</h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{p.location}</p>
                </motion.a>
              ))}
           </div>
        </section>
      )}

      <footer className="bg-black py-24 px-6 text-center">
         <span className="text-3xl font-black italic tracking-tighter uppercase">{client.name}</span>
         <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.5em] mt-10">© {new Date().getFullYear()} — Automotive Authority</p>
      </footer>
    </div>
  );
};
