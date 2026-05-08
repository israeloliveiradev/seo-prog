import * as Icons from 'lucide-react';

export const landingConfig = {
  hero: {
    badge: "Nova Era de SEO Programático",
    title: "Domine o Google com",
    titleAccent: "Escala Infinita",
    description: "Nossa inteligência artificial cria milhares de páginas otimizadas para cada nicho e localização, garantindo que sua marca esteja sempre no topo.",
    ctaText: "Começar Agora",
    ctaLink: "#contact",
    secondaryCtaText: "Ver demonstração",
    secondaryCtaLink: "#demo",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000"
  },
  features: {
    header: {
      badge: "Vantagens Reais",
      title: "Por que nos escolher?",
      subtitle: "Combinamos design de elite com tecnologia de ponta para entregar resultados mensuráveis."
    },
    items: [
      {
        title: "Escala Massiva",
        description: "Gere milhares de landing pages para cada bairro ou serviço com apenas alguns cliques.",
        iconName: "Zap" as keyof typeof Icons,
        size: "large" as const,
        color: "#6366f1"
      },
      {
        title: "SEO On-Page",
        description: "Código semântico e metadados otimizados automaticamente pela nossa IA.",
        iconName: "Search" as keyof typeof Icons,
        size: "small" as const,
        color: "#10b981"
      },
      {
        title: "Alta Conversão",
        description: "Design focado em UX para garantir que o tráfego se transforme em leads reais.",
        iconName: "TrendingUp" as keyof typeof Icons,
        size: "small" as const,
        color: "#f59e0b"
      },
      {
        title: "Multi-tenant",
        description: "Gerencie centenas de clientes em uma única infraestrutura robusta e segura.",
        iconName: "ShieldCheck" as keyof typeof Icons,
        size: "wide" as const,
        color: "#ec4899"
      }
    ]
  },
  testimonials: {
    header: {
      badge: "Prova Social",
      title: "Quem confia",
      subtitle: "Junte-se a centenas de empresas que escalaram seu tráfego orgânico conosco."
    },
    items: [
      {
        name: "Carlos Alberto",
        role: "CEO na TechVibe",
        content: "A plataforma revolucionou como prospectamos clientes. Dobramos nosso faturamento em 3 meses.",
        image: "https://i.pravatar.cc/150?u=carlos"
      },
      {
        name: "Juliana Mendes",
        role: "Diretora de Marketing",
        content: "O nível de customização dos templates é absurdo. Parece que cada site foi feito à mão.",
        image: "https://i.pravatar.cc/150?u=juliana"
      },
      {
        name: "Ricardo Silva",
        role: "Empreendedor",
        content: "Simplesmente a melhor ferramenta de SEO programático que já utilizei. Suporte impecável.",
        image: "https://i.pravatar.cc/150?u=ricardo"
      }
    ]
  }
};
