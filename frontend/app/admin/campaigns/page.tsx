'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import CampaignManager from '@/components/admin/CampaignManager';
import BulkSeeder from '@/components/admin/BulkSeeder';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'seed' | 'pages'>('create');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editTargetAudience, setEditTargetAudience] = useState('');
  const [editKeywords, setEditKeywords] = useState('');
  const [editCustomPrompt, setEditCustomPrompt] = useState('');

  useEffect(() => {
    fetchCampaigns();
    if (activeTab === 'pages') fetchLatestPages();
  }, [activeTab]);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/admin/campaigns');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error('Erro ao buscar campanhas', err);
      setCampaigns([]);
    }
  };

  const fetchLatestPages = async () => {
    setIsLoadingPages(true);
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      console.error('Erro ao buscar páginas', err);
      setPages([]);
    }
    setIsLoadingPages(false);
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Isso apagará a campanha e TODAS as suas páginas geradas. Confirmar?')) return;
    try {
      const res = await fetch(`/api/admin/campaigns/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer authenticated' }
      });
      if (res.ok) fetchCampaigns();
      else alert('Erro ao excluir campanha.');
    } catch (err) {
      alert('Erro na conexão.');
    }
  };

  const handleRegenerate = async (id: string) => {
    const customPromptValue = window.prompt('Deseja adicionar um tema ou instrução específica para esta regeneração? (Opcional)');
    if (customPromptValue === null) return; // Cancelado

    try {
      const res = await fetch(`/api/admin/campaigns/regenerate?id=${id}`, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer authenticated',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: customPromptValue })
      });
      if (res.ok) alert('🚀 Processamento reiniciado! O robô vai começar a reescrever as páginas.');
      else alert('Erro ao solicitar regeneração.');
    } catch (err) {
      alert('Erro na conexão.');
    }
  };

  const handleEditClick = (camp: any) => {
    setEditingCampaign(camp);
    setEditName(camp.name);
    setEditTargetAudience(camp.target_audience);
    setEditKeywords(Array.isArray(camp.core_keywords) ? camp.core_keywords.join(', ') : '');
    setEditCustomPrompt(camp.custom_prompt || '');
  };

  const handleSaveEdit = async () => {
    if (!editName || !editTargetAudience) return alert('Campos obrigatórios!');
    try {
      const keywordsArray = editKeywords.split(',').map(k => k.trim()).filter(k => k);
      const res = await fetch('/api/admin/campaigns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingCampaign.id,
          name: editName,
          target_audience: editTargetAudience,
          core_keywords: keywordsArray,
          custom_prompt: editCustomPrompt
        })
      });
      if (res.ok) {
        setEditingCampaign(null);
        fetchCampaigns();
      } else {
        alert('Erro ao salvar edição.');
      }
    } catch (err) {
      alert('Erro de conexão ao tentar salvar.');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Lista de Campanhas Ativas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all relative group overflow-hidden">
             {/* Efeito de brilho no hover */}
             <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <button 
                onClick={() => handleEditClick(camp)}
                className="absolute top-4 right-12 w-6 h-6 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-500 hover:text-white text-[10px] z-10"
                title="Editar Campanha"
             >
                ✎
             </button>
             <button 
                onClick={() => handleDeleteCampaign(camp.id)}
                className="absolute top-4 right-4 w-6 h-6 rounded bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white text-[10px] z-10"
                title="Excluir Campanha"
             >
                ✕
             </button>
             <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest mb-1">{(camp as any).clients?.name || 'Cliente'}</p>
             <h4 className="font-bold text-white mb-6 uppercase tracking-tighter italic text-xl">{camp.name}</h4>
             
             <div className="flex flex-col gap-3 relative z-10">
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold text-white/40 uppercase tracking-tighter">Audiência: {camp.target_audience}</span>
                </div>
                <button 
                  onClick={() => handleRegenerate(camp.id)}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-xl"
                >
                  Regenerar Tudo (IA)
                </button>
             </div>
          </div>
        ))}
      </section>

      {/* Modal de Edição */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#0a0a0f] border border-white/10 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setEditingCampaign(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >✕</button>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-6">Editar Campanha</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1 block">Nome da Campanha</label>
                <input 
                  value={editName} onChange={e => setEditName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1 block">Público-Alvo</label>
                <input 
                  value={editTargetAudience} onChange={e => setEditTargetAudience(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1 block">Palavras-chave Core (separadas por vírgula)</label>
                <input 
                  value={editKeywords} onChange={e => setEditKeywords(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1 block">Tema da Empresa / Prompt Customizado</label>
                <textarea 
                  value={editCustomPrompt} onChange={e => setEditCustomPrompt(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white resize-none"
                  rows={2}
                />
              </div>
              <button 
                onClick={handleSaveEdit}
                className="w-full mt-4 py-3 bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-indigo-400 transition-all"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mt-12 border-t border-white/5 pt-10">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white/40">Comandos</h1>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl shadow-2xl">
           <button 
             onClick={() => setActiveTab('create')}
             className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'create' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
           >
             Campanhas
           </button>
           <button 
             onClick={() => setActiveTab('seed')}
             className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'seed' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
           >
             Semeador
           </button>
           <button 
             onClick={() => setActiveTab('pages')}
             className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'pages' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
           >
             Páginas
           </button>
        </div>
      </div>

      <div className="relative">
         {activeTab === 'create' && (
           <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6">Setup de Inteligência</p>
              <CampaignManager onCampaignCreated={() => fetchCampaigns()} />
           </div>
         )}

         {activeTab === 'seed' && (
           <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <BulkSeeder />
           </div>
         )}

         {activeTab === 'pages' && (
           <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Explorador de Links Ativos (Últimas 50)</p>
                <button onClick={fetchLatestPages} className="text-[10px] text-white/20 hover:text-white font-bold uppercase">Atualizar ↻</button>
              </div>

              {isLoadingPages ? (
                <div className="animate-pulse space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl w-full" />)}
                </div>
              ) : (
                <div className="space-y-3">
                    {pages.map(page => {
                        const subdomain = (page.campaigns as any)?.clients?.subdomain;
                        const url = `https://${subdomain}.rankia.cloud/${page.slug}`;
                        return (
                            <div key={page.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${page.status === 'COMPLETED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`} />
                                    <div>
                                        <h5 className="text-[11px] font-bold text-white uppercase italic">{page.service_name} em {page.location}</h5>
                                        <p className="text-[8px] text-white/20 font-mono">{page.slug}</p>
                                    </div>
                                </div>
                                <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] font-black text-indigo-400 uppercase hover:bg-indigo-500 hover:text-white transition-all"
                                >
                                    Abrir Página ↗
                                </a>
                            </div>
                        );
                    })}
                    {pages.length === 0 && <p className="text-center py-10 text-[10px] text-white/10 uppercase font-black">Nenhuma página gerada ainda</p>}
                </div>
              )}
           </div>
         )}
      </div>

      <div className="pt-12 flex items-center gap-6 opacity-20 grayscale">
         <div className="text-[10px] font-mono">[CMD] OPERATIONAL_MODE: ACTIVE</div>
         <div className="text-[10px] font-mono">[LOG] QUEUE_STATUS: STABLE</div>
         <div className="text-[10px] font-mono">[VER] SYSTEM_BUILD: 2.1.0</div>
      </div>
    </div>
  );
}
