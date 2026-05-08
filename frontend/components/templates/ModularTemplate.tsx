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
  const designMode = brand?.design_mode || 'modern';
  
  return (
    <div 
      className={`min-h-screen transition-colors duration-500 font-sans ${designMode === 'cyber' ? 'bg-[#050508] text-white' : ''}`}
      style={{ 
        backgroundColor: designMode === 'cyber' ? undefined : brand?.bg_color,
        color: designMode === 'cyber' ? undefined : brand?.text_color
      }}
    >
      <GoogleFontsLoader fontFamily={brand?.font_family || 'Inter'} />
      {brand?.font_secondary && brand?.font_secondary !== brand?.font_family && (
        <GoogleFontsLoader fontFamily={brand.font_secondary} />
      )}
      
      {/* Global Aesthetics Layer */}
      {designMode === 'glass' && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
      )}
      
      {designMode === 'cyber' && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_50%)]" />
      )}

      <main className="relative z-10">
        <BlockRenderer 
          layout={brand?.layout_order || ['hero', 'specs', 'gallery']} 
          sectionsData={brand?.sections_data || {}} 
          brand={brand} 
          page={page} 
        />
      </main>

      {/* Modern Footer Modular */}
      <footer className="py-20 px-6 border-t border-border/50 text-center">
         <div className="flex flex-col items-center gap-6">
            {brand?.logo_url ? (
              <img src={brand.logo_url} className="h-10 w-auto opacity-80" alt="Logo" />
            ) : (
              <span className="text-xl font-black tracking-tighter italic uppercase">{client.name}</span>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">
              © {new Date().getFullYear()} {client.name} — Programmatic Lego Engine
            </p>
         </div>
      </footer>
    </div>
  );
};
