'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image?: string;
  company?: string;
}

interface PremiumTestimonialsProps {
  testimonials: Testimonial[];
}

export const PremiumTestimonials: React.FC<PremiumTestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {testimonials.map((t, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="break-inside-avoid p-8 md:p-10 bg-card border border-border rounded-[32px] md:rounded-[40px] hover:bg-muted/50 hover:border-accent/30 transition-all group shadow-sm"
        >
          <Quote size={40} className="text-accent/20 mb-6 group-hover:text-accent/40 transition-colors" />
          
          <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-10 font-light">
            "{t.content}"
          </p>

          <div className="flex items-center gap-4 border-t border-border pt-8">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden bg-muted grayscale hover:grayscale-0 transition-all duration-500">
               {t.image ? (
                 <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center font-black text-xl italic text-muted-foreground/20">
                   {t?.name?.[0] || 'U'}
                 </div>
               )}
            </div>
            <div>
              <p className="text-sm md:text-base font-black uppercase italic tracking-tighter text-foreground group-hover:text-accent transition-colors">
                {t.name}
              </p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground">
                {t.role} {t.company && `— ${t.company}`}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
