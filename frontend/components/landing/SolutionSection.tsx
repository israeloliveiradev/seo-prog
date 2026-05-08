import React from 'react';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import * as Icons from 'lucide-react';

export const SolutionSection = ({ data }: { data: any }) => {
  if (!data.visible) return null;
  return (
    <Section id="solution" dark>
      <SectionHeader 
        badge="A Solução"
        title={data.title}
        subtitle={data.subtitle}
      />
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-12">
        {data.benefits.map((benefit: any, i: number) => {
          const IconComponent = (Icons as any)[benefit.icon] || Icons.Check;
          return (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconComponent className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </Section>
  );
};
