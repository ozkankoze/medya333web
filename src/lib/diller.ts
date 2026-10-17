/**
 * ÇOK DİLLİ SAYFALAR
 *
 * Türkçe ana sayfa sektöre (iş güvenliği, sanayi) konuşuyor.
 * /en ve /bs sayfaları ise yurt dışındaki küçük işletmeye konuşur:
 * otel, hostel, kafe, tur acentesi.
 *
 * Yeni dil eklemek için: DILLER'e bir satır, SOZLUK'e bir kayıt ekle,
 * sonra src/app/<kod>/page.tsx dosyasını kopyala.
 */

export type DilKodu = "tr" | "en" | "bs";

export const DILLER: { kod: DilKodu; ad: string; yol: string }[] = [
  { kod: "tr", ad: "Türkçe", yol: "/" },
  { kod: "en", ad: "English", yol: "/en" },
  { kod: "bs", ad: "Bosanski", yol: "/bs" },
];

export type Sozluk = {
  htmlDili: string;
  sehir: string;
  baslik: string;
  altBaslik: string;
  vitrinBaslik: string[];
  vitrinMetin: string;
  cta: string;
  ctaAlt: string;

  neYapariz: { baslik: string; kalemler: { b: string; m: string }[] };
  kimler: { baslik: string; metin: string; kalemler: string[] };
  nasil: { baslik: string; adimlar: { n: string; b: string; m: string }[] };
  dahil: { baslik: string; kalemler: string[]; fiyatNot: string };
  sss: { baslik: string; sorular: { s: string; c: string }[] };
  iletisim: { baslik: string; metin: string; wa: string; mail: string; ig: string };
  footer: string;

  meta: { baslik: string; aciklama: string };
};

const ORTAK_WA_EN =
  "Hello, I saw your website. I would like to talk about a website for my business.";
const ORTAK_WA_BS =
  "Zdravo, vidio sam vašu stranicu. Želio bih razgovarati o izradi web stranice.";

export const WA_MESAJ: Record<"en" | "bs", string> = {
  en: ORTAK_WA_EN,
  bs: ORTAK_WA_BS,
};

/** Vitrindeki rozetler veritabanında Türkçe duruyor; burada çevriliyor. */
export const METRIK: Record<"en" | "bs", Record<string, string>> = {
  en: {
    "SEO Uyumlu": "SEO ready",
    "Gelişmiş Site Hızı": "Optimised speed",
    "Mobil Uyumlu": "Mobile friendly",
    "Katalog İndirme": "Catalogue download",
    "Teklif Sepeti": "Quote basket",
    "Teklif Listesi": "Quote list",
    "Çok Dilli": "Multilingual",
    "Rezervasyon": "Booking",
    "Çapraz Referans Arama": "Cross-reference search",
    "Parça Arama Motoru": "Parts search engine",
    "Kategori Filtreleme": "Category filters",
    "Ürün Vitrini": "Product showcase",
    "Ürün Kataloğu": "Product catalogue",
    "Proje Galerisi": "Project gallery",
    "WhatsApp Teklif": "WhatsApp enquiry",
    "Özel Tasarım": "Custom design",
    "WebGL Animasyon": "WebGL animation",
    "Üyelik Sistemi": "Member accounts",
    "Oylama ve Anket": "Voting and polls",
  },
  bs: {
    "SEO Uyumlu": "Spremno za SEO",
    "Gelişmiş Site Hızı": "Optimizirana brzina",
    "Mobil Uyumlu": "Prilagođeno telefonu",
    "Katalog İndirme": "Preuzimanje kataloga",
    "Teklif Sepeti": "Korpa za ponudu",
    "Teklif Listesi": "Lista za ponudu",
    "Çok Dilli": "Više jezika",
    "Rezervasyon": "Rezervacije",
    "Çapraz Referans Arama": "Pretraga po šiframa",
    "Parça Arama Motoru": "Pretraga dijelova",
    "Kategori Filtreleme": "Filteri po kategorijama",
    "Ürün Vitrini": "Izlog proizvoda",
    "Ürün Kataloğu": "Katalog proizvoda",
    "Proje Galerisi": "Galerija projekata",
    "WhatsApp Teklif": "Upit preko WhatsAppa",
    "Özel Tasarım": "Dizajn po mjeri",
    "WebGL Animasyon": "WebGL animacija",
    "Üyelik Sistemi": "Korisnički računi",
    "Oylama ve Anket": "Glasanje i ankete",
  },
};

