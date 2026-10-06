import { site, waLink } from "@/lib/site";
import { getProjects } from "@/lib/projects";
import { IconArrow, IconWhatsApp } from "./Icons";

export default async function Hero() {
  const projects = await getProjects();
  const names = projects.map((p) => p.title);
  const marquee = names.length ? [...names, ...names] : [];

  return (
    <section id="top" className="relative overflow-hidden pt-[150px] lg:pt-[190px]">
      {/* arka plan dokusu */}
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] max-w-[130vw] -translate-x-1/2 rounded-full bg-gold-soft/60 blur-[130px]" />

      <div className="container-x">
        <div className="pill">
          <span className="animate-dot h-[7px] w-[7px] rounded-full bg-emerald-500" />
          Yeni projeler için müsaitiz
        </div>

        <h1 className="display mt-8 max-w-[19ch] text-[clamp(2.75rem,8vw,5.75rem)]">
          Markanızı hak ettiği <span className="serif text-gold">yere</span>{" "}
          taşıyan web siteleri.
        </h1>

        <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted lg:text-[18.5px]">
          İstanbul merkezli web tasarım stüdyosu. Kurumsal siteden e-ticarete,
          rezervasyon platformundan sanatçı sitesine — hazır tema kullanmadan,
          projeye özel tasarlayıp kodluyoruz.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#iletisim" className="btn btn-dark">
            Ücretsiz teklif alın
            <IconArrow className="h-4 w-4" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <IconWhatsApp className="h-[18px] w-[18px]" />
            WhatsApp'tan yazın
          </a>
        </div>

        {/* rakamlar */}
        <dl className="mt-20 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
          {[
            ["8", "yayında proje"],
            ["7+", "yıl deneyim"],
            ["100%", "özel tasarım"],
            ["7/24", "destek"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="display-sm text-[clamp(1.9rem,4vw,2.6rem)]">{n}</dt>
              <dd className="mt-1.5 text-[13.5px] text-muted">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* referans adları akışı */}
      {marquee.length > 0 && (
        <div className="mask-fade-x mt-20 overflow-hidden border-y border-line py-5">
          <div className="animate-marquee flex w-max items-center gap-12 px-6">
            {marquee.map((n, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[15px] font-medium tracking-tight text-muted-2"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
