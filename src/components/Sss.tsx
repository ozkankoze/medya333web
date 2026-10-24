import Link from "next/link";
import { faqs } from "@/lib/content";

/**
 * ANA SAYFA — SIK SORULAN SORULAR
 *
 * ⚠️ FAQPage ŞEMASI BURADA DEĞİL, SAYFADA ÜRETİLİR (`page.tsx` içinde
 * `sssSemasi(faqs)`). Şemayı bileşene gömseydik, aynı bileşen ikinci bir
 * sayfada kullanıldığında tek sayfada iki FAQPage çıkardı — doğrulayıcı
 * bunu hata sayıyor.
 *
 * ⚠️ GÖRÜNEN METİN İLE ŞEMADAKİ METİN AYNI OLMALI: ikisi de `faqs`
 * dizisinden okunuyor, bu yüzden ayrışamazlar.
 */
export default function Sss() {
  return (
    <section
      id="sss"
      className="relative z-[2] border-t border-[var(--line)] bg-void"
    >
      <div className="gutter py-14 lg:py-20">
        <p className="mono text-faint">Sık sorulan sorular</p>

        <h2 className="duz mt-3 max-w-[22ch] text-[clamp(1.8rem,4.4vw,2.9rem)]">
          Teklif almadan önce merak edilenler
        </h2>

        <dl className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {faqs.map((s) => (
            <div key={s.q} className="border-t border-[var(--line)] pt-5">
              <dt className="text-[17px] font-medium leading-snug text-chalk">
                {s.q}
              </dt>
              <dd className="mt-2.5 text-[15.5px] leading-[1.7] text-mute">
                {s.a}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-9 text-[16px] leading-[1.7] text-mute">
          Daha uzun cevaplar{" "}
          <Link
            href="/blog"
            className="font-medium text-chalk underline-offset-4 hover:underline"
          >
            blogumuzda
          </Link>
          , firma hakkındaki bilgiler{" "}
          <Link
            href="/hakkimizda"
            className="font-medium text-chalk underline-offset-4 hover:underline"
          >
            hakkımızda
          </Link>{" "}
          sayfasında.
        </p>
      </div>
    </section>
  );
}
