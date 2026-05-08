'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, dark = false }) => {
  return (
    <section 
      id={id}
      style={{ 
        paddingTop: 'var(--section-spacing, 5rem)', 
        paddingBottom: 'var(--section-spacing, 5rem)' 
      }}
      className={`px-6 md:px-10 relative overflow-hidden ${dark ? 'bg-background' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};
