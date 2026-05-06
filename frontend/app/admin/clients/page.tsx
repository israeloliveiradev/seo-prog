'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ClientsManager() {
  const [clients, setClients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/admin/clients/list', {
        headers: { 'Authorization': 'Bearer authenticated' }
      });
      if (res.ok) {
        const data = await res.json();
        setClients(data || []);
      }
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/clients/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer authenticated`
        },
        body: JSON.stringify({
          name,
          subdomain: subdomain.toLowerCase().trim(),
          custom_domain: customDomain || null,
          brand_settings: {
            primary_color: primaryColor,
            company_name: name,
            logo_url: null,
            contact_whatsapp: ''
          }
        })
      });

      if (!res.ok) throw new Error('Falha ao criar cliente. Verifique o subdomínio.');

      setIsModalOpen(false);
      setName('');
      setSubdomain('');
      setCustomDomain('');
      fetchClients();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('ATENÇÃO: Isso apagará o cliente e TODAS as suas campanhas e páginas. Confirmar?')) return;
    
    try {
      const res = await fetch(`/api/admin/clients/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer authenticated' }
      });
      if (res.ok) fetchClients();
      else alert('Erro ao excluir cliente.');
    } catch (err) {
      alert('Erro na conexão.');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Inquilinos</h1>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">Gerenciamento de Instâncias SaaS</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-indigo-400 hover:text-white transition-all shadow-xl"
        >
          Novo Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map(client => (
          <div key={client.id} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden group">
             {/* Botão de Excluir */}
             <button 
                onClick={() => handleDeleteClient(client.id)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                title="Excluir Cliente"
             >
                ✕
             </button>

             <div 
                className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-30 transition-all"
                style={{ backgroundColor: client.brand_settings?.primary_color }}
             />
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">{client.name}</h3>
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{client.id}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div 
                        className="w-4 h-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-white/10" 
                        style={{ backgroundColor: client.brand_settings?.primary_color }}
                    />
                    <a 
                        href={`https://${client.subdomain}.rankia.cloud`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
                    >
                        Ver Site ↗
                    </a>
                </div>
             </div>
             
             <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>Subdomínio:</span>
                    <span className="text-indigo-400">{client.subdomain}.rankia.cloud</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>Custom:</span>
                    <span className="text-white/60">{client.custom_domain || '---'}</span>
                </div>
             </div>
          </div>
        ))}
        {clients.length === 0 && (
          <div className="col-span-full py-20 border border-dashed border-white/5 rounded-3xl text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Nenhum inquilino detectado no sistema</p>
          </div>
        )}
      </div>

      {/* Modal Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0d0d16] border border-white/10 p-10 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Setup de Inquilino</h3>
                    <p className="text-[10px] font-bold text-indigo-400/40 uppercase tracking-widest">Provisionamento de Marca</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/20 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleCreateClient} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1">Nome da Empresa</label>
                    <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1">Subdomínio</label>
                    <input value={subdomain} onChange={e => setSubdomain(e.target.value)} placeholder="ex: advocacia" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none" />
                  </div>
               </div>

               <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1">Domínio Customizado (Opcional)</label>
                <input value={customDomain} onChange={e => setCustomDomain(e.target.value)} placeholder="ex: israel.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none" />
               </div>

               <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1">Cor Principal</label>
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-2 py-1 cursor-pointer" />
               </div>

               {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center animate-shake">{error}</p>}

               <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={isLoading} className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                    {isLoading ? 'Provisionando...' : 'Finalizar Cadastro'}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
