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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      <GoogleFontsLoader fontFamily={fontFamily} />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50"
      >
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
           </div>
           <span className="text-xl font-black tracking-tight uppercase">{client.name}</span>
        </div>
        <div className="hidden lg:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
           <a href="#" className="hover:text-indigo-600">Cursos</a>
           <a href="#" className="hover:text-indigo-600">Sobre</a>
           <a href="#" className="hover:text-indigo-600">Alunos</a>
        </div>
        <a 
          href={`https://wa.me/${brand?.contact_whatsapp}`}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
        >
          Matricule-se Já
        </a>
      </motion.header>

      {/* Hero Educação */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1 bg-white rounded-full border border-slate-200 text-indigo-600 shadow-sm">
                 <span className="text-[10px] font-black uppercase tracking-widest">Inscrições Abertas em {page?.location || 'Sua Cidade'}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900">
                Transforme seu <br />
                <span className="text-indigo-600">Futuro Agora</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-light">
                {brand?.description || page?.meta_description || 'Educação de excelência com foco no mercado de trabalho. Aprenda com os melhores e acelere sua carreira profissional hoje mesmo.'}
              </p>
              <div className="flex gap-4">
                 <button className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20">
                    Começar Aprendizado
                 </button>
              </div>
           </div>
           <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                alt="Alunos estudando" 
                className="relative rounded-[40px] shadow-2xl w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-6 -right-6 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
                 <div className="flex -space-x-3 mb-4">
                    {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">+500</div>
                 </div>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Alunos Ativos em {page?.location}</p>
              </div>
           </div>
        </div>
        {/* Decor Shapes */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-indigo-600/5 -z-0 rounded-tl-[200px]" />
      </section>

      {/* Grid de Cursos (Páginas) */}
      {pages && pages.length > 0 && (
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                 <h2 className="text-4xl font-black tracking-tight">O que você vai aprender em {page?.location}</h2>
                 <p className="text-slate-500">Módulos especializados para sua formação completa.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pages.map((p) => (
                  <a key={p.id} href={`/${p.slug}`} className="group p-10 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all flex flex-col items-center text-center">
                     <div className="w-16 h-16 rounded-2xl bg-indigo-50 mb-8 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                       📚
                     </div>
                     <h3 className="font-bold text-slate-900 mb-2">{p.service_name}</h3>
                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{p.location}</p>
                  </a>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* Footer Educação */}
      <footer className="bg-slate-900 text-white py-24 px-6 mt-20">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/5 pb-16 mb-16">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">🎓</div>
               <span className="text-xl font-black tracking-tight uppercase">{client.name}</span>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Dúvidas? Fale Conosco</h4>
               <a href={`https://wa.me/${brand?.contact_whatsapp}`} className="text-2xl font-bold text-indigo-400 hover:text-white transition-colors">{brand?.contact_whatsapp}</a>
            </div>
         </div>
         <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">© {new Date().getFullYear()} {client.name} Education System | Todos os Direitos Reservados</p>
         </div>
      </footer>
    </div>
  );
};
