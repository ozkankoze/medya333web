import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cursor from "@/components/Cursor";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { site, waLink } from "@/lib/site";
import { tarihYaz, yaziBul, yazilar } from "@/lib/blog";

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

export default async function YaziPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) notFound();

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
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    inLanguage: "tr-TR",
  };

  return (
    <>
      <Cursor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                Tüm yazılar
              </Link>
            </header>

            <div className="mx-auto max-w-[68ch] py-12 lg:py-16">
              <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1 text-faint">
                <span>{y.etiket}</span>
                <span>{tarihYaz(y.tarih)}</span>
                <span>{y.dakika} dk okuma</span>
                {y.guncelleme && (
                  <span>Güncelleme: {tarihYaz(y.guncelleme)}</span>
                )}
              </div>
              <h1 className="display mt-6 text-[clamp(2.1rem,6.4vw,3.8rem)]">
                {y.baslik}
              </h1>
              <p className="mt-6 text-[17px] leading-[1.6] text-mute">
                {y.ozet}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="gutter py-12 lg:py-16">
            <article
              className="yazi mx-auto max-w-[68ch]"
              dangerouslySetInnerHTML={{ __html: y.html }}
            />

            <div className="mx-auto mt-14 max-w-[68ch] border-t border-[var(--line)] pt-8">
              <p className="text-[16px] leading-[1.6] text-chalk">
                Kendi işin için bunu konuşmak istersen, bir kahve içip
                sohbet edelim.
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
                    className="group block border-b border-[var(--line)] py-5 transition-[padding] duration-300 lg:hover:pl-3"
                  >
                    <span className="mono text-faint">{d.etiket}</span>
                    <h3 className="display mt-2 max-w-[30ch] text-[clamp(1.2rem,3vw,1.7rem)]">
                      {d.baslik}
                    </h3>
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
