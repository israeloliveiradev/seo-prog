/**
 * CampaignManager.tsx — Versão Ultra-Premium (Industrial Cyber)
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';


export default function CampaignManager({ onCampaignCreated }: { onCampaignCreated: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keywordsRaw, setKeywordsRaw] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    setMounted(true);
    // Busca clientes para o seletor
    const fetchClients = async () => {
      const res = await fetch('/api/admin/clients/list');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
        if (data.length > 0) setClientId(data[0].id);
      }
    };
    fetchClients();
    return () => setMounted(false);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(k => k.length > 0);

    try {
      const res = await fetch('/api/admin/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          client_id: clientId,
          target_audience: targetAudience,
          core_keywords: keywords
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.details && Array.isArray(data.details)) {
          // Pega a mensagem do primeiro erro de validação
          const msg = data.details[0].message;
          const path = data.details[0].path.join('.');
          throw new Error(`Campo "${path}": ${msg}`);
        }
        throw new Error(data.error || 'Erro ao criar campanha');
      }

      setName('');
      setTargetAudience('');
      setKeywordsRaw('');
      setIsOpen(false);
      onCampaignCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Botão de Ativação com Glow */}
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative px-6 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 overflow-hidden transition-all hover:border-indigo-400/60"
      >
        <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
        <div className="relative flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
          <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Nova Campanha</span>
        </div>
      </button>

      {/* Modal System */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto pt-10 pb-20 px-6 animate-fadeIn">
          {/* Backdrop Glass */}
          <div 
            className="fixed inset-0 bg-[#050508]/90 backdrop-blur-2xl"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl my-auto">
            {/* Glow Interno */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl blur opacity-20 transition duration-1000"></div>
            
            <div className="relative bg-[#0d0d16] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Header Visual */}
              <div className="relative h-32 flex items-end p-8 bg-gradient-to-br from-indigo-600/20 to-transparent border-b border-white/5">
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    ✕
                  </button>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                    Nova <span className="text-indigo-400">Operação</span>
                  </h3>
                  <p className="text-indigo-300/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                    Setup de Campanha Industrial
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* Field: Cliente */}
                <div className="group relative">
                  <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">
                    Proprietário (Cliente)
                  </label>
                  <select 
                    value={clientId}
                    onChange={e => setClientId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                    required
                  >
                    {clients.length === 0 && <option value="">Carregando inquilinos...</option>}
                    {clients.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0d0d16] text-white">
                        {c.name} ({c.subdomain})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field: Nome */}
                <div className="group relative">
                  <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">
                    Nome da Campanha
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      placeholder="ESTRATÉGIA ALPHA 2024"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.08] transition-all"
                      required
                    />
                    <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>

                {/* Field: Público */}
                <div className="group relative">
                  <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">
                    Target de Audiência
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={targetAudience} 
                      onChange={e => setTargetAudience(e.target.value)} 
                      placeholder="DECISORES DE TI & CTOs"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.08] transition-all"
                      required
                    />
                    <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>

                {/* Field: Keywords */}
                <div className="group relative">
                  <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">
                    Matriz de Keywords
                  </label>
                  <div className="relative">
                    <textarea 
                      value={keywordsRaw} 
                      onChange={e => setKeywordsRaw(e.target.value)} 
                      placeholder="software, cloud, devops, segurança..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.08] transition-all resize-none"
                      rows={2}
                      required
                    />
                    <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 animate-shake">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center">{error}</p>
                  </div>
                )}

                {/* Botão de Ação */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="group relative w-full h-16 rounded-xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-indigo-400 hover:text-white disabled:opacity-50"
                >
                  <span className="relative z-10">{isLoading ? 'Processando...' : 'Iniciar Deploy de Campanha'}</span>
                  <div className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </button>

              </form>

              {/* Detalhe Decorativo Inferior */}
              <div className="px-8 pb-6 flex items-center justify-between">
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/10 rounded-full" />)}
                </div>
                <span className="text-[8px] font-mono text-white/10 uppercase">System-ID: {Math.random().toString(16).slice(2, 8)}</span>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
