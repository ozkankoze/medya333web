"use client";

import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

const links = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#referanslar", label: "Referanslar" },
  { href: "#surec", label: "Süreç" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "S.S.S." },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3" aria-label={site.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.png"
            alt=""
            width={84}
            height={37}
            className="h-[38px] w-auto"
          />
          <span className="hidden font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-muted sm:block">
            Web
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-[14px] text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-line px-3.5 py-2.5 text-[14px] font-medium text-fg transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
          >
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#iletisim"
            className="rounded-xl bg-gradient-to-r from-accent to-accent-soft px-4 py-2.5 text-[14px] font-semibold text-[#1a1206] transition-transform hover:scale-[1.03]"
          >
            Teklif Al
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-[1.6px] w-5 bg-fg transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[1.6px] w-5 bg-fg transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.6px] w-5 bg-fg transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobil menü */}
      <div
        className={`overflow-hidden border-t border-line bg-ink/97 backdrop-blur-xl transition-[max-height] duration-400 lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-[14px] font-medium"
            >
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="#iletisim"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-gradient-to-r from-accent to-accent-soft px-4 py-3 text-center text-[14px] font-semibold text-[#1a1206]"
            >
              Teklif Al
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
