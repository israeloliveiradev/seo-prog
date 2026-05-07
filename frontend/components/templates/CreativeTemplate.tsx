import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#8b5cf6';
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Background Aurora */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-10 py-10">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mix-blend-difference">
            <span className="text-black font-black text-xl">{client.name[0]}</span>
          </div>
          <span className="text-xl font-black uppercase tracking-tighter mix-blend-difference">{client.name}</span>
        </motion.div>
        <motion.a 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
        >
          Let's Talk
        </motion.a>
      </nav>

      <section className="relative z-10 pt-20 pb-40 px-10">
        <div className="max-w-[1400px] mx-auto">
           <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] italic mb-16"
           >
             Creative <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-white to-indigo-400">Genius</span> <br />
             <span className="text-white/20 not-italic">in {page?.location}</span>
           </motion.h1>
           <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-20 items-end"
           >
              <p className="text-2xl text-white/40 font-light leading-relaxed max-w-xl">
                {brand?.description || page?.meta_description}
              </p>
           </motion.div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="relative z-10 py-40 border-t border-white/10 px-10">
           <div className="max-w-[1400px] mx-auto">
              <div className="space-y-4">
                 {pages.map((p, i) => (
                   <motion.a 
                    key={p.id} 
                    href={`/${p.slug}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between py-10 border-b border-white/5 hover:px-10 transition-all duration-500"
                   >
                     <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter group-hover:text-violet-400 transition-colors">{p.service_name}</h3>
                     <span className="text-sm font-bold uppercase tracking-widest text-white/20">{p.location}</span>
                   </motion.a>
                 ))}
              </div>
           </div>
        </section>
      )}

      <footer className="relative z-10 pt-40 pb-20 px-10 border-t border-white/10 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">© {new Date().getFullYear()} {client.name} — Agency Grade</p>
      </footer>
    </div>
  );
};
