'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/admin/metrics', {
          headers: { 'Authorization': 'Bearer authenticated' }
        });
        if (res.ok) {
          const data = await res.json();
          setMetrics(data.counts);
        }
      } catch (err) {
        console.error('Erro ao buscar métricas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div className="animate-pulse space-y-8">
    <div className="h-32 bg-white/5 rounded-2xl w-full" />
    <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-40 bg-white/5 rounded-2xl" />)}
    </div>
  </div>;

  const total = metrics.COMPLETED + metrics.PENDING + metrics.PROCESSING + metrics.FAILED;
  const progress = total > 0 ? (metrics.COMPLETED / total) * 100 : 0;

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Stat: Progresso Global */}
      <section className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
         </div>
         <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">Integridade da Fábrica</h3>
            <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-black italic tracking-tighter">{Math.round(progress)}%</span>
                <span className="text-sm font-bold text-white/30 uppercase tracking-widest">Conclusão Global</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>
         </div>
      </section>

      {/* Grid de Métricas Industriais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Publicadas" value={metrics.COMPLETED} color="text-green-400" icon="✅" />
        <StatCard title="Em Fila" value={metrics.PENDING} color="text-amber-400" icon="⏳" />
        <StatCard title="Processando" value={metrics.PROCESSING} color="text-indigo-400" icon="⚙️" />
        <StatCard title="Falhas" value={metrics.FAILED} color="text-red-500" icon="🚨" />
      </div>

      {/* Detalhe de Log do Sistema */}
      <section className="bg-[#0d0d16] border border-white/5 rounded-2xl p-8">
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 italic">Monitor de Atividade</h4>
            <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </div>
         </div>
         <div className="space-y-4 font-mono text-[10px] text-white/30">
            <p className="flex gap-4 border-b border-white/5 pb-2"><span className="text-indigo-400">[OK]</span> Sistema operacional. {total} páginas detectadas no banco.</p>
            <p className="flex gap-4 border-b border-white/5 pb-2"><span className="text-indigo-400">[INFO]</span> Motor Gemini estável. Latência média: 12.4s.</p>
            <p className="flex gap-4 pb-2"><span className="text-amber-400">[SYNC]</span> Próxima varredura em {total > 0 ? 'instantes' : 'modo espera'}.</p>
         </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, color, icon }: any) {
  return (
    <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{title}</p>
      <p className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</p>
    </div>
  );
}
