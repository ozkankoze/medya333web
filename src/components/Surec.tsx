import { process } from "@/lib/content";

/**
 * ANA SAYFA — ÇALIŞMA SÜRECİ
 *
 * ⚠️ DÖRT ADIM `content.ts` İÇİNDEN GELİR. Müşteriye anlatılan süreç ile
 * sitede yazan süreç tek kaynaktan okunmalı.
 *
 * ⚠️ ADIM NUMARALARI YAZIDAN DEĞİL VERİDEN gelir (`step` alanı); sıralama
 * değişirse numaralar kendiliğinden doğru kalır.
 */
export default function Surec() {
  return (
    <section
      id="surec"
      className="relative z-[2] border-t border-[var(--line)] bg-void"
    >
      <div className="gutter py-14 lg:py-20">
        <p className="mono text-faint">Nasıl çalışıyoruz</p>

        <h2 className="duz mt-3 max-w-[20ch] text-[clamp(1.8rem,4.4vw,2.9rem)]">
          Dört adımda yayına alıyoruz
        </h2>

        <ol className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((a) => (
            <li key={a.step} className="border-t border-[var(--line)] pt-5">
              <span className="mono text-gold">{a.step}</span>
              <h3 className="mt-3 text-[19px] font-medium leading-tight text-chalk">
                {a.title}
              </h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.65] text-mute">
                {a.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
