'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface VisualEditorProps {
  client: any;
  onSave: (updatedClient: any) => Promise<void>;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ client, onSave }) => {
  const [template, setTemplate] = useState(client.template_id || 'minimalist');
  const [brand, setBrand] = useState(client.brand_settings || {});
  const [customDomain, setCustomDomain] = useState(client.custom_domain || '');
  const [saving, setSaving] = useState(false);

  const templates = [
    { id: 'minimalist', name: 'Industrial Minimalist', desc: 'Dark, raw, high-impact typography.', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400' },
    { id: 'modern', name: 'Modern Conversion', desc: 'Clean, light, focused on sales.', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400' },
    { id: 'retail', name: 'Retail / Supermarket', desc: 'Offer-focused, product grids.', thumb: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400' },
    { id: 'creative', name: 'Creative Agency', desc: 'Bold, gradients, portfolio style.', thumb: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400' },
    { id: 'health', name: 'Health / Medical', desc: 'Clean, trustworthy, professional.', thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400' },
    { id: 'legal', name: 'Legal / Professional', desc: 'Sober, luxurious, authoritative.', thumb: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400' },
    { id: 'realestate', name: 'Real Estate / Luxury', desc: 'Big photos, elegant tones.', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400' },
    { id: 'automotive', name: 'Automotive / Speed', desc: 'Robust, fast, industrial.', thumb: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400' },
    { id: 'education', name: 'Education / School', desc: 'Clear, modules, sign-up focus.', thumb: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400' },
    { id: 'food', name: 'Food / Restaurant', desc: 'Appetizing, menu-focused.', thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400' },
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

  const addTestimonial = () => {
    const newTestimonials = [...(brand.testimonials || []), { name: '', role: '', content: '', image_url: '' }];
    handleChange('testimonials', newTestimonials);
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const newTestimonials = [...(brand.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    handleChange('testimonials', newTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = brand.testimonials.filter((_: any, i: number) => i !== index);
    handleChange('testimonials', newTestimonials);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...client, template_id: template, brand_settings: brand, custom_domain: customDomain });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-16 pb-32 animate-fadeIn">
      {/* Top Section: Domain & Navigation */}
      <section className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-auto">
          <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Domínio Customizado</label>
          <input 
            type="text" 
            value={customDomain} 
            onChange={(e) => setCustomDomain(e.target.value)}
            className="w-full md:w-80 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
            placeholder="www.exemplo.com.br"
          />
        </div>
        <div className="flex gap-4">
           <Link 
            href={`/admin/clients/${client.id}/pages`}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
           >
             📝 Editar Páginas Individuais
           </Link>
        </div>
      </section>

      {/* Seleção de Template */}
      <section>
        <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          Layout do Site
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {templates.map((t) => (
            <div 
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`group relative cursor-pointer rounded-2xl border-2 transition-all overflow-hidden ${
                template === t.id ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <img src={t.thumb} alt={t.name} className="w-full h-32 object-cover opacity-40 group-hover:opacity-100 transition-all" />
              <div className="p-4 bg-black/60 absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="font-bold uppercase tracking-tight text-[10px]">{t.name}</p>
              </div>
              {template === t.id && (
                <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1 rounded-full">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prova Social Customizada */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
           <h3 className="text-xl font-black uppercase italic flex items-center gap-3">
            <span className="w-1.5 h-6 bg-green-500 rounded-full" />
            Depoimentos Reais
          </h3>
          <button 
            onClick={addTestimonial}
            className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300"
          >
            + Adicionar Depoimento
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {(brand.testimonials || []).map((test: any, idx: number) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 relative group">
               <button 
                onClick={() => removeTestimonial(idx)}
                className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors"
               >
                 <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
               <div className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase text-white/20">Foto URL</label>
                    <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/10 overflow-hidden relative">
                      {test.image_url ? (
                        <img src={test.image_url} className="w-full h-full object-cover" alt="Avatar" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 text-xs italic">IMG</div>
                      )}
                    </div>
                    <input 
                      type="text" 
                      value={test.image_url} 
                      onChange={(e) => updateTestimonial(idx, 'image_url', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-[8px] outline-none"
                      placeholder="URL..."
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[8px] font-black uppercase text-white/20">Nome</label>
                      <input 
                        type="text" 
                        value={test.name} 
                        onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none"
                        placeholder="Ex: Maria Souza"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-white/20">Cargo/Localidade</label>
                      <input 
                        type="text" 
                        value={test.role} 
                        onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none"
                        placeholder="Ex: Cliente em São Paulo"
                      />
                    </div>
                  </div>
               </div>
               <div>
                  <label className="text-[8px] font-black uppercase text-white/20">Depoimento</label>
                  <textarea 
                    value={test.content} 
                    onChange={(e) => updateTestimonial(idx, 'content', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none h-20"
                    placeholder="O que o cliente disse..."
                  />
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Identidade Visual & Carrossel */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
           <h3 className="text-xl font-black uppercase italic mb-6">Contatos & Mapas</h3>
           <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">WhatsApp (Com DDI)</label>
                <input 
                  type="text" 
                  value={brand.contact_whatsapp || ''} 
                  onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                  placeholder="5511999999999"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Endereço Comercial</label>
                <input 
                  type="text" 
                  value={brand.address || ''} 
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                  placeholder="Rua Exemplo, 123 - SP"
                />
              </div>
           </div>
        </div>

        <div className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
           <h3 className="text-xl font-black uppercase italic mb-6">Identidade</h3>
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
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Google Font</label>
                <select 
                  value={brand.font_family || 'Inter'} 
                  onChange={(e) => handleChange('font_family', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none h-12"
                >
                  <option value="Inter">Inter</option>
                  <option value="Outfit">Outfit</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Playfair Display">Playfair</option>
                </select>
              </div>
           </div>
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Imagem de Fundo (Hero)</label>
              <input 
                type="text" 
                value={brand.hero_image || ''} 
                onChange={(e) => handleChange('hero_image', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                placeholder="https://images.unsplash.com/..."
              />
           </div>
        </div>
      </section>

      {/* Botão Salvar */}
      <div className="flex justify-end pt-8">
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all ${
            saving ? 'bg-white/10 text-white/20' : 'bg-indigo-500 text-white hover:bg-indigo-400 hover:scale-105 shadow-2xl shadow-indigo-500/30'
          }`}
        >
          {saving ? 'Publicando Alterações...' : 'Atualizar Site Completo'}
        </button>
      </div>
    </div>
  );
};
