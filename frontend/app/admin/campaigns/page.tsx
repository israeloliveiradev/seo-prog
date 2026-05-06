'use client';

import { useState } from 'react';
import CampaignManager from '@/components/admin/CampaignManager';
import BulkSeeder from '@/components/admin/BulkSeeder';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'seed'>('create');

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Operações</h1>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">Motor de Produção Industrial</p>
        </div>
        
        {/* Switcher de Operação */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('create')}
             className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'create' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
           >
             Gerenciar Campanhas
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
                 <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6">Criar Nova Estratégia</p>
                 <CampaignManager />
              </div>
           </div>
         ) : (
           <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <BulkSeeder />
           </div>
         )}
      </div>

      {/* Footer Técnico */}
      <div className="pt-12 flex items-center gap-6 opacity-20 grayscale">
         <div className="text-[10px] font-mono">[CMD] OPERATIONAL_MODE: ACTIVE</div>
         <div className="text-[10px] font-mono">[LOG] QUEUE_STATUS: STABLE</div>
         <div className="text-[10px] font-mono">[VER] SYSTEM_BUILD: 2.0.4</div>
      </div>
    </div>
  );
}
