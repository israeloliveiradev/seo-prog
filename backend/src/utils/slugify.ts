/**
 * slugify.ts — Utilitário de geração de slugs seguros e únicos.
 * Garante URLs limpas: sem acentos, espaços ou caracteres especiais.
 * Idempotente: o mesmo input SEMPRE gera o mesmo output.
 */

/**
 * Converte uma string arbitrária em um slug URL-safe.
 * @example generateSlug("São Paulo", "Desenvolvimento de Software")
 * // => "sao-paulo-desenvolvimento-de-software"
 */
export function generateSlug(location: string, serviceName: string): string {
  const combined = `${location} ${serviceName}`;
  return combined
    .normalize('NFD')                       // Decompose acentos
    .replace(/[\u0300-\u036f]/g, '')        // Remove marcas diacríticas
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')          // Remove chars especiais
    .replace(/[\s_]+/g, '-')               // Espaços/underscores → hífens
    .replace(/-+/g, '-')                   // Múltiplos hífens → um
    .replace(/^-+|-+$/g, '');             // Remove hífens no início/fim
}

/**
 * Verifica se um slug atende aos critérios de validade.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) && slug.length >= 3;
}
