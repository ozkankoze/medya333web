import type { Metadata } from "next";
import { sql, hasDb } from "@/lib/db";
import {
  DURUM_ADI,
  DURUM_RENK,
  dolar,
  ensureGezginSchema,
  oturumdakiGezgin,
  type Satis,
} from "@/lib/gezgin";
import GirisFormu from "./GirisFormu";
import SatisFormu from "./SatisFormu";
import Araclar from "./Araclar";
import { cikisAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Gezgin Paneli",
  robots: { index: false, follow: false },
};

function tarih(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function GezginPage() {
  if (!hasDb || !sql) {
    return (
      <div className="container-x py-24">
        <div className="card mx-auto max-w-lg p-8 text-center">
          <h1 className="text-[20px] font-semibold">Panel şu an kapalı</h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
            Veritabanı bağlantısı yapılmadığı için giriş alınamıyor.
          </p>
        </div>
      </div>
    );
  }

  const gezgin = await oturumdakiGezgin();
  if (!gezgin) return <GirisFormu />;

  await ensureGezginSchema();
  const satislar = (await sql`
    SELECT id, gezgin_id, firma, sehir, kisi, iletisim, tur, tutar, pay,
           durum, not_metni AS notu, yonetici_not, odendi_mi, created_at
    FROM gezgin_satislari
    WHERE gezgin_id=${gezgin.id}
    ORDER BY created_at DESC
  `) as unknown as Satis[];

  const odenen = satislar
    .filter((s) => s.durum === "odendi")
    .reduce((t, s) => t + Number(s.pay || 0), 0);
  const bekleyen = satislar
    .filter((s) => !["odendi", "iptal"].includes(s.durum))
    .reduce((t, s) => t + Number(s.pay || 0), 0);
  const yayinda = satislar.filter((s) =>
    ["yayinda", "odendi"].includes(s.durum)
  ).length;

  const kutular = [
    { b: String(satislar.length), e: "bildirdiğin iş" },
    { b: String(yayinda), e: "yayına alınan" },
    { b: dolar(bekleyen), e: "bekleyen hak ediş" },
    { b: dolar(odenen), e: "bugüne kadar ödenen" },
  ];

  return (
    <div className="container-x py-10 md:py-14">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Gezgin Ortaklık Programı</span>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight md:text-[38px]">
            Merhaba {gezgin.ad.split(" ")[0]}.
          </h1>
          <p className="mt-2 text-[14.5px] text-muted">
            Payın her satışta %{gezgin.pay_yuzde}. Aşağıdan yeni iş bildirebilir,
            bildirdiklerini takip edebilirsin.
          </p>
        </div>
        <form action={cikisAction}>
          <button className="btn-ghost btn h-10 px-4 text-[13px]">Çıkış</button>
        </form>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {kutular.map((k) => (
          <div key={k.e} className="card p-5">
            <div className="text-[26px] font-semibold tracking-tight text-gold md:text-[30px]">
              {k.b}
            </div>
            <div className="mt-1.5 text-[12.5px] leading-snug text-muted">{k.e}</div>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <SatisFormu />
      </section>

      <section className="mt-5">
        <div className="card p-6 md:p-7">
          <h2 className="text-[18px] font-semibold">Bildirdiğin işler</h2>

          {satislar.length === 0 ? (
            <p className="mt-4 text-[14px] text-muted">
              Henüz bir iş bildirmedin. İlk satışını yaptığında yukarıdaki formu doldur.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[13.5px]">
                <thead className="text-[12px] uppercase tracking-wider text-muted-2">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Firma</th>
                    <th className="pb-3 pr-4 font-medium">Nerede</th>
                    <th className="pb-3 pr-4 font-medium">Tarih</th>
                    <th className="pb-3 pr-4 font-medium">Durum</th>
                    <th className="pb-3 pr-4 font-medium">Satış</th>
                    <th className="pb-3 font-medium">Senin payın</th>
                  </tr>
                </thead>
                <tbody>
                  {satislar.map((s) => (
                    <tr key={s.id} className="border-t border-line align-top">
                      <td className="py-3.5 pr-4">
                        <div className="font-medium text-chalk">{s.firma}</div>
                        {s.yonetici_not && (
                          <div className="mt-1 text-[12.5px] text-muted">{s.yonetici_not}</div>
                        )}
                      </td>
                      <td className="py-3.5 pr-4 text-muted">{s.sehir || "—"}</td>
                      <td className="py-3.5 pr-4 text-muted">{tarih(s.created_at)}</td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`inline-block border px-2.5 py-1 text-[11.5px] ${
                            DURUM_RENK[s.durum] ?? "border-line text-muted"
                          }`}
                        >
                          {DURUM_ADI[s.durum] ?? s.durum}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-muted">
                        {Number(s.tutar) > 0 ? dolar(s.tutar) : "—"}
                      </td>
                      <td className="py-3.5 font-medium text-gold">
                        {Number(s.pay) > 0 ? dolar(s.pay) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="mt-5">
        <Araclar />
      </section>

      <footer className="mt-10 border-t border-line pt-6 text-[12.5px] text-muted-2">
        Medya 333 · İstanbul · 0537 010 86 11 · info@medya333.com
      </footer>
    </div>
  );
}
