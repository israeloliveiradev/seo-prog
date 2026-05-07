'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ClientPagesEditor() {
  const { id } = useParams();
  const router = useRouter();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [id]);

  async function fetchPages() {
    const { data, error } = await supabase
      .from('generated_pages')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false });

    if (!error) setPages(data || []);
    setLoading(false);
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('generated_pages')
        .update({
          service_name: editingPage.service_name,
          meta_description: editingPage.meta_description,
          ai_content: editingPage.ai_content
        })
        .eq('id', editingPage.id);

      if (error) throw error;
      
      setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
      setEditingPage(null);
      alert('Página atualizada com sucesso!');
    } catch (err) {
      alert('Erro ao salvar página');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase tracking-widest text-white/20">Carregando Inventário de Páginas...</div>;

  return (
    <div className="min-h-screen bg-[#050508] text-white p-6 md:p-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white mb-4 flex items-center gap-2">
            ← Voltar para Clientes
          </button>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Editor de Páginas</h1>
          <p className="text-white/40 text-sm mt-1">Refine o conteúdo individual de cada landing page.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Total de Páginas</p>
           <p className="text-2xl font-black italic">{pages.length}</p>
        </div>
      </header>

      <div className="grid gap-4">
        {pages.map((page) => (
          <div key={page.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:border-white/10 transition-all gap-6">
            <div className="space-y-1">
               <h3 className="font-bold text-lg">{page.service_name}</h3>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/30">/{page.slug}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{page.location}</span>
               </div>
            </div>
            <button 
              onClick={() => setEditingPage(page)}
              className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Customizar Conteúdo
            </button>
          </div>
        ))}
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-black/80 overflow-y-auto">
           <div className="w-full max-w-5xl bg-[#0d0d16] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl p-8 md:p-12 relative my-auto">
              <button 
                onClick={() => setEditingPage(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              
              <div className="mb-10">
                <h2 className="text-2xl font-black uppercase italic tracking-tight">Editando Página Individual</h2>
                <p className="text-white/40 text-xs">Página: {editingPage.slug}</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Nome do Serviço (H1)</label>
                        <input 
                          type="text" 
                          value={editingPage.service_name}
                          onChange={(e) => setEditingPage({...editingPage, service_name: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Meta Description (SEO)</label>
                        <textarea 
                          value={editingPage.meta_description}
                          onChange={(e) => setEditingPage({...editingPage, meta_description: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none h-32"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Conteúdo HTML (Gemini Output)</label>
                      <textarea 
                        value={editingPage.ai_content}
                        onChange={(e) => setEditingPage({...editingPage, ai_content: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-indigo-500 outline-none h-[300px]"
                      />
                   </div>
                </div>
                
                <div className="flex justify-end pt-6 border-t border-white/5">
                   <button 
                    disabled={saving}
                    className="px-12 py-4 bg-indigo-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20"
                   >
                     {saving ? 'Salvando...' : 'Salvar Alterações'}
                   </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
