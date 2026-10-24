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
    "İstanbul'da kurumsal web sitesi, e-ticaret ve landing page tasarlıyoruz. Hazır tema değil, firmanıza özel kod. 10 firma yayında — projeleri inceleyin.",

  // ---- İLETİŞİM ----
  phoneDisplay: "0537 010 86 11",
  phoneRaw: "+905370108611", // tel: linki için, boşluksuz
  whatsapp: "905370108611", // wa.me linki için, + ve boşluk olmadan
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
