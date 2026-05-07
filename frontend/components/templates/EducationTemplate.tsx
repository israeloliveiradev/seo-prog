'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const EducationTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#4f46e5';
  const fontFamily = brand?.font_family || 'Inter';

  const mapAddress = brand?.address || 'São Paulo, Brasil';
  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-slate-100 px-6 md:px-10 py-4 md:py-6 flex justify-between items-center sticky top-0 z-50"
      >
        <div className="flex items-center gap-2 md:gap-3">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
           </div>
           <span className="text-lg md:text-xl font-black tracking-tight uppercase">{client.name}</span>
        </div>
        <a 
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="px-6 md:px-8 py-2.5 md:py-3 bg-indigo-600 text-white rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          Matricule-se
        </a>
      </motion.header>

      {/* Hero */}
      <section className="py-12 md:py-32 bg-slate-50 relative overflow-hidden px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
           >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white rounded-full border border-slate-200 text-indigo-600 shadow-sm">
                 <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Educação em {page?.location || 'Sua Região'}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-900">
                Transforme sua <br />
                <span className="text-indigo-600">Carreira Agora</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-light italic">
                {brand?.description || page?.meta_description || 'Educação de excelência com foco no mercado de trabalho. Aprenda com os melhores e acelere sua carreira profissional hoje mesmo.'}
              </p>
              <button className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20">
                Conhecer Cursos
              </button>
           </motion.div>
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
           >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" 
                alt="Alunos estudando" 
                className="relative rounded-[40px] shadow-2xl w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-6 -right-6 p-6 md:p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 hidden sm:block">
                 <div className="flex -space-x-3 mb-4">
                    {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">+500</div>
                 </div>
                 <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Alunos em {page?.location}</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      {page?.ai_content && (
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose-seo" dangerouslySetInnerHTML={{ __html: page.ai_content }} />
          </div>
        </section>
      )}

      {/* Social Proof Education */}
      <section className="py-20 md:py-32 px-6 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">O sucesso de nossos <br />alunos em {page?.location}</h2>
              <p className="text-indigo-200 uppercase font-black text-[10px] tracking-[0.4em]">Resultados reais de quem aprende na prática</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-12 bg-white/10 rounded-[40px] border border-white/10"
                >
                  <p className="text-lg md:text-xl font-light italic mb-8 leading-relaxed">"A metodologia é incrível e o suporte em {page?.location} fez toda a diferença para eu conseguir meu novo emprego."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20" />
                    <div>
                       <p className="font-bold text-sm">Aluno Formado</p>
                       <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Curso Concluído</p>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-40 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <div className="h-[400px] md:h-[650px] rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl">
              <iframe width="100%" height="100%" src={publicMapUrl} className="opacity-90 contrast-75" />
           </div>
           <div className="space-y-10 md:space-y-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">Unidade Presencial <br /><span className="text-indigo-600">{page?.location}</span></h2>
              <div className="space-y-8">
                 <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform shadow-xl shadow-indigo-600/20">📍</div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Campus</p>
                       <p className="text-lg md:text-xl font-bold text-slate-700">{brand?.address || 'Consulte nossa secretaria'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform shadow-xl shadow-indigo-600/20">💬</div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Dúvidas?</p>
                       <p className="text-lg md:text-xl font-bold text-slate-700">{brand?.contact_whatsapp}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {pages && pages.length > 0 && (
        <section className="py-24 px-6 bg-slate-50">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-12">Nossas Trilhas de Aprendizado</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {pages.map((p) => (
                  <a key={p.id} href={`/${p.slug}`} className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all flex flex-col items-center text-center">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-50 mb-8 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                       📚
                     </div>
                     <h3 className="font-bold text-slate-900 mb-2">{p.service_name}</h3>
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{p.location}</p>
                  </a>
                ))}
              </div>
           </div>
        </section>
      )}

      <footer className="bg-slate-900 text-white py-20 md:py-32 px-6 text-center mt-20">
         <span className="text-3xl md:text-4xl font-black tracking-tight uppercase">{client.name}</span>
         <p className="text-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] mt-12 md:mt-16">© {new Date().getFullYear()} {client.name} Education — Academic Excellence</p>
      </footer>
    </div>
  );
};
