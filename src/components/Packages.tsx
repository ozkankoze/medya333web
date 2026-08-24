import { packages } from "@/lib/content";
import { waLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconCheck } from "./Icons";

export default function Packages() {
  return (
    <section id="paketler" className="relative py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Paketler"
            title="Size uygun olanı birlikte seçelim"
            desc="Her işin ihtiyacı farklı olduğu için sabit fiyat vermiyoruz. Kapsamı netleştirip size özel, net bir teklif hazırlıyoruz."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 90}>
              <div
                className={`relative flex h-full flex-col rounded-[20px] p-7 ${
                  pkg.highlight
                    ? "border border-accent/45 bg-gradient-to-b from-accent/[0.14] to-transparent shadow-[0_30px_80px_-40px_rgba(201,146,47,.65)]"
                    : "card"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-accent to-gold-lite px-3 py-1 text-[11px] font-semibold text-[#1a1206]">
                    En çok tercih edilen
                  </span>
                )}
                <h3 className="font-display text-[22px] font-bold">{pkg.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {pkg.subtitle}
                </p>

                <div className="my-6 h-px bg-line" />

                <ul className="flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14.5px] text-fg/90">
                      <IconCheck
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          pkg.highlight ? "text-gold-lite" : "text-accent-soft"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#iletisim"
                  className={`mt-8 rounded-xl px-5 py-3.5 text-center text-[14.5px] font-semibold transition-transform hover:scale-[1.02] ${
                    pkg.highlight
                      ? "bg-gradient-to-r from-accent to-accent-soft text-[#1a1206]"
                      : "border border-line bg-white/[0.03] text-fg hover:border-accent/60"
                  }`}
                >
                  Fiyat teklifi al
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center text-[14px] text-muted-2">
            Listede olmayan bir ihtiyacınız mı var?{" "}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-soft underline underline-offset-4 hover:text-gold-lite"
            >
              WhatsApp'tan yazın
            </a>
            , birlikte kurgulayalım.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
