/**
 * app/[slug]/page.tsx — Rota dinâmica para páginas de SEO geradas.
 * 
 * Estratégia ISR:
 * - generateStaticParams: pré-gera slugs COMPLETED no build
 * - dynamicParams = true: aceita slugs não pré-gerados (descoberta sob demanda)
 * - revalidate = 3600: revalida a cada hora, descobrindo novas páginas
 * 
 * Renderização: dangerouslySetInnerHTML com ai_content (HTML semântico)
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase';
import type { GeneratedPage } from '@/lib/supabase';

// ISR: revalida a cada 1 hora para descobrir novas páginas do Supabase
export const revalidate = 3600;

// Aceita slugs não pré-gerados → descoberta sob demanda por bots/tráfego
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pré-gera os slugs de todas as páginas COMPLETED no momento do build.
 * Slugs novos são gerados on-demand pelo tráfego (ISR blocking).
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('generated_pages')
    .select('slug')
    .eq('status', 'COMPLETED');

  if (error || !data) {
    console.error('[generateStaticParams] Erro ao buscar slugs:', error?.message);
    return [];
  }

  return data.map((row) => ({ slug: row.slug }));
}

/**
 * Gera metadata dinâmica para SEO (title e meta description).
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: page } = await supabase
    .from('generated_pages')
    .select('service_name, location, meta_description')
    .eq('slug', slug)
    .eq('status', 'COMPLETED')
    .single();

  if (!page) {
    return {
      title: 'Página não encontrada',
    };
  }

  const title = `${page.service_name} em ${page.location} | Soluções Profissionais`;

  return {
    title,
    description: page.meta_description ?? `Conheça nossos serviços de ${page.service_name} em ${page.location}.`,
    openGraph: {
      title,
      description: page.meta_description ?? '',
      type: 'article',
    },
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

/**
 * Componente de página — renderiza conteúdo HTML gerado pelo Gemini.
 */
export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: page, error } = await supabase
    .from('generated_pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'COMPLETED')
    .single<GeneratedPage>();

  // Página não encontrada ou não COMPLETED → 404
  if (error || !page) {
    notFound();
  }

  const publishDate = new Date(page.created_at).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-violet-900/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="relative max-w-4xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8 font-mono">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <span>/</span>
            <span className="text-indigo-400">{page.location}</span>
            <span>/</span>
            <span className="text-white/50">{page.service_name}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold tracking-widest uppercase">
              {page.location}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            {page.service_name}
            <span className="block text-2xl md:text-3xl font-normal text-white/50 mt-2">
              em {page.location}
            </span>
          </h1>

          {page.meta_description && (
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
              {page.meta_description}
            </p>
          )}

          <div className="mt-8 flex items-center gap-4 text-sm text-white/30">
            <time dateTime={page.created_at}>Publicado em {publishDate}</time>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div
          className="prose-seo"
          dangerouslySetInnerHTML={{ __html: page.ai_content ?? '' }}
        />
      </article>

      {/* CTA Section */}
      <section className="border-t border-white/5 bg-gradient-to-b from-transparent to-indigo-950/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Entre em contato e saiba como podemos ajudar sua empresa em {page.location}.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            Falar com especialista
          </a>
        </div>
      </section>
    </main>
  );
}
