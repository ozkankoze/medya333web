import { site } from "@/lib/site";
import { getProjects } from "@/lib/projects";
import { mockupSrc } from "@/lib/mockup";
import { prettyHost } from "@/lib/projects";
import Cursor from "./Cursor";
import Showcase from "./Showcase";
import Form3D from "./Form3D";
import Footer from "./Footer";
import DilSecici from "./DilSecici";
import { METRIK, WA_MESAJ, type DilKodu, type Sozluk } from "@/lib/diller";

/**
 * /en ve /bs sayfalarının gövdesi.
 * Türkçe ana sayfa sektöre konuşur; bu sayfa yurt dışındaki
 * küçük işletmeye konuşur. İçerik src/lib/diller.ts içinde.
 */
export default async function YabanciSayfa({
  kod,
  s,
}: {
  kod: Exclude<DilKodu, "tr">;
  s: Sozluk;
}) {
  const projects = await getProjects();
  const ilk = projects[0] ? mockupSrc(projects[0].image_url) : null;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    WA_MESAJ[kod]
  )}`;

  return (
    <>
      <Cursor />
      <main>
        {/* ---------- üst bölüm ---------- */}
        <section className="relative isolate flex min-h-[620px] flex-col overflow-hidden lg:min-h-[min(840px,94svh)]">
          {ilk && (
            <>
              <link rel="preload" as="image" href={ilk.masa} fetchPriority="high" />
              <link rel="preload" as="image" href={ilk.mobil} fetchPriority="high" />
            </>
          )}
          <Form3D />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(5,5,8,.6)_0%,transparent_24%,transparent_50%,rgba(5,5,8,.74)_100%)]"
          />

          <div className="gutter relative z-[4]">
            <header className="gir grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 py-[15px]">
              <span className="pill justify-self-start">{s.sehir}</span>
              <span className="justify-self-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mockup/logo-beyaz.webp"
                  alt={site.name}
                  width={300}
                  height={133}
                  className="block h-[26px] w-auto lg:h-[30px]"
                />
              </span>
              <span className="justify-self-end">
                <DilSecici aktif={kod} />
              </span>
            </header>
          </div>

          <div className="gutter relative z-[2] flex flex-1">
            <Showcase
              projects={projects}
              ilkBaslik={s.vitrinBaslik}
              ilkMetin={s.vitrinMetin}
              metrikSozluk={METRIK[kod]}
            />
          </div>
        </section>

        {/* ---------- başlık + çağrı ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter py-16 md:py-24">
            <h1 className="display max-w-[16ch] text-[40px] leading-[1.05] md:text-[64px]">
              {s.baslik}
            </h1>
            <p className="mt-7 max-w-[62ch] text-[17px] leading-relaxed text-mute md:text-[19px]">
              {s.altBaslik}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn">
                {s.cta}
              </a>
              <span className="text-[14px] text-faint">{s.ctaAlt}</span>
            </div>
          </div>
        </section>

        {/* ---------- ne yaparız ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">{s.neYapariz.baslik}</span>
            <div className="mt-8 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
              {s.neYapariz.kalemler.map((k) => (
                <div key={k.b} className="bg-void p-7 md:p-9">
                  <h2 className="text-[20px] font-semibold tracking-[-0.02em] md:text-[22px]">
                    {k.b}
                  </h2>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-mute">{k.m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- kimler için ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">{s.kimler.baslik}</span>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-mute">
              {s.kimler.metin}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {s.kimler.kalemler.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-[14.5px] text-chalk"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- nasıl çalışır ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">{s.nasil.baslik}</span>
            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              {s.nasil.adimlar.map((a) => (
                <div key={a.n} className="border-t border-[var(--line)] pt-6">
                  <span className="mono text-gold">{a.n}</span>
                  <h2 className="mt-3 text-[21px] font-semibold tracking-[-0.02em]">
                    {a.b}
                  </h2>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-mute">{a.m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- neler dahil ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">{s.dahil.baslik}</span>
            <ul className="mt-8 grid gap-x-10 gap-y-3.5 md:grid-cols-2">
              {s.dahil.kalemler.map((k) => (
                <li
                  key={k}
                  className="relative pl-6 text-[16px] leading-relaxed text-chalk before:absolute before:left-0 before:top-[9px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-gold"
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-[62ch] border-l-2 border-gold/50 pl-5 text-[15.5px] leading-relaxed text-mute">
              {s.dahil.fiyatNot}
            </p>
          </div>
        </section>

        {/* ---------- işlerimiz ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">
              {kod === "bs" ? "Naši radovi" : "Our work"}
            </span>
            <ul className="mt-8 border-t border-[var(--line)]">
              {projects.slice(0, 6).map((p) => (
                <li key={p.id} className="border-b border-[var(--line)]">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-baseline justify-between gap-3 py-5 transition-colors hover:text-gold"
                  >
                    <span className="text-[19px] font-medium">{prettyHost(p.url)}</span>
                    <span className="text-[14.5px] text-faint">{p.category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- sık sorulanlar ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-16 md:pb-24">
            <span className="eyebrow">{s.sss.baslik}</span>
            <div className="mt-8 grid gap-7 md:max-w-[72ch]">
              {s.sss.sorular.map((q) => (
                <div key={q.s}>
                  <h2 className="text-[18px] font-semibold tracking-[-0.01em]">{q.s}</h2>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-mute">{q.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- iletişim ---------- */}
        <section className="relative z-[2] bg-void">
          <div className="gutter pb-20 md:pb-28">
            <div className="card p-8 md:p-12">
              <h2 className="display text-[30px] leading-tight md:text-[40px]">
                {s.iletisim.baslik}
              </h2>
              <p className="mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-mute">
                {s.iletisim.metin}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn">
                  {s.iletisim.wa} · {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="btn btn-ghost">
                  {s.iletisim.mail} · {site.email}
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  {s.iletisim.ig} · @medya333_tr
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
