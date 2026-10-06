import { packages } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconCheck, IconArrow } from "./Icons";

export default function Packages() {
  return (
    <section id="paketler" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Paketler"
            title={
              <>
                Size uygun olanı <span className="serif text-gold">birlikte</span>{" "}
                seçelim.
              </>
            }
            desc="Her işin kapsamı farklı olduğu için fiyatı sitede yazmıyoruz. 10 dakikalık bir görüşmede net rakam veriyoruz."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-[22px] p-8 lg:p-9 ${
                  pkg.highlight
                    ? "bg-ink text-paper"
                    : "border border-line bg-paper"
                }`}
              >
                {pkg.highlight && (
                  <span className="mb-5 inline-flex w-fit rounded-full bg-paper/12 px-3 py-1 text-[12px] font-medium tracking-wide text-gold-2">
                    En çok tercih edilen
                  </span>
                )}

                <h3 className="display-sm text-[1.75rem]">{pkg.name}</h3>
                <p
                  className={`mt-3 text-[15px] leading-relaxed ${
                    pkg.highlight ? "text-paper/65" : "text-muted"
                  }`}
                >
                  {pkg.subtitle}
                </p>

                <div
                  className={`my-7 h-px ${
                    pkg.highlight ? "bg-paper/15" : "bg-line"
                  }`}
                />

                <ul className="flex-1 space-y-3.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] leading-snug">
                      <IconCheck
                        className={`mt-[3px] h-4 w-4 shrink-0 ${
                          pkg.highlight ? "text-gold-2" : "text-gold"
                        }`}
                      />
                      <span className={pkg.highlight ? "text-paper/88" : ""}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#iletisim"
                  className={`btn mt-9 w-full ${
                    pkg.highlight
                      ? "bg-paper text-ink hover:bg-paper-3"
                      : "btn-dark"
                  }`}
                >
                  Fiyat teklifi al
                  <IconArrow className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-[14.5px] text-muted-2">
            Listede olmayan bir ihtiyacınız mı var? Yazın, özel kapsam
            çıkaralım.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
