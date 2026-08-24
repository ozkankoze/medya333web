"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="S.S.S."
                title={
                  <>
                    Merak edilenler
                  </>
                }
                desc="Aklınızdaki soru burada yoksa çekinmeden sorun — teklif almadan önce bilgi almanız bizim de işimizi kolaylaştırıyor."
              />
            </div>
          </Reveal>

          <div className="space-y-2.5">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 40}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen
                        ? "border-accent/40 bg-white/[0.045]"
                        : "border-line bg-white/[0.02]"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left"
                    >
                      <span className="font-display text-[15.5px] font-semibold">
                        {f.q}
                      </span>
                      <span
                        className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line transition-transform duration-300 ${
                          isOpen ? "rotate-45 border-accent/60 text-accent-soft" : "text-muted"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
