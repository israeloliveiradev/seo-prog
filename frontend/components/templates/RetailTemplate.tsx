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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Top Banner */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center"
      >
        Ofertas exclusivas em {page?.location || 'Toda a Rede'} • Confira Agora
      </motion.div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black" style={{ backgroundColor: primaryColor }}>
               {client.name[0]}
             </div>
             <span className="text-xl font-black tracking-tighter uppercase italic">{client.name}</span>
          </motion.div>
          <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="px-5 py-2 rounded-lg border-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white" style={{ borderColor: primaryColor, color: primaryColor }}>Whats App</a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
             <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none text-slate-900">
               {page?.service_name || 'Economia'} <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">em {page?.location}</span>
             </h1>
             <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
               {brand?.description || page?.meta_description}
             </p>
             <button className="px-10 py-5 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl" style={{ backgroundColor: primaryColor }}>Ver Encarte</button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden shadow-2xl"
          >
             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000" className="w-full h-full object-cover" alt="Retail" />
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      {pages && pages.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-12">Departamentos em {page?.location}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pages.map((p, i) => (
                <motion.a 
                  key={p.id} 
                  href={`/${p.slug}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 bg-white rounded-3xl border border-slate-200 hover:shadow-2xl transition-all"
                >
                  <h3 className="font-bold text-slate-900">{p.service_name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-black">{p.location}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-slate-900 text-white py-20 px-6 text-center">
         <p className="text-2xl font-black italic mb-4">{client.name}</p>
         <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} — Varejo Inteligente</p>
      </footer>
    </div>
  );
};
