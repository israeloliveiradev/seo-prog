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
import { ModularTemplate } from '../templates/ModularTemplate';
import { GoogleFontsLoader } from '../templates/GoogleFontsLoader';

import { 
  Monitor, Tablet, Smartphone, Save, Palette, Type, Layout, 
  MessageSquare, Settings2, Image as ImageIcon, Eye, EyeOff, 
  RotateCcw, MousePointer2, CheckCircle2, Move, ArrowUp, ArrowDown, Trash2, Plus, BarChart3
} from 'lucide-react';

interface VisualEditorProps {
  client: any;
  onSave: (updatedClient: any) => Promise<void>;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ client, onSave }) => {
  // Estado de Customização - Inicialização Segura
  const [template, setTemplate] = useState(client.template_id || 'modern');
  const [brand, setBrand] = useState({
    primary_color: '#6366f1',
    secondary_color: '#f43f5e',
    accent_color: '#8b5cf6',
    bg_color: '#ffffff',
    text_color: '#0f172a',
    border_radius: '1rem',
    section_spacing: '5rem',
    font_family: 'Inter',
    font_secondary: 'Inter',
    cta_text: 'Solicitar Orçamento',
    hero_image: '',
    logo_url: '',
    layout_order: ['hero', 'specs', 'gallery'],
    show_testimonials: true,
    show_faq: true,
    show_stats: true,
    ...client.brand_settings
  });
  
  const [customDomain, setCustomDomain] = useState(client.custom_domain || '');
  const [activeTab, setActiveTab] = useState('identity');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
    modular: { name: 'Modular Canvas (Beta)', component: ModularTemplate },
  };

  const SelectedTemplate = templates[template]?.component || ModernTemplate;

  // Injeção de CSS Variables para o Preview
  const previewStyles = useMemo(() => ({
    '--primary-color': brand.primary_color,
    '--secondary-color': brand.secondary_color,
    '--accent-color': brand.accent_color,
    '--bg-color': brand.bg_color,
    '--text-color': brand.text_color,
    '--border-radius': brand.border_radius,
    '--font-sans': brand.font_family,
    '--font-serif': brand.font_secondary,
  } as React.CSSProperties), [brand]);

  const handleChange = (field: string, value: any) => {
    setBrand((prev: any) => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ 
        ...client, 
        template_id: template, 
        brand_settings: brand, 
        custom_domain: customDomain 
      });
      setHasChanges(false);
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    if (confirm('Deseja resetar as cores e estilos para o padrão do template?')) {
      setBrand((prev: any) => ({
        ...prev,
        primary_color: '#6366f1',
        secondary_color: '#f43f5e',
        accent_color: '#8b5cf6',
        bg_color: '#ffffff',
        text_color: '#0f172a',
        border_radius: '1rem',
      }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[88vh] bg-[#050508] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl relative">
      
      {/* 1. SIDEBAR CONTROLS */}
      <aside className="w-full lg:w-[400px] border-r border-white/5 flex flex-col bg-white/[0.01] z-20">
        
        {/* Tab Navigation - Scrollable on mobile */}
        <nav className="flex overflow-x-auto no-scrollbar p-2 bg-white/5 border-b border-white/5">
          {[
            { id: 'identity', icon: ImageIcon, label: 'Identidade' },
            { id: 'colors', icon: Palette, label: 'Cores' },
            { id: 'typography', icon: Type, label: 'Texto' },
            { id: 'layout', icon: Move, label: 'Estrutura' },
            { id: 'sections', icon: Settings2, label: 'Seções' },
            { id: 'templates', icon: Layout, label: 'Temas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 flex flex-col items-center gap-1.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <tab.icon size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Scrollable Configs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {activeTab === 'identity' && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Identidade Visual</h4>
              <Input 
                label="Nome da Empresa" 
                value={brand.company_name || client.name} 
                onChange={(e) => handleChange('company_name', e.target.value)} 
              />
              <Input 
                label="URL do Logo" 
                placeholder="https://exemplo.com/logo.png"
                value={brand.logo_url} 
                onChange={(e) => handleChange('logo_url', e.target.value)} 
              />
              <Input 
                label="Imagem Hero (Principal)" 
                placeholder="URL da imagem principal"
                value={brand.hero_image} 
                onChange={(e) => handleChange('hero_image', e.target.value)} 
              />
              <Input 
                label="Texto do Botão (CTA)" 
                value={brand.cta_text} 
                onChange={(e) => handleChange('cta_text', e.target.value)} 
              />
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Paleta Cromática</h4>
                 <button onClick={resetToDefault} className="text-[9px] font-black uppercase text-white/20 hover:text-red-400 flex items-center gap-1 transition-colors">
                    <RotateCcw size={10} /> Resetar
                 </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <ColorPicker label="Cor Primária" value={brand.primary_color} onChange={(val) => handleChange('primary_color', val)} />
                <ColorPicker label="Cor Secundária" value={brand.secondary_color} onChange={(val) => handleChange('secondary_color', val)} />
                <ColorPicker label="Cor de Destaque" value={brand.accent_color} onChange={(val) => handleChange('accent_color', val)} />
                <ColorPicker label="Fundo da Página" value={brand.bg_color} onChange={(val) => handleChange('bg_color', val)} />
                <ColorPicker label="Cor do Texto" value={brand.text_color} onChange={(val) => handleChange('text_color', val)} />
              </div>
              
              <div className="space-y-3 pt-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Espaçamento entre Seções</label>
                 <div className="grid grid-cols-4 gap-2">
                    {['2rem', '5rem', '8rem', '12rem'].map((s) => (
                       <button
                          key={s}
                          onClick={() => handleChange('section_spacing', s)}
                          className={`py-3 border rounded-lg text-[10px] font-bold transition-all ${brand.section_spacing === s ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                       >
                          {s === '2rem' ? 'COMP' : s === '12rem' ? 'WIDE' : s.split('rem')[0] + 'U'}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-3 pt-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Arredondamento (Radius)</label>
                 <div className="grid grid-cols-4 gap-2">
                    {['0px', '0.5rem', '1.5rem', '999px'].map((r) => (
                       <button
                          key={r}
                          onClick={() => handleChange('border_radius', r)}
                          className={`py-3 border rounded-lg text-[10px] font-bold transition-all ${brand.border_radius === r ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                       >
                          {r === '0px' ? 'SQ' : r === '999px' ? 'RD' : r.split('.')[0] + 'PX'}
                       </button>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Tipografia</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Fonte Principal (Títulos)</label>
                  <select 
                    value={brand.font_family}
                    onChange={(e) => handleChange('font_family', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    {['Inter', 'Outfit', 'Playfair Display', 'Montserrat', 'JetBrains Mono', 'Poppins', 'Syne'].map(f => (
                       <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Fonte Secundária (Corpo)</label>
                  <select 
                    value={brand.font_secondary}
                    onChange={(e) => handleChange('font_secondary', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    {['Inter', 'Roboto', 'Open Sans', 'Lato', 'Outfit'].map(f => (
                       <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Estrutura de Blocos</h4>
              <p className="text-[10px] text-white/30 font-medium italic">Arranje os blocos na ordem desejada.</p>
              
              <div className="space-y-3">
                {(brand.layout_order || []).map((blockId: string, i: number) => (
                  <div key={blockId} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group">
                    <div className="flex items-center gap-3">
                       <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                       <span className="text-xs font-bold uppercase tracking-tight text-white/70">{blockId}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => {
                          const newOrder = [...brand.layout_order];
                          if (i > 0) {
                            [newOrder[i], newOrder[i-1]] = [newOrder[i-1], newOrder[i]];
                            handleChange('layout_order', newOrder);
                          }
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"
                       >
                         <ArrowUp size={14} />
                       </button>
                       <button 
                        onClick={() => {
                          const newOrder = [...brand.layout_order];
                          if (i < newOrder.length - 1) {
                            [newOrder[i], newOrder[i+1]] = [newOrder[i+1], newOrder[i]];
                            handleChange('layout_order', newOrder);
                          }
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"
                       >
                         <ArrowDown size={14} />
                       </button>
                       <button 
                        onClick={() => {
                          const newOrder = brand.layout_order.filter((id: string) => id !== blockId);
                          handleChange('layout_order', newOrder);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                       >
                         <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                 <button 
                  onClick={() => {
                    const blockId = prompt('Nome do novo bloco (ex: specs, gallery, hero):');
                    if (blockId) {
                      const newOrder = [...(brand.layout_order || []), blockId];
                      handleChange('layout_order', newOrder);
                    }
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/20 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
                 >
                   <Plus size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Adicionar Bloco</span>
                 </button>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Visibilidade de Seções</h4>
              <div className="space-y-2">
                {[
                  { id: 'show_testimonials', label: 'Depoimentos', icon: MessageSquare },
                  { id: 'show_faq', label: 'FAQ / Perguntas', icon: Settings2 },
                  { id: 'show_stats', label: 'Estatísticas', icon: BarChart3 },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleChange(s.id, !brand[s.id])}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${brand[s.id] ? 'bg-indigo-500/10 border-indigo-500/30 text-white' : 'bg-white/5 border-transparent text-white/40'}`}
                  >
                    <div className="flex items-center gap-3">
                       <s.icon size={18} />
                       <span className="text-xs font-bold tracking-tight">{s.label}</span>
                    </div>
                    {brand[s.id] ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Templates de Elite</h4>
              <div className="grid grid-cols-1 gap-3 pb-20">
                {Object.entries(templates).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => { setTemplate(id); setHasChanges(true); }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative group overflow-hidden ${template === id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                       <p className="text-xs font-black uppercase tracking-tight">{info.name}</p>
                       {template === id && <CheckCircle2 size={16} className="text-indigo-500" />}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mb-12 -mr-12 transition-transform duration-500 group-hover:scale-150`} />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 space-y-4 bg-[#050508]/80 backdrop-blur-xl">
          <Button 
            variant="primary" 
            className={`w-full h-14 rounded-2xl transition-all ${hasChanges ? 'scale-105 shadow-xl shadow-indigo-500/40' : 'opacity-70 grayscale'}`}
            onClick={handleSave} 
            isLoading={saving}
          >
            <Save size={18} className="mr-2" /> 
            {hasChanges ? 'Publicar Alterações' : 'Tudo em Dia'}
          </Button>
          <div className="flex justify-center items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Autosave habilitado localmente
          </div>
        </div>
      </aside>

      {/* 2. PREVIEW AREA */}
      <main className="flex-1 bg-[#0a0a0f] flex flex-col relative overflow-hidden">
        
        {/* Floating Top Bar for Viewports */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050508]/50 backdrop-blur-md relative z-10">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-white/20">Live Preview Mode</span>
           </div>

           <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            {[
              { id: 'mobile', icon: Smartphone, label: 'Mobile' },
              { id: 'tablet', icon: Tablet, label: 'Tablet' },
              { id: 'desktop', icon: Monitor, label: 'Desktop' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewport(v.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${viewport === v.id ? 'bg-white/10 text-white shadow-inner' : 'text-white/20 hover:text-white/40'}`}
              >
                <v.icon size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{v.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-white/20">
             <span className="text-[10px] font-mono tracking-widest">{viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '768px' : '1440px'} × AUTO</span>
          </div>
        </div>

        {/* Preview Frame with Device Mockup Effect */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-hidden perspective-1000">
          <div 
            className={`bg-white transition-all duration-700 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden h-full border-[10px] border-[#1a1a1f] relative group ${
              viewport === 'mobile' ? 'w-[375px] rounded-[60px]' : viewport === 'tablet' ? 'w-[768px] rounded-[40px]' : 'w-full rounded-[20px]'
            }`}
          >
            {/* Simulation of Notch for Mobile */}
            {viewport === 'mobile' && (
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1f] rounded-b-[20px] z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
               </div>
            )}

            <div 
              id="preview-root"
              className="h-full overflow-y-auto custom-scrollbar bg-white"
              style={{ 
                ...previewStyles, 
                fontFamily: `'${brand.font_secondary}', sans-serif`,
                '--section-spacing': brand.section_spacing
              } as any}
            >
              <GoogleFontsLoader fontFamily={brand.font_family} />
              {brand.font_family !== brand.font_secondary && (
                <GoogleFontsLoader fontFamily={brand.font_secondary} />
              )}
              <style dangerouslySetInnerHTML={{ __html: `
                #preview-root h1, #preview-root h2, #preview-root h3, 
                #preview-root h4, #preview-root h5, #preview-root h6 {
                  font-family: '${brand.font_family}', sans-serif !important;
                }
                #preview-root section {
                  padding-top: var(--section-spacing, 5rem) !important;
                  padding-bottom: var(--section-spacing, 5rem) !important;
                }
              ` }} />
              <SelectedTemplate 
                client={{ ...client, brand_settings: brand, template_id: template }} 
                page={{ 
                  service_name: "Visual Preview", 
                  location: brand.company_name || client.name,
                  meta_description: "Este é um exemplo de como seu site ficará após as edições. Tudo aqui é customizável em tempo real.",
                  ai_content: `
                    <h2 class="text-3xl font-black">Design de Elite</h2>
                    <p>O seu site é a sua vitrine digital. Com o nosso editor, você tem controle total sobre cada pixel, garantindo que a sua marca transmita confiança e autoridade.</p>
                  `
                }} 
              />
            </div>

            {/* Mouse Pointer Simulation */}
            <div className="absolute top-1/2 left-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <MousePointer2 className="text-indigo-500 fill-indigo-500 drop-shadow-lg" size={24} />
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};
