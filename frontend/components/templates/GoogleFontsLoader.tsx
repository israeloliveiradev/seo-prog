'use client';

import React from 'react';

interface GoogleFontsLoaderProps {
  fontFamily: string;
}

/**
 * Carrega fontes do Google de forma segura no Next.js App Router
 * Evita erros de hidratação e garante que a fonte escolhida no Admin seja aplicada.
 */
export const GoogleFontsLoader: React.FC<GoogleFontsLoaderProps> = ({ fontFamily }) => {
  if (!fontFamily || fontFamily === 'Inter') return null;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;700;900&display=swap`;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('${fontUrl}');
          :root {
            --font-family-dynamic: '${fontFamily}', sans-serif;
          }
          body, html {
            font-family: var(--font-family-dynamic) !important;
          }
        `
      }} />
    </>
  );
};
