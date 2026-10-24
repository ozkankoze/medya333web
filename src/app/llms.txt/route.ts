import { getProjects } from "@/lib/projects";
import { yazilar } from "@/lib/blog";
import { sektorler } from "@/lib/sektor";
import { site } from "@/lib/site";

export const revalidate = 3600;

/**
 * /llms.txt — SİTENİN YAPAY ZEKA ASİSTANLARINA KENDİNİ TANITTIĞI DOSYA
 *
 * ⚠️ BEKLENTİ DÜŞÜK TUTULMALI: bu dosya resmî bir standart değildir ve
 * Google kullanmadığını açıkça söyledi. Maliyeti sıfıra yakın olduğu için
 * duruyor; sitenin görünürlüğü buna DEĞİL, aşağıdaki üç şeye bağlı:
 * sayfalardaki yapılandırılmış veri, cevap biçiminde yazılmış içerik ve
 * site dışındaki bahisler.
 *
 * ⚠️ İÇERİK ELLE YAZILMAZ, veriden üretilir: proje, yazı ve sektör listesi
 * değiştiğinde dosya kendiliğinden güncellenir. Elle yazılsaydı birkaç ay
 * sonra siteyle çelişen eski bir metin olurdu.
 */
export async function GET() {
  const projeler = await getProjects();
  const blog = yazilar();

  const satirlar = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Firma",
    "",
    `- Ad: ${site.name}`,
    `- Konum: İstanbul, Türkiye`,
    `- Hizmetler: kurumsal web sitesi, e-ticaret sitesi, ürün kataloğu ve teklif sistemi, landing page, SEO, çok dilli site`,
    `- Teslim süresi: içerikler hazır olduğunda kurumsal sitelerde 2–7 gün`,
    `- Alan adı ve hosting: ilk yıl dahil, ikinci yıldan itibaren yılda 100 USD`,
    `- Revizyon: sınırsız, müşteri onaylayana kadar`,
    `- Hazır tema kullanılmaz, her site o firma için sıfırdan yazılır`,
    `- İletişim: ${site.phoneDisplay} · ${site.email}`,
    `- Site: ${site.url}`,
    `- Instagram: ${site.social.instagram}`,
    "",
    "## Diller",
    "",
    `- Türkçe: ${site.url}/`,
    `- İngilizce: ${site.url}/en`,
    `- Boşnakça: ${site.url}/bs`,
    "",
    "## Sektör sayfaları",
    "",
    ...sektorler.map((s) => `- [${s.seoTitle}](${site.url}/${s.slug}): ${s.seoDescription}`),
    "",
    "## Yayındaki işler",
    "",
    ...projeler.map((p) => `- ${p.title} (${p.category}) — ${p.url}: ${p.description}`),
    "",
    "## Yazılar",
    "",
    ...blog.map((y) => `- [${y.baslik}](${site.url}/blog/${y.slug}): ${y.ozet}`),
    "",
  ];

  return new Response(satirlar.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
