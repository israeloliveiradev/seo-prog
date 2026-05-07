import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#ffffff';
  const features = brand?.features_enabled || {};
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-white/20 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <header className="px-8 py-10 flex justify-between items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-8 bg-white" />
          <span className="text-2xl font-black uppercase tracking-tighter italic">{client.name}</span>
        </motion.div>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-1 hover:border-white transition-all"
        >
          Get in Touch
        </motion.a>
      </header>

      <main className="px-8 pt-20 pb-40 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-10">
              Operating in {page?.location || 'Regional Sector'}
            </p>
            <h1 className="text-[12vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] mb-20">
              {page?.service_name || 'Premium'} <br />
              <span className="text-white/20 italic">Experience.</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl text-white/40 font-light leading-relaxed max-w-md">
                {brand?.description || page?.meta_description || 'Elite solutions tailored for high-performance outcomes. Redefining standards in our region through precision and authority.'}
              </p>
            </motion.div>
            
            {brand?.hero_image && (
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square bg-white/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
               >
                  <img src={brand.hero_image} className="w-full h-full object-cover" alt="Hero" />
               </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Pages Grid */}
      {pages && pages.length > 0 && (
        <section className="px-8 py-40 border-t border-white/5">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pages.map((p, i) => (
              <motion.a 
                key={p.id}
                href={`/${p.slug}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all duration-500 group"
              >
                <p className="text-[8px] font-bold uppercase tracking-widest mb-10 text-white/20 group-hover:text-black/40">Location: {p.location}</p>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{p.service_name}</h3>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      <footer className="px-8 py-20 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-white/20 flex flex-col md:flex-row justify-between gap-10">
        <div className="flex gap-10">
           <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="hover:text-white transition-colors">WhatsApp</a>
           {brand?.social_links?.instagram && <a href={brand.social_links.instagram} className="hover:text-white transition-colors">Instagram</a>}
        </div>
        <div>© {new Date().getFullYear()} {client.name} — Industrial Grade</div>
      </footer>
    </div>
  );
};
