'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const RetailTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#e11d48';
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Top Banner */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-slate-900 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center px-4"
      >
        Ofertas exclusivas em {page?.location || 'Toda a Rede'} • Confira Agora
      </motion.div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-10 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-black text-sm md:text-base" style={{ backgroundColor: primaryColor }}>
               {client.name[0]}
             </div>
             <span className="text-lg md:text-xl font-black tracking-tighter uppercase italic">{client.name}</span>
          </motion.div>
          <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-4 md:px-6 py-2 rounded-lg border-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white" style={{ borderColor: primaryColor, color: primaryColor }}>WhatsApp</a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-12 md:py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
          >
             <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none text-slate-900">
               {page?.service_name || 'Economia'} <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">em {page?.location}</span>
             </h1>
             <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg">
               {brand?.description || page?.meta_description}
             </p>
             <button className="w-full md:w-auto px-10 py-5 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: primaryColor }}>Ver Encarte</button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl aspect-video md:aspect-auto"
          >
             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000" className="w-full h-full object-cover" alt="Retail" />
          </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-16 md:py-24 px-4 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Aprovado por quem compra</h2>
            <p className="text-slate-500 text-sm md:text-base">Confira o que os moradores de {page?.location} dizem sobre nós.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="flex text-yellow-400 mb-4 text-sm">★★★★★</div>
                <p className="text-slate-600 mb-6 italic">"Sempre encontro tudo o que preciso com os melhores preços. O atendimento em {page?.location} é nota 10!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <p className="font-bold text-xs uppercase tracking-widest text-slate-400">Cliente Local</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-3 gap-10 md:gap-20">
              <div className="lg:col-span-1 space-y-10">
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Nossa Loja <br /><span style={{ color: primaryColor }}>{page?.location}</span></h2>
                 <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Endereço</p>
                       <p className="font-bold text-slate-700">{brand?.address || 'Consulte nosso televendas'}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Horário</p>
                       <p className="font-bold text-slate-700">Seg à Sáb: 08:00 - 20:00</p>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-2 h-[350px] md:h-[500px] rounded-3xl md:rounded-[40px] overflow-hidden border border-slate-200 shadow-xl">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    src={publicMapUrl}
                    className="opacity-90 contrast-100"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Departments Grid */}
      {pages && pages.length > 0 && (
        <section className="py-24 px-4 md:px-10 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-10 md:mb-16">Outras Unidades e Serviços</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors text-sm md:text-base">{p.service_name}</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest">{p.location}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-slate-900 text-white py-16 md:py-24 px-4 md:px-10 text-center">
         <p className="text-2xl md:text-3xl font-black italic mb-6">{client.name}</p>
         <div className="flex flex-wrap justify-center gap-6 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10">
            <a href="#">Suporte</a>
            <a href="#">Carreiras</a>
            <a href="#">Franquias</a>
         </div>
         <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};
