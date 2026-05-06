import React from 'react';

export default function SaaSLandingPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3L4 14H11L11 21L20 10H13L13 3Z" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Rankia<span className="text-indigo-400">.cloud</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/50">
          <a href="#features" className="hover:text-white transition-colors">Tecnologia</a>
          <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
          <a href="/admin" className="px-5 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all">Console Admin</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-12 animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em]">
            Próxima Geração de SEO Programático
          </span>
        </div>

        <h1 className="max-w-5xl mx-auto text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic">
          Sua Fábrica de <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-violet-400">Tráfego em Escala</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 leading-relaxed mb-12">
          Domine o Google em centenas de cidades simultaneamente. Gere milhares de landing pages premium com IA, personalização de marca e infraestrutura industrial.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-indigo-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5">
            Iniciar Produção
          </button>
          <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white/10 transition-all">
            Ver Demonstração
          </button>
        </div>
      </header>

      {/* Social Proof / Trusted By */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.01] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30 hover:opacity-100 transition-opacity duration-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] w-full text-center mb-4 text-indigo-400/50">Utilizado por Agências de Elite</span>
          <div className="text-2xl font-black italic tracking-tighter">VOLT<span className="text-indigo-500">_</span>CORP</div>
          <div className="text-2xl font-black italic tracking-tighter">NEXUS<span className="text-violet-500">.</span>SEO</div>
          <div className="text-2xl font-black italic tracking-tighter">CYBER<span className="text-indigo-400">MATH</span></div>
          <div className="text-2xl font-black italic tracking-tighter">ALPHA<span className="text-white/20">_</span>SYSTEMS</div>
        </div>
      </section>

      {/* Stats/Industrial Detail */}
      <section className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6 my-32">
        {[
          { label: 'Páginas/Min', value: '1.2k' },
          { label: 'Uptime Sistema', value: '99.9%' },
          { label: 'Modelo IA', value: 'Flash L.' },
          { label: 'Arquitetura', value: 'Tenant' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1 group-hover:text-indigo-400 transition-colors">{stat.label}</p>
            <p className="text-2xl font-black font-mono text-white/80 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Pricing Section */}
      {/* ... (anterior) */}

      {/* WhatsApp Flutuante */}
      <a 
        href="https://wa.me/SEU_NUMERO_AQUI" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group"
      >
        <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative flex items-center gap-4 bg-[#0d0d16] border border-white/10 p-3 pl-6 rounded-full shadow-2xl hover:border-green-500/50 transition-all hover:-translate-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Fale com o Arquiteto</span>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.097 3.391l-.733 2.152 2.217-.718c.92.569 2.001.9 3.186.9 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.38 8.044c-.154.433-.774.789-1.071.841-.297.052-.572.072-1.609-.344-1.427-.573-2.341-2.022-2.413-2.117-.072-.095-.617-.821-.617-1.559s.385-1.094.521-1.241c.136-.147.297-.184.396-.184s.198.01.284.014c.09.004.21-.034.33-.32.12-.286.41-.994.446-1.069.036-.075.06-.163.012-.258-.048-.095-.108-.163-.162-.225s-.108-.135-.154-.183c-.053-.056-.111-.116-.062-.204.049-.088.217-.358.465-.579.319-.284.59-.371.861-.45.271-.079.521-.03.712.015.191.045.545.195.62.33s.075.315.038.45c-.037.135-.187.315-.374.495-.188.18-.405.345-.526.479-.12.135-.133.254-.06.38.073.126.326.539.7 1.04.479.645.885.856 1.259 1.012.374.156.591.134.814-.112.223-.246.963-1.121 1.222-1.503.259-.382.518-.318.871-.184.353.134 2.24 1.055 2.628 1.248.388.193.647.29.74.45s.093.844-.061 1.277z"/></svg>
          </div>
        </div>
      </a>
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 pb-40">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Planos de Expansão</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:border-indigo-500/50">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
            </div>
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Starter</h3>
            <div className="text-5xl font-black mb-6">R$ 297<span className="text-lg text-white/30 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10 text-white/60 text-sm font-medium">
              <li className="flex items-center gap-2">✓ Subdomínio rankia.cloud</li>
              <li className="flex items-center gap-2">✓ Até 5.000 páginas</li>
              <li className="flex items-center gap-2">✓ Personalização de Marca</li>
              <li className="flex items-center gap-2">✓ IA Gemini Integrada</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
              Assinar Starter
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="group relative p-8 rounded-3xl border border-indigo-500/50 bg-indigo-500/[0.05] shadow-2xl shadow-indigo-500/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Recomendado</div>
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Enterprise</h3>
            <div className="text-5xl font-black mb-6">R$ 897<span className="text-lg text-white/30 font-normal">/mês</span></div>
            <ul className="space-y-4 mb-10 text-white/80 text-sm font-medium">
              <li className="flex items-center gap-2 text-indigo-300 font-bold italic">🚀 Domínio Próprio (.com / .com.br)</li>
              <li className="flex items-center gap-2">✓ Páginas Ilimitadas</li>
              <li className="flex items-center gap-2">✓ Suporte Prioritário</li>
              <li className="flex items-center gap-2">✓ API de Integração</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-indigo-400 transition-all">
              Assinar Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* Footer Industrial */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <span className="text-sm font-black tracking-tighter uppercase italic">Rankia<span className="text-indigo-400">.cloud</span></span>
          </div>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            © 2024 Industrial SEO Systems | Protocol: Multi-Tenant-v1
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
            <span className="text-[10px] font-bold text-white/20 uppercase">System Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
