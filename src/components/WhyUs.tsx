import Reveal from "./Reveal";
import { IconCheck } from "./Icons";

const points = [
  {
    title: "Hazır tema yok",
    text: "Her proje boş sayfadan başlar. Siteniz, aynı temayı kullanan yüzlerce siteye benzemez.",
  },
  {
    title: "Hız bir özellik değil, şart",
    text: "Core Web Vitals'ı geçen, mobilde saniyeler içinde açılan siteler. Yavaş site müşteri kaybettirir.",
  },
  {
    title: "Siteniz size ait",
    text: "Domain, hosting, kod — hepsi sizin adınıza. Şifreler teslimde size geçer, bize bağımlı kalmazsınız.",
  },
  {
    title: "Panelden kendiniz yönetin",
    text: "Yazı, görsel, ürün ve fiyat değişikliklerini teknik bilgi gerekmeden yaparsınız. Eğitimi de biz veriyoruz.",
  },
  {
    title: "Teslimle bitmiyor",
    text: "Yayından sonra güncelleme, yedekleme ve güvenlik desteği devam eder. Telefonun ucundayız.",
  },
  {
    title: "İstanbul'da, yanınızda",
    text: "İsterseniz yerinizde buluşup konuşuruz. Ekrandan anlatılamayan şeyler yüz yüze çözülür.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Neden biz</span>
              <h2 className="display-sm mt-5 text-[clamp(2rem,4.6vw,3.2rem)]">
                Ucuz site pahalıya{" "}
                <span className="serif text-gold">mal olur</span>.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16.5px] leading-relaxed text-muted">
                Bir web sitesi masraf kalemi değil, satış kanalıdır. Yanlış
                kurulduğunda müşteri kaçırır; doğru kurulduğunda kendi parasını
                çıkarır. Biz ikincisini yapıyoruz.
              </p>
              <a href="#iletisim" className="btn btn-dark mt-9">
                Projenizi konuşalım
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
