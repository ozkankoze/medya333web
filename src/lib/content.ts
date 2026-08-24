export const services = [
  {
    title: "Kurumsal Web Sitesi",
    text: "Firmanızı ciddi ve güvenilir gösteren, hızlı açılan tanıtım siteleri. Hizmetler, referanslar ve iletişim tek akışta.",
    icon: "building",
  },
  {
    title: "E-Ticaret Sitesi",
    text: "Ürün yönetimi, ödeme ve kargo entegrasyonları ile satışa hazır mağaza. Sepete gidişi kısaltan sade akışlar.",
    icon: "cart",
  },
  {
    title: "Landing Page",
    text: "Tek bir kampanya veya ürün için, tek hedefe odaklı dönüşüm sayfası. Reklam trafiğini müşteriye çevirir.",
    icon: "target",
  },
  {
    title: "SEO & Hız",
    text: "Google'da bulunabilirlik, teknik SEO, Core Web Vitals ve sayfa hızı optimizasyonu. Yavaş site müşteri kaybettirir.",
    icon: "search",
  },
  {
    title: "Yenileme & Taşıma",
    text: "Eskimiş sitenizi modern bir yapıya taşırız. İçerikleriniz ve Google sıralamanız korunarak yenilenir.",
    icon: "refresh",
  },
  {
    title: "Bakım & Destek",
    text: "Yayına aldıktan sonra da yanınızdayız. Güncelleme, yedekleme, güvenlik ve içerik desteği.",
    icon: "shield",
  },
] as const;

export const packages = [
  {
    name: "Başlangıç",
    subtitle: "Yeni kurulan işletmeler ve tek sayfa tanıtım için",
    highlight: false,
    features: [
      "Tek sayfa (landing) tasarım",
      "Mobil ve tablet uyumlu",
      "İletişim formu + WhatsApp butonu",
      "Google Haritalar entegrasyonu",
      "Temel SEO kurulumu",
      "SSL sertifikası ve yayına alma",
    ],
  },
  {
    name: "Kurumsal",
    subtitle: "Hizmet ve ürünlerini ciddi şekilde anlatmak isteyen firmalar için",
    highlight: true,
    features: [
      "Çok sayfalı kurumsal site (5–12 sayfa)",
      "Özel tasarım, hazır tema değil",
      "İçerik yönetim paneli",
      "Blog / haber bölümü",
      "Gelişmiş SEO + Google Analytics",
      "Hız optimizasyonu",
      "1 yıl teknik destek",
    ],
  },
  {
    name: "E-Ticaret",
    subtitle: "Online satışa geçmek veya mevcut mağazayı büyütmek için",
    highlight: false,
    features: [
      "Sınırsız ürün ve kategori",
      "Sanal POS / ödeme entegrasyonu",
      "Kargo ve fatura entegrasyonu",
      "Sipariş ve stok yönetim paneli",
      "Kampanya ve kupon sistemi",
      "Ürün bazlı SEO",
      "Eğitim + 1 yıl destek",
    ],
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Görüşme ve Analiz",
    text: "İşinizi, hedef kitlenizi ve rakiplerinizi konuşuruz. Sitenin ne iş yapacağını netleştiririz.",
  },
  {
    step: "02",
    title: "Tasarım",
    text: "Size özel arayüz tasarımı hazırlanır. Onayınız alınmadan kodlamaya geçilmez.",
  },
  {
    step: "03",
    title: "Geliştirme",
    text: "Tasarım koda dökülür. Mobil uyum, hız ve SEO daha ilk günden yapının içinde olur.",
  },
  {
    step: "04",
    title: "Yayın ve Destek",
    text: "Domain ve hosting kurulumuyla site yayına alınır. Sonrasında güncelleme ve destek devam eder.",
  },
] as const;

export const faqs = [
  {
    q: "Bir web sitesi ne kadar sürede teslim edilir?",
    a: "Tek sayfa bir tanıtım sitesi ortalama 3–7 gün, kurumsal site 2–3 hafta, e-ticaret projeleri 3–6 hafta sürüyor. Süreyi en çok etkileyen şey içerik (yazı, görsel, logo) hazırlığıdır.",
  },
  {
    q: "Fiyatlar neden sitede yazmıyor?",
    a: "Her projenin kapsamı farklı. 5 sayfalık bir kurumsal site ile 500 ürünlük bir mağazanın fiyatı aynı olamaz. İhtiyacınızı 10 dakikalık bir görüşmede netleştirip size özel, net bir fiyat çıkarıyoruz.",
  },
  {
    q: "Domain ve hosting dahil mi?",
    a: "İlk yıl domain ve hosting kurulumunu biz yapıyoruz. İsterseniz her şey sizin adınıza açılır, tüm şifreler size teslim edilir. Hiçbir zaman siteniz bize bağlı kalmaz.",
  },
  {
    q: "Siteyi kendim güncelleyebilir miyim?",
    a: "Evet. Kurumsal ve e-ticaret paketlerinde yönetim paneli veriyoruz. Yazı, görsel, ürün ve fiyat değişikliklerini teknik bilgi gerekmeden kendiniz yapabilirsiniz. Teslimde kısa bir kullanım eğitimi de veriyoruz.",
  },
  {
    q: "Sitem Google'da çıkacak mı?",
    a: "Teknik SEO altyapısı (hız, mobil uyum, başlık yapısı, site haritası, Search Console kaydı) her projede standart. Bunun üzerine rekabetçi kelimelerde sıralama için düzenli içerik ve SEO çalışması gerekir; bunu da ayrıca yürütebiliyoruz.",
  },
  {
    q: "Hazır tema mı kullanıyorsunuz?",
    a: "Hayır. Tasarımı projeye özel yapıyoruz. Hazır temaların en büyük problemi ağır olmaları ve yüzlerce siteye benzemeleri; ikisi de markanıza zarar verir.",
  },
  {
    q: "Ödeme nasıl yapılıyor?",
    a: "Genellikle başlangıçta %50, teslimde %50 şeklinde. Uzun süren projelerde aşamalara bölünmüş ödeme planı da yapabiliyoruz.",
  },
] as const;

export const budgets = [
  "Henüz netleşmedi",
  "15.000 ₺ altı",
  "15.000 – 30.000 ₺",
  "30.000 – 60.000 ₺",
  "60.000 ₺ üzeri",
] as const;

export const serviceOptions = [
  "Kurumsal Web Sitesi",
  "E-Ticaret Sitesi",
  "Landing Page",
  "Mevcut Sitenin Yenilenmesi",
  "SEO / Hız Optimizasyonu",
  "Diğer",
] as const;
