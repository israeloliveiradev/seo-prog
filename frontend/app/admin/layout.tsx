'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verifica se está logado (Simulação simples via localStorage)
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Inquilinos', icon: '🏢', path: '/admin/clients' },
    { name: 'Operações', icon: '⚡', path: '/admin/campaigns' },
  ];

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Sidebar Industrial */}
      <aside className="w-64 border-r border-white/5 bg-[#08080c] flex flex-col">
        <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-black italic">R</div>
                <span className="text-sm font-black tracking-tighter uppercase italic">Rankia<span className="text-indigo-400">.hq</span></span>
            </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
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
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login'); }}
            className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-400 transition-colors"
          >
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#08080c]/50 backdrop-blur-md">
            <h2 className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.3em]">
                Sistema Operacional / {menuItems.find(i => i.path === pathname)?.name || 'HQ'}
            </h2>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Israel Alexandre</p>
                    <p className="text-[8px] font-bold text-green-500 uppercase">System Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
            </div>
        </header>
        <div className="p-10">
            {children}
        </div>
      </main>
    </div>
  );
}
