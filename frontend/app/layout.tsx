import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Soluções de TI Profissionais | SEO Programático',
    template: '%s | SEO Programático',
  },
  description: 'Encontre soluções profissionais de TI para sua empresa. Desenvolvimento de software, suporte técnico e cloud computing em todo o Brasil.',
  keywords: ['desenvolvimento de software', 'suporte técnico', 'cloud computing', 'TI empresarial'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SEO Programático',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#0a0a0f] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
