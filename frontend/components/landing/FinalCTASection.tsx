import React from 'react';
import { Section } from './Section';

export const FinalCTASection = ({ data }: { data: any }) => {
  if (!data.visible) return null;
  return (
    <Section id="cta" className="relative overflow-hidden py-32 border-y border-border">
      <div className="absolute inset-0 bg-indigo-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">{data.title}</h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">{data.description}</p>
        <a 
          href={data.cta.link}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-900/50"
        >
          {data.cta.text}
        </a>
      </div>
    </Section>
  );
};
