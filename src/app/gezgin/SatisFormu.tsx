"use client";

import { useActionState, useState } from "react";
import { satisBildirAction } from "./actions";

const alan =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[14.5px] outline-none focus:border-chalk";
const etiket = "mb-1.5 block text-[12.5px] text-muted";

/**
 * Dışarıdaki sarmalayıcı sadece anahtarı tutar: bildirim gönderildikten sonra
 * anahtarı değiştirince iç bileşen sıfırdan kurulur, form da temizlenmiş olur.
 */
export default function SatisFormu() {
  const [anahtar, setAnahtar] = useState(0);
  return <Ic key={anahtar} sifirla={() => setAnahtar((k) => k + 1)} />;
}

function Ic({ sifirla }: { sifirla: () => void }) {
  const [sonuc, formAction, bekliyor] = useActionState<string | null, FormData>(
    satisBildirAction,
    null
  );
  const [acik, setAcik] = useState(false);

  if (sonuc === "ok") {
    return (
      <div className="card p-6 md:p-7">
        <h2 className="text-[18px] font-semibold">Bildirimin bize ulaştı</h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
          Aşağıdaki listede takip edebilirsin. Fiyatı belirleyip firmaya dönüş
          yaptığımızda durumu değişecek.
        </p>
        <button onClick={sifirla} className="btn mt-5">
          Yeni bildirim gönder
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold">Yeni satış bildir</h2>
          <p className="mt-1 text-[13.5px] text-muted">
            Firmayı ikna ettiğinde buradan gönder, aynı gün dönüş yapıyoruz.
          </p>
        </div>
        <button onClick={() => setAcik((v) => !v)} className="btn-ghost btn">
          {acik ? "Kapat" : "Formu aç"}
        </button>
      </div>

      {acik && (
        <form action={formAction} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={etiket} htmlFor="firma">
              Firma adı *
            </label>
            <input id="firma" name="firma" required className={alan} placeholder="Örn. Kahve Durağı" />
          </div>

          <div>
            <label className={etiket} htmlFor="sehir">
              Şehir / ülke
            </label>
            <input id="sehir" name="sehir" className={alan} placeholder="Canggu, Bali" />
          </div>

          <div>
            <label className={etiket} htmlFor="tur">
              İşletme türü
            </label>
            <input id="tur" name="tur" className={alan} placeholder="Kafe, otel, salon…" />
          </div>

          <div>
            <label className={etiket} htmlFor="kisi">
              Yetkili kişi
            </label>
            <input id="kisi" name="kisi" className={alan} placeholder="Adı soyadı" />
          </div>

          <div>
            <label className={etiket} htmlFor="iletisim">
              İletişim (telefon / e-posta)
            </label>
            <input id="iletisim" name="iletisim" className={alan} placeholder="+90 … / mail@" />
          </div>

          <div className="md:col-span-2">
            <label className={etiket} htmlFor="not">
              Ne istiyorlar, nelere dikkat etmeliyiz
            </label>
            <textarea
              id="not"
              name="not"
              rows={4}
              className={alan}
              placeholder="Kaç sayfa, rezervasyon var mı, logoları var mı, hangi dilde, fotoğrafları kimde…"
            />
          </div>

          {sonuc && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300 md:col-span-2">
              {sonuc}
            </p>
          )}

          <div className="md:col-span-2">
            <button disabled={bekliyor} className="btn w-full disabled:opacity-60 md:w-auto">
              {bekliyor ? "Gönderiliyor…" : "Bildirimi gönder"}
            </button>
            <p className="mt-3 text-[12.5px] text-muted-2">
              Fiyatı sen belirlemiyorsun. Firmayı anlat, uygun fiyatı biz söyleyelim.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
