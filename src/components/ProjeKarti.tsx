"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { metricList, prettyHost } from "@/lib/projects";
import { kaymaSuresi, mockupOran, mockupSrc } from "@/lib/mockup";

/**
 * Yazının içine gömülen canlı proje örneği.
 *
 * Ana sayfadaki vitrinin küçük kardeşi: dizüstü + telefon çerçevesi,
 * içinde o sitenin gerçek ekran görüntüsü aşağı akıyor.
 * Görünür hale gelene kadar görsel indirilmez.
 */
export default function ProjeKarti({ proje }: { proje: Project }) {
  const kutuRef = useRef<HTMLDivElement>(null);
  const masaRef = useRef<HTMLImageElement>(null);
  const mobilRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const kutu = kutuRef.current;
    if (!kutu) return;

    const src = mockupSrc(proje.image_url);
    const oran = mockupOran(proje.image_url);

    const kur = (
      img: HTMLImageElement | null,
      adres: string,
      o: number,
      temel: number
    ) => {
      if (!img) return;
      if (img.getAttribute("src") !== adres) img.setAttribute("src", adres);
      requestAnimationFrame(() => {
        const ekran = img.parentElement;
        if (!ekran) return;
        const w = ekran.clientWidth;
        const h = ekran.clientHeight;
        if (!w || !h) return;
        const yol = Math.max(0, w * o - h);
        img.style.setProperty("--yol", `-${yol.toFixed(1)}px`);
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = `kay ${kaymaSuresi(w * o, h, 6).toFixed(
          1
        )}s linear infinite`;
      });
    };

    const io = new IntersectionObserver(
      (girisler) => {
        for (const g of girisler) {
          if (!g.isIntersecting) continue;
          kur(masaRef.current, src.masa, oran.d, 6);
          kur(mobilRef.current, src.mobil, oran.m, 5);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(kutu);
    return () => io.disconnect();
  }, [proje.image_url]);

  const etiketler = metricList(proje.metrics).slice(0, 3);

  return (
    <aside
      ref={kutuRef}
      className="not-prose relative my-11 overflow-hidden rounded-[14px] border border-[var(--line)] bg-[#0b0b10]"
      style={{ ["--vurgu" as string]: proje.accent }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] opacity-[0.17]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, var(--vurgu) 0%, transparent 72%)",
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-center lg:gap-9">
        <div className="min-w-0">
          <span
            className="mono inline-flex items-center gap-2"
            style={{ color: proje.accent }}
          >
            <i
              aria-hidden
              className="block h-[7px] w-[7px] rounded-full"
              style={{ background: proje.accent }}
            />
            Bizim işimiz
          </span>

          <h3 className="duz mt-3 text-[clamp(1.35rem,3.4vw,1.8rem)] text-chalk">
            {proje.title}
          </h3>

          <p className="mt-3 max-w-[46ch] text-[14.5px] leading-[1.6] text-mute">
            {proje.description}
          </p>

          <div className="mono mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-faint">
            {etiketler.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>

          <a
            href={proje.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mono mt-5 inline-flex items-center gap-1.5 text-chalk no-underline"
          >
            <span
              className="border-b pb-0.5"
              style={{ borderColor: proje.accent }}
            >
              {prettyHost(proje.url)}
            </span>
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* cihazlar */}
        <div className="flex min-w-0 items-end justify-center lg:justify-end">
          <div className="w-[min(62%,230px)] flex-none">
            <div className="rounded-[9px] border border-white/15 bg-[#121218]/80 p-1.5 pb-2 shadow-[0_22px_50px_-22px_rgba(0,0,0,.95)]">
              <div className="relative aspect-16/10 overflow-hidden rounded-[3px] bg-[#0b0b10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={masaRef}
                  alt=""
                  decoding="async"
                  className="absolute inset-x-0 top-0 block w-full"
                />
              </div>
            </div>
            <div className="mx-auto h-1.5 w-[110%] -translate-x-[4.5%] rounded-b-[7px] bg-gradient-to-b from-white/20 to-white/[0.07]" />
          </div>

          <div className="-ml-[20px] mb-2 w-[70px] flex-none rounded-[12px] border border-white/20 bg-[#0e0e14]/90 p-[3px] shadow-[0_18px_40px_-18px_rgba(0,0,0,.95)]">
            <div className="relative aspect-9/19 overflow-hidden rounded-[9px] bg-[#0b0b10]">
              <span className="absolute left-1/2 top-1 z-2 h-[3px] w-[34%] -translate-x-1/2 rounded-full bg-black/75" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={mobilRef}
                alt=""
                decoding="async"
                className="absolute inset-x-0 top-0 block w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
