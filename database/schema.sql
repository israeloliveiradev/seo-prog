-- =====================================================
-- SEO Programático Industrial - Schema SQL Supabase
-- Versão: 1.0.0
-- Princípios: Clean Architecture, índices otimizados,
--             RLS habilitado para segurança.
-- =====================================================

-- Extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. TABELA DE CLIENTES (TENANTS)
-- ==========================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  template_id TEXT DEFAULT 'minimalist', -- 'minimalist', 'conversion', 'local'
  brand_settings JSONB DEFAULT '{
    "company_name": "New Client",
    "primary_color": "#6366f1",
    "secondary_color": "#000000",
    "logo_url": null,
    "hero_image": null,
    "contact_whatsapp": "",
    "address": "",
    "google_maps_embed": "",
    "social_links": {
      "instagram": "",
      "facebook": "",
      "linkedin": ""
    },
    "features_enabled": {
      "show_maps": true,
      "show_faq": true,
      "show_reviews": true,
      "show_gallery": false
    }
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. CAMPANHAS (VINCULADAS AO CLIENTE)
-- ==========================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  core_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_client ON campaigns(client_id);

-- ==========================================
-- 3. PÁGINAS GERADAS
-- ==========================================
-- Garante que o tipo exista
DO $$ BEGIN
    CREATE TYPE page_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS generated_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  location TEXT NOT NULL,
  slug TEXT NOT NULL,
  ai_content TEXT,
  meta_description TEXT,
  status page_status DEFAULT 'PENDING',
  attempts INTEGER DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, slug) -- Importante: Slug único POR CLIENTE
);

-- =====================================================
-- ÍNDICES OTIMIZADOS (Supabase Best Practices)
-- =====================================================

-- Índice único no slug para lookup ultra-rápido (rota dinâmica Next.js)
CREATE UNIQUE INDEX IF NOT EXISTS idx_generated_pages_slug
  ON generated_pages(slug);

-- Índice parcial: apenas registros PENDING/ERROR para o worker
-- (Evita full table scan - segue query-partial-indexes best practice)
CREATE INDEX IF NOT EXISTS idx_generated_pages_pending_processing
  ON generated_pages(status, attempts, updated_at)
  WHERE status IN ('PENDING', 'ERROR');

-- Índice para dashboard: contagem por status por campanha
CREATE INDEX IF NOT EXISTS idx_generated_pages_campaign_status
  ON generated_pages(campaign_id, status);

-- Índice para generateStaticParams do Next.js
CREATE INDEX IF NOT EXISTS idx_generated_pages_completed_slug
  ON generated_pages(slug)
  WHERE status = 'COMPLETED';

-- =====================================================
-- FUNÇÃO: update_updated_at_column
-- Trigger para atualizar updated_at automaticamente
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generated_pages_updated_at ON generated_pages;
CREATE TRIGGER trigger_generated_pages_updated_at
  BEFORE UPDATE ON generated_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Garante que apenas serviços autenticados acessem os dados
-- =====================================================
ALTER TABLE campaigns       ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_pages ENABLE ROW LEVEL SECURITY;

-- Política: service_role tem acesso total (worker backend)
DROP POLICY IF EXISTS "service_role_full_access_campaigns" ON campaigns;
CREATE POLICY "service_role_full_access_campaigns"
  ON campaigns FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_full_access_pages" ON generated_pages;
CREATE POLICY "service_role_full_access_pages"
  ON generated_pages FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Política: acesso público somente a páginas COMPLETADAS (frontend público)
DROP POLICY IF EXISTS "public_read_completed_pages" ON generated_pages;
CREATE POLICY "public_read_completed_pages"
  ON generated_pages FOR SELECT
  TO anon
  USING (status = 'COMPLETED');

-- =====================================================
-- DADOS INICIAIS (SEED)
-- Campanha padrão para testes
-- =====================================================
INSERT INTO campaigns (name, target_audience, core_keywords)
VALUES (
  'Serviços de TI - Brasil',
  'Empresas de médio porte buscando outsourcing de TI',
  '["desenvolvimento de software", "suporte técnico", "cloud computing", "segurança digital"]'::jsonb
)
ON CONFLICT DO NOTHING;

-- ==========================================
-- 4. TESTIMONIALS (PROVA SOCIAL)
-- ==========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_client ON testimonials(client_id);

DROP TRIGGER IF EXISTS trigger_testimonials_updated_at ON testimonials;
CREATE TRIGGER trigger_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_active = true);
  
DROP POLICY IF EXISTS "service_role_full_access_testimonials" ON testimonials;
CREATE POLICY "service_role_full_access_testimonials"
  ON testimonials FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- 5. FAQs (PERGUNTAS FREQUENTES)
-- ==========================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_client ON faqs(client_id);

DROP TRIGGER IF EXISTS trigger_faqs_updated_at ON faqs;
CREATE TRIGGER trigger_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faqs" ON faqs;
CREATE POLICY "public_read_faqs"
  ON faqs FOR SELECT
  TO anon
  USING (is_active = true);
  
DROP POLICY IF EXISTS "service_role_full_access_faqs" ON faqs;
CREATE POLICY "service_role_full_access_faqs"
  ON faqs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
