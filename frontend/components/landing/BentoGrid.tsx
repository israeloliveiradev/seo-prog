'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface BentoItem {
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  size?: 'small' | 'large' | 'tall' | 'wide';
  color?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 min-h-[800px]">
      {items.map((item, idx) => {
        const Icon = Icons[item.iconName] as LucideIcon;
        
        // Define span classes based on size
        let spanClass = "col-span-1 md:col-span-1 md:row-span-1";
        if (item.size === 'large') spanClass = "col-span-1 md:col-span-2 md:row-span-2";
        if (item.size === 'wide') spanClass = "col-span-1 md:col-span-2 md:row-span-1";
        if (item.size === 'tall') spanClass = "col-span-1 md:col-span-1 md:row-span-2";

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className={`${spanClass} relative group rounded-[32px] md:rounded-[48px] bg-card border border-border p-8 md:p-12 overflow-hidden flex flex-col justify-between transition-all hover:bg-muted/50 hover:border-accent/30 shadow-lg`}
          >
            {/* Background Glow */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: item.color || 'var(--accent)' }}
            />

            <div className="space-y-6 relative z-10">
              <div 
                className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center bg-muted border border-border group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                style={{ color: item.color || 'var(--foreground)' }}
              >
                {Icon && <Icon size={32} strokeWidth={1.5} />}
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-foreground">
                {item.title}
              </h3>
            </div>

            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed italic group-hover:text-foreground transition-colors">
              {item.description}
            </p>

            {/* Decorative element */}
            <div className="absolute bottom-[-10px] right-[-10px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                {Icon && <Icon size={120} strokeWidth={0.5} />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
