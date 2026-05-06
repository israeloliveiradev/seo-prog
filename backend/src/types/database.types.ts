/**
 * database.types.ts — Tipos TypeScript derivados do schema SQL.
 * Estrutura compatível com o SupabaseClient<Database> genérico.
 */

export type PageStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export interface Campaign {
  id: string;
  name: string;
  target_audience: string;
  core_keywords: string[];
  created_at: string;
}

export interface GeneratedPage {
  id: string;
  campaign_id: string;
  service_name: string;
  location: string;
  slug: string;
  ai_content: string | null;
  status: PageStatus;
  meta_description: string | null;
  attempts: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: Campaign;
        Insert: Omit<Campaign, 'id' | 'created_at'>;
        Update: Partial<Omit<Campaign, 'id' | 'created_at'>>;
      };
      generated_pages: {
        Row: GeneratedPage;
        Insert: Omit<GeneratedPage, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<GeneratedPage, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      page_status: PageStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
