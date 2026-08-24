"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [error, formAction, pending] = useActionState<string | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <form action={formAction} className="card w-full max-w-sm p-8">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={72} height={32} className="h-8 w-auto" />
          <span className="font-display text-[15px] font-semibold">
            Yönetim Paneli
          </span>
        </div>

        <label htmlFor="password" className="mt-7 mb-2 block text-[13px] text-muted">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          className="w-full rounded-xl border border-line bg-ink-2/70 px-4 py-3.5 text-[15px] outline-none focus:border-accent/70"
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
            {error}
          </p>
        )}

        <button
          disabled={pending}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-accent to-accent-soft py-3.5 text-[15px] font-semibold text-[#1a1206] disabled:opacity-60"
        >
          {pending ? "Kontrol ediliyor…" : "Giriş yap"}
        </button>
      </form>
    </div>
  );
}
