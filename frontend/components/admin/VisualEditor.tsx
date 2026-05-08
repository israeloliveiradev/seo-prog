'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ColorPicker } from '../ui/ColorPicker';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ModularTemplate } from '../templates/ModularTemplate';
import { GoogleFontsLoader } from '../templates/GoogleFontsLoader';

import { 
  ImageIcon, Layout, Palette, Type, Settings2, Plus, Zap, Star, Shield, 
  Smartphone, Tablet, Monitor, Save, ArrowLeft, ArrowUp, ArrowDown, 
  ChevronRight, X, MousePointer2, LayoutGrid, Trash2, Globe
} from 'lucide-react';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
};

interface VisualEditorProps {
  client: any;
  onSave: (updatedClient: any) => Promise<void>;
  onClose?: () => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ client, onSave, onClose }) => {
  const [template, setTemplate] = useState(client.template_id || 'modular');
  
  // Inicialização robusta do estado brand
  const [brand, setBrand] = useState(() => {
    const defaultData = {
      company_name: client.name,
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
      design_mode: 'modern',
      shadow_intensity: 'soft',
      sections_data: {
        hero: { type: 'hero', title: client.name },
        specs: { type: 'specs', title: 'Especificações' },
        gallery: { type: 'gallery', title: 'Galeria' }
      }
    };

    // Mesclar com configurações existentes
    const existing = typeof client.brand_settings === 'string' 
      ? JSON.parse(client.brand_settings) 
      : client.brand_settings || {};
      
    return { ...defaultData, ...existing };
  });
  
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewStack, setViewStack] = useState<string[]>(['root']);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const activeView = viewStack[viewStack.length - 1];

  const previewStyles = useMemo(() => ({
    '--primary': brand.primary_color,
    '--primary-rgb': hexToRgb(brand.primary_color),
    '--secondary': brand.secondary_color,
    '--accent': brand.accent_color,
    '--background': brand.bg_color,
    '--foreground': brand.text_color,
    '--border-radius': brand.border_radius,
    '--section-spacing': brand.section_spacing,
    '--font-sans': `'${brand.font_family}', sans-serif`,
    '--font-serif': `'${brand.font_secondary}', sans-serif`,
  } as React.CSSProperties), [brand]);

  const handleChange = (field: string, value: any) => {
    setBrand((prev: any) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSectionDataChange = (blockId: string, field: string, value: any) => {
    setBrand((prev: any) => {
      const newSectionsData = { ...prev.sections_data } as any;
      newSectionsData[blockId] = { ...newSectionsData[blockId], [field]: value };
      return { ...prev, sections_data: newSectionsData };
    });
    setHasChanges(true);
  };

  const pushView = (view: string) => setViewStack((prev: string[]) => [...prev, view]);
  const popView = () => setViewStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

  // --- LÓGICA DE MANIPULAÇÃO ---
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...brand.layout_order];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    handleChange('layout_order', newOrder);
  };

  const deleteSection = (id: string) => {
    const newOrder = brand.layout_order.filter((sid: string) => sid !== id);
    handleChange('layout_order', newOrder);
  };

  const addSection = (type: string) => {
    const id = `${type}_${Math.random().toString(36).substr(2, 5)}`;
    const newOrder = [...brand.layout_order, id];
    setBrand((prev: any) => ({
      ...prev,
      layout_order: newOrder,
      sections_data: {
        ...prev.sections_data,
        [id]: { type, title: `Nova Seção ${type}` }
      }
    }));
    setHasChanges(true);
  };

  const applyPreset = (niche: string) => {
    const presets: any = {
      'Moderno': { primary_color: '#6366f1', design_mode: 'modern', border_radius: '1rem' },
      'Luxury': { primary_color: '#d4af37', design_mode: 'luxury', border_radius: '0px' },
      'Cyber': { primary_color: '#00ffcc', design_mode: 'cyber', border_radius: '0.2rem', bg_color: '#050508', text_color: '#ffffff' },
      'Glass': { primary_color: '#60a5fa', design_mode: 'glass', border_radius: '2rem' },
      'Petshop': {
        primary_color: '#f43f5e',
        secondary_color: '#fb923c',
        font_family: 'Outfit',
        design_mode: 'modern',
        border_radius: '2rem',
        layout_order: ['hero', 'gallery', 'trust', 'faq'],
        sections_data: {
          hero: { type: 'hero', badge: '🐾 Cuidado com Amor', title: 'O Melhor Amigo do seu Pet' },
          gallery: { type: 'gallery', title: 'Nossos Serviços' }
        }
      },
      'Geladeira': {
        primary_color: '#0ea5e9',
        secondary_color: '#64748b',
        font_family: 'Inter',
        design_mode: 'luxury',
        border_radius: '0.5rem',
        layout_order: ['hero', 'specs', 'trust', 'pricing'],
        sections_data: {
          hero: { type: 'hero', badge: '❄️ Assistência Técnica', title: 'Conserto de Geladeiras' },
          specs: { type: 'specs', title: 'O que consertamos' }
        }
      },
      'SaaS': {
        primary_color: '#6366f1',
        design_mode: 'glass',
        font_family: 'Inter',
        border_radius: '1rem',
        layout_order: ['hero', 'specs', 'bento', 'pricing', 'faq'],
        sections_data: {
          hero: { type: 'hero', badge: '🚀 Lançamento v2.0', title: 'Escale seu Negócio com IA' }
        }
      },
      'Advocacia': {
        primary_color: '#1e293b',
        accent_color: '#94a3b8',
        font_family: 'Playfair Display',
        design_mode: 'luxury',
        border_radius: '0px',
        layout_order: ['hero', 'trust', 'specs', 'faq'],
        sections_data: {
          hero: { type: 'hero', badge: '⚖️ Assessoria Jurídica', title: 'Justiça e Compromisso' }
        }
      },
      'Odonto': {
        primary_color: '#06b6d4',
        font_family: 'Plus Jakarta Sans',
        design_mode: 'modern',
        border_radius: '1.5rem',
        layout_order: ['hero', 'gallery', 'trust', 'faq'],
        sections_data: {
          hero: { type: 'hero', badge: '✨ Sorriso Perfeito', title: 'Excelência em Odontologia' }
        }
      }
    };
    if (presets[niche]) {
      setBrand((prev: any) => ({ ...prev, ...presets[niche] }));
      setHasChanges(true);
    }
  };

  const SelectedTemplate = template === 'modular' ? ModularTemplate : ModernTemplate;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...client, brand_settings: brand, template_id: template });
      setHasChanges(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f] text-white flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR PROFISSIONAL */}
      <aside className="w-[360px] flex-shrink-0 bg-[#111118] border-r border-white/5 flex flex-col z-20 shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Zap size={18} className="text-white" />
             </div>
             <div>
                <h2 className="text-sm font-black uppercase tracking-tight">Editor Visual</h2>
                <p className="text-[10px] text-white/40 uppercase font-bold">{brand.company_name}</p>
             </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={18} className="text-white/40" />
            </button>
          )}
        </div>

        {/* ÁREA DE CONTEÚDO (Drill-down) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {/* VISÃO RAIZ */}
          {activeView === 'root' && (
            <div className="p-4 space-y-2">
               <NavButton icon={ImageIcon} label="Identidade Visual" onClick={() => pushView('identity')} />
               <NavButton icon={Layout} label="Seções da Página" onClick={() => pushView('sections')} />
               <NavButton icon={Palette} label="Cores do Tema" onClick={() => pushView('colors')} />
               <NavButton icon={Type} label="Tipografia" onClick={() => pushView('typography')} />
               <NavButton icon={Settings2} label="Configurações Pro" onClick={() => pushView('settings')} />
               <NavButton icon={Globe} label="SEO & Domínio" onClick={() => pushView('seo')} />
               
               <div className="pt-8 px-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Estilos de Nicho (Presets)</p>
                  <div className="grid grid-cols-2 gap-2">
                     {['Moderno', 'Luxury', 'Cyber', 'Glass', 'Petshop', 'Geladeira', 'SaaS', 'Advocacia', 'Odonto', 'Imóveis'].map(p => (
                       <button 
                        key={p} 
                        onClick={() => applyPreset(p)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold hover:bg-indigo-500 transition-all uppercase tracking-tighter"
                       >
                         {p}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {/* VISÃO IDENTIDADE */}
          {activeView === 'identity' && (
            <ViewContainer title="Identidade" onBack={popView}>
               <Input label="Nome da Marca" value={brand.company_name} onChange={(e) => handleChange('company_name', e.target.value)} />
               <Input label="Logo URL" value={brand.logo_url} onChange={(e) => handleChange('logo_url', e.target.value)} />
               <Input label="Hero Image" value={brand.hero_image} onChange={(e) => handleChange('hero_image', e.target.value)} />
               <Input label="Texto do Botão (CTA)" value={brand.cta_text} onChange={(e) => handleChange('cta_text', e.target.value)} />
            </ViewContainer>
          )}

          {/* VISÃO SEÇÕES */}
          {activeView === 'sections' && (
            <ViewContainer title="Seções" onBack={popView}>
               <p className="text-[10px] text-white/30 italic mb-4">Gerencie a ordem e blocos da página.</p>
               <div className="space-y-3">
                 {brand.layout_order.map((id: string, i: number) => (
                   <div key={id} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl group">
                      <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => moveSection(i, 'up')} className="p-1 hover:text-indigo-400 disabled:opacity-0" disabled={i === 0}><ArrowUp size={12}/></button>
                         <button onClick={() => moveSection(i, 'down')} className="p-1 hover:text-indigo-400 disabled:opacity-0" disabled={i === brand.layout_order.length - 1}><ArrowDown size={12}/></button>
                      </div>
                      <button 
                        onClick={() => pushView(`edit-${id}`)}
                        className="flex-1 text-left"
                      >
                         <p className="text-[10px] font-black uppercase text-indigo-400 mb-0.5">Bloco #{i+1}</p>
                         <p className="text-xs font-bold uppercase tracking-tight">{id.split('_')[0]}</p>
                      </button>
                      <button onClick={() => deleteSection(id)} className="p-2 opacity-0 group-hover:opacity-100 text-white/20 hover:text-rose-500 transition-all">
                         <Trash2 size={14} />
                      </button>
                   </div>
                 ))}
               </div>

               <div className="pt-8 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Novo Bloco</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['hero', 'gallery', 'specs', 'pricing', 'faq', 'trust'].map(type => (
                      <button 
                        key={type}
                        onClick={() => addSection(type)}
                        className="p-3 border border-white/5 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all"
                      >
                        + {type}
                      </button>
                    ))}
                  </div>
               </div>
            </ViewContainer>
          )}

          {/* EDIÇÃO DINÂMICA DE BLOCOS */}
          {activeView.startsWith('edit-') && (
            <ViewContainer title={`Editar ${activeView.split('-')[1]}`} onBack={popView}>
               <Input 
                label="Título Principal" 
                value={brand.sections_data?.[activeView.split('-')[1]]?.title || ''} 
                onChange={(e) => handleSectionDataChange(activeView.split('-')[1], 'title', e.target.value)} 
               />
               <Input 
                label="Badge / Subtítulo" 
                value={brand.sections_data?.[activeView.split('-')[1]]?.badge || ''} 
                onChange={(e) => handleSectionDataChange(activeView.split('-')[1], 'badge', e.target.value)} 
               />
               <Input 
                label="Descrição" 
                textarea
                value={brand.sections_data?.[activeView.split('-')[1]]?.description || ''} 
                onChange={(e) => handleSectionDataChange(activeView.split('-')[1], 'description', e.target.value)} 
               />
            </ViewContainer>
          )}

          {/* VISÃO CORES */}
          {activeView === 'colors' && (
            <ViewContainer title="Cores e Estilo" onBack={popView}>
               <ColorPicker label="Cor Primária" value={brand.primary_color} onChange={(val) => handleChange('primary_color', val)} />
               <ColorPicker label="Fundo da Página" value={brand.bg_color} onChange={(val) => handleChange('bg_color', val)} />
               <ColorPicker label="Cor do Texto" value={brand.text_color} onChange={(val) => handleChange('text_color', val)} />
               
               <div className="pt-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-3">Modo de Design</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['modern', 'glass', 'luxury', 'cyber'].map(m => (
                      <button 
                        key={m}
                        onClick={() => handleChange('design_mode', m)}
                        className={`p-4 border rounded-2xl text-[10px] font-black uppercase transition-all ${brand.design_mode === m ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
               </div>
            </ViewContainer>
          )}

          {/* VISÃO TIPOGRAFIA */}
          {activeView === 'typography' && (
            <ViewContainer title="Tipografia" onBack={popView}>
               <Input label="Fonte Títulos (Google Fonts)" value={brand.font_family} onChange={(e) => handleChange('font_family', e.target.value)} />
               <Input label="Fonte Corpo" value={brand.font_secondary} onChange={(e) => handleChange('font_secondary', e.target.value)} />
               <Input label="Espaçamento Seções (rem/px)" value={brand.section_spacing} onChange={(e) => handleChange('section_spacing', e.target.value)} />
            </ViewContainer>
          )}

          {/* VISÃO CONFIGURAÇÕES PRO */}
          {activeView === 'settings' && (
            <ViewContainer title="Configurações Pro" onBack={popView}>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-indigo-400">Contato & Social</h4>
                  <Input label="WhatsApp (Ex: 5511999999999)" value={brand.contact_whatsapp || ''} onChange={(e) => handleChange('contact_whatsapp', e.target.value)} />
                  <Input label="E-mail de Contato" value={brand.contact_email || ''} onChange={(e) => handleChange('contact_email', e.target.value)} />
                  <Input label="Endereço Físico" value={brand.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
               </div>
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase text-indigo-400">Links Externos</h4>
                  <Input label="Instagram URL" value={brand.instagram_url || ''} onChange={(e) => handleChange('instagram_url', e.target.value)} />
                  <Input label="Facebook URL" value={brand.facebook_url || ''} onChange={(e) => handleChange('facebook_url', e.target.value)} />
               </div>
            </ViewContainer>
          )}

          {/* VISÃO SEO */}
          {activeView === 'seo' && (
            <ViewContainer title="SEO & Domínio" onBack={popView}>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-indigo-400">Otimização de Busca</h4>
                  <Input 
                    label="Template de Título (Meta Title)" 
                    placeholder="{{service}} em {{location}} | {{brand}}"
                    value={brand.meta_title_template || ''} 
                    onChange={(e) => handleChange('meta_title_template', e.target.value)} 
                  />
                  <Input 
                    label="Favicon URL (.ico ou .png)" 
                    value={brand.favicon_url || ''} 
                    onChange={(e) => handleChange('favicon_url', e.target.value)} 
                  />
                  <Input 
                    label="Google Analytics ID" 
                    placeholder="G-XXXXXXXXXX"
                    value={brand.analytics_id || ''} 
                    onChange={(e) => handleChange('analytics_id', e.target.value)} 
                  />
               </div>
            </ViewContainer>
          )}

        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-6 border-t border-white/5 bg-[#0a0a0f]">
           <Button 
            className={`w-full h-14 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${hasChanges ? 'bg-indigo-600 shadow-xl shadow-indigo-500/20 active:scale-95' : 'bg-white/5 text-white/20 pointer-events-none'}`}
            onClick={handleSave}
            isLoading={saving}
           >
              <Save size={18} className="mr-2" /> Publicar Alterações
           </Button>
        </div>
      </aside>

      {/* 2. ÁREA DE PREVIEW (Canvas) */}
      <main className="flex-1 flex flex-col relative bg-[#050508]">
        
        {/* Barra de Ferramentas Preview */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#111118]/80 backdrop-blur-xl z-30">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 Preview em Tempo Real
              </span>
           </div>

           <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
              {[
                { id: 'mobile', icon: Smartphone },
                { id: 'tablet', icon: Tablet },
                { id: 'desktop', icon: Monitor },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewport(v.id as any)}
                  className={`p-2.5 rounded-xl transition-all ${viewport === v.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/20 hover:text-white/40'}`}
                >
                  <v.icon size={16} />
                </button>
              ))}
           </div>

           <div className="w-40 flex justify-end">
             <button className="text-white/20 hover:text-white transition-all"><LayoutGrid size={18}/></button>
           </div>
        </div>

        {/* Container do Site Preview */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-4 md:p-8 lg:p-12 relative">
           <div 
            className={`h-full transition-all duration-700 bg-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-x border-white/5 ${
              viewport === 'mobile' ? 'w-[375px] rounded-[40px]' : viewport === 'tablet' ? 'w-[768px] rounded-[20px]' : 'w-full'
            }`}
           >
              <div 
                id="preview-root"
                className={`h-full overflow-y-auto custom-scrollbar`}
                style={{ ...previewStyles } as any}
              >
                <GoogleFontsLoader fontFamily={brand.font_family} />
                <style dangerouslySetInnerHTML={{ __html: `
                  #preview-root { background-color: var(--background); color: var(--foreground); font-family: var(--font-sans); min-height: 100%; }
                  #preview-root h1, #preview-root h2, #preview-root h3 { font-family: var(--font-sans) !important; }
                  #preview-root section { padding-top: var(--section-spacing); padding-bottom: var(--section-spacing); }
                  #preview-root * { border-radius: inherit; }
                ` }} />
                
                <SelectedTemplate 
                  client={{ ...client, brand_settings: brand }} 
                  page={{ 
                    service_name: "Visualização do Editor", 
                    location: brand.company_name,
                    meta_description: "Veja como seu site está ficando em tempo real.",
                    ai_content: `<h2 class="text-3xl font-black">Lego Engine v3</h2><p>Personalize cada detalhe do seu site com facilidade.</p>`
                  }} 
                />
              </div>
           </div>
        </div>
      </main>

    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const NavButton = ({ icon: Icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full p-4 flex items-center justify-between rounded-2xl hover:bg-white/5 group transition-all"
  >
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
          <Icon size={20} />
       </div>
       <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={16} className="text-white/20 group-hover:text-white/40" />
  </button>
);

const ViewContainer = ({ title, onBack, children }: any) => (
  <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <button onClick={onBack} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4">
       <ArrowLeft size={16} />
       <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
    </button>
    <h3 className="text-2xl font-black tracking-tighter italic uppercase text-white mb-8">{title}</h3>
    <div className="space-y-6">
       {children}
    </div>
  </div>
);
