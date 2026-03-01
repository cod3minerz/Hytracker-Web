/** Генерирует стабильные тестовые данные онлайна за 24 часа по id/имени сервера */
export function getMockOnline24h(serverIdOrSlug: string): { hour: number; online: number }[] {
  let h = 0;
  const s = serverIdOrSlug;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  const seed = Math.abs(h);
  const base = (seed % 15) + 5;
  const peak = (seed % 25) + 15;
  return Array.from({ length: 24 }, (_, i) => {
    const t = i / 24;
    const wave = Math.sin(t * Math.PI * 2) * 0.4 + 0.6;
    const noon = Math.exp(-((i - 14) ** 2) / 30);
    const online = Math.round(base + (peak - base) * wave * (0.7 + 0.3 * noon));
    return { hour: i, online: Math.max(0, Math.min(100, online)) };
  });
}
