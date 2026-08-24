"use client";

import Script from "next/script";
import { useEffect } from "react";
import { conversions, gtagId, trackConversion } from "@/lib/gtag";

/**
 * Google etiketi + otomatik dönüşüm yakalama.
 *
 * Sayfadaki TÜM WhatsApp (wa.me) linkleri ve telefon (tel:) linkleri
 * otomatik olarak dönüşüm sayılır — ayrı ayrı kod eklemeye gerek yok.
 */
export default function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isWhatsApp = href.includes("wa.me") || href.includes("api.whatsapp.com");
      const isPhone = href.startsWith("tel:");
      if (!isWhatsApp && !isPhone) return;

      // yeni sekmede açılıyorsa yönlendirmeyi biz yapmayalım
      const newTab =
        link.target === "_blank" || e.metaKey || e.ctrlKey || e.button === 1;

      if (newTab) {
        trackConversion(conversions.whatsapp);
        return;
      }

      e.preventDefault();
      trackConversion(conversions.whatsapp, link.href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `}
      </Script>
    </>
  );
}
