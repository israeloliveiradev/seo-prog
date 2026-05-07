'use client';

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
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Background Aurora */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 md:py-10">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center mix-blend-difference">
            <span className="text-black font-black text-lg md:text-xl">{client.name[0]}</span>
          </div>
          <span className="text-lg md:text-xl font-black uppercase tracking-tighter mix-blend-difference">{client.name}</span>
        </motion.div>
        <motion.a 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
        >
          Let's Talk
        </motion.a>
      </nav>

      <section className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
           <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] italic mb-12 md:mb-16"
           >
             Creative <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-white to-indigo-400">Genius</span> <br />
             <span className="text-white/20 not-italic">em {page?.location}</span>
           </motion.h1>
           
           {/* IA Content */}
           {page?.ai_content && (
              <div className="max-w-4xl mb-20 md:mb-32">
                 <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
              </div>
           )}

           <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start"
           >
              <div className="space-y-12">
                 <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white/40">Nossa Base <br />em {page?.location}</h2>
                 <div className="h-[300px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 grayscale opacity-40 hover:opacity-100 transition-opacity">
                    <iframe width="100%" height="100%" src={publicMapUrl} className="invert contrast-125" />
                 </div>
                 <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-xl">
                   {brand?.address || 'Atendendo projetos em toda a região com excelência e criatividade.'}
                 </p>
              </div>

              <div className="space-y-12">
                 <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white/40">Resultados</h2>
                 <div className="space-y-10">
                    {[1, 2].map(i => (
                       <div key={i} className="group cursor-default">
                          <p className="text-3xl md:text-5xl font-black tracking-tighter group-hover:text-violet-400 transition-colors mb-2">99% SATISFAÇÃO</p>
                          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/20">Feedback de clientes em {page?.location}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="relative z-10 py-20 md:py-40 border-t border-white/10 px-6 md:px-10">
           <div className="max-w-[1400px] mx-auto">
              <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-12 text-white/20">Outros Projetos</h2>
              <div className="space-y-4">
                 {pages.map((p, i) => (
                   <motion.a 
                    key={p.id} 
                    href={`/${p.slug}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-white/5 hover:px-4 md:hover:px-10 transition-all duration-500"
                   >
                     <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter group-hover:text-violet-400 transition-colors">{p.service_name}</h3>
                     <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/20 mt-2 md:mt-0">{p.location}</span>
                   </motion.a>
                 ))}
              </div>
           </div>
        </section>
      )}

      <footer className="relative z-10 pt-20 md:pt-40 pb-10 md:pb-20 px-6 md:px-10 border-t border-white/10 text-center">
         <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/20">© {new Date().getFullYear()} {client.name} — Agency Grade Quality</p>
      </footer>
    </div>
  );
};
