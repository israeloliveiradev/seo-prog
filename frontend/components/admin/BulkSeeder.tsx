/**
 * BulkSeeder.tsx — Componente de inserção em massa de páginas SEO.
 * 
 * Features:
 * - Textarea inteligente: aceita lista de localidades (1 por linha)
 * - Validação por linha com feedback visual
 * - Slug preview em tempo real
 * - Bulk insert com proteção contra duplicatas
 */

'use client';

import { useState, useMemo, useCallback } from 'react';

interface ValidationResult {
  line: string;
  trimmed: string;
  isValid: boolean;
  slug: string;
  error?: string;
}

interface SeederResult {
  inserted: number;
  skipped: number;
  total: number;
}

// Replicamos a lógica de slugify no cliente para preview
function clientSlugify(location: string, service: string): string {
  return `${location} ${service}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function validateLocation(location: string): { isValid: boolean; error?: string } {
  const trimmed = location.trim();
  if (!trimmed) return { isValid: false, error: 'Linha vazia' };
  if (trimmed.length < 3) return { isValid: false, error: 'Muito curto (mín. 3 chars)' };
  if (trimmed.length > 100) return { isValid: false, error: 'Muito longo (máx. 100 chars)' };
  if (/^\d+$/.test(trimmed)) return { isValid: false, error: 'Apenas números não permitido' };
  return { isValid: true };
}

export default function BulkSeeder() {
  const [locationsText, setLocationsText] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SeederResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Valida cada linha em tempo real
  const validationResults: ValidationResult[] = useMemo(() => {
    if (!locationsText.trim()) return [];
    
    return locationsText
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        
        const validation = validateLocation(trimmed);
        return {
          line,
          trimmed,
          isValid: validation.isValid,
          error: validation.error,
          slug: validation.isValid && serviceName
            ? clientSlugify(trimmed, serviceName)
            : '',
        };
      })
      .filter(Boolean) as ValidationResult[];
  }, [locationsText, serviceName]);

  const validCount = validationResults.filter((r) => r.isValid).length;
  const invalidCount = validationResults.filter((r) => !r.isValid).length;

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/campaigns');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns ?? []);
      }
    } catch (err) {
      console.error('[BulkSeeder] Erro ao buscar campanhas:', err);
    }
  }, []);

  const handleSubmit = async () => {
    const validLocations = validationResults
      .filter((r) => r.isValid)
      .map((r) => r.trimmed);

    if (validLocations.length === 0) {
      setError('Nenhuma localidade válida para inserir.');
      return;
    }
    if (!campaignId) {
      setError('Selecione uma campanha.');
      return;
    }
    if (!serviceName.trim()) {
      setError('Informe o nome do serviço.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locations: validLocations,
          serviceName: serviceName.trim(),
          campaignId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erro no servidor');
      }

      const data = await res.json();
      setResult(data);
      setLocationsText('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Bulk Seeder</h2>
        <p className="text-sm text-white/30 mt-0.5">
          Insira localidades em massa para geração automática de páginas SEO
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-4">
          {/* Campaign Select */}
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
              Campanha
            </label>
            <div className="flex gap-2">
              <select
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
              >
                <option value="" className="bg-[#1a1a2e]">Selecionar campanha...</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#1a1a2e]">
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={fetchCampaigns}
                className="px-3 py-2.5 text-xs border border-white/10 rounded-lg text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
                title="Carregar campanhas"
              >
                ↺
              </button>
            </div>
          </div>

          {/* Service Name */}
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
              Nome do Serviço
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="ex: Desenvolvimento de Software"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          {/* Locations Textarea */}
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-2">
              Localidades <span className="text-white/20">(1 por linha)</span>
            </label>
            <textarea
              value={locationsText}
              onChange={(e) => setLocationsText(e.target.value)}
              placeholder={`São Paulo, SP\nRio de Janeiro, RJ\nCuritiba, PR\nBelo Horizonte, MG`}
              rows={10}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-indigo-500/50 transition-all font-mono resize-none leading-relaxed"
            />
          </div>

          {/* Stats */}
          {validationResults.length > 0 && (
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                {validCount} válidas
              </span>
              {invalidCount > 0 && (
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  {invalidCount} inválidas
                </span>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {result && (
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10">
              <p className="text-emerald-400 font-semibold text-sm mb-1">✓ Inserção concluída!</p>
              <p className="text-white/50 text-xs">
                {result.inserted} páginas adicionadas · {result.skipped} duplicatas ignoradas
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || validCount === 0}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:text-white/30 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Inserindo...
              </span>
            ) : (
              `Inserir ${validCount} página${validCount !== 1 ? 's' : ''} na fila`
            )}
          </button>
        </div>

        {/* Right: Preview */}
        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
            Preview de Slugs
          </p>
          <div className="bg-white/3 border border-white/5 rounded-xl h-[400px] overflow-y-auto p-3 space-y-1.5">
            {validationResults.length === 0 ? (
              <div className="h-full flex items-center justify-center text-white/15 text-sm">
                Digite localidades para ver o preview
              </div>
            ) : (
              validationResults.map((result, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                    result.isValid
                      ? 'bg-emerald-500/5 border border-emerald-500/10'
                      : 'bg-red-500/5 border border-red-500/10'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 ${result.isValid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.isValid ? '✓' : '✕'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-white/70 font-medium truncate">{result.trimmed}</p>
                    {result.isValid && result.slug ? (
                      <p className="text-white/25 font-mono truncate mt-0.5">/{result.slug}</p>
                    ) : (
                      <p className="text-red-400/70 mt-0.5">{result.error}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
