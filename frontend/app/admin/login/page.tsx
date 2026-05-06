'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simples e efetivo para o MVP: Senha via Env ou Fixa
    // Em produção, isso deve ser validado via API
    if (password === 'admin123') { // Mude para sua senha real dps
      localStorage.setItem('admin_token', 'authenticated');
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md animate-fadeIn">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-20" />
        
        <div className="relative bg-[#0d0d16] border border-white/10 p-10 rounded-2xl shadow-2xl">
          <div className="text-center mb-10">
             <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
             </div>
             <h1 className="text-2xl font-black tracking-tighter uppercase italic">Console <span className="text-indigo-400">Restrito</span></h1>
             <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">Industrial Control Plane v2.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group relative">
              <label className="text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.2em] ml-1 mb-2 block">Chave de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500 transition-all text-center tracking-[0.5em]`}
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-indigo-400 hover:text-white transition-all active:scale-95 shadow-xl"
            >
              Autenticar Sistema
            </button>
          </form>

          {error && (
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center mt-6 animate-shake">
              Acesso Negado: Chave Inválida
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
