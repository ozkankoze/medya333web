import Link from "next/link";
import { services } from "@/lib/content";

/**
 * ANA SAYFA — HİZMETLER BÖLÜMÜ
 *
 * ⚠️ METİNLER `src/lib/content.ts` İÇİNDEN GELİR, burada yazılmaz. O dosya
 * teklif formunun da kaynağı; ikisi ayrı yerde yazılsaydı zamanla farklı
 * şeyler söylemeye başlarlardı.
 *
 * ⚠️ BU BÖLÜM SEO İÇİN KRİTİK. Ana sayfa bu eklenmeden önce 153 kelimeydi
 * ve "web tasarım" ifadesi sayfada hiç geçmiyordu; arama motoru sayfanın
 * ne hakkında olduğunu anlayamıyordu.
 */
export default function Hizmetler() {
  return (
    <section
      id="hizmetler"
      className="relative z-[2] border-t border-[var(--line)] bg-void"
    >
      <div className="gutter py-14 lg:py-20">
        <p className="mono text-faint">Hizmetler</p>

        <h2 className="duz mt-3 max-w-[22ch] text-[clamp(1.8rem,4.4vw,2.9rem)]">
          Web tasarım ve yazılım hizmetlerimiz
        </h2>

        <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.7] text-mute">
          İstanbul&apos;dan çalışıyoruz. Kurumsal web sitesinden e-ticarete,
          tasarımdan yayına kadar her adımı tek elden yürütüyoruz. Hazır tema
          kullanmıyoruz; her site o firma için sıfırdan yazılıyor.
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((h) => (
            <li key={h.title} className="bg-void p-7">
              <h3 className="text-[19px] font-medium leading-tight text-chalk">
                {h.title}
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-mute">
                {h.text}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[16px] leading-[1.7] text-mute">
          Belirli bir sektörde çalışıyorsanız:{" "}
          <Link
            href="/is-guvenligi-web-tasarim"
            className="font-medium text-chalk underline-offset-4 hover:underline"
          >
            iş güvenliği firmaları için web sitesi
          </Link>{" "}
          sayfasında bu alandaki beş projemizi anlattık. Fiyatın neye göre
          değiştiğini merak ediyorsanız{" "}
          <Link
            href="/blog/web-sitesi-yaptirmak-rehber"
            className="font-medium text-chalk underline-offset-4 hover:underline"
          >
            web sitesi yaptırmak rehberi
          </Link>{" "}
          işinizi görür.
        </p>
      </div>
    </section>
  );
}
