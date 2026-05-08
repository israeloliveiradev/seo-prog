'use client';

import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-2xl group hover:border-white/20 transition-all">
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">
          {label}
        </label>
        <span className="text-[10px] font-mono text-white/60 uppercase">{value}</span>
      </div>
      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <input 
          type="color" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer bg-transparent"
        />
      </div>
    </div>
  );
};
