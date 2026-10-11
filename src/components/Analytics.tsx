"use client";

import Script from "next/script";
import { useEffect } from "react";
import { conversions, gtagIds, trackConversion } from "@/lib/gtag";

/**
 * Google etiketi + otomatik dönüşüm yakalama.
 *
 * Sayfadaki TÜM WhatsApp (wa.me) ve telefon (tel:) bağlantıları otomatik
 * olarak dönüşüm sayılır — ayrı ayrı kod eklemeye gerek yok.
 * WhatsApp ve telefon ayrı dönüşüm olarak gider.
 */
export default function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isWhatsApp =
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com") ||
        href.startsWith("whatsapp:");
      const isPhone = href.startsWith("tel:");
      if (!isWhatsApp && !isPhone) return;

      const etiket = isPhone ? conversions.telefon : conversions.whatsapp;

      // yeni sekmede açılıyorsa yönlendirmeyi biz yapmayalım
      const newTab =
        link.target === "_blank" || e.metaKey || e.ctrlKey || e.button === 1;

      if (newTab) {
        trackConversion(etiket);
        return;
      }

      e.preventDefault();
      trackConversion(etiket, link.href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gtagIds.map((id) => `gtag('config', '${id}');`).join("\n          ")}
        `}
      </Script>
    </>
  );
}
