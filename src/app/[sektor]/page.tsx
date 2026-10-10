import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cursor from "@/components/Cursor";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { getProjects, metricList, prettyHost } from "@/lib/projects";
import { sektorBul, sektorler } from "@/lib/sektor";
import { site, waLink } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return sektorler.map((s) => ({ sektor: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sektor: string }>;
}): Promise<Metadata> {
  const { sektor } = await params;
  const s = sektorBul(sektor);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `${site.url}/${s.slug}`,
      siteName: site.name,
      title: s.seoTitle,
      description: s.seoDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SektorPage({
  params,
}: {
  params: Promise<{ sektor: string }>;
}) {
  const { sektor } = await params;
  const s = sektorBul(sektor);
  if (!s) notFound();

  const tumu = await getProjects();
  const referanslar = s.referansBasliklari
    .map((t) => tumu.find((p) => p.title === t))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Cursor />
      <main>
        {/* başlık */}
        <section className="border-b border-[var(--line)]">
          <div className="gutter">
            <header className="flex items-center justify-between gap-4 py-[15px]">
              <a href="/" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mockup/logo-beyaz.webp"
                  alt={site.name}
                  width={300}
                  height={133}
                  className="block h-[26px] w-auto"
                />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                WhatsApp
              </a>
            </header>

            <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
              <div className="min-w-0 lg:col-span-7">
                <span className="mono text-faint">{s.eyebrow}</span>
                <h1 className="display mt-7 text-[clamp(2.5rem,7vw,5rem)]">
                  {s.h1.map((line, i) => (
                    <span
                      key={line}
                      className={`block ${i === 1 ? "text-mute" : ""}`}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              </div>
              <div className="flex min-w-0 flex-col justify-end lg:col-span-5">
                <p className="max-w-[48ch] text-[16px] leading-[1.65] text-mute lg:text-[17px]">
                  {s.intro}
                </p>
                <div className="mt-8">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Ürün listemi konuşalım
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* bu sektördeki işler */}
        <section className="border-b border-[var(--line)]">
          <div className="gutter py-14 lg:py-20">
            <span className="mono text-faint">001 — Bu sektördeki işler</span>
            <h2 className="display mt-7 text-[clamp(2.1rem,5.6vw,3.8rem)]">
              {referanslar.length} firma. Hepsi yayında.
            </h2>

            <div className="mt-10 border-t border-[var(--line)]">
              {referanslar.map((p) => (
                <a
                  key={p.id ?? p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-[var(--line)] py-5 transition-[padding] duration-300 hover:pl-2.5 sm:grid-cols-[minmax(0,1fr)_14rem_auto]"
                >
                  <span className="display text-[clamp(1.4rem,3.4vw,2rem)]">
                    {p.title}{" "}
                    <span className="mono text-faint">{prettyHost(p.url)}</span>
                  </span>
                  <span className="mono text-mute">
                    {metricList(p.metrics).slice(0, 2).join(" · ")}
                  </span>
                  <span className="mono text-faint">Siteyi aç ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* sektörün problemleri */}
        <section className="border-b border-[var(--line)]">
          <div className="gutter py-14 lg:py-20">
            <span className="mono text-faint">002 — Bu sektörde ne bozuluyor</span>
            <h2 className="display mt-7 max-w-[18ch] text-[clamp(2.1rem,5.6vw,3.8rem)]">
              Sorun tasarım değil, akış.
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-10 border-t border-[var(--line)] pt-10 sm:grid-cols-2">
              {s.problemler.map((pr, i) => (
                <div key={pr.title}>
                  <span className="mono text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-[clamp(1.2rem,2.5vw,1.6rem)]">
                    {pr.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.62] text-mute">
                    {pr.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* kapsam */}
        <section className="border-b border-[var(--line)]">
          <div className="gutter grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <span className="mono text-faint">003 — Kapsam</span>
              <h2 className="display mt-7 text-[clamp(2.1rem,5.6vw,3.8rem)]">
                Her projede standart.
              </h2>
              <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.65] text-mute">
                Ekstra ücretli &laquo;modül&raquo; satmıyoruz. Aşağıdakiler bu
                sektördeki her işte zaten var.
              </p>
            </div>
            <ul className="border-t border-[var(--line)] lg:col-span-7">
              {s.kapsam.map((k, i) => (
                <li
                  key={k}
                  className="flex items-baseline gap-5 border-b border-[var(--line)] py-4"
                >
                  <span className="mono shrink-0 text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.5]">{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* sektör S.S.S. */}
        <section className="border-b border-[var(--line)]">
          <div className="gutter grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-4">
              <span className="mono text-faint">004 — Sorular</span>
              <h2 className="display mt-7 text-[clamp(2.1rem,5.6vw,3.4rem)]">
                Bu sektörde en çok sorulanlar.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="border-t border-[var(--line)]">
                {s.sss.map((f, i) => (
                  <details
                    key={f.q}
                    className="group border-b border-[var(--line)] [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-start gap-5 py-5">
                      <span className="mono mt-1.5 shrink-0 text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display flex-1 text-[clamp(1.05rem,2.1vw,1.4rem)]">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-2 block h-3 w-3 shrink-0"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-chalk" />
                        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-chalk transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="max-w-[62ch] pb-6 pl-10 text-[15px] leading-[1.7] text-mute">
                      {f.a}
                    </p>
                  </details>
                ))}
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
