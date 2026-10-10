/**
 * TÜM SİTE AYARLARI BURADA.
 * İletişim bilgilerini, metinleri değiştirmek için sadece bu dosyayı düzenle.
 */

export const site = {
  name: "Medya 333 Web",
  shortName: "333",
  domain: "www.medya333.com",
  // Sitenin gerçekte açıldığı adres. Vercel'de birincil (primary) domain bu;
  // medya333.com ve medya333web.com buraya yönlenir.
  // Sitemap, canonical ve JSON-LD hep bunu kullanır — sonundaki / olmayacak.
  url: "https://www.medya333.com",
  tagline: "Web Tasarım & Geliştirme",
  description:
    "Kurumsal web sitesi, e-ticaret ve landing page tasarımı. Hızlı açılan, mobil uyumlu, Google'da bulunan siteler tasarlıyoruz.",

  // ---- İLETİŞİM ----
  phoneDisplay: "0506 040 95 11",
  phoneRaw: "+905060409511", // tel: linki için, boşluksuz
  whatsapp: "905060409511", // wa.me linki için, + ve boşluk olmadan
  whatsappMessage:
    "Merhaba, web sitesi yaptırmak istiyorum. Bilgi alabilir miyim?",
  email: "info@medya333.com",
  address: "", // ofis adresi eklemek istersen buraya yaz, otomatik görünür

  social: {
    instagram: "https://instagram.com/medya333_tr",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  // Alt bilgideki marka satırı. url boşsa link değil, düz yazı olarak çıkar.
  parentBrand: {
    name: "Medya 333",
    url: "",
  },
} as const;

export const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;
