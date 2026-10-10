"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { metricList } from "@/lib/projects";
import { kaymaSuresi, mockupOran, mockupSrc } from "@/lib/mockup";

const ILK_RENK = "#6B5CF0";

/**
 * Marka haplarının üstüne gelince:
 * başlık marka adı olur, sağ altta dizüstü ve telefon belirir,
 * içlerinde o sitenin kendi ekran görüntüsü aşağı akar.
 *
 * Görseller hover edilene kadar indirilmez.
 */
export default function Showcase({
  projects,
  ilkBaslik,
  ilkMetin,
}: {
  projects: Project[];
  ilkBaslik: React.ReactNode;
  ilkMetin: string;
}) {
  const [aktif, setAktif] = useState<number | null>(null);
  const sabit = useRef<number | null>(null);
  const masaRef = useRef<HTMLImageElement>(null);
  const mobilRef = useRef<HTMLImageElement>(null);

  const p = aktif === null ? null : projects[aktif];

  /** Görseli yerleştirir ve kayma mesafesini ekran boyutuna göre ayarlar. */
  const reelKur = useCallback(
    (img: HTMLImageElement | null, src: string, oran: number, temel: number) => {
      if (!img) return;
      if (img.getAttribute("src") !== src) img.setAttribute("src", src);
      requestAnimationFrame(() => {
        const ekran = img.parentElement;
        if (!ekran) return;
        const w = ekran.clientWidth;
        const h = ekran.clientHeight;
        if (!w || !h) return;
        img.style.setProperty("--win", `${h}px`);
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = `kay ${kaymaSuresi(w * oran, h, temel).toFixed(
          1
        )}s linear infinite`;
      });
    },
    []
  );

  useEffect(() => {
    if (!p) {
      window.__formRengi?.(ILK_RENK);
      return;
    }
    window.__formRengi?.(p.accent);
    const src = mockupSrc(p.image_url);
    const oran = mockupOran(p.image_url);
    reelKur(masaRef.current, src.masa, oran.d, 6);
    reelKur(mobilRef.current, src.mobil, oran.m, 5);
  }, [p, reelKur]);

  const goster = (i: number) => setAktif(i);
  const birak = () => setAktif(sabit.current);
  const tikla = (i: number) => {
    if (sabit.current === i) {
      sabit.current = null;
      setAktif(null);
    } else {
      sabit.current = i;
      setAktif(i);
    }
  };

  const etiketler = p ? metricList(p.metrics) : [];

  return (
    <div className="relative z-2 flex flex-1 flex-col gap-[22px] pb-[26px] pt-[10px] lg:grid lg:grid-cols-[minmax(150px,185px)_minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr_auto] lg:gap-x-[30px] lg:gap-y-0 lg:pb-[30px] lg:pt-1">
      {/* marka hapları */}
      <div
        role="list"
        onMouseLeave={birak}
        className="flex flex-wrap content-start gap-1.5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:flex-col lg:flex-nowrap lg:items-start lg:gap-[5px] lg:pt-[38px]"
      >
        {projects.map((x, i) => (
          <button
            key={x.id ?? x.url}
            type="button"
            role="listitem"
            aria-current={aktif === i}
            onMouseEnter={() => goster(i)}
            onFocus={() => goster(i)}
            onClick={() => tikla(i)}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] tracking-[-0.01em] text-chalk backdrop-blur-[14px] transition-all duration-250 ${
              aktif === i
                ? "translate-x-1 bg-white/[0.22]"
                : "bg-white/[0.09] hover:translate-x-1 hover:bg-white/[0.22]"
            }`}
          >
            {x.title}
          </button>
        ))}
      </div>

      {/* sağ üstteki kısa metin */}
      <p className="min-h-[4.6em] max-w-[30ch] text-[14.5px] leading-[1.52] text-chalk lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:justify-self-end lg:max-w-[28ch] lg:pt-[42px]">
        {p ? p.description : ilkMetin}
      </p>

      {/* dev iddia */}
      <h1
        className={`display m-0 lg:col-start-2 lg:row-start-2 lg:self-end lg:max-w-[12ch] ${
          p
            ? "text-[clamp(2.3rem,6.4vw,5rem)]"
            : "text-[clamp(3.2rem,12vw,9rem)]"
        }`}
      >
        {p ? p.title : ilkBaslik}
      </h1>

      {/* etiket şeridi */}
      <div className="mono flex min-h-[1.4em] flex-wrap gap-x-5 gap-y-[7px] text-mute lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:pt-5">
        {etiketler.length ? (
          etiketler.map((e) => <span key={e}>{e}</span>)
        ) : (
          <span>Bir markanın üstüne gelin</span>
        )}
      </div>

      {/* cihazlar */}
      <div
        aria-hidden={!p}
        className={`flex items-end transition-all duration-[550ms] lg:col-start-3 lg:row-start-2 lg:self-end lg:justify-self-end ${
          p ? "opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="w-[min(100%,250px)] flex-none lg:w-[300px] xl:w-[370px]">
          <div className="rounded-[10px] border border-white/20 bg-[#121218]/80 p-[7px] pb-2 shadow-[0_26px_60px_-22px_rgba(0,0,0,.95)] backdrop-blur-[10px]">
            <div className="relative aspect-16/10 overflow-hidden rounded bg-[#0b0b10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={masaRef}
                alt=""
                decoding="async"
                className="absolute inset-x-0 top-0 block w-full"
              />
              <span className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(118deg,rgba(255,255,255,.1)_0%,transparent_32%,transparent_70%,rgba(255,255,255,.05)_100%)]" />
            </div>
          </div>
          <div className="mx-auto h-2 w-[112%] -translate-x-[5.3%] rounded-b-[9px] bg-gradient-to-b from-white/25 to-white/10" />
        </div>

        <div className="-ml-[26px] mb-2.5 w-[86px] flex-none rounded-[15px] border border-white/25 bg-[#0e0e14]/90 p-1 shadow-[0_22px_46px_-18px_rgba(0,0,0,.95)] backdrop-blur-[10px] lg:-ml-[30px] lg:mb-3.5 lg:w-24 xl:-ml-[38px] xl:w-28">
          <div className="relative aspect-9/19 overflow-hidden rounded-[11px] bg-[#0b0b10]">
            <span className="absolute left-1/2 top-1 z-2 h-1 w-[34%] -translate-x-1/2 rounded-full bg-black/75" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={mobilRef}
              alt=""
              decoding="async"
              className="absolute inset-x-0 top-0 block w-full"
            />
            <span className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(118deg,rgba(255,255,255,.1)_0%,transparent_32%,transparent_70%,rgba(255,255,255,.05)_100%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
