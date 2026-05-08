import React from 'react';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, XCircle } from 'lucide-react';

export const ProblemSection = ({ data }: { data: any }) => {
  if (!data.visible) return null;
  return (
    <Section id="problem" className="bg-background">
      <SectionHeader 
        badge="O Problema"
        title={data.title}
        subtitle={data.subtitle}
      />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-6">
          <h3 className="text-xl font-bold text-red-500/80 mb-6">Como está hoje (Sem nós)</h3>
          {data.painPoints.map((point: string, i: number) => (
            <div key={i} className="flex gap-4">
              <XCircle className="w-6 h-6 text-red-500/50 shrink-0" />
              <p className="text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
           </div>
           <h3 className="text-xl font-bold text-green-500/80 mb-6">Como deveria ser</h3>
           <div className="flex gap-4">
             <CheckCircle2 className="w-6 h-6 text-green-500/50 shrink-0" />
             <p className="text-foreground font-medium">Você focado no seu negócio, enquanto nosso sistema atrai clientes no piloto automático através de SEO de alta performance.</p>
           </div>
        </div>
      </div>
    </Section>
  );
};
