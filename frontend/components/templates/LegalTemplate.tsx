import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const LegalTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#1e293b';
  const fontFamily = brand?.font_family || 'Inter';

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-slate-900 font-serif selection:bg-slate-200 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header Jurídico */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 backdrop-blur-md border-b border-slate-200 px-10 py-8 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col items-center">
             <span className="text-2xl font-bold tracking-[0.2em] uppercase text-slate-900">{client.name}</span>
             <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 mt-1">Advocacia & Consultoria</span>
          </div>
          <a 
            href={`https://wa.me/${brand?.contact_whatsapp}`}
            className="px-8 py-3 bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-700 transition-all"
          >
            Agendar Consulta
          </a>
        </div>
      </motion.header>

      {/* Hero Jurídico */}
      <section className="relative py-32 lg:py-48 px-10 border-b border-slate-200 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto text-center space-y-12 relative z-10"
        >
           <h1 className="text-5xl lg:text-8xl font-medium leading-[1.1] text-slate-900 italic">
             Excelência Jurídica em <br />
             <span className="text-slate-400 not-italic uppercase text-4xl lg:text-6xl tracking-widest block mt-6">
               {page?.location || 'Todo o Brasil'}
             </span>
           </h1>
           <p className="text-xl text-slate-600 font-sans font-light leading-loose max-w-2xl mx-auto">
             {brand?.description || page?.meta_description}
           </p>
        </motion.div>
      </section>

      {/* Áreas de Atuação */}
      {pages && pages.length > 0 && (
        <section className="py-32 bg-white px-10">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100">
             {pages.map((p, i) => (
               <motion.a 
                key={p.id} 
                href={`/${p.slug}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-white group hover:bg-[#f8f5f0] transition-all"
               >
                 <h3 className="text-xl font-medium text-slate-900 mb-4">{p.service_name}</h3>
                 <p className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-widest">{p.location}</p>
               </motion.a>
             ))}
           </div>
        </section>
      )}

      <footer className="py-24 px-10 bg-white border-t border-slate-100 text-center">
         <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-slate-300">© {new Date().getFullYear()} {client.name} | Prestígio & Justiça</p>
      </footer>
    </div>
  );
};
