import { process } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="surec" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[760px] max-w-[120vw] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Nasıl çalışıyoruz"
            title="Dört adımda yayında"
            desc="Sürprizsiz, net bir süreç. Her adımda ne olduğunu bilirsiniz."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 90}>
              <div className="relative h-full">
                <div className="relative z-10 grid h-[76px] w-[76px] place-items-center rounded-2xl border border-line bg-ink-2">
                  <span className="font-display bg-gradient-to-br from-white to-accent-soft bg-clip-text text-[22px] font-bold text-transparent">
                    {p.step}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-[18px] font-semibold">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
