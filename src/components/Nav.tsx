"use client";

import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";

const links = [
  { href: "#referanslar", label: "İşler" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#surec", label: "Süreç" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "S.S.S." },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
          ? "border-b border-line bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" aria-label={site.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.png"
            alt=""
            width={88}
            height={39}
            className="h-[34px] w-auto"
          />
          <span className="hidden text-[13px] font-medium uppercase tracking-[0.2em] text-muted-2 sm:block">
            Web
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14.5px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] text-muted transition-colors hover:text-ink"
          >
            WhatsApp
          </a>
          <a href="#iletisim" className="btn btn-dark !px-5 !py-3 !text-[14.5px]">
            Teklif Al
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
        >
          <span className="relative block h-3 w-[18px]">
            <span
              className={`absolute left-0 h-[1.5px] w-[18px] bg-ink transition-all duration-300 ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-[18px] bg-ink transition-all duration-300 ${
                open ? "top-[5px] -rotate-45" : "top-[11px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobil menü */}
      <div
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <div className="container-x flex flex-col py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[17px] text-ink last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3 pb-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp
            </a>
            <a
              href="#iletisim"
              onClick={() => setOpen(false)}
              className="btn btn-dark"
            >
              Teklif Al
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
