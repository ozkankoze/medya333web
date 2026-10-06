import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="hizmetler" className="rule-b">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 py-14 lg:py-20">
          <div>
            <span className="mono">004 — Kapsam</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.6rem)]">
              Ne yapıyoruz?
            </h2>
          </div>
          <p className="max-w-[34ch] pb-2 text-[15px] leading-[1.65] text-muted">
            Altı başlık. Hepsi aynı elden çıkıyor — araya taşeron girmiyor.
          </p>
        </div>
      </div>

      {/* satırlar tam genişlikte: üzerine gelince siyaha döner */}
      <div className="border-t border-line">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group border-b border-line transition-colors duration-300 hover:border-ink hover:bg-ink"
          >
            <div className="wrap">
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-7 transition-colors duration-300 group-hover:text-paper md:grid-cols-[3.5rem_minmax(0,22rem)_1fr] md:gap-x-10 md:py-8">
                <span className="mono text-[10px] transition-colors duration-300 group-hover:text-paper/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm text-[clamp(1.45rem,3.2vw,2.3rem)]">
                  {s.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-[56ch] text-[15px] leading-[1.6] text-muted transition-colors duration-300 group-hover:text-paper/75 md:col-start-3 md:mt-0">
                  {s.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
