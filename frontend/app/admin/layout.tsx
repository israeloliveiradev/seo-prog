'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Fecha o sidebar ao navegar
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!authorized && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Inquilinos', icon: '🏢', path: '/admin/clients' },
    { name: 'Operações', icon: '⚡', path: '/admin/campaigns' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-black italic text-sm">R</div>
          <span className="text-sm font-black tracking-tighter uppercase italic">
            Rankia<span className="text-indigo-400">.hq</span>
          </span>
        </div>
        {/* Botão fechar no mobile */}
        <button
          className="lg:hidden text-white/40 hover:text-white p-1"
          onClick={() => setSidebarOpen(false)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              pathname === item.path
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'text-white/30 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login'); }}
          className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-400 transition-colors"
        >
          Encerrar Sessão
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Desktop (sempre visível) + Mobile (drawer) */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 flex flex-col bg-[#08080c] border-r border-white/5
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#08080c]/80 backdrop-blur-md shrink-0">
          {/* Hamburger mobile */}
          <button
            className="lg:hidden text-white/40 hover:text-white p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 12h14M3 18h14"/>
            </svg>
          </button>

          <h2 className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.3em] hidden sm:block">
            Sistema Operacional / {menuItems.find(i => i.path === pathname)?.name || 'HQ'}
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Admin</p>
              <p className="text-[8px] font-bold text-green-500 uppercase">System Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-sm">A</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