export const SOZLUK: Record<"en" | "bs", Sozluk> = {
  en: {
    htmlDili: "en",
    sehir: "Istanbul",
    baslik: "Your website, live in two days",
    altBaslik:
      "Medya 333 is a web studio from Istanbul. We build every site from scratch for that one business — no ready-made templates. Hotels, hostels, cafés and small companies.",
    vitrinBaslik: ["Your face", "on the internet"],
    vitrinMetin:
      "We work from Istanbul. From a simple presentation site to a catalogue with hundreds of products, we build how a brand looks online: design, code and launch, all from one hand.",
    cta: "Message us on WhatsApp",
    ctaAlt: "We usually reply the same day.",

    neYapariz: {
      baslik: "What we do",
      kalemler: [
        {
          b: "Websites built for you",
          m: "No theme bought off the shelf. The design and the code are written for your business, so the site does exactly what you need and nothing you don't.",
        },
        {
          b: "Booking and enquiry flows",
          m: "A guest should reach you in two taps. Enquiry forms, WhatsApp buttons, room or service pages, and a direct line to your inbox.",
        },
        {
          b: "More than one language",
          m: "Your guests do not all speak the same language. We can publish your site in two or three languages from day one.",
        },
        {
          b: "Fast on a phone",
          m: "Most of your visitors arrive on a phone, often on mobile data. We design the phone screen first, then open it up to the desktop.",
        },
      ],
    },

    kimler: {
      baslik: "Who we build for",
      metin:
        "Small businesses that live on being found and being trusted. If a guest checks you online before they book, a weak site costs you money every week.",
      kalemler: [
        "Hotels and guest houses",
        "Hostels and backpacker stays",
        "Restaurants, cafés and bars",
        "Tour operators and guides",
        "Diving, climbing and rafting schools",
        "Shops, studios and salons",
      ],
    },

    nasil: {
      baslik: "How it works",
      adimlar: [
        {
          n: "01",
          b: "We talk",
          m: "Twenty minutes is enough. What you do, who your guests are, what the site has to achieve.",
        },
        {
          n: "02",
          b: "You send what you have",
          m: "Photos, your logo if there is one, prices, opening hours. If something is missing we tell you exactly what to send.",
        },
        {
          n: "03",
          b: "Your site goes live",
          m: "Two days after the content reaches us. You see it first, we change whatever you want, then we publish.",
        },
      ],
    },

    dahil: {
      baslik: "What is included",
      kalemler: [
        "Domain name for the first year",
        "Hosting for the first year",
        "No limit on the number of pages",
        "Unlimited revisions until you are happy",
        "Mobile-first design",
        "SSL certificate (the padlock)",
        "Contact form and WhatsApp button",
        "Ready for Google from day one",
      ],
      fiyatNot:
        "Price depends on the work: how many pages, how many products, whether you need bookings. It starts at 300 USD. From the second year, renewing the domain and hosting is 100 USD per year.",
    },

    sss: {
      baslik: "Questions we get asked",
      sorular: [
        {
          s: "How long does it really take?",
          c: "Two days from the moment your photos and texts reach us. What makes projects late is content, not design.",
        },
        {
          s: "I already have a website. What happens to it?",
          c: "It keeps running. We build the new one separately, you approve it, and only then do we switch. There is no downtime.",
        },
        {
          s: "Who writes the text?",
          c: "You can send it, or we can write it from what you tell us and you correct it.",
        },
        {
          s: "Can I update it myself afterwards?",
          c: "Yes. You get a simple panel for photos, prices and text. We show you how it works at handover.",
        },
        {
          s: "Do you use WordPress templates?",
          c: "No. Every site is written from scratch, which is why they stay fast and do not break on updates.",
        },
      ],
    },

    iletisim: {
      baslik: "Let's talk about your site",
      metin:
        "Write on WhatsApp or send an email. Tell us what your business is and we will tell you what we would build.",
      wa: "WhatsApp",
      mail: "Email",
      ig: "Instagram",
    },

    footer: "All rights reserved",

    meta: {
      baslik: "Medya 333 — Websites for small businesses, live in two days",
      aciklama:
        "Web studio from Istanbul. Custom-coded websites for hotels, hostels, cafés and small businesses. Domain and hosting included the first year, live in two days.",
    },
  },

  bs: {
    htmlDili: "bs",
    sehir: "Istanbul",
    baslik: "Vaša web stranica, online za dva dana",
    altBaslik:
      "Medya 333 je web studio iz Istanbula. Svaku stranicu pišemo od nule za taj jedan biznis — bez gotovih šablona. Hoteli, hosteli, kafići i male firme.",
    vitrinBaslik: ["Vaše lice", "na internetu"],
    vitrinMetin:
      "Radimo iz Istanbula. Od jednostavne prezentacione stranice do kataloga sa stotinama proizvoda, gradimo kako vaš brend izgleda na internetu: dizajn, kod i objava, sve na jednom mjestu.",
    cta: "Pišite nam na WhatsApp",
    ctaAlt: "Obično odgovorimo isti dan.",

    neYapariz: {
      baslik: "Šta radimo",
      kalemler: [
        {
          b: "Stranice rađene po mjeri",
          m: "Ne kupujemo gotove teme. Dizajn i kod pišemo za vaš posao, pa stranica radi tačno ono što vam treba i ništa više.",
        },
        {
          b: "Rezervacije i upiti",
          m: "Gost treba da vas dobije u dva klika. Forma za upit, WhatsApp dugme, stranice soba ili usluga i poruka koja stiže direktno na vaš mejl.",
        },
        {
          b: "Više jezika",
          m: "Vaši gosti ne govore svi isti jezik. Stranicu možemo objaviti na dva ili tri jezika od prvog dana.",
        },
        {
          b: "Brzo na telefonu",
          m: "Većina posjetilaca dolazi s telefona, često preko mobilnih podataka. Prvo crtamo ekran telefona, pa tek onda računar.",
        },
      ],
    },

    kimler: {
      baslik: "Za koga radimo",
      metin:
        "Za male biznise kojima je važno da budu pronađeni i da izgledaju ozbiljno. Ako vas gost provjeri na internetu prije nego rezerviše, slaba stranica vas košta svake sedmice.",
      kalemler: [
        "Hoteli i pansioni",
        "Hosteli i smještaj za bekpekere",
        "Restorani, kafići i barovi",
        "Turističke agencije i vodiči",
        "Škole ronjenja, penjanja i raftinga",
        "Radnje, studiji i saloni",
      ],
    },

    nasil: {
      baslik: "Kako to ide",
      adimlar: [
        {
          n: "01",
          b: "Razgovaramo",
          m: "Dvadeset minuta je dovoljno. Čime se bavite, ko su vam gosti, šta stranica treba da postigne.",
        },
        {
          n: "02",
          b: "Pošaljete nam materijal",
          m: "Fotografije, logo ako ga imate, cijene, radno vrijeme. Ako nešto nedostaje, tačno vam kažemo šta treba poslati.",
        },
        {
          n: "03",
          b: "Stranica ide online",
          m: "Dva dana nakon što materijal stigne. Prvo je vidite vi, mijenjamo šta god želite, pa tek onda objavljujemo.",
        },
      ],
    },

    dahil: {
      baslik: "Šta je uključeno",
      kalemler: [
        "Domena za prvu godinu",
        "Hosting za prvu godinu",
        "Bez ograničenja broja stranica",
        "Neograničene izmjene dok ne budete zadovoljni",
        "Dizajn prvo za telefon",
        "SSL certifikat (katanac u pretraživaču)",
        "Kontakt forma i WhatsApp dugme",
        "Spremno za Google od prvog dana",
      ],
      fiyatNot:
        "Cijena zavisi od posla: koliko stranica, koliko proizvoda, da li trebate rezervacije. Počinje od 300 USD. Od druge godine, obnova domene i hostinga je 100 USD godišnje.",
    },

    sss: {
      baslik: "Česta pitanja",
      sorular: [
        {
          s: "Koliko stvarno traje?",
          c: "Dva dana od trenutka kada fotografije i tekstovi stignu kod nas. Projekte ne usporava dizajn, nego materijal.",
        },
        {
          s: "Već imam stranicu. Šta biva s njom?",
          c: "Nastavlja raditi. Novu gradimo odvojeno, vi je odobrite i tek onda prebacujemo. Nema prekida.",
        },
        {
          s: "Ko piše tekst?",
          c: "Možete ga poslati vi, ili ga mi napišemo na osnovu onoga što nam ispričate, a vi ispravite.",
        },
        {
          s: "Mogu li kasnije sam mijenjati stranicu?",
          c: "Da. Dobijete jednostavan panel za fotografije, cijene i tekst. Na primopredaji vam pokažemo kako radi.",
        },
        {
          s: "Koristite li WordPress šablone?",
          c: "Ne. Svaka stranica se piše od nule, zato ostaje brza i ne lomi se na ažuriranjima.",
        },
      ],
    },

    iletisim: {
      baslik: "Hajde da pričamo o vašoj stranici",
      metin:
        "Pišite na WhatsApp ili pošaljite mejl. Recite nam čime se bavite, a mi ćemo vam reći šta bismo napravili.",
      wa: "WhatsApp",
      mail: "Mejl",
      ig: "Instagram",
    },

    footer: "Sva prava zadržana",

    meta: {
      baslik: "Medya 333 — Web stranice za male biznise, online za dva dana",
      aciklama:
        "Web studio iz Istanbula. Stranice pisane od nule za hotele, hostele, kafiće i male firme. Domena i hosting uključeni prve godine, online za dva dana.",
    },
  },
};
