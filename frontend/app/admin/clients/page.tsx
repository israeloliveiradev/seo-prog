'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { VisualEditor } from '@/components/admin/VisualEditor';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDesign, setEditingDesign] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', subdomain: '', custom_domain: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const response = await fetch('/api/admin/clients/list', {
        headers: {
          'Authorization': 'Bearer authenticated'
        }
      });
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/clients/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer authenticated'
        },
        body: JSON.stringify({
          ...newClient,
          brand_settings: {
            company_name: newClient.name,
            primary_color: '#6366f1'
          }
        })
      });
      if (response.ok) {
        setIsCreating(false);
        fetchClients();
        setNewClient({ name: '', subdomain: '', custom_domain: '' });
      }
    } catch (err) {
      alert('Erro ao criar cliente');
    }
  };

  const handleUpdateClient = async (updatedClient: any) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          template_id: updatedClient.template_id,
          brand_settings: updatedClient.brand_settings,
          custom_domain: updatedClient.custom_domain
        })
        .eq('id', updatedClient.id);

      if (error) throw error;
      
      setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
      setEditingDesign(null);
      alert('Design atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar design');
    }
  };

  async function handleDelete(id: string) {
    if (!confirm('Deseja realmente deletar este cliente e TODOS os seus dados?')) return;
    try {
      const response = await fetch(`/api/admin/clients/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer authenticated'
        }
      });
      if (response.ok) {
        setClients(clients.filter(c => c.id !== id));
      }
    } catch (err) {
      alert('Erro ao deletar cliente');
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Inquilinos</h1>
          <p className="text-white/40 text-xs md:text-sm mt-1">Gestão de infraestrutura e estética multi-tenant.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-full sm:w-auto px-8 py-4 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
        >
          + Novo Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid gap-4">
        {clients.map((client) => (
          <div key={client.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:border-white/10 transition-all gap-6">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center font-black text-indigo-400 border border-indigo-500/20 uppercase italic">
                 {client.name[0]}
               </div>
               <div>
                  <h3 className="font-bold text-lg">{client.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded-full text-white/40 font-mono">{client.subdomain}.rankia.cloud</span>
                    {client.custom_domain && (
                      <span className="text-[9px] px-2 py-0.5 bg-green-500/10 rounded-full text-green-400 font-mono">🌐 {client.custom_domain}</span>
                    )}
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button 
                onClick={() => setEditingDesign(client)}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-indigo-500 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/10"
               >
                 Customizar
               </button>
               <button 
                onClick={() => handleDelete(client.id)}
                className="p-2.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20"
               >
                 <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Criação */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 overflow-y-auto">
           <div className="w-full max-w-md bg-[#0d0d16] border border-white/10 rounded-[32px] p-8 md:p-10 relative my-auto">
              <h2 className="text-2xl font-black uppercase italic mb-8">Cadastrar Cliente</h2>
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Nome da Empresa</label>
                    <input 
                      required
                      type="text" 
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-indigo-500 outline-none transition-all"
                      placeholder="Ex: Supermercado Silva"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Subdomínio Interno</label>
                    <div className="flex items-center gap-2">
                      <input 
                        required
                        type="text" 
                        value={newClient.subdomain}
                        onChange={(e) => setNewClient({...newClient, subdomain: e.target.value.toLowerCase().replace(/\s/g, '')})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-indigo-500 outline-none"
                        placeholder="silva"
                      />
                      <span className="text-white/20 text-[10px] font-mono">.rankia.cloud</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Domínio Customizado (Opcional)</label>
                    <input 
                      type="text" 
                      value={newClient.custom_domain}
                      onChange={(e) => setNewClient({...newClient, custom_domain: e.target.value.toLowerCase()})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-indigo-500 outline-none"
                      placeholder="www.advogadosilva.com.br"
                    />
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                  >
                    Ativar Instância
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="w-full py-4 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}

      {editingDesign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-black/60">
           <div className="absolute inset-0" onClick={() => setEditingDesign(null)} />
           <div className="w-full max-w-5xl max-h-[90vh] bg-[#0d0d16] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-y-auto p-6 md:p-12 relative z-10">
              <button 
                onClick={() => setEditingDesign(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              
              <div className="mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Visual Editor</h2>
                <p className="text-white/40 text-xs md:text-sm">Personalizando {editingDesign.name}</p>
              </div>

              <VisualEditor 
                client={editingDesign} 
                onSave={handleUpdateClient} 
              />
           </div>
        </div>
      )}
    </div>
  );
}
