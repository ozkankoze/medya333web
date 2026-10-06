"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
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
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-ink bg-ink px-4 py-3.5 text-[14px] font-medium text-paper transition-all duration-300 hover:bg-paper hover:text-ink ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <IconWhatsApp className="h-[18px] w-[18px]" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
