import { process } from "@/lib/content";

/**
 * Süreler S.S.S. bölümüyle BİREBİR aynı olmak zorunda.
 * Değiştirirsen src/lib/content.ts içindeki ilk soruyu da güncelle.
 */
const TIMELINES = [
  { kind: "Tek sayfa / landing", span: "3–7 gün" },
  { kind: "Kurumsal site (5–12 sayfa)", span: "2–3 hafta" },
  { kind: "E-ticaret", span: "3–6 hafta" },
];

export default function Process() {
  return (
    <section id="yontem" className="rule-b bg-wash">
      <div className="wrap">
        <div className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <span className="mono">003 — Yöntem</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.6rem)]">
              Süreyi baştan
              <br />
              söylüyoruz.
            </h2>
            <p className="mt-7 max-w-[42ch] text-[16px] leading-[1.65] text-muted">
              Her aşamada ne olduğunu görürsünüz; onay vermeden bir sonraki
              adıma geçmeyiz. Ödeme de aşamaya bağlı — işin yarısı bitmeden
              parasının tamamını istemiyoruz.
            </p>

            {/* gerçek süreler, proje tipine göre */}
            <dl className="mt-9 border-t border-ink">
              {TIMELINES.map((t) => (
                <div
                  key={t.kind}
                  className="flex items-baseline justify-between gap-5 border-b border-line-2 py-3.5"
                >
                  <dt className="text-[14px] leading-tight text-muted">
                    {t.kind}
                  </dt>
                  <dd className="display-sm shrink-0 text-[clamp(1.05rem,2vw,1.35rem)] tabular-nums">
                    {t.span}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 max-w-[40ch] text-[13.5px] leading-[1.55] text-muted-2">
              Süreyi en çok etkileyen şey içerik hazırlığı — yazı, görsel, logo
              elinizde hazırsa alt sınıra yakın teslim ediyoruz.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-line-2">
              {process.map((s) => (
                <li
                  key={s.step}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-5 border-b border-line-2 py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8"
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
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
