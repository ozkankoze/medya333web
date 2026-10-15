import type { Metadata } from "next";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";
import { sql, hasDb } from "@/lib/db";
import {
  DURUMLAR,
  DURUM_ADI,
  DURUM_RENK,
  dolar,
  ensureGezginSchema,
  type Gezgin,
  type Satis,
} from "@/lib/gezgin";
import { GezginEkle, SifreSifirla } from "./GezginEkle";
import {
  gezginDurumAction,
  gezginSilAction,
  satisGuncelleAction,
  satisSilAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Gezginler",
  robots: { index: false, follow: false },
};

const alan =
  "rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-[13.5px] outline-none focus:border-chalk";

function tarih(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function GezginlerPage() {
  if (!(await isLoggedIn())) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-[15px] text-muted">
          Bu sayfa için giriş gerekiyor.{" "}
          <Link href="/panel" className="underline underline-offset-4">
            Panele git
          </Link>
        </p>
      </div>
    );
  }

  if (!hasDb || !sql) {
    return (
      <div className="container-x py-24">
        <div className="card mx-auto max-w-lg p-8 text-center">
          <h1 className="text-[20px] font-semibold">Veritabanı bağlı değil</h1>
          <p className="mt-3 text-[14.5px] text-muted">
            Gezgin paneli için DATABASE_URL tanımlı olmalı.
          </p>
        </div>
      </div>
    );
  }

  await ensureGezginSchema();

  const gezginler = (await sql`
    SELECT id, ad, eposta, telefon, instagram, pay_yuzde, aktif,
           not_metni AS notu, created_at
    FROM gezginler ORDER BY aktif DESC, created_at DESC
  `) as unknown as Gezgin[];

  const satislar = (await sql`
    SELECT s.id, s.gezgin_id, g.ad AS gezgin_ad, s.firma, s.sehir, s.kisi,
           s.iletisim, s.tur, s.tutar, s.pay, s.durum, s.not_metni AS notu,
           s.yonetici_not, s.odendi_mi, s.created_at
    FROM gezgin_satislari s JOIN gezginler g ON g.id = s.gezgin_id
    ORDER BY s.created_at DESC
  `) as unknown as Satis[];

  const bekleyenOdeme = satislar
    .filter((s) => !["odendi", "iptal"].includes(s.durum))
    .reduce((t, s) => t + Number(s.pay || 0), 0);
  const toplamCiro = satislar
    .filter((s) => s.durum !== "iptal")
    .reduce((t, s) => t + Number(s.tutar || 0), 0);

  return (
    <div className="container-x py-10 md:py-14">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Yönetim</span>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight md:text-[36px]">
            Gezgin Ortaklık Programı
          </h1>
        </div>
        <Link href="/panel" className="btn-ghost btn h-10 px-4 text-[13px]">
          Panele dön
        </Link>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {[
          { b: String(gezginler.filter((g) => g.aktif).length), e: "aktif gezgin" },
          { b: String(satislar.length), e: "bildirilen iş" },
          { b: dolar(toplamCiro), e: "toplam satış" },
          { b: dolar(bekleyenOdeme), e: "ödenecek pay" },
        ].map((k) => (
          <div key={k.e} className="card p-5">
            <div className="text-[26px] font-semibold tracking-tight text-gold md:text-[30px]">
              {k.b}
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">{k.e}</div>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <GezginEkle />
      </section>

      <section className="mt-5">
        <div className="card p-6 md:p-7">
          <h2 className="text-[18px] font-semibold">Bildirilen işler</h2>
          {satislar.length === 0 ? (
            <p className="mt-4 text-[14px] text-muted">Henüz bildirim yok.</p>
          ) : (
            <div className="mt-5 grid gap-4">
              {satislar.map((s) => (
                <div key={s.id} className="border border-line p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[16px] font-semibold text-chalk">{s.firma}</div>
                      <div className="mt-1 text-[13px] text-muted">
                        {s.gezgin_ad} · {s.sehir || "şehir yok"} · {tarih(s.created_at)}
                      </div>
                    </div>
                    <span
                      className={`border px-2.5 py-1 text-[11.5px] ${
                        DURUM_RENK[s.durum] ?? "border-line text-muted"
                      }`}
                    >
                      {DURUM_ADI[s.durum] ?? s.durum}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-2 text-[13.5px] md:grid-cols-2">
                    {s.kisi && (
                      <div>
                        <dt className="inline text-muted">Yetkili: </dt>
                        <dd className="inline">{s.kisi}</dd>
                      </div>
                    )}
                    {s.iletisim && (
                      <div>
                        <dt className="inline text-muted">İletişim: </dt>
                        <dd className="inline">{s.iletisim}</dd>
                      </div>
                    )}
                    {s.tur && (
                      <div>
                        <dt className="inline text-muted">Tür: </dt>
                        <dd className="inline">{s.tur}</dd>
                      </div>
                    )}
                    {Number(s.pay) > 0 && (
                      <div>
                        <dt className="inline text-muted">Gezginin payı: </dt>
                        <dd className="inline text-gold">{dolar(s.pay)}</dd>
                      </div>
                    )}
                  </dl>

                  {s.notu && (
                    <p className="mt-3 whitespace-pre-line border-l-2 border-line pl-3 text-[13.5px] leading-relaxed text-muted">
                      {s.notu}
                    </p>
                  )}

                  <form action={satisGuncelleAction} className="mt-4 flex flex-wrap items-end gap-3">
                    <input type="hidden" name="id" value={s.id} />
                    <div>
                      <label className="mb-1 block text-[12px] text-muted">Durum</label>
                      <select name="durum" defaultValue={s.durum} className={alan}>
                        {DURUMLAR.map((d) => (
                          <option key={d} value={d}>
                            {DURUM_ADI[d]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] text-muted">Satış tutarı ($)</label>
                      <input
                        name="tutar"
                        type="number"
                        min={0}
                        step={10}
                        defaultValue={Number(s.tutar) || ""}
                        className={`${alan} w-32`}
                      />
                    </div>
                    <div className="min-w-[220px] flex-1">
                      <label className="mb-1 block text-[12px] text-muted">
                        Gezgine görünecek not
                      </label>
                      <input
                        name="yonetici_not"
                        defaultValue={s.yonetici_not}
                        className={`${alan} w-full`}
                        placeholder="Örn. Fotoğraflar bekleniyor"
                      />
                    </div>
                    <button className="btn h-10 px-5 text-[13px]">Kaydet</button>
                  </form>

                  <form action={satisSilAction} className="mt-3">
                    <input type="hidden" name="id" value={s.id} />
                    <button className="text-[12.5px] text-muted-2 underline underline-offset-4 hover:text-red-300">
                      Bu bildirimi sil
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-5">
        <div className="card p-6 md:p-7">
          <h2 className="text-[18px] font-semibold">Gezginler</h2>
          {gezginler.length === 0 ? (
            <p className="mt-4 text-[14px] text-muted">Henüz hesap açılmadı.</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-[13.5px]">
                <thead className="text-[12px] uppercase tracking-wider text-muted-2">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Ad</th>
                    <th className="pb-3 pr-4 font-medium">E-posta</th>
                    <th className="pb-3 pr-4 font-medium">İletişim</th>
                    <th className="pb-3 pr-4 font-medium">Pay</th>
                    <th className="pb-3 pr-4 font-medium">Durum</th>
                    <th className="pb-3 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {gezginler.map((g) => (
                    <tr key={g.id} className="border-t border-line align-top">
                      <td className="py-3.5 pr-4">
                        <div className="font-medium text-chalk">{g.ad}</div>
                        {g.notu && <div className="mt-1 text-[12.5px] text-muted">{g.notu}</div>}
                      </td>
                      <td className="py-3.5 pr-4 text-muted">{g.eposta}</td>
                      <td className="py-3.5 pr-4 text-muted">
                        {g.telefon || "—"}
                        {g.instagram && <div>{g.instagram}</div>}
                      </td>
                      <td className="py-3.5 pr-4">%{g.pay_yuzde}</td>
                      <td className="py-3.5 pr-4">
                        <form action={gezginDurumAction}>
                          <input type="hidden" name="id" value={g.id} />
                          <input type="hidden" name="aktif" value={g.aktif ? "0" : "1"} />
                          <button
                            className={`border px-2.5 py-1 text-[11.5px] ${
                              g.aktif
                                ? "border-emerald-400/50 text-emerald-300"
                                : "border-line text-muted-2"
                            }`}
                          >
                            {g.aktif ? "Aktif" : "Kapalı"}
                          </button>
                        </form>
                      </td>
                      <td className="py-3.5">
                        <div className="flex flex-col gap-2">
                          <SifreSifirla id={g.id} />
                          <form action={gezginSilAction}>
                            <input type="hidden" name="id" value={g.id} />
                            <button className="text-[12.5px] text-muted-2 underline underline-offset-4 hover:text-red-300">
                              Hesabı sil
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-5 text-[12.5px] leading-relaxed text-muted-2">
            Hesabı kapatmak girişi engeller, kayıtları siler değil. Silmek
            gezginin bütün bildirimlerini de kaldırır.
          </p>
        </div>
      </section>
    </div>
  );
}
