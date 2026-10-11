"use client";

import { useEffect } from "react";
import { conversions, trackConversion } from "@/lib/gtag";

/**
 * Dönüşüm yakalama.
 *
 * Google etiketinin kendisi layout.tsx içinde <head>'de duruyor.
 * Burada sadece tıklamalar dinlenir: sayfadaki TÜM WhatsApp (wa.me) ve
 * telefon (tel:) bağlantıları otomatik olarak dönüşüm sayılır.
 */
export default function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isWhatsApp = /wa\.me|whatsapp/i.test(href);
      const isPhone = /^tel:/i.test(href);
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

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
