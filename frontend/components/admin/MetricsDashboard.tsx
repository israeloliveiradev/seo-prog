/**
 * MetricsDashboard.tsx — Dashboard de métricas em tempo real.
 * Busca contagem de páginas por status e exibe KPIs visuais.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

interface StatusCounts {
  PENDING: number;
  PROCESSING: number;
  COMPLETED: number;
  ERROR: number;
}

interface MetricCard {
  label: string;
  status: keyof StatusCounts;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
}

const METRIC_CARDS: MetricCard[] = [
  {
    label: 'Concluídas',
    status: 'COMPLETED',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    icon: '✓',
    description: 'Páginas publicadas e indexáveis',
  },
  {
    label: 'Pendentes',
    status: 'PENDING',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    icon: '◎',
    description: 'Aguardando processamento',
  },
  {
    label: 'Processando',
    status: 'PROCESSING',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    icon: '⟳',
    description: 'Em geração pelo Gemini',
  },
  {
    label: 'Com Erros',
    status: 'ERROR',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    icon: '✕',
    description: 'Máx. tentativas atingidas',
  },
];

export default function MetricsDashboard() {
  const [counts, setCounts] = useState<StatusCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      if (!res.ok) throw new Error('Falha ao buscar métricas');
      const data = await res.json();
      setCounts(data.counts);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[MetricsDashboard]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    // Atualiza a cada 30 segundos
    const interval = setInterval(fetchMetrics, 30_000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;
  const completionRate = counts && total > 0
    ? Math.round((counts.COMPLETED / total) * 100)
    : 0;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Dashboard de Métricas</h2>
          <p className="text-sm text-white/30 mt-0.5">
            {lastUpdated
              ? `Atualizado às ${lastUpdated.toLocaleTimeString('pt-BR')}`
              : 'Carregando...'}
          </p>
        </div>
        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-lg hover:border-white/20 hover:text-white/70 transition-all disabled:opacity-50"
        >
          <span className={loading ? 'animate-spin' : ''}>↻</span>
          Atualizar
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRIC_CARDS.map((card) => (
          <div
            key={card.status}
            className={`relative p-5 rounded-xl border ${card.borderColor} ${card.bgColor} overflow-hidden group`}
          >
            <div className="absolute top-3 right-3 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
              {card.icon}
            </div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
              {card.label}
            </p>
            <p className={`text-4xl font-bold ${card.color} tabular-nums`}>
              {loading ? (
                <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
              ) : (
                (counts?.[card.status] ?? 0).toLocaleString('pt-BR')
              )}
            </p>
            <p className="text-xs text-white/25 mt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="p-5 rounded-xl border border-white/5 bg-white/2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/50">Taxa de Conclusão Global</span>
          <span className="text-sm font-bold text-emerald-400">{completionRate}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/20">
          <span>0 páginas</span>
          <span>{total.toLocaleString('pt-BR')} total</span>
        </div>
      </div>
    </section>
  );
}
