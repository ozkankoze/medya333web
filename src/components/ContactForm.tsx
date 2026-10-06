"use client";

import { useState } from "react";
import { budgets, serviceOptions } from "@/lib/content";
import { conversions, trackConversion } from "@/lib/gtag";
import { IconArrow, IconCheck } from "./Icons";

type State = "idle" | "sending" | "ok" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-paper-2/60 px-4 py-3.5 text-[15px] text-ink outline-none transition-all placeholder:text-muted-2 focus:border-ink focus:bg-paper";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // basit bot tuzağı
    if (fd.get("website")) return;

    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gönderilemedi");
      setState("ok");
      form.reset();
      // Google Ads dönüşümü — sadece form gerçekten kaydedildiğinde
      trackConversion(conversions.form);
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Beklenmedik bir hata oluştu."
      );
    }
  }

  if (state === "ok") {
    return (
      <div className="card grid place-items-center p-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink">
          <IconCheck className="h-7 w-7 text-paper" />
        </div>
        <h3 className="display-sm mt-5 text-[22px]">
          Talebiniz bize ulaştı
        </h3>
        <p className="mt-2.5 max-w-sm text-[14.5px] leading-relaxed text-muted">
          En kısa sürede size dönüş yapacağız. Acele bir işse WhatsApp'tan
          yazarak daha hızlı ulaşabilirsiniz.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-[14px] font-medium text-gold underline underline-offset-4 hover:text-ink"
        >
          Yeni bir talep gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-9">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-2 block text-[13px] text-muted">
            Ad Soyad *
          </label>
          <input id="name" name="name" required maxLength={80} className={inputCls} placeholder="Adınız" />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="company" className="mb-2 block text-[13px] text-muted">
            Firma
          </label>
          <input id="company" name="company" maxLength={80} className={inputCls} placeholder="Firma adı" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] text-muted">
            Telefon *
          </label>
          <input id="phone" name="phone" required maxLength={30} inputMode="tel" className={inputCls} placeholder="05xx xxx xx xx" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] text-muted">
            E-posta
          </label>
          <input id="email" name="email" type="email" maxLength={120} className={inputCls} placeholder="ornek@firma.com" />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-[13px] text-muted">
            Hizmet
          </label>
          <select id="service" name="service" className={inputCls} defaultValue={serviceOptions[0]}>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-paper">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-[13px] text-muted">
            Bütçe aralığı
          </label>
          <select id="budget" name="budget" className={inputCls} defaultValue={budgets[0]}>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-paper">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-[13px] text-muted">
            Projeniz hakkında kısaca
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            className={`${inputCls} resize-y`}
            placeholder="Ne yapmak istediğinizi birkaç cümleyle anlatın. Beğendiğiniz bir site varsa linkini de yazabilirsiniz."
          />
        </div>
      </div>

      {state === "error" && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-dark group mt-7 w-full !py-4 !text-[15.5px] disabled:cursor-not-allowed disabled:opacity-55"
      >
        {state === "sending" ? "Gönderiliyor…" : "Teklif talebini gönder"}
        {state !== "sending" && (
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </button>

      <p className="mt-3.5 text-center text-[12.5px] text-muted-2">
        Bilgileriniz sadece size dönüş yapmak için kullanılır, üçüncü kişilerle
        paylaşılmaz.
      </p>
    </form>
  );
}
