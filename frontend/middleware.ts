import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define os domínios base (mude para o seu domínio real em produção)
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'rankia.cloud';
  const isLocalhost = hostname.includes('localhost');

  // Extrai o subdomínio ou domínio customizado
  let currentHost = '';
  if (isLocalhost) {
    // No localhost, removemos o sufixo .localhost e a porta
    // Ex: cliente.localhost:3000 -> cliente
    currentHost = hostname.split(':')[0].replace('.localhost', '');
  } else {
    // Em produção, removemos o domínio raiz
    // Ex: cliente.rankia.cloud -> cliente
    currentHost = hostname.replace(`.${rootDomain}`, '');
  }

  // Se for o domínio raiz (rankia.cloud) ou o dashboard (admin.rankia.cloud)
  if (currentHost === rootDomain || currentHost === 'admin' || currentHost === hostname) {
    // Se for o admin, podemos mandar para /admin (opcional)
    if (url.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }
    // Caso contrário, segue o fluxo normal para o site principal (landing page do SaaS)
    return NextResponse.next();
  }

  // Se chegamos aqui, é um CLIENTE (subdomínio ou domínio customizado)
  // Fazemos o rewrite interno para a pasta /sites/[host]/...
  return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
}
