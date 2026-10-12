import type { Metadata } from "next";
import Link from "next/link";
import Cursor from "@/components/Cursor";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { site, waLink } from "@/lib/site";
import { tarihYaz, yazilar } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Web sitesi, e-ticaret ve SEO üzerine yazdıklarımız. Fiyatlar, süreçler, kendi projelerimizden çıkardığımız dersler.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${site.url}/blog`,
    siteName: site.name,
    title: `Blog | ${site.name}`,
    description:
      "Web sitesi, e-ticaret ve SEO üzerine yazdıklarımız — kendi projelerimizden örneklerle.",
  },
};

export default function BlogPage() {
  const liste = yazilar();

  return (
    <>
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
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                WhatsApp
              </a>
            </header>

            <div className="py-14 lg:py-20">
              <span className="mono text-faint">Blog</span>
              <h1 className="duz mt-6 max-w-[17ch] text-[clamp(2.2rem,6.4vw,4rem)]">
                Ne yaptığımızı yazıyoruz.
              </h1>
              <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.65] text-mute">
                Fiyatlar, süreçler, kendi projelerimizde karşılaştığımız
                sorunlar ve çözümleri. Genel geçer tavsiye değil — yayındaki
                işlerden çıkan notlar.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="gutter py-12 lg:py-16">
            {liste.length === 0 ? (
              <p className="text-[15px] text-mute">
                İlk yazı yolda. Bu arada{" "}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline underline-offset-4"
                >
                  WhatsApp&apos;tan
                </a>{" "}
                sorabilirsin.
              </p>
            ) : (
              <div className="border-t border-[var(--line)]">
                {liste.map((y, i) => (
                  <Link
                    key={y.slug}
                    href={`/blog/${y.slug}`}
                    style={{
                      ["--vurgu" as string]: y.renk,
                      animationDelay: `${0.06 * i + 0.12}s`,
                    }}
                    className="gir group relative block border-b border-[var(--line)] py-7 transition-[padding] duration-300 lg:hover:pl-5"
                  >
                    {/* sol kenarda yazının rengi */}
                    <span
                      aria-hidden
                      className="absolute bottom-7 left-0 top-7 w-[3px] origin-top scale-y-0 rounded-full bg-[var(--vurgu)] transition-transform duration-[450ms] group-hover:scale-y-100"
                    />
                    {/* arkada hafif ışıma */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(42% 92% at 0% 50%, color-mix(in srgb, var(--vurgu) 24%, transparent) 0%, transparent 72%)",
                      }}
                    />
                    <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1.5 text-faint">
                      <span
                        className="rounded-full px-2.5 py-1"
                        style={{
                          color: y.renk,
                          background:
                            "color-mix(in srgb, var(--vurgu) 16%, transparent)",
                        }}
                      >
                        {y.etiket}
                      </span>
                      <span>{tarihYaz(y.tarih)}</span>
                      <span>{y.dakika} dk okuma</span>
                    </div>
                    <h2 className="duz mt-3.5 max-w-[28ch] text-[clamp(1.35rem,3.6vw,2.1rem)]">
                      {y.baslik}
                    </h2>
                    <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.6] text-mute">
                      {y.ozet}
                    </p>
                    <span className="mono mt-4 inline-flex items-center gap-2 text-faint transition-colors group-hover:text-chalk">
                      Yazıyı oku
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <Chat />
      </main>
      <Footer />
    </>
  );
}
