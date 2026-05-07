'use client';

import React from 'react';

export const GoogleFontsLoader = ({ fontFamily }: { fontFamily?: string }) => {
  if (!fontFamily || fontFamily === 'Inter') return null;

  const fontName = fontFamily.replace(/\s+/g, '+');
  
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;700;900&display=swap');
      
      body, html, * {
        font-family: '${fontFamily}', sans-serif !important;
      }
    `}</style>
  );
};
