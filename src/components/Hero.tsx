import { waLink } from "@/lib/site";
import { IconArrow, IconCheck, IconWhatsApp } from "./Icons";

const bullets = [
  "Hazır tema değil, size özel tasarım",
  "Mobilde kusursuz görünüm",
  "Google'a uygun teknik altyapı",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade" />
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[900px] max-w-[130vw] -translate-x-1/2 rounded-full bg-accent/22 blur-[130px]" />
        <div className="absolute right-[-140px] top-[220px] h-[420px] w-[420px] rounded-full bg-gold-lite/12 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x pb-20 pt-16 sm:pt-24 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="reveal inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-muted"
            style={{ animationDelay: "40ms" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-lite opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-lite" />
            </span>
            Yeni proje için takvimimiz açık
          </div>

          <h1
            className="reveal font-display mt-6 text-[clamp(2.1rem,6.4vw,4.1rem)] font-bold leading-[1.06]"
            style={{ animationDelay: "120ms" }}
          >
            İşinizi büyüten
            <br className="hidden sm:block" />{" "}
            <span className="grad-text">web siteleri</span> tasarlıyoruz.
          </h1>

          <p
            className="reveal mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]"
            style={{ animationDelay: "200ms" }}
          >
            Kurumsal site, e-ticaret ve landing page. Hızlı açılan, mobilde
            kusursuz çalışan ve ziyaretçiyi müşteriye çeviren siteler
            kuruyoruz — hazır temayla değil, sıfırdan.
          </p>

          <div
            className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#iletisim"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-accent-soft px-6 py-4 text-[15px] font-semibold text-[#1a1206] shadow-[0_18px_44px_-16px_rgba(201,146,47,.75)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Ücretsiz teklif alın
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white/[0.03] px-6 py-4 text-[15px] font-semibold transition-colors hover:border-[#25D366]/60 hover:text-[#25D366] sm:w-auto"
            >
              <IconWhatsApp className="h-[18px] w-[18px]" />
              WhatsApp'tan yazın
            </a>
          </div>

          <ul
            className="reveal mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            style={{ animationDelay: "360ms" }}
          >
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[13.5px] text-muted">
                <IconCheck className="h-4 w-4 text-gold-lite" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* tarayıcı mockup */}
        <div
          className="reveal mx-auto mt-16 max-w-4xl lg:mt-20"
          style={{ animationDelay: "440ms" }}
        >
          <div className="relative rounded-2xl border border-line bg-surface/80 p-2 shadow-[0_50px_120px_-40px_rgba(0,0,0,.9)] backdrop-blur">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 truncate rounded-md bg-ink/70 px-3 py-1 text-[11.5px] text-muted-2">
                https://sizin-siteniz.com
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2">
              <div className="absolute inset-0 bg-grid opacity-60" />
              <div className="relative grid gap-6 p-7 sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded bg-white/15" />
                  <div className="hidden gap-2 sm:flex">
                    {[44, 36, 40, 30].map((w, i) => (
                      <div key={i} className="h-2.5 rounded bg-white/8" style={{ width: w }} />
                    ))}
                  </div>
                  <div className="h-7 w-20 rounded-lg bg-gradient-to-r from-accent to-gold-lite" />
                </div>
                <div className="mt-2 space-y-3">
                  <div className="h-6 w-4/5 rounded bg-white/16 sm:h-8" />
                  <div className="h-6 w-3/5 rounded bg-white/10 sm:h-8" />
                  <div className="h-2.5 w-2/3 rounded bg-white/7" />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-20 rounded-xl border border-line bg-white/[0.035] sm:h-28"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
