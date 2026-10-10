"use client";

import { useEffect, useRef } from "react";

/**
 * Küçük beyaz nokta; tıklanabilir bir şeyin üstünde halkaya açılır.
 * Sadece fare olan cihazlarda çalışır, dokunmatikte hiç görünmez.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;

    const yavas = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hx = window.innerWidth / 2;
    let hy = window.innerHeight / 2;
    let x = hx;
    let y = hy;
    let basladi = false;
    let raf = 0;

    const hedefler = "a, button, tr[data-url], .pill, input, textarea, summary";

    const hareket = (e: MouseEvent) => {
      hx = e.clientX;
      hy = e.clientY;
      if (!basladi) {
        x = hx;
        y = hy;
        basladi = true;
        el.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      el.classList.toggle("ac", !!t?.closest?.(hedefler));
    };
    const cik = () => (el.style.opacity = "0");
    const gir = () => {
      if (basladi) el.style.opacity = "1";
    };

    document.addEventListener("mousemove", hareket, { passive: true });
    document.addEventListener("mouseleave", cik);
    document.addEventListener("mouseenter", gir);

    const don = () => {
      raf = requestAnimationFrame(don);
      if (yavas) {
        x = hx;
        y = hy;
      } else {
        x += (hx - x) * 0.22;
        y += (hy - y) * 0.22;
      }
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    };
    raf = requestAnimationFrame(don);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", hareket);
      document.removeEventListener("mouseleave", cik);
      document.removeEventListener("mouseenter", gir);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <span className="ring" />
      <span className="dot" />
    </div>
  );
}
