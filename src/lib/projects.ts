import { sql, ensureSchema } from "./db";

export type Project = {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
  /** Vitrin görsellerinin anahtarı: /mockup/<image_url>-d.webp ve -m.webp */
  image_url: string;
  /**
   * Özellik etiketleri, "·" ile ayrılır.
   * Örn: "SEO Uyumlu · Gelişmiş Site Hızı · Mobil Uyumlu"
   * (Veritabanındaki kolon adı tarihsel sebeple "metrics".)
   */
  metrics: string;
  tags: string;
  accent: string;
  sort_order: number;
  published: boolean;
};

/**
 * Veritabanı yokken (veya boşken) gösterilecek referanslar.
 * Sıra, ana sayfadaki sıradır.
 */
export const seedProjects: Project[] = [
  {
    id: -1,
    title: "Locksan Safety",
    url: "https://www.locksansafety.com",
    category: "E-Ticaret",
    description:
      "LOTO / EKED iş güvenliği ekipmanları üreticisi için 400+ ürünlük e-ticaret altyapısı. Filtreleme, katalog indirme ve hızlı teklif akışı.",
    image_url: "locksansafety",
    metrics: "SEO Uyumlu · Gelişmiş Site Hızı · Mobil Uyumlu · Katalog İndirme",
    tags: "E-Ticaret,Katalog,SEO",
    accent: "#E03131",
    sort_order: 1,
    published: true,
  },
  {
    id: -2,
    title: "Lockout Turkey",
    url: "https://www.lockoutturkey.com",
    category: "E-Ticaret",
    description:
      "184 ürünlük kilitleme kataloğu. Kilitlenecek noktayı görselden seçtiren rehber, set oluşturucu ve teklif sepeti.",
    image_url: "lockoutturkey",
    metrics: "SEO Uyumlu · Gelişmiş Site Hızı · Mobil Uyumlu · Teklif Sepeti",
    tags: "E-Ticaret,Ürün Seçici,Teklif Sepeti",
    accent: "#D62839",
    sort_order: 2,
    published: true,
  },
  {
    id: -3,
    title: "Oto Center Market",
    url: "https://www.otocentermarket.com",
    category: "E-Ticaret",
    description:
      "2.600+ ürün ve 54 araç markası için OEM / motor kodu ile parça bulma motoru. Araç seviyesinde uyumluluk kontrolü.",
    image_url: "otocentermarket",
    metrics:
      "SEO Uyumlu · Gelişmiş Site Hızı · Mobil Uyumlu · Parça Arama Motoru",
    tags: "E-Ticaret,Ürün Arama,Entegrasyon",
    accent: "#3B6EF0",
    sort_order: 3,
    published: true,
  },
  {
    id: -4,
    title: "Next Stop Network",
    url: "https://www.nextstopbackpackers.com",
    category: "Platform",
    description:
      "Hostel ağı için çok dilli rezervasyon platformu. Destinasyon arama, tarih filtreleri ve üyelik bazlı geçiş sistemi.",
    image_url: "nextstop",
    metrics: "SEO Uyumlu · Mobil Uyumlu · Çok Dilli · Rezervasyon",
    tags: "Platform,Rezervasyon,Çok Dilli",
    accent: "#F0529B",
    sort_order: 4,
    published: true,
  },
  {
    id: -5,
    title: "Sofilx Filtre",
    url: "https://www.sofilx.com",
    category: "E-Ticaret",
    description:
      "Kompresör ve vakum pompası filtreleri. 40+ marka için orijinal ve muadil parça, çapraz referans koduyla arama ve teklif listesi.",
    image_url: "sofilx",
    metrics: "SEO Uyumlu · Mobil Uyumlu · Çapraz Referans Arama · Teklif Listesi",
    tags: "E-Ticaret,Çapraz Referans,Teklif",
    accent: "#1FB85C",
    sort_order: 5,
    published: true,
  },
  {
    id: -6,
    title: "Sofilx LOTO",
    url: "https://www.sofilxloto.com",
    category: "E-Ticaret",
    description:
      "2010'dan beri kilitleme-etiketleme ekipmanları. Kampanya alanı ve WhatsApp üzerinden teklif akışı.",
    image_url: "sofilxloto",
    metrics: "SEO Uyumlu · Mobil Uyumlu · Ürün Vitrini · WhatsApp Teklif",
    tags: "E-Ticaret,LOTO,Teklif",
    accent: "#D13343",
    sort_order: 6,
    published: true,
  },
  {
    id: -7,
    title: "Deren Gigi",
    url: "https://www.derengigi.com",
    category: "Özel Tasarım",
    description:
      "DJ ve prodüktör için deneysel kimlik sitesi. Akışkan WebGL görsel, sese tepki veren arayüz ve tam ekran tipografi.",
    image_url: "derengigi",
    metrics: "Mobil Uyumlu · Özel Tasarım · WebGL Animasyon",
    tags: "Özel Tasarım,Animasyon,WebGL",
    accent: "#B06CF5",
    sort_order: 7,
    published: true,
  },
  {
    id: -8,
    title: "Eren Mobilya",
    url: "https://www.erenmobilyatasarimatasehir.com",
    category: "Kurumsal",
    description:
      "Ataşehir'de özel üretim mobilya atölyesi için oda bazlı katalog ve proje galerisi.",
    image_url: "erenmobilya",
    metrics: "SEO Uyumlu · Mobil Uyumlu · Proje Galerisi",
    tags: "Kurumsal,Katalog,Galeri",
    accent: "#C9A227",
    sort_order: 8,
    published: true,
  },
  {
    id: -9,
    title: "KKD Markt",
    url: "https://www.kkdmarkt.com",
    category: "E-Ticaret",
    description:
      "Kişisel koruyucu donanımda geniş katalog. Marka ve kategori bazlı filtreleme, hızlı teklif.",
    image_url: "kkdmarkt",
    metrics:
      "SEO Uyumlu · Gelişmiş Site Hızı · Mobil Uyumlu · Kategori Filtreleme",
    tags: "E-Ticaret,KKD,Filtreleme",
    accent: "#F0405E",
    sort_order: 9,
    published: true,
  },
  {
    id: -10,
    title: "SOFT Safety",
    url: "https://www.ekedurunleri.com",
    category: "Kurumsal",
    description:
      "LOTO ekipmanları ve enerji izolasyon çözümleri. Prosedür odaklı ürün anlatımı ve katalog.",
    image_url: "ekedurunleri",
    metrics: "SEO Uyumlu · Mobil Uyumlu · Ürün Kataloğu",
    tags: "Kurumsal,LOTO,Katalog",
    accent: "#E8453C",
    sort_order: 10,
    published: true,
  },
];

export async function getProjects(
  includeUnpublished = false
): Promise<Project[]> {
  if (!sql)
    return includeUnpublished
      ? seedProjects
      : seedProjects.filter((p) => p.published);
  try {
    await ensureSchema();
    const rows = includeUnpublished
      ? await sql`SELECT * FROM projects ORDER BY sort_order ASC, id ASC`
      : await sql`SELECT * FROM projects WHERE published = TRUE ORDER BY sort_order ASC, id ASC`;
    if (!rows.length) {
      return includeUnpublished
        ? seedProjects
        : seedProjects.filter((p) => p.published);
    }
    return rows as Project[];
  } catch (e) {
    console.error("getProjects başarısız, seed verisine düşüldü:", e);
    return seedProjects;
  }
}

/** "E-Ticaret,SEO" -> ["E-Ticaret", "SEO"] */
export function tagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** "SEO Uyumlu · Mobil Uyumlu" -> ["SEO Uyumlu", "Mobil Uyumlu"] */
export function metricList(metrics: string): string[] {
  return (metrics || "")
    .split("·")
    .map((m) => m.trim())
    .filter(Boolean);
}

/** "https://www.locksansafety.com" -> "locksansafety.com" */
export function prettyHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }
}
