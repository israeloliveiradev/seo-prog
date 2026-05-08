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

export const BentoGridItem = ({ 
  title, 
  description, 
  icon, 
  className,
  header,
  color
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  color?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className={`${className} relative group rounded-[32px] md:rounded-[48px] bg-card border border-border p-8 md:p-12 overflow-hidden flex flex-col justify-between transition-all hover:bg-muted/50 hover:border-accent/30 shadow-lg`}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: color || 'var(--accent)' }}
      />

      <div className="space-y-6 relative z-10">
        <div 
          className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center bg-muted border border-border group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
          style={{ color: color || 'var(--foreground)' }}
        >
          {icon}
        </div>
        {header}
        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-foreground">
          {title}
        </h3>
      </div>

      <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed italic group-hover:text-foreground transition-colors">
        {description}
      </p>
    </motion.div>
  );
};

export const BentoGrid = ({
  className,
  children,
  items,
}: {
  className?: string;
  children?: React.ReactNode;
  items?: any[];
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {children}
      {items && items.map((item, idx) => (
        <BentoGridItem
          key={idx}
          title={item.title}
          description={item.description}
          icon={item.icon || <Icons.Zap size={24} />}
          className={item.size === 'large' ? 'md:col-span-2 md:row-span-2' : item.size === 'wide' ? 'md:col-span-2' : 'md:col-span-1'}
          color={item.color}
        />
      ))}
    </div>
  );
};
