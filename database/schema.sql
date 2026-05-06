-- =====================================================
-- SEO Programático Industrial - Schema SQL Supabase
-- Versão: 1.0.0
-- Princípios: Clean Architecture, índices otimizados,
--             RLS habilitado para segurança.
-- =====================================================

-- Extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELA: campaigns
-- Armazena configurações de campanhas de SEO
-- =====================================================
CREATE TABLE IF NOT EXISTS campaigns (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  target_audience TEXT      NOT NULL,
  core_keywords JSONB       NOT NULL DEFAULT '[]'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para busca por nome de campanha
CREATE INDEX IF NOT EXISTS idx_campaigns_name ON campaigns(name);

-- =====================================================
-- ENUM: page_status
-- Controla o ciclo de vida de processamento de páginas
-- =====================================================
DO $$ BEGIN
    CREATE TYPE page_status AS ENUM (
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'ERROR'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- TABELA: generated_pages
-- Armazena as páginas geradas pelo motor de automação
-- =====================================================
CREATE TABLE IF NOT EXISTS generated_pages (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id      UUID        NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  service_name     TEXT        NOT NULL,
  location         TEXT        NOT NULL,
  slug             TEXT        NOT NULL UNIQUE,
  ai_content       TEXT,
  status           page_status NOT NULL DEFAULT 'PENDING',
  meta_description TEXT,
  attempts         INTEGER     NOT NULL DEFAULT 0,
  last_error       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
