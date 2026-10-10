"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { metricList, prettyHost } from "@/lib/projects";
import { kaymaSuresi, mockupOran, mockupSrc } from "@/lib/mockup";

const ILK_RENK = "#6B5CF0";

/**
 * Masaüstünde: marka hapının üstüne gelince başlık marka adı olur,
 * sağ altta dizüstü + telefon belirir, içlerinde site aşağı akar.
 *
 * Mobilde hover yok — bu yüzden düzen farklı:
 * başlık üstte sabit kalır, cihazlar ilk markayla birlikte açılışta görünür,
 * haplar cihazın altında yatay kayan bir şerit olur.
 */
export default function Showcase({
  projects,
  ilkBaslik,
  ilkMetin,
}: {
  projects: Project[];
  ilkBaslik: string[];
  ilkMetin: string;
}) {
  const [aktif, setAktif] = useState<number | null>(null);
  const [mobil, setMobil] = useState(false);
  const sabit = useRef<number | null>(null);
  const masaRef = useRef<HTMLImageElement>(null);
  const mobilRef = useRef<HTMLImageElement>(null);

  /** Ziyaretçinin seçtiği marka. Hiçbiri seçilmemişken ilk referans akar. */
  const secili = aktif === null ? null : projects[aktif];
  const gosterilenIndeks = aktif ?? 0;
  const p = projects[gosterilenIndeks];

  /* mobilde dokunmatik düzen */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const uygula = () => setMobil(mq.matches);
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

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
        // Yolu pikselle veriyoruz: keyframe'de yüzde kullanınca Safari, görsel
        // daha yüklenmemişken yüzdeyi sıfır sayıp akışı ters çevirebiliyor.
        const gorselYukseklik = w * oran;
        const yol = Math.max(0, gorselYukseklik - h);
        img.style.setProperty("--yol", `-${yol.toFixed(1)}px`);
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = `kay ${kaymaSuresi(gorselYukseklik, h, temel).toFixed(
          1
        )}s linear infinite`;
      });
    },
    []
  );

  useEffect(() => {
    window.__formRengi?.(p?.accent ?? ILK_RENK);
    if (!p) return;
    const src = mockupSrc(p.image_url);
    const oran = mockupOran(p.image_url);
    reelKur(masaRef.current, src.masa, oran.d, 6);
    reelKur(mobilRef.current, src.mobil, oran.m, 5);
  }, [p, reelKur]);

  const goster = (i: number) => {
    if (!mobil) setAktif(i);
  };
  const birak = () => {
    if (!mobil) setAktif(sabit.current);
  };
  const tikla = (i: number) => {
    if (mobil) {
      setAktif(i);
      return;
    }
    if (sabit.current === i) {
      sabit.current = null;
      setAktif(null);
    } else {
      sabit.current = i;
      setAktif(i);
    }
  };

  const etiketler = p ? metricList(p.metrics) : [];
  const satirlar = secili && !mobil ? [secili.title] : ilkBaslik;

  return (
    <div className="relative z-2 flex min-w-0 flex-1 flex-col gap-[18px] pb-[26px] pt-[6px] lg:grid lg:grid-cols-[minmax(150px,185px)_minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr_auto] lg:gap-x-[30px] lg:gap-y-0 lg:pb-[30px] lg:pt-1">
      {/* dev iddia */}
      <h1
        className={`display m-0 lg:col-start-2 lg:row-start-2 lg:max-w-[12ch] lg:self-end ${
          secili && !mobil
            ? "text-[clamp(2.3rem,6.4vw,5rem)]"
            : "text-[clamp(2.9rem,12vw,9rem)]"
        }`}
      >
        {satirlar.map((s, i) => (
          <span
            key={s}
            className={`-mb-[0.14em] block overflow-hidden pb-[0.14em] ${
              i === 1 ? "pl-[1.1em] lg:pl-[1.3em]" : ""
            }`}
          >
            <span
              className="perde block"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {s}
            </span>
          </span>
        ))}
      </h1>

      {/* kısa metin */}
      <p className="gir max-w-[32ch] text-[14.5px] leading-[1.52] text-chalk [animation-delay:.3s] lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:min-h-[4.6em] lg:max-w-[28ch] lg:justify-self-end lg:pt-[42px]">
        {secili && !mobil ? secili.description : ilkMetin}
      </p>

      {/* cihazlar */}
      <div className="gir mt-auto [animation-delay:.42s] lg:col-start-3 lg:row-start-2 lg:mt-0 lg:self-end lg:justify-self-end">
      <div className="flex items-end justify-center lg:justify-end">
        <div className="w-[min(66vw,258px)] flex-none lg:w-[300px] xl:w-[370px]">
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

        <div className="-ml-[24px] mb-2.5 w-[84px] flex-none rounded-[15px] border border-white/25 bg-[#0e0e14]/90 p-1 shadow-[0_22px_46px_-18px_rgba(0,0,0,.95)] backdrop-blur-[10px] lg:-ml-[30px] lg:mb-3.5 lg:w-24 xl:-ml-[38px] xl:w-28">
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

      {/* etiket şeridi */}
      <div className="mono gir flex min-h-[1.4em] flex-wrap items-baseline gap-x-5 gap-y-[7px] text-mute [animation-delay:.5s] lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:pt-5">
        {etiketler.slice(0, mobil ? 3 : 4).map((e) => (
          <span key={e}>{e}</span>
        ))}
        {!secili && !mobil && (
          <span className="text-faint">Bir markanın üstüne gelin</span>
        )}
        {p && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10.5px] tracking-[0.06em] text-chalk underline-offset-4 hover:underline lg:hidden"
          >
            {prettyHost(p.url)} ↗
          </a>
        )}
      </div>

      {/* marka hapları — mobilde yatay şerit, masaüstünde sol sütun */}
      <div
        role="list"
        onMouseLeave={birak}
        className="gir -mx-[18px] flex snap-x snap-mandatory content-start gap-1.5 overflow-x-auto px-[18px] pb-1 [animation-delay:.58s] [mask-image:linear-gradient(to_right,#000_80%,transparent_99%)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:col-start-1 lg:[mask-image:none] lg:row-span-3 lg:row-start-1 lg:mx-0 lg:flex-col lg:flex-nowrap lg:items-start lg:gap-[5px] lg:overflow-visible lg:px-0 lg:pt-[38px]"
      >
        {projects.map((x, i) => (
          <button
            key={x.id ?? x.url}
            type="button"
            role="listitem"
            aria-current={gosterilenIndeks === i}
            onMouseEnter={() => goster(i)}
            onFocus={() => goster(i)}
            onClick={() => tikla(i)}
            className={`inline-flex flex-none origin-left snap-start items-center whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] tracking-[-0.01em] backdrop-blur-[14px] transition-all duration-300 ${
              gosterilenIndeks === i
                ? "scale-[1.07] bg-chalk font-medium text-void shadow-[0_8px_26px_-10px_rgba(0,0,0,.9)] lg:translate-x-1.5"
                : "bg-white/[0.09] text-chalk hover:bg-white/[0.22] lg:hover:translate-x-1"
            }`}
          >
            {x.title}
          </button>
        ))}
      </div>
    </div>
  );
}
