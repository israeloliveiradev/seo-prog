'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ColorPicker } from '../ui/ColorPicker';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalistTemplate } from '../templates/MinimalistTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { RetailTemplate } from '../templates/RetailTemplate';
import { AppleTemplate } from '../templates/AppleTemplate';
import { LinearTemplate } from '../templates/LinearTemplate';
import { StripeTemplate } from '../templates/StripeTemplate';
import { AirbnbTemplate } from '../templates/AirbnbTemplate';
import { FintechTemplate } from '../templates/FintechTemplate';
import { SaaSTemplate } from '../templates/SaaSTemplate';
import { MinimalBlancTemplate } from '../templates/MinimalBlancTemplate';
import { DarkHackerTemplate } from '../templates/DarkHackerTemplate';
import { BoldEditorialTemplate } from '../templates/BoldEditorialTemplate';
import { OrganicSoftTemplate } from '../templates/OrganicSoftTemplate';
import { CorporateTemplate } from '../templates/CorporateTemplate';
import { GlassTemplate } from '../templates/GlassTemplate';
import { RetroTemplate } from '../templates/RetroTemplate';
import { LuxuryTemplate } from '../templates/LuxuryTemplate';
import { StartupTemplate } from '../templates/StartupTemplate';
import { CyberTemplate } from '../templates/CyberTemplate';
import { Monitor, Tablet, Smartphone, Save, Palette, Type, Layout, MessageSquare, Undo, Redo } from 'lucide-react';

