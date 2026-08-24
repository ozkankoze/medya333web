import Reveal from "./Reveal";

const stats = [
  { value: "1.5sn", label: "Ortalama açılma süresi hedefi" },
  { value: "100%", label: "Mobil uyumlu teslim" },
  { value: "7/24", label: "Site kesintisiz yayında" },
  { value: "1 yıl", label: "Teslim sonrası destek" },
];

const points = [
  {
    title: "Hazır tema kullanmıyoruz",
    text: "Her proje sıfırdan tasarlanır. Siteniz ne başkasına benzer ne de gereksiz kodla yavaşlar.",
  },
  {
    title: "Site tamamen sizin olur",
    text: "Domain, hosting ve tüm şifreler sizin adınıza. İstediğiniz an başka bir yere taşıyabilirsiniz.",
  },
  {
    title: "Teslimden sonra kaybolmuyoruz",
    text: "Yayına aldıktan sonra güncelleme, yedekleme ve teknik destek devam eder.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="container-x">
        <Reveal>
          <div className="card overflow-hidden p-0">
            <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="px-6 py-7 text-center">
                  <div className="font-display bg-gradient-to-br from-white to-accent-soft bg-clip-text text-[30px] font-bold text-transparent">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="card h-full p-6">
                <h3 className="font-display text-[16.5px] font-semibold">
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
