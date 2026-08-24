import { sql, ensureSchema } from "./db";

export type Project = {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
  image_url: string;
  tags: string;
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
    title: "KKD Markt",
    url: "https://www.kkdmarkt.com/",
    category: "E-Ticaret",
    description:
      "İş güvenliği ve kişisel koruyucu donanım ürünleri için kurulan e-ticaret altyapısı. 931+ ürün, 9 ana kategori; OEM/parça araması ve mobil öncelikli teklif akışı.",
    image_url: "/referanslar/kkdmarkt.jpg",
    tags: "E-Ticaret,Ürün Kataloğu,Mobil Uyumlu,SEO",
    accent: "#F59E0B",
    sort_order: 10,
    published: true,
  },
  {
    id: -2,
    title: "Locks & Safety",
    url: "https://www.locksansafety.com/",
    category: "Kurumsal Web Sitesi",
    description:
      "Eked/Loto güvenlik ürünleri üreticisi için kurumsal tanıtım sitesi. Ürün kataloğu, eğitim & danışmanlık sayfaları ve doğrudan iletişim kanallarıyla sade bir yapı.",
    image_url: "/referanslar/locksansafety.jpg",
    tags: "Kurumsal,Ürün Vitrini,İletişim Odaklı",
    accent: "#22D3EE",
    sort_order: 20,
    published: true,
  },
  {
    id: -3,
    title: "Oto Center Market",
    url: "https://www.otocentermarket.com/",
    category: "E-Ticaret",
    description:
      "Oto yedek parça e-ticareti. 2.677+ ürün ve 54+ araç markası; motor kodu seviyesinde uyumluluk sorgusu, sepet ve sipariş takibiyle tam mağaza altyapısı.",
    image_url: "/referanslar/otocentermarket.jpg",
    tags: "E-Ticaret,Araç Uyumluluğu,Filtreleme,Sipariş Takibi",
    accent: "#3B82F6",
    sort_order: 30,
    published: true,
  },
  {
    id: -4,
    title: "Medya 333",
    url: "https://www.medya333.com/",
    category: "Sipariş Platformu",
    description:
      "Kendi markamız Medya 333 için sosyal medya hizmet ve sipariş platformu. 4 platform, 22 hizmet; anlık fiyat hesaplama, sipariş oluşturma ve adım adım takip.",
    image_url: "/referanslar/medya333.jpg",
    tags: "Platform,Sipariş Yönetimi,Anlık Fiyatlama,Üyelik",
    accent: "#D4A857",
    sort_order: 40,
    published: true,
  },
];

export async function getProjects(includeUnpublished = false): Promise<Project[]> {
  if (!sql) return includeUnpublished ? seedProjects : seedProjects.filter((p) => p.published);
  try {
    await ensureSchema();
    const rows = includeUnpublished
      ? await sql`SELECT * FROM projects ORDER BY sort_order ASC, id ASC`
      : await sql`SELECT * FROM projects WHERE published = TRUE ORDER BY sort_order ASC, id ASC`;
    if (!rows.length) {
      return includeUnpublished ? seedProjects : seedProjects.filter((p) => p.published);
    }
    return rows as Project[];
  } catch (e) {
    console.error("getProjects failed, seed verisine düşüldü:", e);
    return seedProjects;
  }
}

export function tagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
