import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * BLOG
 *
 * Yazılar src/content/blog/ içinde .md dosyası olarak durur.
 * Yeni yazı = yeni dosya. Veritabanı gerekmez, her şey git'te.
 *
 * Dosya başı (frontmatter) şöyle:
 *
 *   ---
 *   baslik: Kurumsal web sitesi fiyatları 2026
 *   ozet: Tek cümlelik özet — arama sonucunda ve listede görünür.
 *   tarih: 2026-10-12
 *   etiket: Fiyatlar
 *   guncelleme: 2026-11-02      (isteğe bağlı)
 *   ---
 */

export type Yazi = {
  slug: string;
  baslik: string;
  ozet: string;
  tarih: string;
  etiket: string;
  guncelleme?: string;
  icerik: string;
  html: string;
  dakika: number;
};

const KLASOR = path.join(process.cwd(), "src", "content", "blog");

/** Basit frontmatter ayrıştırıcı — `anahtar: değer` satırları. */
function ayristir(ham: string): { alanlar: Record<string, string>; govde: string } {
  const m = ham.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { alanlar: {}, govde: ham };

  const alanlar: Record<string, string> = {};
  for (const satir of m[1].split(/\r?\n/)) {
    const i = satir.indexOf(":");
    if (i === -1) continue;
    const anahtar = satir.slice(0, i).trim();
    let deger = satir.slice(i + 1).trim();
    if (
      (deger.startsWith('"') && deger.endsWith('"')) ||
      (deger.startsWith("'") && deger.endsWith("'"))
    ) {
      deger = deger.slice(1, -1);
    }
    if (anahtar) alanlar[anahtar] = deger;
  }
  return { alanlar, govde: m[2] };
}

/** Ortalama 200 kelime/dakika, en az 1. */
function okumaSuresi(metin: string): number {
  const kelime = metin.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(kelime / 200));
}

function oku(dosya: string): Yazi | null {
  const ham = fs.readFileSync(path.join(KLASOR, dosya), "utf8");
  const { alanlar, govde } = ayristir(ham);
  if (!alanlar.baslik) return null;

  return {
    slug: dosya.replace(/\.md$/, ""),
    baslik: alanlar.baslik,
    ozet: alanlar.ozet ?? "",
    tarih: alanlar.tarih ?? "",
    etiket: alanlar.etiket ?? "Yazı",
    ...(alanlar.guncelleme ? { guncelleme: alanlar.guncelleme } : {}),
    icerik: govde,
    html: marked.parse(govde, { async: false }) as string,
    dakika: okumaSuresi(govde),
  };
}

/** Tüm yazılar, yeniden eskiye. */
export function yazilar(): Yazi[] {
  if (!fs.existsSync(KLASOR)) return [];
  return fs
    .readdirSync(KLASOR)
    .filter((d) => d.endsWith(".md"))
    .map(oku)
    .filter((y): y is Yazi => Boolean(y))
    .sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
}

export function yaziBul(slug: string): Yazi | undefined {
  return yazilar().find((y) => y.slug === slug);
}

/** "2026-10-12" -> "12 Ekim 2026" */
export function tarihYaz(iso: string): string {
  const aylar = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, a, g] = (iso || "").split("-").map(Number);
  if (!y || !a || !g) return iso;
  return `${g} ${aylar[a - 1]} ${y}`;
}
