/**
 * Referans sitelerinin TAM BOY (kırpılmamış) ekran görüntüleri.
 *
 * Görseller 1200px genişlikte, sayfanın tamamı alınmış halde.
 * Vitrin çerçevesinin içinde yavaşça kaydırılarak gösteriliyor,
 * bu yüzden en-boy oranını bilmemiz gerekiyor.
 */

const RATIO: Record<string, number> = {
  locksansafety: 3.611,
  otocentermarket: 2.928,
  derengigi: 3.611,
  nextstop: 1.813,
  erenmobilya: 3.611,
  kkdmarkt: 2.7,
  sofilxloto: 3.611,
  ekedurunleri: 3.611,
};

function slugOf(url: string): string | null {
  const m = /^\/referanslar\/([a-z0-9_-]+)\.(jpe?g|png|webp)$/i.exec(url || "");
  if (!m) return null;
  const s = m[1].toLowerCase();
  return s in RATIO ? s : null;
}

/** Aynı görselin WebP sürümü varsa yolunu döndürür. */
export function webpFor(url: string): string | null {
  const s = slugOf(url);
  return s ? `/referanslar/${s}.webp` : null;
}

/** Görselin yükseklik / genişlik oranı. Bilinmiyorsa makul bir varsayılan. */
export function ratioFor(url: string): number {
  const s = slugOf(url);
  return s ? RATIO[s] : 2.4;
}

/** Sabit hızda kaydırmak için süre (sn). Uzun sayfa = uzun süre. */
export function creepSeconds(url: string): number {
  return Math.round(Math.min(46, Math.max(16, ratioFor(url) * 8)));
}

/** "https://www.locksansafety.com" -> "locksansafety.com" */
export function prettyHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }
}
