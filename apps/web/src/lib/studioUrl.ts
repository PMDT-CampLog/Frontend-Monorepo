/**
 * URL base do app Studio (home após login). Em desenvolvimento o Studio roda na porta 3001.
 * Em produção, defina NEXT_PUBLIC_STUDIO_URL (ex.: https://app.seudominio.com).
 */
export const STUDIO_URL = (
  process.env.NEXT_PUBLIC_STUDIO_URL ?? 'http://localhost:3001'
).replace(/\/$/, '')
