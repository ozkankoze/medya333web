import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/projects";
import { sektorBul, sektorler } from "@/lib/sektor";
import { site, waLink } from "@/lib/site";

export const revalidate = 60;
// Sadece sektorler listesindeki adresler geçerli; gerisi 404.
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
      <Nav />
      <main>
        {/* ---- başlık ---- */}
        <section className="rule-b">
          <div className="wrap">
            <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
              <div className="min-w-0 lg:col-span-7">
                <span className="mono mono-ink">{s.eyebrow}</span>
                <h1 className="display mt-7 text-[clamp(2.5rem,7vw,5rem)]">
                  {s.h1.map((line, i) => (
                    <span key={line} className="block">
                      {i === s.h1.length - 1 ? (
                        line
                      ) : (
                        <span className={i === 1 ? "text-muted-2" : undefined}>
                          {line}
                        </span>
                      )}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="flex min-w-0 flex-col justify-end lg:col-span-5">
                <p className="max-w-[48ch] text-[16px] leading-[1.65] text-muted lg:text-[17px]">
                  {s.intro}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Ürün listemi konuşalım
                  </a>
                  <a href="#sektor-isler" className="btn btn-ghost">
                    Bu sektördeki işler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- sektördeki referanslar ---- */}
        <section id="sektor-isler" className="rule-b">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6 py-14 lg:py-20">
              <div>
                <span className="mono">001 — Bu sektördeki işler</span>
                <h2 className="display-tight mt-7 text-[clamp(2.1rem,5.6vw,3.8rem)]">
                  {referanslar.length} firma.
                  <br />
                  Hepsi yayında.
                </h2>
              </div>
              <p className="max-w-[38ch] pb-2 text-[15px] leading-[1.65] text-muted">
                Görseller kırpılmadı — üzerine gelin, sitenin tamamı aşağı insin.
                Beğendiğiniz yeri gösterin, aynısını yapmayalım ama oradan
                başlayalım.
              </p>
            </div>

            <p className="mono -mt-6 pb-10 leading-[1.6]">
              Rakamlar ölçümdür, iddia değil — Google Lighthouse (mobil) ve
              sitelerin kendi site haritaları, Ekim 2026.
            </p>

            <div className="grid gap-x-10 gap-y-16 pb-16 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-20 lg:pb-24">
              {referanslar.map((p, i) => (
                <Reveal key={p.id ?? p.url} delay={(i % 2) * 80} className="h-full">
                  <ProjectCard p={p} index={i} priority={i < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- sektörün problemleri ---- */}
        <section className="rule-b bg-wash">
          <div className="wrap">
            <div className="py-14 lg:py-20">
              <span className="mono">002 — Bu sektörde ne bozuluyor</span>
              <h2 className="display-tight mt-7 max-w-[18ch] text-[clamp(2.1rem,5.6vw,3.8rem)]">
                Sorun tasarım değil, akış.
              </h2>
            </div>

            <div className="grid gap-x-12 gap-y-10 border-t border-ink pb-16 pt-10 sm:grid-cols-2 lg:pb-24">
              {s.problemler.map((pr, i) => (
                <div key={pr.title}>
                  <span className="mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-sm mt-3 text-[clamp(1.2rem,2.5vw,1.55rem)]">
                    {pr.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.62] text-muted">
                    {pr.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- kapsam ---- */}
        <section className="rule-b">
          <div className="wrap">
            <div className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
              <div className="lg:col-span-5">
                <span className="mono">003 — Kapsam</span>
                <h2 className="display-tight mt-7 text-[clamp(2.1rem,5.6vw,3.8rem)]">
                  Her projede
                  <br />
                  standart.
                </h2>
                <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.65] text-muted">
                  Ekstra ücretli &laquo;modül&raquo; satmıyoruz. Aşağıdakiler bu
                  sektördeki her işte zaten var.
                </p>
              </div>

              <ul className="border-t border-ink lg:col-span-7">
                {s.kapsam.map((k, i) => (
                  <li
                    key={k}
                    className="flex items-baseline gap-5 border-b border-line py-4"
                  >
                    <span className="mono shrink-0 text-[10px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.5]">{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- sektör S.S.S. ---- */}
        <section className="rule-b bg-wash">
          <div className="wrap">
            <div className="grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
              <div className="lg:col-span-4">
                <span className="mono">004 — Sorular</span>
                <h2 className="display-tight mt-7 text-[clamp(2.1rem,5.6vw,3.4rem)]">
                  Bu sektörde
                  <br />
                  en çok
                  <br />
                  sorulanlar.
                </h2>
              </div>

              <div className="lg:col-span-8">
                <div className="border-t border-line-2">
                  {s.sss.map((f, i) => (
                    <details
                      key={f.q}
                      className="group border-b border-line-2 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-5 py-5">
                        <span className="mono mt-1.5 shrink-0 text-[10px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="display-sm flex-1 text-[clamp(1.05rem,2.1vw,1.35rem)]">
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className="relative mt-2 block h-3 w-3 shrink-0"
                        >
                          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                        </span>
                      </summary>
                      <p className="max-w-[62ch] pb-6 pl-10 text-[15px] leading-[1.7] text-muted">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- iletişim ---- */}
        <section id="iletisim" className="rule-b">
          <div className="wrap">
            <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
              <div className="lg:col-span-5">
                <span className="mono">005 — İletişim</span>
                <h2 className="display-tight mt-7 text-[clamp(2.1rem,5.6vw,3.8rem)]">
                  Bir kahve içip
                  <br />
                  sohbet edelim.
                </h2>
                <p className="mt-7 max-w-[42ch] text-[16px] leading-[1.65] text-muted">
                  Ürün listenizi ve şu anki sitenizi gönderin; ne yapılması
                  gerektiğini ve ne kadar süreceğini aynı gün söyleyelim. İlk
                  görüşme ücretsiz.
                </p>

                <dl className="mt-10 border-t border-ink">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="mono mono-ink">WhatsApp</span>
                    <span className="link-slide text-[15px] font-medium tracking-tight">
                      En hızlı yol
                    </span>
                  </a>
                  <a
                    href={`tel:${site.phoneRaw}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="mono mono-ink">Telefon</span>
                    <span className="link-slide text-[15px] font-medium tracking-tight">
                      {site.phoneDisplay}
                    </span>
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="mono mono-ink">E-posta</span>
                    <span className="link-slide text-[15px] font-medium tracking-tight">
                      {site.email}
                    </span>
                  </a>
                </dl>
              </div>

              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
