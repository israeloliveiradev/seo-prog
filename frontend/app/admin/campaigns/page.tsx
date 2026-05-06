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

  useEffect(() => {
    fetchCampaigns();
    if (activeTab === 'pages') fetchLatestPages();
  }, [activeTab]);

  const fetchCampaigns = async () => {
    const { data } = await supabase
      .from('campaigns')
      .select('*, clients(name, subdomain)')
      .order('created_at', { ascending: false });
    setCampaigns(data || []);
  };

  const fetchLatestPages = async () => {
    setIsLoadingPages(true);
    const { data } = await supabase
      .from('generated_pages')
      .select('*, campaigns(name, clients(subdomain))')
      .order('created_at', { ascending: false })
      .limit(50);
    setPages(data || []);
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

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Lista de Campanhas Ativas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all relative group">
             <button 
                onClick={() => handleDeleteCampaign(camp.id)}
                className="absolute top-4 right-4 w-6 h-6 rounded bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white text-[10px]"
             >
                ✕
             </button>
             <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest mb-1">{(camp as any).clients?.name || 'Cliente'}</p>
             <h4 className="font-bold text-white mb-4 uppercase tracking-tighter italic">{camp.name}</h4>
             <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold text-white/40">AUD: {camp.target_audience}</span>
             </div>
          </div>
        ))}
      </section>

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
