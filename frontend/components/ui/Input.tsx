'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">
          {label}
        </label>
      )}
      <input 
        className={`w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white/[0.05] placeholder:text-white/20 ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 font-bold ml-1">{error}</p>}
    </div>
  );
};
