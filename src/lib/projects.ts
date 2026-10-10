import { sql, ensureSchema } from "./db";

export type Project = {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
  image_url: string;
  tags: string;
  /** Ölçülmüş sonuç rakamları. "·" ile ayrılır. Boş olabilir. */
  metrics: string;
  accent: string;
  sort_order: number;
  published: boolean;
};

/**
 * Veritabanı yokken (veya boşken) gösterilecek referanslar.
 * Admin panelden referans eklendiğinde bunlar yerine veritabanı kullanılır.
 */
export const seedProjects: Project[] = [
  {
    id: -1,
    title: "Locksan Safety",
    url: "https://www.locksansafety.com",
    category: "E-Ticaret",
    description:
      "LOTO / EKED iş güvenliği ekipmanları üreticisi için 400+ ürünlük e-ticaret altyapısı. Ürün filtreleme, katalog indirme ve hızlı teklif akışı.",
    image_url: "/referanslar/locksansafety.jpg",
    metrics:
      "Google SEO 100/100 · Mobil hız 90/100 · İndekslenebilir sayfa 280",
    tags: "E-Ticaret,Katalog,SEO",
    accent: "#D62828",
    sort_order: 1,
    published: true,
  },
  {
    id: -2,
    title: "Oto Center Market",
    url: "https://www.otocentermarket.com",
    category: "E-Ticaret",
    description:
      "2.600+ ürün ve 54 araç markası için OEM / motor kodu ile parça bulma motoru. Araç seviyesinde uyumluluk kontrolü ve sipariş takibi.",
    image_url: "/referanslar/otocentermarket.jpg",
    metrics:
      "Google SEO 100/100 · Mobil hız 88/100 · İndekslenebilir sayfa 3.894",
    tags: "E-Ticaret,Ürün Arama,Entegrasyon",
    accent: "#1D4ED8",
    sort_order: 2,
    published: true,
  },
  {
    id: -3,
    title: "Deren Gigi",
    url: "https://www.derengigi.com",
    category: "Özel Tasarım",
    description:
      "DJ ve prodüktör için deneysel kimlik sitesi. Akışkan WebGL görsel, sesle tepki veren arayüz ve tam ekran tipografi.",
    image_url: "/referanslar/derengigi.jpg",
    metrics:
      "Google SEO 100/100 · Erişilebilirlik 100/100",
    tags: "Özel Tasarım,Animasyon,WebGL",
    accent: "#A855F7",
    sort_order: 3,
    published: true,
  },
  {
    id: -4,
    title: "Next Stop Network",
    url: "https://www.nextstopbackpackers.com",
    category: "Platform",
    description:
      "Hostel ağı için çok dilli rezervasyon platformu. Destinasyon arama, tarih ve kişi filtreleri, üyelik bazlı Next Pass sistemi.",
    image_url: "/referanslar/nextstop.jpg",
    metrics:
      "Google SEO 100/100 · Mobil hız 79/100",
    tags: "Platform,Rezervasyon,Çok Dilli",
    accent: "#EC4899",
    sort_order: 4,
    published: true,
  },
  {
    id: -5,
    title: "Eren Mobilya Tasarım",
    url: "https://www.erenmobilyatasarimatasehir.com",
    category: "Kurumsal",
    description:
      "Ataşehir'de ölçüye özel mutfak ve dolap üretimi yapan atölye için galeri odaklı kurumsal site. Proje vitrini ve yerel SEO kurgusu.",
    image_url: "/referanslar/erenmobilya.jpg",
    metrics:
      "Google SEO 100/100 · Erişilebilirlik 100/100",
    tags: "Kurumsal,Galeri,Yerel SEO",
    accent: "#8B6F47",
    sort_order: 5,
    published: true,
  },
  {
    id: -6,
    title: "KKD Markt",
    url: "https://www.kkdmarkt.com",
    category: "E-Ticaret",
    description:
      "Kişisel koruyucu donanım pazaryeri: 931 ürün, 9 ana kategori, 23 global marka. Kategori ağacı ve hızlı teklif talebi üzerine kurulu.",
    image_url: "/referanslar/kkdmarkt.jpg",
    metrics:
      "Google SEO 100/100 · Mobil hız 84/100 · İndekslenebilir sayfa 1.010",
    tags: "E-Ticaret,Çok Kategori,B2B",
    accent: "#E11D48",
    sort_order: 6,
    published: true,
  },
  {
    id: -7,
    title: "Sofilx LOTO",
    url: "https://www.sofilxloto.com",
    category: "E-Ticaret",
    description:
      "Kilitleme-etiketleme ekipmanlarında 2010'dan beri faaliyet gösteren markanın ürün vitrini. Kampanya alanı ve WhatsApp'tan teklif akışı.",
    image_url: "/referanslar/sofilxloto.jpg",
    metrics:
      "Google SEO 100/100 · İndekslenebilir sayfa 259",
    tags: "E-Ticaret,Marka,Teklif Akışı",
    accent: "#B91C2C",
    sort_order: 7,
    published: true,
  },
  {
    id: -8,
    title: "SOFT Safety",
    url: "https://www.ekedurunleri.com",
    category: "Kurumsal",
    description:
      "Enerji izolasyon çözümleri için sade, editoryal ürün anlatımı. Teknik föy tabloları ve mühendis diline uygun içerik mimarisi.",
    image_url: "/referanslar/ekedurunleri.jpg",
    metrics:
      "Google SEO 100/100 · İndekslenebilir sayfa 168",
    tags: "Kurumsal,Teknik İçerik,Katalog",
    accent: "#DC2626",
    sort_order: 8,
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

export function tagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** "SEO 100/100 · 280 sayfa" -> ["SEO 100/100", "280 sayfa"] */
export function metricList(metrics: string): string[] {
  return (metrics || "")
    .split("·")
    .map((m) => m.trim())
    .filter(Boolean);
}
