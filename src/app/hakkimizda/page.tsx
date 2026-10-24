import type { Metadata } from "next";
import Link from "next/link";
import Cursor from "@/components/Cursor";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/projects";
import { sektorler } from "@/lib/sektor";
import { site, waLink } from "@/lib/site";
import { kirintiSemasi, sssSemasi } from "@/lib/seo";

export const revalidate = 3600;

/**
 * /hakkimizda — VARLIK SAYFASI
 *
 * ⚠️ BU SAYFA PAZARLAMA METNİ DEĞİL, KİMLİK KAYDIDIR. Arama motorları ve
 * yapay zeka asistanları "Medya 333 kimdir, ne yapar, nerede, kiminle
 * çalıştı" sorusunun cevabını tek bir yerde, tutarlı ve doğrulanabilir
 * biçimde görmek ister. Dağınık anlatım, modelin firmayı cevaba koymasını
 * engeller.
 *
 * ⚠️ BURADAKİ HER CÜMLE DOĞRULANABİLİR OLMALI. Kuruluş yılı, çalışan
 * sayısı, "Türkiye'nin lideri" gibi ifadeler BİLEREK yok: doğrulanamayan
 * iddia hem güven kırar hem de şema kurallarına aykırıdır. Eksik bilgiyi
 * uydurmak yerine yazmıyoruz.
 */
