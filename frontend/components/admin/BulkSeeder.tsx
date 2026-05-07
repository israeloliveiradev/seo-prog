'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function BulkSeeder() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [locationsText, setLocationsText] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase.from('campaigns').select('id, name');
      setCampaigns(data || []);
    };
    fetchCampaigns();
  }, []);

  const slugify = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSeed = async () => {
    const locations = locationsText.split('\n').filter(loc => loc.trim());
    if (!selectedCampaign || !serviceName || locations.length === 0) return;

    setIsSeeding(true);

    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer authenticated'
        },
        body: JSON.stringify({
          locations,
          serviceName,
          campaignId: selectedCampaign
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao semear páginas');

      alert(`Sucesso! ${data.inserted} novas páginas inseridas. ${data.skipped} já existiam.`);
      setLocationsText('');
    } catch (err) {
      alert('Erro: ' + (err as Error).message);
    } finally {
      setIsSeeding(false);
    }
  };

  const locations = locationsText.split('\n').filter(loc => loc.trim());

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        {/* Painel de Entrada */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
             <div className="group relative">
                <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">Campanha Alvo</label>
                <select 
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none"
                >
                    <option value="" className="bg-[#0d0d16]">Selecionar...</option>
                    {campaigns.map(c => <option key={c.id} value={c.id} className="bg-[#0d0d16]">{c.name}</option>)}
                </select>
             </div>
             <div className="group relative">
                <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">Nome do Serviço</label>
                <input 
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="ex: Advocacia Criminal"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
             </div>
          </div>

          <div className="group relative">
            <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">Localidades (1 por linha)</label>
            <textarea 
                value={locationsText}
                onChange={(e) => setLocationsText(e.target.value)}
                placeholder="São Paulo, SP&#10;Rio de Janeiro, RJ"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all min-h-[250px] font-mono text-[11px]"
            />
          </div>

          <button 
            onClick={handleSeed}
            disabled={isSeeding || !selectedCampaign || !serviceName || locations.length === 0}
            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95 disabled:opacity-30"
          >
            {isSeeding ? 'INJETANDO DADOS NO MOTOR...' : 'INICIAR PRODUÇÃO EM MASSA'}
          </button>
        </div>

        {/* Painel de Preview */}
        <div className="space-y-4">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1 block">Live Preview (Slugs)</label>
            <div className="h-[480px] bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto font-mono text-[9px] text-white/20">
                {locations.length > 0 ? (
                    locations.map((loc, i) => (
                        <div key={i} className="flex gap-3 mb-1 group hover:text-indigo-400/50 transition-colors">
                            <span className="text-white/5">[{String(i+1).padStart(3, '0')}]</span>
                            <span className="truncate">/{slugify(`${serviceName} em ${loc}`)}</span>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center italic text-center px-10">
                        Aguardando entrada de dados para visualização...
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
