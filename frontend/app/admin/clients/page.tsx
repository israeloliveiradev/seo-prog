'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { VisualEditor } from '@/components/admin/VisualEditor';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDesign, setEditingDesign] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', subdomain: '' });

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });
      if (response.ok) {
        setIsCreating(false);
        fetchClients();
        setNewClient({ name: '', subdomain: '' });
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
          brand_settings: updatedClient.brand_settings
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
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Inquilinos</h1>
          <p className="text-white/40 text-sm mt-1">Gestão de infraestrutura e estética multi-tenant.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20"
        >
          + Novo Cliente
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid gap-4">
        {clients.map((client) => (
          <div key={client.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center font-black text-indigo-400 border border-indigo-500/20 uppercase italic">
                 {client.name[0]}
               </div>
               <div>
                  <h3 className="font-bold text-lg">{client.name}</h3>
                  <p className="text-xs text-white/30 font-mono">{client.subdomain}.rankia.cloud</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button 
                onClick={() => setEditingDesign(client)}
                className="px-4 py-2 rounded-lg bg-indigo-500 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 transition-all"
               >
                 Editar Design
               </button>
               <button 
                onClick={() => handleDelete(client.id)}
                className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
               >
                 Deletar
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Criação */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <div className="w-full max-w-md bg-[#0d0d16] border border-white/10 rounded-[32px] p-10 relative">
              <h2 className="text-2xl font-black uppercase italic mb-6">Cadastrar Cliente</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Nome da Empresa</label>
                  <input 
                    required
                    type="text" 
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                    placeholder="Ex: Supermercado Silva"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Subdomínio</label>
                  <div className="flex items-center gap-2">
                    <input 
                      required
                      type="text" 
                      value={newClient.subdomain}
                      onChange={(e) => setNewClient({...newClient, subdomain: e.target.value.toLowerCase().replace(/\s/g, '')})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                      placeholder="silva"
                    />
                    <span className="text-white/20 text-xs font-mono">.rankia.cloud</span>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-indigo-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-indigo-400 transition-all mt-6"
                >
                  Ativar Instância
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="w-full py-4 text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white"
                >
                  Cancelar
                </button>
              </form>
           </div>
        </div>
      )}

      {editingDesign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <div className="absolute inset-0" onClick={() => setEditingDesign(null)} />
           <div className="w-full max-w-5xl max-h-[90vh] bg-[#0d0d16] border border-white/10 rounded-[40px] shadow-2xl overflow-y-auto p-12 relative z-10">
              <button 
                onClick={() => setEditingDesign(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              
              <div className="mb-12">
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Visual Editor</h2>
                <p className="text-white/40 text-sm">Personalizando {editingDesign.name}</p>
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