interface VisualEditorProps {
  client: any;
  onSave: (updatedClient: any) => Promise<void>;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ client, onSave }) => {
  // Estado de Customização
  const [template, setTemplate] = useState(client.template_id || 'modern');
  const [brand, setBrand] = useState(client.brand_settings || {});
  const [customDomain, setCustomDomain] = useState(client.custom_domain || '');
  const [activeTab, setActiveTab] = useState('colors');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);

  // Mapeamento de Templates
  const templates: Record<string, any> = {
    modern: { name: 'Modern Conversion', component: ModernTemplate },
    minimalist: { name: 'Industrial Minimal', component: MinimalistTemplate },
    creative: { name: 'Creative Agency', component: CreativeTemplate },
    retail: { name: 'Retail / Sales', component: RetailTemplate },
    apple: { name: 'Apple Precision', component: AppleTemplate },
    linear: { name: 'Linear Stealth', component: LinearTemplate },
    stripe: { name: 'Stripe Flow', component: StripeTemplate },
    airbnb: { name: 'Airbnb Comfort', component: AirbnbTemplate },
    fintech: { name: 'Fintech Sleek', component: FintechTemplate },
    saas: { name: 'SaaS Velocity', component: SaaSTemplate },
    minimal_blanc: { name: 'Minimal Blanc', component: MinimalBlancTemplate },
    dark_hacker: { name: 'Dark Hacker', component: DarkHackerTemplate },
    bold_editorial: { name: 'Bold Editorial', component: BoldEditorialTemplate },
    organic_soft: { name: 'Organic Soft', component: OrganicSoftTemplate },
    corporate: { name: 'Corporate Pro', component: CorporateTemplate },
    glass: { name: 'Glassmorphism', component: GlassTemplate },
    retro: { name: 'Retro Groovy', component: RetroTemplate },
    luxury: { name: 'Luxury Gold', component: LuxuryTemplate },
    startup: { name: 'Startup Energy', component: StartupTemplate },
    cyber: { name: 'Cyber Punk', component: CyberTemplate },
  };

  const SelectedTemplate = templates[template]?.component || ModernTemplate;

  // Injeção de CSS Variables para o Preview
  const previewStyles = useMemo(() => ({
    '--primary-color': brand.primary_color || '#6366f1',
    '--font-sans': brand.font_family || 'Inter',
    '--bg-color': brand.bg_color || '#ffffff',
    '--text-color': brand.text_color || '#0f172a',
  } as React.CSSProperties), [brand]);

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBrand((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setBrand((prev: any) => ({ ...prev, [field]: value }));
    }
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
    <div className="flex flex-col lg:flex-row h-[85vh] bg-[#050508] rounded-[32px] overflow-hidden border border-white/5">
      
      {/* 1. SIDEBAR CONTROLS */}
      <aside className="w-full lg:w-96 border-r border-white/5 flex flex-col bg-white/[0.01]">
        
        {/* Tab Navigation */}
        <nav className="flex p-2 bg-white/5 border-b border-white/5">
          {[
            { id: 'colors', icon: Palette },
            { id: 'typography', icon: Type },
            { id: 'layout', icon: Layout },
            { id: 'content', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex justify-center rounded-lg transition-all ${activeTab === tab.id ? 'bg-indigo-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              <tab.icon size={18} />
            </button>
          ))}
        </nav>

        {/* Scrollable Configs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Paleta Cromática</h4>
              <ColorPicker 
                label="Cor Primária" 
                value={brand.primary_color || '#6366f1'} 
                onChange={(val) => handleChange('primary_color', val)} 
              />
              <ColorPicker 
                label="Cor de Fundo" 
                value={brand.bg_color || '#ffffff'} 
                onChange={(val) => handleChange('bg_color', val)} 
              />
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Tipografia</h4>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Fonte Principal</label>
                <select 
                  value={brand.font_family || 'Inter'}
                  onChange={(e) => handleChange('font_family', e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-500"
                >
                  <option value="Inter">Inter (SaaS)</option>
                  <option value="Outfit">Outfit (Modern)</option>
                  <option value="Playfair Display">Playfair (Luxury)</option>
                  <option value="Montserrat">Montserrat (Retail)</option>
                  <option value="JetBrains Mono">JetBrains (Tech)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Templates de Elite</h4>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(templates).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => setTemplate(id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${template === id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}
                  >
                    <p className="text-xs font-bold uppercase tracking-tight">{info.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Dados do Cliente</h4>
              <Input 
                label="Nome da Empresa" 
                value={brand.company_name || client.name} 
                onChange={(e) => handleChange('company_name', e.target.value)} 
              />
              <Input 
                label="WhatsApp" 
                value={brand.contact_whatsapp || ''} 
                onChange={(e) => handleChange('contact_whatsapp', e.target.value)} 
              />
              <Input 
                label="Endereço" 
                value={brand.address || ''} 
                onChange={(e) => handleChange('address', e.target.value)} 
              />
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 space-y-3">
          <Button 
            variant="primary" 
            className="w-full" 
            onClick={handleSave} 
            isLoading={saving}
          >
            <Save size={16} className="mr-2" /> Salvar & Publicar
          </Button>
          <p className="text-[9px] text-center text-white/20 uppercase tracking-widest">
            As alterações levam até 100ms para refletir.
          </p>
        </div>
      </aside>

      {/* 2. PREVIEW AREA */}
      <main className="flex-1 bg-black/40 flex flex-col relative">
        
        {/* Viewport Toggles */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex p-1.5 bg-[#12121a] border border-white/10 rounded-full shadow-2xl backdrop-blur-xl">
          {[
            { id: 'mobile', icon: Smartphone },
            { id: 'tablet', icon: Tablet },
            { id: 'desktop', icon: Monitor },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setViewport(v.id as any)}
              className={`p-2.5 rounded-full transition-all ${viewport === v.id ? 'bg-indigo-500 text-white shadow-xl' : 'text-white/30 hover:text-white'}`}
            >
              <v.icon size={16} />
            </button>
          ))}
        </div>

        {/* Preview Frame */}
        <div className="flex-1 flex items-center justify-center p-8 pt-20 overflow-hidden">
          <div 
            className={`bg-white transition-all duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden h-full rounded-2xl ${
              viewport === 'mobile' ? 'w-[375px]' : viewport === 'tablet' ? 'w-[768px]' : 'w-full'
            }`}
          >
            <div 
              id="preview-root"
              className="h-full overflow-y-auto custom-scrollbar"
              style={previewStyles}
            >
              <SelectedTemplate 
                client={{ ...client, brand_settings: brand, template_id: template }} 
                page={{ service_name: "Preview do Serviço", location: "Sua Cidade" }} 
              />
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};
