const LEDGER = [
  {
    k: "Hazır tema",
    v: "Yok",
    n: "Her proje boş sayfadan başlar. Benzeri yoktur.",
  },
  {
    k: "Açılma süresi",
    v: "< 2 sn",
    n: "Yavaş site, kapatılan sitedir. Hız pazarlık konusu değil.",
  },
  {
    k: "Sitenin sahibi",
    v: "Siz",
    n: "Domain, hosting, panel, tüm şifreler size teslim edilir.",
  },
  {
    k: "Teslimden sonra",
    v: "1 yıl",
    n: "Yayına aldıktan sonra kaybolmuyoruz. Destek dahil.",
  },
];

export default function Manifesto() {
  return (
    <section className="rule-b">
      <div className="wrap">
        <div className="py-16 lg:py-24">
          <span className="mono">002 — Mesele</span>

          <h2 className="display-tight mt-8 text-[clamp(2.35rem,8.2vw,6.4rem)] leading-[1.14]">
            Site güzel olsun
            <br />
            diye yapılmaz.
            <br />
            <span className="my-[0.04em] inline-block bg-ink px-[0.12em] pb-[0.1em] pt-[0.02em] text-paper">
              Telefon çalsın
            </span>
            <br />
            diye yapılır.
          </h2>
        </div>

        <div className="grid gap-10 border-t border-line py-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="max-w-[44ch] text-[17px] leading-[1.6] tracking-tight lg:text-[19px]">
              Bir siteyi değerli yapan rengi veya animasyonu değil; onu açan
              insanın 8 saniye içinde &laquo;tamam, bunlar işi biliyor&raquo;
              demesidir.
            </p>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Bizim işimiz o 8 saniyeyi kurmak. Gerisi — hız, SEO, mobil uyum,
              panel — bu cümlenin altyapısı. Onlar zaten olacak; asıl mesele
              karşıdakinin size güvenip güvenmemesi.
            </p>
          </div>

          <div className="lg:col-span-7">
            <dl>
              {LEDGER.map((row, i) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-line py-5 sm:grid-cols-[3.2rem_10rem_1fr] sm:gap-x-8"
                  style={{ borderTop: i === 0 ? "1px solid var(--color-line)" : undefined }}
                >
                  <span className="mono col-span-2 text-[10px] sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="display-sm text-[clamp(1.5rem,3.4vw,2.1rem)]">
                    {row.v}
                  </dt>
                  <dd className="text-[14px] leading-[1.55] text-muted">
                    <span className="mono mr-2 text-[10px]">{row.k}</span>
                    <br className="hidden sm:block" />
                    {row.n}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
