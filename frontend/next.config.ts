import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR: ativa geração sob demanda para slugs não pré-gerados
  // Equivalente ao fallback: 'blocking' do Pages Router
  // (dynamicParams = true é definido por rota em [slug]/page.tsx)

  // Headers de segurança para o painel admin
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Logging de requests no desenvolvimento
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
