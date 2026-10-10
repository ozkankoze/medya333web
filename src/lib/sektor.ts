/**
 * Sektöre özel landing sayfalarının içeriği.
 * Outreach mesajlarında bu sayfaların adresi paylaşılır.
 *
 * Yeni sektör eklemek için: buraya bir kayıt ekle, sitemap.ts otomatik alır.
 */

export type Sektor = {
  slug: string;
  /** Sayfa başlığı (SEO) */
  seoTitle: string;
  seoDescription: string;
  /** Üst etiket */
  eyebrow: string;
  /** Ana başlık — satır satır */
  h1: string[];
  intro: string;
  /** Bu sektördeki referansların başlıkları (projects.ts ile eşleşmeli) */
  referansBasliklari: string[];
  /** Sektörün gerçek problemleri */
  problemler: { title: string; text: string }[];
  /** Sitede standart olan, sektöre dokunan işler */
  kapsam: string[];
  /** Sektöre özel S.S.S. */
  sss: { q: string; a: string }[];
};

export const sektorler: Sektor[] = [
  {
    slug: "is-guvenligi-web-tasarim",
    seoTitle: "İş Güvenliği Firmaları İçin Web Sitesi ve E-Ticaret",
    seoDescription:
      "LOTO, EKED ve KKD üreticileri için ürün kataloğu, teklif akışı ve bayi girişi olan web siteleri. Bu sektörde dört canlı referans.",
    eyebrow: "Sektör — İş güvenliği",
    h1: ["İş güvenliği", "firmaları için", "site yapıyoruz."],
    intro:
      "LOTO kilitleri, EKED setleri, KKD ürünleri — bu ürünleri satan bir firmanın sitesi, moda sitesine benzemez. Yüzlerce teknik ürün, standart numaraları, PDF katalog, bayi fiyatı ve en önemlisi teklif talebi vardır. Dördünü de yaptık, hâlâ yayındalar.",
    referansBasliklari: [
      "Locksan Safety",
      "Sofilx LOTO",
      "KKD Markt",
      "SOFT Safety",
    ],
    problemler: [
      {
        title: "Ürün sayısı siteyi boğuyor",
        text: "400 kilit, 60 asma kilit, 12 pano kilitleme seti. Müşteri aradığını bulamazsa telefon etmez, kapatır. Filtreleme ve arama, bu sektörde süs değil zorunluluk.",
      },
      {
        title: "Satın alan kişi fiyat değil uygunluk arıyor",
        text: "«OSHA 29 CFR 1910.147'ye uygun mu?», «bu pano bu kilitle kapanıyor mu?» Standart bilgisi ve teknik föy ürün sayfasında olmazsa teklif gelmez.",
      },
      {
        title: "Satış sepetten değil tekliften geçiyor",
        text: "B2B'de 50 kalemlik liste WhatsApp'tan ya da e-postadan gelir. Site bunu kolaylaştırmıyorsa, satış sürecinin dışında kalır.",
      },
      {
        title: "Katalog PDF'i indirilmiyor",
        text: "Teknik katalog bu işin para kazandıran dosyasıdır. Sitede bulunması zor olduğunda, satın almacı rakibin kataloğunu indirir.",
      },
    ],
    kapsam: [
      "Ürün kataloğu — kategori, filtre ve hızlı arama",
      "Standart ve sertifika bilgisi için ürün alanları",
      "PDF teknik föy ve katalog indirme",
      "Toplu teklif sepeti — WhatsApp veya e-postaya tek tıkla",
      "Bayi / kurumsal müşteri girişi (opsiyonel)",
      "Ürün bazlı SEO — her ürün ayrı sayfa, ayrı başlık",
      "Türkçe + İngilizce (ihracat yapan firmalar için)",
      "Yönetim paneli — ürünü siz ekler, siz fiyatlarsınız",
    ],
    sss: [
      {
        q: "Elimde Excel'de ürün listesi var, tek tek girmem mi gerekecek?",
        a: "Hayır. Excel / CSV listesini biz toplu aktarıyoruz. Görseller ve teknik föyler klasör halinde gelse de olur; eşleştirmeyi biz yapıyoruz.",
      },
      {
        q: "Fiyatları herkese göstermek istemiyorum.",
        a: "Yapılabilir. Fiyatı tamamen gizleyip «teklif iste» ile çalışabiliriz, ya da bayi girişi olanlara bayi fiyatı, diğerlerine liste fiyatı gösterecek şekilde kurabiliriz.",
      },
      {
        q: "Mevcut sitemin Google sıralaması kaybolur mu?",
        a: "Yenileme projelerinde eski adresleri yeni adreslere yönlendiriyoruz (301). İçerik ve ürün sayfaları korunduğu sürece sıralama taşınır; genelde teknik iyileştirme sayesinde artar.",
      },
      {
        q: "İhracat yapıyoruz, yabancı müşteri de giriyor.",
        a: "Çok dilli kurulum standart işimiz. Ürün adları ve teknik açıklamalar iki dilde tutulur, Google her iki dili ayrı ayrı indeksler.",
      },
    ],
  },
];

export function sektorBul(slug: string): Sektor | undefined {
  return sektorler.find((s) => s.slug === slug);
}
