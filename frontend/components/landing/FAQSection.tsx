'use client';
import React, { useState } from 'react';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection = ({ config, faqs }: { config: any, faqs?: any[] }) => {
  if (!config.visible) return null;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Fallback se não tiver no banco
  const items = (faqs && faqs.length > 0) ? faqs : [
    { question: "Como funciona a geração de páginas?", answer: "Nossa IA analisa sua região e gera conteúdo SEO altamente otimizado para as palavras-chave do seu nicho." },
    { question: "Preciso ter conhecimento técnico?", answer: "Não. Nossa plataforma é 100% gerenciada. Nós cuidamos do servidor, código e otimização." },
    { question: "Em quanto tempo vejo resultados?", answer: "SEO é um processo de médio/longo prazo, mas clientes com pouca concorrência local começam a ver tráfego entre 30 a 60 dias." }
  ];

  return (
    <Section id="faq">
      <SectionHeader 
        badge="FAQ"
        title={config.title}
        subtitle={config.subtitle}
      />
      <div className="max-w-3xl mx-auto mt-12 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border border-border rounded-2xl overflow-hidden bg-background">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-bold text-foreground">{item.question}</span>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};
