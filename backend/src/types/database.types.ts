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

export interface Testimonial {
  id: string;
  client_id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  client_id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
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
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>>;
      };
      faqs: {
        Row: FAQ;
        Insert: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>;
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
