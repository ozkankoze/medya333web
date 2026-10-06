import { packages } from "@/lib/content";
import { waLink } from "@/lib/site";

export default function Packages() {
  return (
    <section id="paketler" className="rule-b">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 py-16 lg:py-24">
          <div>
            <span className="mono">006 — Paketler</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.6rem)]">
              Fiyat neden
              <br />
              yazmıyor?
            </h2>
          </div>
          <p className="max-w-[40ch] pb-2 text-[15px] leading-[1.65] text-muted">
            Çünkü 5 sayfalık bir kurumsal site ile 500 ürünlük bir mağazaya aynı
            rakamı yazan kişi, ikisini de düzgün yapmıyordur. Kapsamı 10 dakikada
            konuşur, net rakamı aynı gün söyleriz.
          </p>
        </div>

        {/* basılı fiyat listesi hissi */}
        <div className="border-t border-ink pb-20 lg:pb-28">
          {packages.map((p, i) => (
            <div
              key={p.name}
              className="grid gap-x-10 gap-y-6 border-b border-line py-10 lg:grid-cols-12 lg:py-12"
            >
              <div className="lg:col-span-4">
                <span className="mono text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-tight mt-3 text-[clamp(2rem,4.6vw,3.2rem)]">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.6] text-muted">
                  {p.subtitle}
                </p>
              </div>

              <ul className="columns-1 gap-x-10 sm:columns-2 lg:col-span-6 lg:col-start-5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="mb-2.5 flex break-inside-avoid items-baseline gap-2.5 text-[15px] leading-[1.5]"
                  >
                    <span aria-hidden className="text-muted-2">
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="lg:col-span-2 lg:text-right">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide inline-block text-[15px] font-medium tracking-tight"
                >
                  Teklif al ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
