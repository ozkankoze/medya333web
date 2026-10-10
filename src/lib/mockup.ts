/**
 * Vitrindeki dizüstü ve telefon görselleri.
 *
 * public/mockup/<anahtar>-d.webp  → sitenin masaüstü hali (560 px geniş)
 * public/mockup/<anahtar>-m.webp  → sitenin mobil hali (300 px geniş)
 *
 * Görseller sayfanın tamamını kapsar ve çerçeve içinde yavaşça kaydırılır,
 * bu yüzden en-boy oranını bilmemiz gerekiyor (yükseklik / genişlik).
 *
 * Yeni referans eklerken: iki görseli public/mockup/ içine koy, oranları
 * buraya yaz. Oran yoksa görsel yine görünür, sadece kayma hızı varsayılana
 * düşer.
 */

type Oran = { d: number; m: number };

const ORAN: Record<string, Oran> = {
  locksansafety: { d: 3.611, m: 6.153 },
  lockoutturkey: { d: 3.611, m: 6.153 },
  otocentermarket: { d: 2.927, m: 6.153 },
  nextstop: { d: 1.813, m: 6.153 },
  sofilx: { d: 3.611, m: 6.153 },
  sofilxloto: { d: 3.611, m: 6.153 },
  derengigi: { d: 3.611, m: 6.153 },
  erenmobilya: { d: 3.611, m: 6.153 },
  kkdmarkt: { d: 2.7, m: 6.153 },
  ekedurunleri: { d: 3.611, m: 6.153 },
};

const VARSAYILAN: Oran = { d: 2.6, m: 6.0 };

export function mockupSrc(anahtar: string) {
  const a = (anahtar || "").trim();
  return {
    masa: `/mockup/${a}-d.webp`,
    mobil: `/mockup/${a}-m.webp`,
  };
}

export function mockupOran(anahtar: string): Oran {
  return ORAN[(anahtar || "").trim()] ?? VARSAYILAN;
}

/** Sabit hızda kaydırmak için süre (sn). */
export function kaymaSuresi(
  gorselYukseklik: number,
  pencereYukseklik: number,
  temel = 6
): number {
  const yol = Math.max(0, gorselYukseklik - pencereYukseklik);
  return Math.min(52, Math.max(14, (yol / 100) * 1.1 + temel));
}
