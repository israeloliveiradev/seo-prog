'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import CampaignManager from '@/components/admin/CampaignManager';
import BulkSeeder from '@/components/admin/BulkSeeder';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'seed'>('create');
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    // Usamos o cliente anon para listagem no browser
    // Certifique-se de que o RLS no Supabase permite leitura
    const { data } = await supabase
      .from('campaigns')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });
    setCampaigns(data || []);
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
        {campaigns.length === 0 && (
          <div className="col-span-full py-10 border border-dashed border-white/5 rounded-2xl text-center text-[10px] font-bold text-white/10 uppercase tracking-widest">
            Nenhuma campanha estratégica ativa no momento
          </div>
        )}
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
             Criar Campanha
           </button>
           <button 
             onClick={() => setActiveTab('seed')}
             className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'seed' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
           >
             Semeador (Seeder)
           </button>
        </div>
      </div>

      <div className="relative">
         {activeTab === 'create' ? (
           <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                 <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6">Setup de Inteligência</p>
                 <CampaignManager onCampaignCreated={() => fetchCampaigns()} />
              </div>
           </div>
         ) : (
           <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <BulkSeeder />
           </div>
         )}
      </div>

      <div className="pt-12 flex items-center gap-6 opacity-20 grayscale">
         <div className="text-[10px] font-mono">[CMD] OPERATIONAL_MODE: ACTIVE</div>
         <div className="text-[10px] font-mono">[LOG] QUEUE_STATUS: STABLE</div>
         <div className="text-[10px] font-mono">[VER] SYSTEM_BUILD: 2.0.5</div>
      </div>
    </div>
  );
}
