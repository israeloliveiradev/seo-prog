'use client';

import React from 'react';
import { designTokens } from '@/config/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white shadow-xl shadow-primary/20 hover:brightness-110",
    secondary: "bg-secondary text-white shadow-xl shadow-secondary/20 hover:brightness-110",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-foreground hover:bg-muted/10",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] rounded-lg",
    md: "px-8 py-4 text-xs rounded-xl",
    lg: "px-10 py-5 text-sm rounded-2xl",
    xl: "px-12 py-6 text-base rounded-[2rem]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
};
