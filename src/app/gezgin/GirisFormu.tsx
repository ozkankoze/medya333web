"use client";

import { useActionState } from "react";
import { girisAction } from "./actions";

const alan =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-[15px] outline-none focus:border-chalk";

export default function GirisFormu() {
  const [hata, formAction, bekliyor] = useActionState<string | null, FormData>(
    girisAction,
    null
  );

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <form action={formAction} className="card w-full max-w-sm p-8">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={72} height={32} className="h-8 w-auto" />
          <span className="text-[15px] font-semibold">Gezgin Paneli</span>
        </div>

        <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
          Ortaklık programındaki gezginler için. Hesabın yoksa Özkan ile görüş.
        </p>

        <label htmlFor="eposta" className="mt-7 mb-2 block text-[13px] text-muted">
          E-posta
        </label>
        <input id="eposta" name="eposta" type="email" autoFocus required className={alan} />

        <label htmlFor="sifre" className="mt-4 mb-2 block text-[13px] text-muted">
          Şifre
        </label>
        <input id="sifre" name="sifre" type="password" required className={alan} placeholder="••••••••" />

        {hata && hata !== "ok" && (
          <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
            {hata}
          </p>
        )}

        <button disabled={bekliyor} className="btn mt-6 w-full disabled:opacity-60">
          {bekliyor ? "Kontrol ediliyor…" : "Giriş yap"}
        </button>

        <p className="mt-6 text-center text-[12.5px] text-muted-2">
          medya333.com · Gezgin Ortaklık Programı
        </p>
      </form>
    </div>
  );
}
