import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase';

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = createServiceClient();

  const { data: pages } = await supabase
    .from('generated_pages')
    .select('slug, service_name, location, meta_description, created_at')
    .eq('status', 'COMPLETED')
    .order('created_at', { ascending: false })
    .limit(12);

  const { data: stats } = await supabase
    .from('generated_pages')
    .select('status');

  const completedCount = (stats ?? []).filter((s) => s.status === 'COMPLETED').length;
  const totalCount = (stats ?? []).length;

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-indigo-500/50 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-medium tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Motor SEO Programático Ativo
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
            SEO em{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Escala Industrial
            </span>
          </h1>
          
          <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12">
            Geração automatizada de páginas otimizadas para busca, 
            alimentadas por IA e publicadas em tempo real.
          </p>

          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white tabular-nums">{completedCount.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-white/30 mt-1 uppercase tracking-widest">Páginas Ativas</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white tabular-nums">{totalCount.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-white/30 mt-1 uppercase tracking-widest">Total Gerado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pages Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-sm font-medium text-white/30 uppercase tracking-widest mb-8">
          Páginas Recentes
        </h2>

        {(pages ?? []).length === 0 ? (
          <div className="text-center py-24 text-white/20">
            <p className="text-lg">Nenhuma página publicada ainda.</p>
            <p className="text-sm mt-2">Use o painel admin para iniciar a geração.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(pages ?? []).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-indigo-500/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">
                    {page.location}
                  </span>
                  <span className="text-white/20 text-xs group-hover:text-white/40 transition-colors">→</span>
                </div>
                <h3 className="text-white font-semibold leading-snug mb-2 group-hover:text-indigo-300 transition-colors">
                  {page.service_name}
                </h3>
                {page.meta_description && (
                  <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                    {page.meta_description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
