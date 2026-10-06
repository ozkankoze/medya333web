import { process } from "@/lib/content";

const DAYS = ["1. gün", "2–4. gün", "5–8. gün", "9. gün"];

export default function Process() {
  return (
    <section id="yontem" className="rule-b bg-wash">
      <div className="wrap">
        <div className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <span className="mono">003 — Yöntem</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.6rem)]">
              Dokuz gün.
              <br />
              Sürpriz yok.
            </h2>
            <p className="mt-7 max-w-[42ch] text-[16px] leading-[1.65] text-muted">
              Tek sayfalık bir iş için ortalama süremiz. Her aşamada ne olduğunu
              görürsünüz; onay vermeden bir sonraki adıma geçmeyiz. Ödeme de
              aşamaya bağlı — işin yarısı bitmeden parasının tamamını istemiyoruz.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-line-2">
              {process.map((s, i) => (
                <li
                  key={s.step}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-5 border-b border-line-2 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-8"
                >
                  <span className="display-sm text-[1.6rem] text-muted-2">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="display-sm text-[clamp(1.25rem,2.6vw,1.6rem)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.6] text-muted">
                      {s.text}
                    </p>
                  </div>
                  <span className="mono col-start-2 mt-3 sm:col-start-3 sm:mt-1.5 sm:text-right">
                    {DAYS[i]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