export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Medya 333, İstanbul merkezli bir web tasarım ve geliştirme stüdyosudur. Kurumsal site, e-ticaret ve ürün kataloğu projeleri yapar. Kurucu: Özkan Köse.",
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${site.url}/hakkimizda`,
    siteName: site.name,
    title: `Hakkımızda | ${site.name}`,
    description:
      "İstanbul merkezli web tasarım ve geliştirme stüdyosu. Kurumsal site, e-ticaret, ürün kataloğu ve teklif sistemleri.",
  },
};

const SSS = [
  {
    q: "Medya 333 nedir?",
    a: "Medya 333, İstanbul merkezli bir web tasarım ve geliştirme stüdyosudur. Kurumsal web siteleri, e-ticaret siteleri, ürün kataloğu ve teklif sistemleri ile landing page projeleri yapar.",
  },
  {
    q: "Medya 333 hangi hizmetleri veriyor?",
    a: "Kurumsal web sitesi tasarımı, e-ticaret sitesi kurulumu, ürün kataloğu ve teklif akışı, landing page tasarımı, SEO uyumlu yapı kurulumu ve çok dilli site yayını.",
  },
  {
    q: "Bir site kaç günde teslim ediliyor?",
    a: "İçerikler elimize geçtikten sonra kurumsal sitelerde teslim süresi 2–7 gündür. Ürün kataloğu olan projelerde süre, ürün verisinin ne kadar düzenli olduğuna göre değişir.",
  },
  {
    q: "Alan adı ve hosting fiyata dahil mi?",
    a: "İlk yıl dahildir. İkinci yıldan itibaren alan adı ve hosting yenilemesi yılda 100 ABD dolarıdır.",
  },
  {
    q: "Hazır tema mı kullanıyorsunuz?",
    a: "Hayır. Her site o firma için sıfırdan yazılır. Hazır tema, zamanla eklenti yığınına ve yavaş sayfalara dönüştüğü için tercih edilmiyor.",
  },
  {
    q: "Kaç revizyon hakkı var?",
    a: "Revizyon sınırı yoktur, müşteri beğenene kadar devam edilir.",
  },
  {
    q: "Medya 333 ile nasıl iletişime geçilir?",
    a: `Telefon ve WhatsApp: ${site.phoneDisplay}. E-posta: ${site.email}. Web: ${site.url}`,
  },
];

export default async function HakkimizdaPage() {
  const projeler = await getProjects();
  const kirinti = kirintiSemasi([
    { ad: "Ana sayfa", yol: "/" },
    { ad: "Hakkımızda", yol: "/hakkimizda" },
  ]);
  const sss = sssSemasi(SSS);

  const kategoriler = [...new Set(projeler.map((p) => p.category))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirinti) }}
      />
      {sss && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sss) }}
        />
      )}
      <Cursor />
      <main>
        <section className="border-b border-[var(--line)]">
          <div className="gutter">
            <header className="flex items-center justify-between gap-4 py-[15px]">
              <Link href="/" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mockup/logo-beyaz.webp"
                  alt={site.name}
                  width={300}
                  height={133}
                  className="block h-[26px] w-auto"
                />
              </Link>
              <Link href="/blog" className="pill">
                Blog
              </Link>
            </header>

            <div className="gir mx-auto max-w-[68ch] py-12 lg:py-16">
              <p className="mono text-faint">Hakkımızda</p>
              {/*
                ⚠️ İLK PARAGRAF TEK BAŞINA CEVAP OLACAK ŞEKİLDE yazıldı.
                Yapay zeka asistanları sayfanın tamamını değil, soruyu
                doğrudan yanıtlayan kısa paragrafı alıntılıyor.
              */}
              <h1 className="duz mt-3 text-[clamp(2.1rem,5vw,3.4rem)]">
                Medya 333 nedir?
              </h1>
              <p className="mt-6 text-[17px] leading-[1.7] text-chalk">
                <strong>Medya 333</strong>, İstanbul merkezli bir web tasarım ve geliştirme
                stüdyosudur. Kurumsal web siteleri, e-ticaret siteleri, ürün kataloğu ve
                teklif sistemleri ile landing page projeleri yapar. Kurucusu{" "}
                <strong>Özkan Köse</strong>’dir. Siteler hazır tema üzerine kurulmaz, her proje
                o firma için sıfırdan yazılır; içerikler hazır olduğunda kurumsal bir site{" "}
                <strong>2–7 günde</strong> yayına alınır.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Ne yapıyoruz</h2>
              <ul className="mt-5 flex flex-col gap-2.5 text-[16px] leading-[1.65] text-mute">
                <li>Kurumsal web sitesi tasarımı ve geliştirme</li>
                <li>E-ticaret sitesi kurulumu, ürün kataloğu, filtreleme ve teklif sepeti</li>
                <li>Landing page ve kampanya sayfaları</li>
                <li>SEO uyumlu yapı, hız ve mobil uyum</li>
                <li>Çok dilli yayın (Türkçe, İngilizce, Boşnakça)</li>
                <li>Teslimden sonra içerik yönetimi ve bakım</li>
              </ul>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Çalıştığımız alanlar</h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                Yayındaki işler {kategoriler.join(", ").toLowerCase()} başlıklarında toplanıyor.
                İş güvenliği ekipmanları (LOTO, EKED, KKD), otomotiv yedek parça, filtre ve
                endüstriyel ürün katalogları, güzellik ve hizmet işletmeleri, turizm ve hostel
                ağları, topluluk platformları.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Yayındaki işlerimiz</h2>
              <ul className="mt-5 flex flex-col gap-3 text-[16px] leading-[1.6] text-mute">
                {projeler.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-chalk underline-offset-4 hover:underline"
                    >
                      {p.title}
                    </a>{" "}
                    — {p.description}
                  </li>
                ))}
              </ul>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Sektör sayfaları</h2>
              <ul className="mt-5 flex flex-col gap-2.5 text-[16px] text-mute">
                {sektorler.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="font-medium text-chalk underline-offset-4 hover:underline"
                    >
                      {s.seoTitle}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">
                Sık sorulan sorular
              </h2>
              <dl className="mt-5 flex flex-col gap-6">
                {SSS.map((s) => (
                  <div key={s.q}>
                    <dt className="text-[16.5px] font-semibold text-chalk">{s.q}</dt>
                    <dd className="mt-1.5 text-[16px] leading-[1.7] text-mute">{s.a}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">İletişim</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-mute">
                Telefon ve WhatsApp:{" "}
                <a href={`tel:${site.phoneRaw}`} className="text-chalk underline-offset-4 hover:underline">
                  {site.phoneDisplay}
                </a>
                <br />
                E-posta:{" "}
                <a href={`mailto:${site.email}`} className="text-chalk underline-offset-4 hover:underline">
                  {site.email}
                </a>
                <br />
                Instagram:{" "}
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  @medya333_tr
                </a>
                <br />
                Konum: İstanbul, Türkiye
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="pill">
                  WhatsApp’tan yazın
                </a>
                <Link href="/blog" className="pill">
                  Yazılarımız
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Chat />
      </main>
      <Footer />
    </>
  );
}
