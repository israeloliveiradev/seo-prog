'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  titleAccent,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-150 contrast-150" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-muted-foreground text-[10px] md:text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md"
            >
              <Sparkles size={14} className="text-accent" />
              {badge}
            </motion.div>
          )}

          <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter leading-[0.8] md:leading-[0.75] uppercase italic text-foreground">
            {title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-foreground to-accent">
              {titleAccent}
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed italic">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={ctaLink}
              className="group relative px-10 py-5 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs rounded-full flex items-center gap-3 transition-all shadow-xl shadow-accent/20"
            >
              {ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {secondaryCtaText && (
              <motion.a
                whileHover={{ opacity: 0.8 }}
                href={secondaryCtaLink}
                className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
              >
                {secondaryCtaText}
              </motion.a>
            )}
          </div>
        </motion.div>

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
             {/* Glow effect behind image */}
             <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full scale-90 opacity-50" />
             <div className="relative rounded-[40px] border border-white/10 overflow-hidden bg-black/40 backdrop-blur-2xl shadow-2xl p-2 h-[400px] md:h-[600px]">
                <Image 
                  src={imageUrl} 
                  alt="Hero Visualization" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-[32px] opacity-90 hover:opacity-100 transition-opacity duration-700" 
                  priority
                />
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
