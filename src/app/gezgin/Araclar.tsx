"use client";

import { useActionState, useState } from "react";
import { sifreDegistirAction } from "./actions";

const alan =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[14.5px] outline-none focus:border-chalk";

const MAIL = `Merhaba,

Medya 333 adına yazıyorum. İşletmelere sıfırdan kodlanmış web siteleri yapıyoruz, hazır şablon kullanmıyoruz.

Sizin için de bir site hazırlayabiliriz:
• Tasarım tamamen size özel, sayfa sınırı yok
• Alan adı ve hosting ilk yıl dahil
• Mobil uyumlu, hızlı açılan, Google'a hazır
• 2 günde yayında

İşlerimizden bazıları: locksansafety.com, nextstopbackpackers.com, sofilx.com

İlgilenirseniz detayları konuşalım.`;

const DM = `Merhaba! İşletmeniz için web sitesi hazırlıyoruz. Hazır şablon değil, tamamen size özel kodlanmış bir site. Alan adı ve hosting ilk yıl dahil, 2 günde yayında. İşlerimiz: locksansafety.com, sofilx.com. İlgilenir misiniz?`;

function Kopyala({ metin, ad }: { metin: string; ad: string }) {
  const [tamam, setTamam] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(metin);
          setTamam(true);
          setTimeout(() => setTamam(false), 1800);
        } catch {
          setTamam(false);
        }
      }}
      className="btn-ghost btn h-10 px-4 text-[13px]"
    >
      {tamam ? "Kopyalandı" : ad}
    </button>
  );
}

export default function Araclar() {
  const [sonuc, formAction, bekliyor] = useActionState<string | null, FormData>(
    sifreDegistirAction,
    null
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card p-6 md:p-7">
        <h2 className="text-[18px] font-semibold">Satış malzemeleri</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          Müşteriye gösterebileceğin her şey burada. İndir, telefonunda dursun.
        </p>

        <div className="mt-5 grid gap-2.5">
          <a href="/gezgin/medya333-gezgin-ortaklik.pdf" download className="flex items-center justify-between border border-line px-4 py-3 text-[14px] hover:border-chalk">
            <span>Program sunumu (PDF)</span>
            <span className="text-muted-2">8 sayfa</span>
          </a>
          <a href="/gezgin/medya333-tanitim.mp4" download className="flex items-center justify-between border border-line px-4 py-3 text-[14px] hover:border-chalk">
            <span>Tanıtım videosu</span>
            <span className="text-muted-2">26 sn</span>
          </a>
          <a href="https://medya333.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-line px-4 py-3 text-[14px] hover:border-chalk">
            <span>Referanslar (canlı siteler)</span>
            <span className="text-muted-2">medya333.com</span>
          </a>
        </div>

        <h3 className="mt-7 text-[14px] font-semibold">Hazır metinler</h3>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <Kopyala metin={MAIL} ad="Mail metnini kopyala" />
          <Kopyala metin={DM} ad="DM metnini kopyala" />
        </div>

        <h3 className="mt-7 text-[14px] font-semibold">Sık sorulanlar</h3>
        <dl className="mt-3 grid gap-3 text-[13.5px] leading-relaxed">
          <div>
            <dt className="text-chalk">“Ne kadar sürede biter?”</dt>
            <dd className="text-muted">2 gün. Fotoğraflar ve metinler elimize geçtikten sonra.</dd>
          </div>
          <div>
            <dt className="text-chalk">“İkinci yıl ne ödeyeceğim?”</dt>
            <dd className="text-muted">
              Alan adı ve hosting yenilemesi yılda 100 dolar. İlk yıl fiyata dahil.
            </dd>
          </div>
          <div>
            <dt className="text-chalk">“Beğenmezsem?”</dt>
            <dd className="text-muted">Müşteri beğenene kadar revizyon devam eder, sınır yok.</dd>
          </div>
          <div>
            <dt className="text-chalk">“Fiyat ne kadar?”</dt>
            <dd className="text-muted">
              Taban 300 dolar, yukarısı işin kapsamına göre. Firmayı bize anlat, fiyatı biz söyleyelim.
            </dd>
          </div>
        </dl>
      </div>

      <div className="card p-6 md:p-7">
        <h2 className="text-[18px] font-semibold">Şifreni değiştir</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          İlk girişten sonra geçici şifreni kendi şifrenle değiştir.
        </p>

        <form action={formAction} className="mt-5 grid gap-3.5">
          <div>
            <label className="mb-1.5 block text-[12.5px] text-muted" htmlFor="eski">
              Mevcut şifre
            </label>
            <input id="eski" name="eski" type="password" required className={alan} />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] text-muted" htmlFor="yeni">
              Yeni şifre (en az 8 karakter)
            </label>
            <input id="yeni" name="yeni" type="password" required minLength={8} className={alan} />
          </div>

          {sonuc === "ok" && (
            <p className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-[13px] text-emerald-300">
              Şifren değişti.
            </p>
          )}
          {sonuc && sonuc !== "ok" && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
              {sonuc}
            </p>
          )}

          <button disabled={bekliyor} className="btn disabled:opacity-60">
            {bekliyor ? "Kaydediliyor…" : "Şifreyi güncelle"}
          </button>
        </form>

        <h3 className="mt-8 text-[14px] font-semibold">Ödeme nasıl işliyor</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          Müşteri parayı doğrudan bize öder, sen nakit toplamazsın. Site teslim
          edildikten sonra 7 saat içinde payın Türkiye’deki hesabına gönderilir.
          Hafta sonu da olsa gönderilir.
        </p>
      </div>
    </div>
  );
}
