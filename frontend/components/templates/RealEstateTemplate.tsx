'use client';

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
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-stone-200 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md px-6 md:px-10 py-6 md:py-8 flex justify-between items-center sticky top-0 z-50 border-b border-stone-100"
      >
         <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-stone-800">{client.name}</span>
         </div>
         <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-6 md:px-8 py-2.5 md:py-3 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-stone-700 transition-all active:scale-95">WhatsApp</a>
      </motion.header>

      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
         <motion.img 
           initial={{ scale: 1.2 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10 }}
           src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" 
           className="absolute inset-0 w-full h-full object-cover brightness-50"
         />
         <div className="relative z-10 text-center text-white space-y-6 md:space-y-8 px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
            >
              Exclusividade <br />
              <span className="text-stone-400 font-normal not-italic">em {page?.location}</span>
            </motion.h1>
            <p className="text-lg md:text-xl font-light italic max-w-2xl mx-auto opacity-80 leading-relaxed">
              {brand?.description || page?.meta_description || 'Encontre o imóvel dos seus sonhos com quem entende de alto padrão em nossa região.'}
            </p>
         </div>
      </section>

      {/* IA Content */}
      {page?.ai_content && (
        <section className="py-20 md:py-32 px-6 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof Real Estate */}
      <section className="py-20 md:py-32 bg-stone-50 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-stone-800 mb-4">Líderes em {page?.location}</h2>
              <p className="text-stone-400 uppercase font-black text-[10px] tracking-[0.3em]">Nossos números falam por nós</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { label: 'Vendas em ' + page?.location, val: '+150' },
                { label: 'Clientes Atendidos', val: '+500' },
                { label: 'Anos de Mercado', val: '12' },
                { label: 'Prêmios Locais', val: '05' }
              ].map((stat, i) => (
                <motion.div key={i} className="p-8 md:p-12 bg-white rounded-3xl border border-stone-200">
                   <p className="text-3xl md:text-5xl font-black italic tracking-tighter mb-2 text-stone-800">{stat.val}</p>
                   <p className="text-[9px] md:text-[10px] font-black uppercase text-stone-400 tracking-widest leading-tight">{stat.label}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-40 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <div className="space-y-10 md:space-y-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-stone-800">Agende sua <br /><span className="text-stone-400">Visita</span></h2>
              <div className="space-y-6">
                 <div className="p-8 bg-stone-50 rounded-[30px] border border-stone-100">
                    <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">Nosso Escritório</p>
                    <p className="text-xl md:text-2xl font-black italic text-stone-700">{brand?.address || 'Consulte nossa localização'}</p>
                 </div>
                 <div className="p-8 bg-stone-900 text-white rounded-[30px] shadow-2xl">
                    <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-4">Fale com um Especialista</p>
                    <p className="text-xl md:text-2xl font-black italic mb-8">{brand?.contact_whatsapp}</p>
                    <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="block w-full py-4 bg-white text-black text-center rounded-xl font-black uppercase tracking-widest text-xs hover:bg-stone-200 transition-all">Iniciar Conversa</a>
                 </div>
              </div>
           </div>
           <div className="h-[400px] md:h-[650px] rounded-[40px] md:rounded-[80px] overflow-hidden border-8 border-stone-100 shadow-2xl">
              <iframe width="100%" height="100%" src={publicMapUrl} className="grayscale contrast-75 opacity-90" />
           </div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="py-20 md:py-32 px-6 md:px-10 bg-stone-50">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-12">Outras Oportunidades</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                 {pages.map((p, i) => (
                   <motion.a 
                     key={p.id} 
                     href={`/${p.slug}`}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group relative block overflow-hidden rounded-[30px] md:rounded-[40px] bg-white shadow-sm hover:shadow-xl transition-all"
                   >
                     <div className="aspect-square bg-stone-100 overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&sig=${p.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.service_name} />
                     </div>
                     <div className="p-8">
                        <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-stone-800">{p.service_name}</h3>
                        <p className="text-[10px] font-black uppercase text-stone-400 mt-2 tracking-widest">{p.location}</p>
                     </div>
                   </motion.a>
                 ))}
              </div>
           </div>
        </section>
      )}

      <footer className="bg-stone-50 py-20 md:py-32 px-6 md:px-10 text-center border-t border-stone-200">
         <p className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase mb-10 text-stone-800">{client.name}</p>
         <p className="text-stone-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">© {new Date().getFullYear()} — Real Estate Elite Authority</p>
      </footer>
    </div>
  );
};
