export function normalizeSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}-]+/gu, '-').replace(/^-+|-+$/g, '');
}
