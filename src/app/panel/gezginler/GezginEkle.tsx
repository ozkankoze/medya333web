"use client";

import { useActionState } from "react";
import { gezginEkleAction, sifreSifirlaAction } from "./actions";

const alan =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[14.5px] outline-none focus:border-chalk";
const etiket = "mb-1.5 block text-[12.5px] text-muted";

function SifreKutusu({ sonuc }: { sonuc: string | null }) {
  if (!sonuc) return null;
  if (!sonuc.startsWith("SIFRE:")) {
    return (
      <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
        {sonuc}
      </p>
    );
  }
  const sifre = sonuc.slice(6);
  return (
    <div className="rounded-lg border border-gold/50 bg-gold/10 px-4 py-3">
      <p className="text-[12.5px] text-muted">
        Geçici şifre. Bu ekranı kapatınca bir daha görünmez, şimdi kopyala ve gezgine ilet.
      </p>
      <p className="mt-1.5 font-mono text-[20px] tracking-wider text-gold">{sifre}</p>
    </div>
  );
}

export function GezginEkle() {
  const [sonuc, formAction, bekliyor] = useActionState<string | null, FormData>(
    gezginEkleAction,
    null
  );

  return (
    <div className="card p-6 md:p-7">
      <h2 className="text-[18px] font-semibold">Yeni gezgin hesabı aç</h2>
      <p className="mt-1 text-[13.5px] text-muted">
        Hesap açıldığında sistem geçici bir şifre üretir, bir kere gösterir.
      </p>

      <form action={formAction} className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className={etiket} htmlFor="ad">Ad soyad *</label>
          <input id="ad" name="ad" required className={alan} />
        </div>
        <div>
          <label className={etiket} htmlFor="eposta">E-posta *</label>
          <input id="eposta" name="eposta" type="email" required className={alan} />
        </div>
        <div>
          <label className={etiket} htmlFor="telefon">Telefon</label>
          <input id="telefon" name="telefon" className={alan} />
        </div>
        <div>
          <label className={etiket} htmlFor="instagram">Instagram</label>
          <input id="instagram" name="instagram" className={alan} placeholder="@kullanici" />
        </div>
        <div>
          <label className={etiket} htmlFor="pay">Pay yüzdesi</label>
          <input id="pay" name="pay" type="number" min={1} max={90} defaultValue={50} className={alan} />
        </div>
        <div>
          <label className={etiket} htmlFor="not">Not</label>
          <input id="not" name="not" className={alan} placeholder="Nereden tanıştık, nerede geziyor…" />
        </div>

        <div className="md:col-span-2 grid gap-3">
          <SifreKutusu sonuc={sonuc} />
          <button disabled={bekliyor} className="btn w-full disabled:opacity-60 md:w-auto">
            {bekliyor ? "Açılıyor…" : "Hesabı aç"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function SifreSifirla({ id }: { id: number }) {
  const [sonuc, formAction, bekliyor] = useActionState<string | null, FormData>(
    sifreSifirlaAction,
    null
  );
  return (
    <form action={formAction} className="inline-flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <button disabled={bekliyor} className="text-[12.5px] text-muted underline underline-offset-4 hover:text-chalk disabled:opacity-60">
        {bekliyor ? "…" : "Şifre sıfırla"}
      </button>
      {sonuc?.startsWith("SIFRE:") && (
        <span className="font-mono text-[13px] text-gold">{sonuc.slice(6)}</span>
      )}
    </form>
  );
}
