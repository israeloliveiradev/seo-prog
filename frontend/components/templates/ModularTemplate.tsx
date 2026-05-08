'use client';

import React from 'react';
import { GoogleFontsLoader } from './GoogleFontsLoader';
import { BlockRenderer } from '../blocks/BlockRenderer';

interface TemplateProps {
  client: any;
  page?: any;
  pages?: any[];
}

export const ModularTemplate: React.FC<TemplateProps> = ({ client, page, pages }) => {
  const brand = client.brand_settings;
  const layout = brand?.layout_order || ['hero', 'specs', 'gallery'];
  const sectionsData = brand?.sections_data || {
    hero: { type: 'hero' },
    specs: { 
      type: 'specs', 
      title: 'Especificações Técnicas',
      items: [
        { label: 'Garantia', value: '12 Meses' },
        { label: 'Material', value: 'Aço Escovado' },
        { label: 'Eficiência', value: 'Classe A' }
      ]
    },
    gallery: {
      type: 'gallery',
      title: 'Destaques da Loja',
      items: [
        { title: 'Produto Premium', description: 'O melhor para você.', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800' }
      ]
    }
  };
  
  return (
    <div className="bg-white min-h-screen transition-all duration-500">
      <GoogleFontsLoader fontFamily={brand?.font_family || 'Inter'} />
      
      {/* O MOTOR RENDERIZA TUDO AQUI */}
      <BlockRenderer 
        layout={layout} 
        sectionsData={sectionsData} 
        brand={brand} 
        page={page} 
      />

      {/* FOOTER PADRÃO */}
      <footer className="py-20 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
           <h2 className="text-2xl font-black italic tracking-tighter uppercase">{client.name}</h2>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 italic">© {new Date().getFullYear()} — Built with Modular Engine</p>
        </div>
      </footer>
    </div>
  );
};
