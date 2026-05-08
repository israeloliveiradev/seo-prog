'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  gradient?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  badge, 
  title, 
  subtitle, 
  align = 'center',
  gradient = true
}) => {
  return (
    <div className={`max-w-4xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} mb-16 md:mb-24 space-y-6`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/5"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] ${
          gradient 
            ? 'text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground/40' 
            : 'text-foreground'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className={`h-px w-24 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  );
};
