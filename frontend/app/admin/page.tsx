/**
 * app/admin/page.tsx — Painel Administrativo (Control Plane)
 * 
 * Features:
 * - Dashboard de métricas com contagem por status
 * - Bulk Seeder com validação de localidades
 * - Design: Dark industrial premium com Tailwind CSS
 */

'use client';

import { useState } from 'react';
import BulkSeeder from '@/components/admin/BulkSeeder';
import MetricsDashboard from '@/components/admin/MetricsDashboard';
import CampaignManager from '@/components/admin/CampaignManager';

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCampaignCreated = () => {
    setRefreshKey(prev => prev + 1); // Força o BulkSeeder a recarregar as campanhas
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0c0c18]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold">
              S
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">SEO Control Plane</h1>
              <p className="text-xs text-white/30">Motor de Automação Industrial</p>
            </div>
          </div>
          
          <CampaignManager onCampaignCreated={handleCampaignCreated} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Metrics */}
        <MetricsDashboard />

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Bulk Seeder */}
        <div key={refreshKey}>
          <BulkSeeder />
        </div>
      </main>
    </div>
  );
}
