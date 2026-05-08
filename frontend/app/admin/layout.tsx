'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!authorized && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Inquilinos', icon: Users, path: '/admin/clients' },
    { name: 'Operações', icon: Zap, path: '/admin/campaigns' },
  ];

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card/30 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-8 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-foreground shadow-lg shadow-accent/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-lg font-black tracking-tighter uppercase italic block leading-none">
              Rankia<span className="text-accent">.hq</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground">Admin OS v4.0</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center justify-between px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group",
                pathname === item.path
                  ? "bg-accent text-accent-foreground shadow-xl shadow-accent/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={cn(pathname === item.path ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </div>
              {pathname === item.path && <ChevronRight size={14} className="opacity-50" />}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-border">
          <button
            onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin/login'); }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={16} />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-72 bg-card z-[70] lg:hidden border-r border-border flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-black italic uppercase">Rankia.hq</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                      pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2.5 rounded-xl bg-muted/50 border border-border text-foreground hover:bg-muted transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] italic leading-none mb-1">
                {menuItems.find(i => i.path === pathname)?.name || 'Command Center'}
              </h2>
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Rankia Pro Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Admin</p>
                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active System</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black italic shadow-inner">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
