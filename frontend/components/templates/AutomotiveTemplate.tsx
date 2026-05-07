'use client';

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
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

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
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center skew-x-[-10deg]">
                <span className="text-black font-black text-xl md:text-2xl skew-x-[10deg]">{client.name[0]}</span>
             </div>
             <span className="text-lg md:text-2xl font-black italic tracking-tighter uppercase">{client.name}</span>
          </div>
          <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all skew-x-[-10deg] active:scale-95">
            <span className="inline-block skew-x-[10deg]">WhatsApp</span>
          </a>
        </div>
      </motion.header>

      <section className="relative py-16 md:py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 md:space-y-10"
           >
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] md:leading-[0.8]">
                {page?.service_name || 'Potência &'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Performance</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-lg">
                {brand?.description || page?.meta_description || 'Referência absoluta em cuidados automotivos em nossa região. Tecnologia de ponta para quem não aceita menos que a perfeição.'}
              </p>
              <button className="w-full md:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs skew-x-[-10deg]">
                 <span className="inline-block skew-x-[10deg]">Nossos Serviços</span>
              </button>
           </motion.div>
           <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative"
           >
              <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000" className="rounded-3xl shadow-2xl skew-x-[-2deg] w-full" alt="Auto" />
           </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-20 md:py-32 px-6 md:px-10 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof Automotive */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Aprovado em <br />{page?.location}</h2>
              <div className="w-20 h-2 bg-yellow-400 mx-auto skew-x-[-10deg]" />
           </div>
           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  className="p-8 md:p-10 bg-white/5 border border-white/5 rounded-2xl hover:border-yellow-400/50 transition-all group"
                >
                  <p className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4 text-yellow-400">"SENSACIONAL"</p>
                  <p className="text-base md:text-lg text-white/60 mb-8 italic">"Confio meu carro de olhos fechados. O melhor atendimento técnico em {page?.location} e região."</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Proprietário Local</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <div className="space-y-10 md:space-y-12">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">Box de Atendimento <br /><span className="text-yellow-400">{page?.location}</span></h2>
              <div className="space-y-6">
                 <div className="p-8 bg-white/5 border border-white/5 rounded-2xl skew-x-[-2deg]">
                    <div className="skew-x-[2deg]">
                       <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Localização</p>
                       <p className="text-xl md:text-2xl font-black italic tracking-tight">{brand?.address || 'Consulte nossa base central'}</p>
                    </div>
                 </div>
                 <div className="p-8 bg-yellow-400 text-black rounded-2xl skew-x-[-2deg] shadow-2xl shadow-yellow-400/20">
                    <div className="skew-x-[2deg]">
                       <p className="text-[10px] font-black uppercase text-black/40 tracking-widest mb-1">Dúvidas? WhatsApp</p>
                       <p className="text-xl md:text-2xl font-black italic tracking-tight mb-6">{brand?.contact_whatsapp}</p>
                       <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="block w-full py-4 bg-black text-yellow-400 text-center rounded-xl font-black uppercase tracking-widest text-[10px]">Chamar no Suporte</a>
                    </div>
                 </div>
              </div>
           </div>
           <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/5 skew-x-[-2deg] shadow-2xl">
              <iframe width="100%" height="100%" src={publicMapUrl} className="grayscale invert contrast-125 opacity-70" />
           </div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="py-24 px-6 border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-12">Outros Serviços</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {pages.map((p, i) => (
                  <motion.a 
                    key={p.id} 
                    href={`/${p.slug}`}
                    className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-yellow-400 transition-all group"
                  >
                    <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tight group-hover:text-yellow-400 transition-colors">{p.service_name}</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">{p.location}</p>
                  </motion.a>
                ))}
              </div>
           </div>
        </section>
      )}

      <footer className="bg-black py-20 md:py-32 px-6 text-center">
         <span className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">{client.name}</span>
         <p className="text-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] mt-12 md:mt-20">© {new Date().getFullYear()} — Automotive Authority Performance</p>
      </footer>
    </div>
  );
};
