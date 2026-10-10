"use client";

import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";

const LINKS = [
  { href: "/#isler", label: "İşler" },
  { href: "/#yontem", label: "Yöntem" },
  { href: "/#paketler", label: "Paketler" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 rule-b bg-paper/92 backdrop-blur-sm">
      <div className="wrap">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <a href="#" className="flex items-baseline gap-2.5">
            <span className="display-sm text-[19px] tracking-[-0.04em]">
              MEDYA&nbsp;333
            </span>
            <span className="mono hidden sm:inline">İstanbul</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-slide text-[14px] font-medium tracking-tight text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center border border-ink bg-ink px-4 text-[13px] font-medium text-paper transition-colors hover:bg-paper hover:text-ink sm:inline-flex"
            >
              WhatsApp
            </a>
            <button
              type="button"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center border border-line-2 md:hidden"
            >
              <span className="relative block h-[9px] w-4">
                <span
                  className="absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-300"
                  style={{
                    top: 0,
                    transform: open ? "translateY(4px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-300"
                  style={{
                    bottom: 0,
                    transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* mobil menü */}
      <div
        className="overflow-hidden border-t border-line bg-paper transition-[max-height] duration-400 md:hidden"
        style={{ maxHeight: open ? "22rem" : 0 }}
      >
        <div className="wrap py-2">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 border-b border-line py-3.5 last:border-0"
            >
              <span className="mono text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display-sm text-[22px]">{l.label}</span>
            </a>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn mt-3 mb-4 w-full"
          >
            WhatsApp — {site.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
