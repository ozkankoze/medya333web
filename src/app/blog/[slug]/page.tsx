import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cursor from "@/components/Cursor";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import ProjeKarti from "@/components/ProjeKarti";
import { getProjects } from "@/lib/projects";
import { site, waLink } from "@/lib/site";
import { tarihYaz, yaziBul, yazilar } from "@/lib/blog";
import { kirintiSemasi, markdownSss, sssSemasi } from "@/lib/seo";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return yazilar().map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) return {};

  return {
    title: y.baslik,
    description: y.ozet,
    alternates: { canonical: `/blog/${y.slug}` },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: `${site.url}/blog/${y.slug}`,
      siteName: site.name,
      title: y.baslik,
      description: y.ozet,
      publishedTime: y.tarih,
      ...(y.guncelleme ? { modifiedTime: y.guncelleme } : {}),
    },
    robots: { index: true, follow: true },
  };
}

/** `::proje:anahtar::` işaretlerini bulup metni parçalara ayırır. */
function parcala(html: string) {
  const desen = /<p>\s*::proje:([a-z0-9-]+)::\s*<\/p>/gi;
  const parcalar: Array<{ tip: "html"; icerik: string } | { tip: "proje"; anahtar: string }> = [];
  let son = 0;
  let m: RegExpExecArray | null;

  while ((m = desen.exec(html))) {
    if (m.index > son) {
      parcalar.push({ tip: "html", icerik: html.slice(son, m.index) });
    }
    parcalar.push({ tip: "proje", anahtar: m[1] });
    son = m.index + m[0].length;
  }
  if (son < html.length) parcalar.push({ tip: "html", icerik: html.slice(son) });
  return parcalar;
}

export default async function YaziPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) notFound();

  const projeler = await getProjects();
  const parcalar = parcala(y.html);
  const digerleri = yazilar()
    .filter((d) => d.slug !== y.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: y.baslik,
    description: y.ozet,
    datePublished: y.tarih,
    dateModified: y.guncelleme || y.tarih,
    mainEntityOfPage: `${site.url}/blog/${y.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    // ⚠️ Yayıncı, ana sayfadaki kurum kaydına BAĞLANIR (`@id`). Ayrı bir
    //    kurum tanımı yazılsaydı her yazı birbirinden habersiz yeni bir
    //    işletme anlatır, hiçbiri güçlenmezdi.
    publisher: { "@id": `${site.url}/#kurum` },
    inLanguage: "tr-TR",
    articleSection: y.etiket,
    ...(y.kisaCevap ? { abstract: y.kisaCevap } : {}),
    wordCount: y.icerik.trim().split(/\s+/).length,
  };

  /**
   * ⚠️ SORU CEVAP ŞEMASI YAZININ KENDİ METNİNDEN ÜRETİLİR.
   * Elle ikinci bir liste tutulsaydı, yazıdaki cevap düzeltildiğinde şema
   * eski cevabı göstermeye devam ederdi. Bölüm yoksa şema basılmaz.
   */
  const sss = sssSemasi(markdownSss(y.icerik));

  const kirinti = kirintiSemasi([
    { ad: "Ana sayfa", yol: "/" },
    { ad: "Blog", yol: "/blog" },
    { ad: y.baslik, yol: `/blog/${y.slug}` },
  ]);

  return (
    <>
      <Cursor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <main style={{ ["--vurgu" as string]: y.renk }}>
        <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
          {/* yazının rengiyle ışıyan başlık alanı */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-[320px] -z-1 h-[640px] opacity-[0.28]"
            style={{
              background:
                "radial-gradient(44% 52% at 50% 60%, var(--vurgu) 0%, transparent 70%)",
            }}
          />

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
                Tüm yazılar
              </Link>
            </header>

            <div className="gir mx-auto max-w-[68ch] py-12 lg:py-16">
              <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1.5 text-faint">
                <span
                  className="rounded-full px-2.5 py-1"
                  style={{
                    color: y.renk,
                    background: "color-mix(in srgb, var(--vurgu) 16%, transparent)",
                  }}
                >
                  {y.etiket}
                </span>
                <span>{tarihYaz(y.tarih)}</span>
                <span>{y.dakika} dk okuma</span>
                {y.guncelleme && (
                  <span>Güncelleme: {tarihYaz(y.guncelleme)}</span>
                )}
              </div>
              <h1 className="duz mt-6 text-[clamp(2rem,5.4vw,3.3rem)]">
                {y.baslik}
              </h1>
              <p className="mt-6 text-[17px] leading-[1.6] text-mute">
                {y.ozet}
              </p>
              {/*
                ⚠️ KISA CEVAP KUTUSU: yazının sorusunu tek paragrafta
                yanıtlar. Hem aceleci okuyucu hem de sayfayı alıntılayan
                yapay zeka asistanı için konur; sayfanın en üstünde,
                başlığın hemen altında durur ki alıntılanan metin doğru
                cevap olsun.
              */}
              {y.kisaCevap && (
                <div
                  className="mt-7 rounded-[14px] border p-5"
                  style={{
                    borderColor: "color-mix(in srgb, var(--vurgu) 38%, transparent)",
                    background: "color-mix(in srgb, var(--vurgu) 9%, transparent)",
                  }}
                >
                  <p className="mono" style={{ color: y.renk }}>
                    Kısa cevap
                  </p>
                  <p className="mt-2.5 text-[16.5px] leading-[1.65] text-chalk">
                    {y.kisaCevap}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="gutter py-12 lg:py-16">
            <div className="yazi mx-auto max-w-[68ch]">
              {parcalar.map((p, i) => {
                if (p.tip === "html") {
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: p.icerik }}
                    />
                  );
                }
                const proje = projeler.find((x) => x.image_url === p.anahtar);
                if (!proje) return null;
                return <ProjeKarti key={i} proje={proje} />;
              })}
            </div>

            <div className="mx-auto mt-14 max-w-[68ch] border-t border-[var(--line)] pt-8">
              <p className="text-[16px] leading-[1.6] text-chalk">
                Kendi işin için bunu konuşmak istersen, bir kahve içip sohbet
                edelim.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill mt-5 inline-flex"
              >
                WhatsApp&apos;tan yaz
              </a>
            </div>
          </div>
        </section>

        {digerleri.length > 0 && (
          <section className="border-t border-[var(--line)]">
            <div className="gutter py-12 lg:py-16">
              <span className="mono text-faint">Diğer yazılar</span>
              <div className="mt-7 border-t border-[var(--line)]">
                {digerleri.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/blog/${d.slug}`}
                    className="group flex items-start gap-3.5 border-b border-[var(--line)] py-5 transition-[padding] duration-300 lg:hover:pl-3"
                  >
                    <i
                      aria-hidden
                      className="mt-[9px] block h-2 w-2 flex-none rounded-full"
                      style={{ background: d.renk }}
                    />
                    <span className="min-w-0">
                      <span className="mono block text-faint">{d.etiket}</span>
                      <span className="duz mt-1.5 block max-w-[34ch] text-[clamp(1.05rem,2.6vw,1.35rem)] text-chalk">
                        {d.baslik}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Chat />
      </main>
      <Footer />
    </>
  );
}
