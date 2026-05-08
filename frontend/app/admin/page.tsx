'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  RefreshCcw, 
  AlertCircle, 
  TrendingUp,
  Activity,
  Zap,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return (
    <div className="animate-pulse space-y-10">
      <div className="h-48 bg-muted rounded-[32px] w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-40 bg-muted rounded-[32px]" />)}
      </div>
    </div>
  );

  const total = metrics.COMPLETED + metrics.PENDING + metrics.PROCESSING + metrics.FAILED;
  const progress = total > 0 ? (metrics.COMPLETED / total) * 100 : 0;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Premium Hero Stat */}
      <section className="relative p-10 md:p-12 rounded-[40px] border border-border bg-card shadow-2xl overflow-hidden group">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-accent/10 transition-colors duration-1000" />
         
         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <TrendingUp size={18} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Produtividade da Rede</h3>
              </div>
              <div className="flex items-baseline gap-4">
                  <span className="text-7xl md:text-8xl font-black italic tracking-tighter leading-none">
                    {Math.round(progress)}%
                  </span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest italic">Landing Pages Ativas</span>
              </div>
            </div>

            <div className="flex-1 max-w-md w-full space-y-6">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Status da Operação</span>
                <span>{metrics.COMPLETED} / {total} Concluídas</span>
              </div>
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden p-1 border border-border shadow-inner">
                  <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent via-indigo-400 to-fuchsia-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  />
              </div>
              <div className="flex gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Syncing...</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">AI Cloud Stable</span>
                 </div>
              </div>
            </div>
         </div>
      </section>

      {/* Grid de Métricas Bento-Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Publicadas" 
          value={metrics.COMPLETED} 
          color="text-emerald-500" 
          icon={CheckCircle2}
          description="Páginas online e indexando"
          delay={0.1}
        />
        <StatCard 
          title="Na Fila" 
          value={metrics.PENDING} 
          color="text-amber-500" 
          icon={Clock}
          description="Aguardando motor de IA"
          delay={0.2}
        />
        <StatCard 
          title="Gerando" 
          value={metrics.PROCESSING} 
          color="text-accent" 
          icon={RefreshCcw}
          description="IA processando conteúdo"
          delay={0.3}
          animateIcon
        />
        <StatCard 
          title="Incidentes" 
          value={metrics.FAILED} 
          color="text-red-500" 
          icon={AlertCircle}
          description="Erros de conexão ou quota"
          delay={0.4}
        />
      </div>

      {/* Monitor de Sistema - Terminal Style */}
      <section className="bg-card border border-border rounded-[32px] p-10 overflow-hidden relative shadow-xl">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-accent" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Activity Monitor / v4.0</h4>
            </div>
            <div className="flex gap-2">
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest">Online</div>
                <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest">Secured</div>
            </div>
         </div>
         
         <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4 font-mono text-[11px] text-muted-foreground/60 leading-relaxed">
               <p className="flex gap-4 border-b border-border/50 pb-3">
                 <span className="text-accent font-bold">[SYNC]</span> 
                 {total} targets detectados. Sincronização em tempo real ativa.
               </p>
               <p className="flex gap-4 border-b border-border/50 pb-3">
                 <span className="text-accent font-bold">[CORE]</span> 
                 Motor Gemini-1.5-Pro operando em modo de alta precisão.
               </p>
               <p className="flex gap-4 border-b border-border/50 pb-3">
                 <span className="text-emerald-500 font-bold">[HEALTH]</span> 
                 Database latência: 42ms. Cluster regional estável.
               </p>
               <p className="flex gap-4">
                 <span className="text-amber-500 font-bold">[AUTO]</span> 
                 Auto-healing ativado para falhas de geração.
               </p>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 flex items-center justify-between border border-border">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Distribuição Global</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black italic tracking-tighter">Cluster Brasil-SP</p>
                    <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-[0.3em]">Latência de ponta a ponta: 120ms</p>
                  </div>
               </div>
               <Zap size={40} className="text-accent/20" />
            </div>
         </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, color, icon: Icon, description, delay, animateIcon }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group p-8 rounded-[32px] border border-border bg-card hover:bg-muted/50 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "p-3 rounded-2xl bg-muted group-hover:bg-background transition-colors border border-border/50 shadow-inner",
          color
        )}>
          <Icon size={22} className={cn(animateIcon && "animate-spin-slow")} />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent animate-pulse transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className={cn("text-4xl font-black italic tracking-tighter", color)}>{value}</p>
      </div>
      <p className="mt-4 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-none">
        {description}
      </p>
    </motion.div>
  );
}
