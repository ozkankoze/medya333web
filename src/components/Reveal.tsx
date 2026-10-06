"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Güvenlik ağı: gözlemci herhangi bir sebeple tetiklenmezse
    // içerik gizli kalmasın.
    const failsafe = window.setTimeout(() => setShown(true), 1600);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);

    // Zaten ekrandaysa (sayfa ortasından açılmışsa) hemen göster
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) setShown(true);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(20px)",
        transition: `opacity .7s cubic-bezier(.22,.7,.25,1) ${delay}ms, transform .7s cubic-bezier(.22,.7,.25,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
