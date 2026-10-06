"use client";

import { useState } from "react";
import { budgets, serviceOptions } from "@/lib/content";
import { conversions, trackConversion } from "@/lib/gtag";

type State = "idle" | "sending" | "ok" | "error";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted-2 focus:border-ink";

const label = "mono block";

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
      <div className="flex h-full min-h-[380px] flex-col justify-center border border-ink p-10 lg:p-14">
        <span className="mono">Alındı</span>
        <h3 className="display-tight mt-5 text-[clamp(1.9rem,4vw,2.8rem)]">
          Talebiniz bize
          <br />
          ulaştı.
        </h3>
        <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.65] text-muted">
          En kısa sürede dönüş yapacağız. Acele bir işse WhatsApp'tan yazarak
          daha hızlı ulaşabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link-slide mt-7 self-start text-[15px] font-medium tracking-tight"
        >
          Yeni bir talep gönder ↗
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line p-7 sm:p-10">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Ad Soyad *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={80}
            className={field}
            placeholder="Adınız"
          />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Firma
          </label>
          <input
            id="company"
            name="company"
            maxLength={80}
            className={field}
            placeholder="Firma adı"
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Telefon *
          </label>
          <input
            id="phone"
            name="phone"
            required
            maxLength={30}
            inputMode="tel"
            className={field}
            placeholder="05xx xxx xx xx"
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={120}
            className={field}
            placeholder="ornek@firma.com"
          />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Hizmet
          </label>
          <select
            id="service"
            name="service"
            className={field}
            defaultValue={serviceOptions[0]}
          >
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={label}>
            Bütçe aralığı
          </label>
          <select
            id="budget"
            name="budget"
            className={field}
            defaultValue={budgets[0]}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Projeniz hakkında kısaca
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            className={`${field} resize-y`}
            placeholder="Ne yapmak istediğinizi birkaç cümleyle anlatın. Beğendiğiniz bir site varsa linkini de yazabilirsiniz."
          />
        </div>
      </div>

      {state === "error" && (
        <p className="mt-6 border-l-2 border-ink py-1 pl-4 text-[14px] text-ink">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn mt-9 w-full disabled:cursor-not-allowed disabled:opacity-55"
      >
        {state === "sending" ? "Gönderiliyor…" : "Teklif talebini gönder →"}
      </button>

      <p className="mono mt-4 text-center leading-[1.6]">
        Bilgileriniz sadece size dönüş yapmak için kullanılır
      </p>
    </form>
  );
}
