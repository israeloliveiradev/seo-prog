import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RealEstateTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#c2a378';
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-stone-200 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md px-8 py-6 flex justify-between items-center sticky top-0 z-50 border-b border-stone-100"
      >
         <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-stone-800">{client.name}</span>
         </div>
         <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-8 py-3 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-stone-700 transition-all">WhatsApp</a>
      </motion.header>

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
         <motion.img 
           initial={{ scale: 1.2 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10 }}
           src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" 
           className="absolute inset-0 w-full h-full object-cover brightness-50"
         />
         <div className="relative z-10 text-center text-white space-y-8 px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
            >
              Onde sua história <br />
              <span className="text-stone-400">Encontra um Lar</span>
            </motion.h1>
         </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="py-32 px-8">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative block overflow-hidden rounded-[40px] bg-stone-50"
                >
                  <img src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&sig=${p.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.service_name} />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                    <h3 className="text-white text-2xl font-black uppercase italic tracking-tight">{p.service_name}</h3>
                  </div>
                </motion.a>
              ))}
           </div>
        </section>
      )}

      <footer className="bg-stone-50 py-32 px-8 text-center">
         <p className="text-3xl font-black italic tracking-tighter uppercase mb-10">{client.name}</p>
         <p className="text-stone-300 text-[10px] font-black uppercase tracking-[0.5em]">© {new Date().getFullYear()} — Real Estate Elite</p>
      </footer>
    </div>
  );
};
