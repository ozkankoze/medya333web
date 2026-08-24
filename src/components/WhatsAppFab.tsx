"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-[#04220f] shadow-[0_16px_40px_-12px_rgba(37,211,102,.8)] transition-all duration-300 ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconWhatsApp className="h-5 w-5" />
      <span className="hidden text-[14px] sm:inline">WhatsApp</span>
    </a>
  );
}
