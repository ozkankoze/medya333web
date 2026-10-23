import { site } from "@/lib/site";

/**
 * YAPILANDIRILMIŞ VERİ (JSON-LD)
 *
 * Arama motorları ve yapay zeka asistanları sayfayı okurken, metni tahmin
 * etmek yerine buradaki etiketlenmiş veriyi kullanır. "Kim, ne satıyor,
 * nerede, hangi soruya ne cevap veriyor" bilgisi burada makinenin
 * anlayacağı biçimde duruyor.
 *
 * ⚠️ BURADA YAZAN HER ŞEY SAYFADA DA GÖRÜNMELİ. Sayfada olmayan bir
 * bilgiyi şemaya koymak (uydurma puan, olmayan adres, gerçek olmayan
 * fiyat) hem Google kurallarına aykırıdır hem de yakalandığında sitenin
 * zengin sonuçlardan tamamen çıkarılmasına yol açar.
 *
 * ⚠️ TEK KAYNAK: bütün şemalar `site` nesnesinden beslenir. Telefon ya da
 * adres değiştiğinde tek dosya güncellenir, şemalar kendiliğinden doğru
 * kalır.
 */

/** Sayfaya gömülecek JSON-LD nesnesi. */
export type Sema = Record<string, unknown>;

/**
 * Firmanın kendisi. Her sayfada bir kez bulunur.
 *
 * ⚠️ `@id` ŞART: diğer şemalar (makale yayıncısı, hizmet sağlayıcı) bu
 * kimliğe bağlanır. Olmazsa her sayfa birbirinden habersiz ayrı bir
 * "işletme" tanımlar ve hiçbiri güçlenmez.
 */
export function kurumSemasi(): Sema {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#kurum`,
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    telephone: site.phoneRaw,
    email: site.email,
    image: `${site.url}/mockup/logo-beyaz.webp`,
    logo: `${site.url}/mockup/logo-beyaz.webp`,
    ...(site.address
      ? { address: { "@type": "PostalAddress", addressLocality: site.address } }
      : {}),
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "İstanbul" },
    ],
    availableLanguage: ["tr", "en", "bs"],
    sameAs: Object.values(site.social).filter(Boolean),
    // ⚠️ "knowsAbout" uydurma bir alan değil, schema.org'un kendi alanı:
    //    modellerin "bu firma ne yapar" sorusunu yanıtlamasını kolaylaştırır.
    knowsAbout: [
      "Web sitesi tasarımı",
      "Kurumsal web sitesi",
      "E-ticaret sitesi kurulumu",
      "Ürün kataloğu ve teklif sistemi",
      "Landing page tasarımı",
      "SEO",
      "Çok dilli web sitesi",
    ],
    serviceType: [
      "Web Sitesi Tasarımı",
      "E-Ticaret Sitesi Kurulumu",
      "SEO",
      "Landing Page Tasarımı",
    ],
  };
}

/** Sayfanın hangi dalda durduğu — arama sonucunda yol izi olarak çıkar. */
export function kirintiSemasi(
  parcalar: ReadonlyArray<{ ad: string; yol: string }>,
): Sema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: parcalar.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.ad,
      item: `${site.url}${p.yol}`,
    })),
  };
}

/**
 * Soru cevap bloğu.
 *
 * ⚠️ YAPAY ZEKA ASİSTANLARININ EN KOLAY ALINTILADIĞI BİÇİM BUDUR: soru ve
 * cevap zaten ayrılmış hâlde durur, modelin metinden çıkarım yapması
 * gerekmez.
 *
 * ⚠️ Boş liste gelirse şema ÜRETİLMEZ (`null`). Boş bir `FAQPage`,
 * doğrulayıcıda hata verir.
 */
export function sssSemasi(
  sorular: ReadonlyArray<{ q: string; a: string }>,
): Sema | null {
  if (sorular.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sorular.map((s) => ({
      "@type": "Question",
      name: s.q,
      acceptedAnswer: { "@type": "Answer", text: s.a },
    })),
  };
}

/** Sektör sayfalarının anlattığı hizmet. */
export function hizmetSemasi(params: {
  ad: string;
  aciklama: string;
  yol: string;
}): Sema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.ad,
    description: params.aciklama,
    url: `${site.url}${params.yol}`,
    provider: { "@id": `${site.url}/#kurum` },
    areaServed: { "@type": "Country", name: "Türkiye" },
    serviceType: "Web sitesi tasarımı ve geliştirme",
  };
}

/**
 * Markdown gövdesindeki "Sık sorulan sorular" bölümünü soru cevap
 * çiftlerine ayırır.
 *
 * Beklenen biçim (blog yazılarının tamamında kullanılan biçim):
 *
 *     ## Sık sorulan sorular
 *
 *     **Soru?**
 *     Cevap metni.
 *
 * ⚠️ BİÇİM TUTMAZSA BOŞ DÖNER, hata fırlatmaz: tek bir yazıdaki yazım
 * farkı yüzünden bütün blogun çökmesi, kazancından büyük bir risktir.
 */
export function markdownSss(govde: string): Array<{ q: string; a: string }> {
  const bolum = govde.split(/^##\s+Sık sorulan sorular\s*$/im)[1];
  if (!bolum) return [];

  // Bir sonraki ## başlığına kadar olan kısım
  const icerik = bolum.split(/^##\s+/m)[0] ?? "";
  const sonuc: Array<{ q: string; a: string }> = [];

  // **Soru** satırı + ardından gelen cevap satır(lar)ı
  const desen = /^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\s*\n\*\*|\n\s*$|$)/gm;
  let m: RegExpExecArray | null;
  while ((m = desen.exec(icerik))) {
    const q = m[1].trim();
    const a = m[2].replace(/\s+/g, " ").trim();
    if (q && a) sonuc.push({ q, a });
  }
  return sonuc;
}
