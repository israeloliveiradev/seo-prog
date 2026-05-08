import * as Icons from 'lucide-react';

export interface LandingConfig {
  meta: {
    titleTemplate: string;
    description: string;
    ogImage: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    headingWeight: string;
  };
  sections: {
    hero: {
      visible: boolean;
      variant: 'centered' | 'split-50-50' | 'video-background' | 'image-right';
      badge: string;
      title: string;
      titleAccent: string;
      description: string;
      imageUrl: string;
      ctaPrimary: { text: string; link: string; style: 'primary' | 'secondary' | 'outline' };
      ctaSecondary?: { text: string; link: string; style: 'primary' | 'secondary' | 'outline' };
    };
    problem: {
      visible: boolean;
      title: string;
      subtitle: string;
      painPoints: string[];
    };
    solution: {
      visible: boolean;
      title: string;
      subtitle: string;
      benefits: { title: string; description: string; icon: keyof typeof Icons }[];
    };
    features: {
      visible: boolean;
      variant: 'bento-grid' | 'alternating' | 'cards';
      badge: string;
      title: string;
      subtitle: string;
      items: {
        title: string;
        description: string;
        iconName: keyof typeof Icons;
        size: 'small' | 'large' | 'wide';
        color: string;
      }[];
    };
    testimonials: {
      visible: boolean;
      variant: 'carousel' | 'grid' | 'wall-of-love';
      badge: string;
      title: string;
      subtitle: string;
    };
    faq: {
      visible: boolean;
      title: string;
      subtitle: string;
    };
    pricing: {
      visible: boolean;
      title: string;
      subtitle: string;
    };
    finalCta: {
      visible: boolean;
      title: string;
      description: string;
      cta: { text: string; link: string };
    };
  };
}

export const defaultLandingConfig: LandingConfig = {
  meta: {
    titleTemplate: "%s | SEO Programático Industrial",
    description: "Plataforma de alta conversão gerando milhares de páginas otimizadas.",
    ogImage: "/og-default.jpg"
  },
  theme: {
    primaryColor: "#6366f1",
    secondaryColor: "#050508",
    fontFamily: "Inter",
    headingWeight: "900"
  },
  sections: {
    hero: {
      visible: true,
      variant: 'split-50-50',
      badge: "Nova Era de SEO Programático",
      title: "Domine o Google com",
      titleAccent: "Escala Infinita",
      description: "Nossa inteligência artificial cria milhares de páginas otimizadas para cada nicho e localização.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
      ctaPrimary: { text: "Começar Agora", link: "#contact", style: 'primary' },
      ctaSecondary: { text: "Ver demonstração", link: "#demo", style: 'outline' }
    },
    problem: {
      visible: true,
      title: "Você está perdendo clientes locais?",
      subtitle: "Se sua empresa não aparece no topo das buscas nas cidades vizinhas, seu concorrente está levando o lucro.",
      painPoints: [
        "Tráfego estagnado e dependência de anúncios caros.",
        "Criar centenas de páginas manualmente leva meses.",
        "Sites genéricos que não convertem visitantes em leads."
      ]
    },
    solution: {
      visible: true,
      title: "O Produto como Herói",
      subtitle: "Nossa plataforma automatiza e escala seu SEO com inteligência artificial.",
      benefits: [
        { title: "Geração Automática", description: "Criação de páginas otimizadas em massa.", icon: "Zap" },
        { title: "Personalização de Marca", description: "Identidade visual única em cada landing page.", icon: "Palette" },
        { title: "Alta Conversão", description: "Layouts validados psicologicamente para gerar leads.", icon: "TrendingUp" }
      ]
    },
    features: {
      visible: true,
      variant: 'bento-grid',
      badge: "Vantagens Reais",
      title: "Por que nos escolher?",
      subtitle: "Combinamos design de elite com tecnologia de ponta.",
      items: [
        { title: "Escala Massiva", description: "Gere milhares de landing pages com apenas alguns cliques.", iconName: "Zap", size: "large", color: "#6366f1" },
        { title: "SEO On-Page", description: "Código semântico e metadados otimizados.", iconName: "Search", size: "small", color: "#10b981" },
        { title: "Alta Conversão", description: "Design focado em UX.", iconName: "TrendingUp", size: "small", color: "#f59e0b" },
        { title: "Multi-tenant", description: "Gerencie centenas de clientes.", iconName: "ShieldCheck", size: "wide", color: "#ec4899" }
      ]
    },
    testimonials: {
      visible: true,
      variant: 'grid',
      badge: "Prova Social",
      title: "Quem confia",
      subtitle: "Junte-se a centenas de empresas que escalaram seu tráfego."
    },
    faq: {
      visible: true,
      title: "Dúvidas Frequentes",
      subtitle: "Tudo que você precisa saber antes de escalar."
    },
    pricing: {
      visible: true,
      title: "Planos de Expansão",
      subtitle: "Invista no crescimento acelerado do seu tráfego orgânico."
    },
    finalCta: {
      visible: true,
      title: "Pronto para dominar as buscas?",
      description: "Junte-se a dezenas de empresas lucrando com SEO Programático.",
      cta: { text: "Comece Agora - Sem Compromisso", link: "#contact" }
    }
  }
};
