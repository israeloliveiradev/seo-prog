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
  const fontFamily = brand?.font_family || 'Inter';

  // Fallback para mapa se não houver endereço
  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(mapAddress)}`;
  // Como não temos a KEY agora, usaremos um embed sem KEY (modo busca) que funciona para demonstração
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-4 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-indigo-500/20 text-sm md:text-base">R</div>
             <span className="text-lg md:text-xl font-black tracking-tighter uppercase italic">{client.name}</span>
          </motion.div>
          <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-5 md:px-8 py-2 md:py-3 bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all">WhatsApp</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8 md:space-y-12"
           >
              <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] md:leading-[0.85]">
                {page?.service_name || 'Especialista em'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">{page?.location || 'Sua Região'}</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed px-4">
                {brand?.description || page?.meta_description}
              </p>
           </motion.div>
        </div>
      </section>

      {/* Conteúdo Dinâmico (SEO) */}
      {page?.ai_content && (
        <section className="py-20 md:py-32 px-4 md:px-10 bg-[#050508]">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 px-4 md:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-16 md:mb-20">O que dizem <br /><span className="text-indigo-500">nossos clientes</span></h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 bg-white/5 rounded-[30px] md:rounded-[40px] border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-indigo-500 text-sm md:text-base">★</span>)}
                </div>
                <p className="text-base md:text-lg text-white/70 italic mb-8">"Serviço impecável em {page?.location || 'nossa região'}. A equipe do {client.name} superou todas as expectativas!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
                  <div>
                    <p className="text-xs md:text-sm font-black uppercase italic">Cliente Satisfeito</p>
                    <p className="text-[10px] md:text-xs text-white/30 font-bold uppercase tracking-widest">{page?.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-32 px-4 md:px-10 bg-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Onde nos <br /><span className="text-indigo-500">encontrar</span></h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl md:text-2xl">📍</div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-1 md:mb-2">Endereço</p>
                  <p className="text-lg md:text-xl font-bold text-white/80">{brand?.address || 'Disponível em toda a região'}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl md:text-2xl">💬</div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-1 md:mb-2">WhatsApp</p>
                  <p className="text-lg md:text-xl font-bold text-white/80">{brand?.contact_whatsapp || 'Entre em contato'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src={publicMapUrl}
              className="grayscale invert contrast-125 opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 md:py-32 px-4 md:px-10 border-t border-white/5 text-center">
         <p className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-10 md:mb-20">{client.name}</p>
         <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-10 md:mb-20">
            <a href="#" className="hover:text-indigo-500 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Cookies</a>
         </div>
         <p className="text-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em]">© {new Date().getFullYear()} — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};
