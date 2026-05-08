'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { Section } from '../landing/Section';
import { Star, MapPin, Heart, ShieldCheck, Share } from 'lucide-react';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const AirbnbTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const primaryColor = brand?.primary_color || '#FF385C'; // Rosa Airbnb original
  
  return (
    <div className="bg-white text-[#222222] font-sans selection:bg-[#FF385C]/10">
      <GoogleFontsLoader fontFamily="Inter" />
      
      {/* 1. HEADER / GALLERY FEEL */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
           <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{page?.service_name} em {page?.location}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                 <div className="flex items-center gap-1">
                    <Star size={16} fill="currentColor" /> 4.98 (120+ avaliações)
                 </div>
                 <span className="hidden md:block text-slate-300">|</span>
                 <div className="flex items-center gap-1 underline cursor-pointer hover:text-black">
                    <MapPin size={16} /> {page?.location}, Brasil
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-xl transition-all underline font-bold text-sm">
                 <Share size={16} /> Compartilhar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-xl transition-all underline font-bold text-sm">
                 <Heart size={16} /> Salvar
              </button>
           </div>
        </div>

        {/* MOCKUP GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[500px] rounded-[32px] overflow-hidden">
           <div className="md:col-span-2 h-full bg-slate-200 hover:brightness-90 transition-all cursor-pointer overflow-hidden">
              <img src={brand?.hero_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'} className="w-full h-full object-cover" alt="Main" />
           </div>
           <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-3 h-full">
              {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="bg-slate-200 hover:brightness-90 transition-all cursor-pointer overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-160058515${i}340-be6161a56a0c?q=80&w=400`} className="w-full h-full object-cover" alt="Sub" />
                 </div>
              ))}
           </div>
        </div>
      </header>

      {/* 2. INFO SECTION */}
      <Section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-20">
           
           <div className="space-y-12">
              <div className="pb-8 border-b border-slate-200 flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-bold">Serviço oferecido por {client.name}</h2>
                    <p className="text-slate-500">Atendimento especializado em toda a região.</p>
                 </div>
                 <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-black text-xl">
                    {client.name[0]}
                 </div>
              </div>

              <div className="space-y-8">
                 {[
                    { icon: ShieldCheck, title: "Qualidade Garantida", desc: "Profissionais verificados e com seguro." },
                    { icon: MapPin, title: "Localização Ideal", desc: "Perto de você em " + page?.location },
                    { icon: Heart, title: "Amado pelos Clientes", desc: "Top 5% dos serviços mais bem avaliados." }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                       <div className="pt-1"><item.icon size={28} /></div>
                       <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="prose prose-slate max-w-none border-t border-slate-200 pt-12" dangerouslySetInnerHTML={{ __html: page?.ai_content || '' }} />
           </div>

           {/* BOOKING CARD FLOAT */}
           <div className="relative">
              <div className="sticky top-12 p-8 bg-white border border-slate-200 rounded-3xl shadow-[0_12px_24px_rgba(0,0,0,0.1)] space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="text-2xl font-black">Preço sob consulta</div>
                    <div className="flex items-center gap-1 text-xs font-bold underline cursor-pointer">
                       <Star size={12} fill="currentColor" /> 4.98
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 border border-slate-400 rounded-xl overflow-hidden">
                       <div className="p-3 border-r border-slate-400">
                          <p className="text-[10px] font-black uppercase">Data</p>
                          <p className="text-xs">Consulte agora</p>
                       </div>
                       <div className="p-3">
                          <p className="text-[10px] font-black uppercase">Região</p>
                          <p className="text-xs">{page?.location}</p>
                       </div>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-full h-14 rounded-xl"
                      style={{ backgroundColor: primaryColor }}
                      onClick={() => window.open(`https://wa.me/${brand?.contact_whatsapp}`, '_blank')}
                    >
                      Reservar Atendimento
                    </Button>
                    <p className="text-center text-xs text-slate-400">Você não será cobrado agora.</p>
                 </div>
              </div>
           </div>

        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-[#f7f7f7] py-20 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
            <div className="space-y-4">
               <h4 className="font-bold">Suporte</h4>
               <ul className="space-y-3 text-slate-600">
                  <li className="hover:underline cursor-pointer">Centro de Ajuda</li>
                  <li className="hover:underline cursor-pointer">AirCover</li>
                  <li className="hover:underline cursor-pointer">Segurança</li>
               </ul>
            </div>
            <div className="space-y-4">
               <h4 className="font-bold">Comunidade</h4>
               <ul className="space-y-3 text-slate-600">
                  <li className="hover:underline cursor-pointer">Blog oficial</li>
                  <li className="hover:underline cursor-pointer">Depoimentos</li>
                  <li className="hover:underline cursor-pointer">Parceiros</li>
               </ul>
            </div>
         </div>
      </footer>
    </div>
  );
};
