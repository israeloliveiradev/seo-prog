'use client';

import React, { useState, useEffect } from 'react';

interface VisualEditorProps {
  client: any;
  onSave: (updatedClient: any) => Promise<void>;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ client, onSave }) => {
  const [template, setTemplate] = useState(client.template_id || 'minimalist');
  const [brand, setBrand] = useState(client.brand_settings || {});
  const [saving, setSaving] = useState(false);

  const templates = [
    { id: 'minimalist', name: 'Industrial Minimalist', desc: 'Dark, raw, high-impact typography.', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400' },
    { id: 'modern', name: 'Modern Conversion', desc: 'Clean, light, focused on sales and images.', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400' },
  ];

  const handleToggle = (feature: string) => {
    setBrand({
      ...brand,
      features_enabled: {
        ...brand.features_enabled,
        [feature]: !brand.features_enabled?.[feature]
      }
    });
  };

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBrand({
        ...brand,
        [parent]: { ...brand[parent], [child]: value }
      });
    } else {
      setBrand({ ...brand, [field]: value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...client, template_id: template, brand_settings: brand });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 animate-fadeIn">
      {/* Seleção de Template */}
      <section>
        <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          Layout do Site (Templates)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((t) => (
            <div 
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`group relative cursor-pointer rounded-2xl border-2 transition-all overflow-hidden ${
                template === t.id ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <img src={t.thumb} alt={t.name} className="w-full h-40 object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="p-4 bg-[#0d0d16]">
                 <p className="font-bold uppercase tracking-tight">{t.name}</p>
                 <p className="text-xs text-white/40 mt-1">{t.desc}</p>
              </div>
              {template === t.id && (
                <div className="absolute top-3 right-3 bg-indigo-500 text-white p-1 rounded-full shadow-xl">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Controles de Recursos (Toggles) */}
      <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
        <h3 className="text-lg font-bold mb-8">Componentes Visuais</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { id: 'show_maps', label: 'Google Maps' },
            { id: 'show_faq', label: 'Perguntas Frequentes' },
            { id: 'show_reviews', label: 'Depoimentos' },
            { id: 'show_gallery', label: 'Galeria de Fotos' },
          ].map((f) => (
            <div key={f.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">{f.label}</span>
              <button 
                onClick={() => handleToggle(f.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  brand.features_enabled?.[f.id] ? 'bg-indigo-500' : 'bg-white/10'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  brand.features_enabled?.[f.id] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dados Ricos */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
           <h3 className="text-lg font-bold">Informações de Contato</h3>
           <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">WhatsApp de Vendas</label>
                <input 
                  type="text" 
                  value={brand.contact_whatsapp || ''} 
                  onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                  placeholder="5511999999999"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Endereço Comercial</label>
                <input 
                  type="text" 
                  value={brand.address || ''} 
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                  placeholder="Av. Paulista, 1000 - SP"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Descrição Curta da Empresa</label>
                <textarea 
                  value={brand.description || ''} 
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all h-24"
                  placeholder="Ex: Especialistas em climatização residencial..."
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Google Maps (URL de Embed)</label>
                <input 
                  type="text" 
                  value={brand.google_maps_embed || ''} 
                  onChange={(e) => handleChange('google_maps_embed', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                  placeholder="https://www.google.com/maps/embed?..."
                />
              </div>
           </div>
        </div>

        <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
           <h3 className="text-lg font-bold">Identidade & Mídia</h3>
           <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Hero Image (URL)</label>
                <input 
                  type="text" 
                  value={brand.hero_image || ''} 
                  onChange={(e) => handleChange('hero_image', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                  placeholder="https://imagem.com/foto.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Cor Primária</label>
                    <input 
                      type="color" 
                      value={brand.primary_color || '#6366f1'} 
                      onChange={(e) => handleChange('primary_color', e.target.value)}
                      className="w-full h-12 bg-black/40 border border-white/10 rounded-xl cursor-pointer"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Instagram (URL)</label>
                    <input 
                      type="text" 
                      value={brand.social_links?.instagram || ''} 
                      onChange={(e) => handleChange('social_links.instagram', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Botão Salvar */}
      <div className="flex justify-end pt-8">
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`px-12 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all ${
            saving ? 'bg-white/10 text-white/20' : 'bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-105 shadow-xl shadow-indigo-500/20'
          }`}
        >
          {saving ? 'Gravando Alterações...' : 'Salvar Design do Site'}
        </button>
      </div>
    </div>
  );
};
