"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconPlus } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="relative overflow-hidden bg-paper-2 py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="S.S.S."
                title={
                  <>
                    Sık sorulan <span className="serif text-gold">sorular</span>
                  </>
                }
                desc="Aradığınızı bulamadıysanız WhatsApp'tan yazın, aynı gün dönüş yapıyoruz."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line-2">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="border-b border-line-2">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-[16.5px] font-medium leading-snug tracking-[-0.01em] lg:text-[17.5px]">
                        {f.q}
                      </span>
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-2 transition-all duration-300 ${
                          isOpen ? "rotate-45 border-ink bg-ink text-paper" : ""
                        }`}
                      >
                        <IconPlus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-400 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-7 pr-10 text-[15.5px] leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
