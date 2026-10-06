"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { creepSeconds, prettyHost, webpFor } from "@/lib/shots";

const HOLD = 9000; // bir sitede kalma süresi (ms)

export default function Stage({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const barRef = useRef<HTMLDivElement>(null);

  const n = projects.length;
  const go = useCallback(
    (next: number) => setI(((next % n) + n) % n),
    [n]
  );

  // otomatik geçiş
  useEffect(() => {
    if (paused || n < 2) return;
    const t = window.setTimeout(() => setI((p) => (p + 1) % n), HOLD);
    return () => window.clearTimeout(t);
  }, [i, paused, n]);

  // ilerleme çubuğunu yeniden başlat
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.animation = "none";
    // reflow
    void el.offsetWidth;
    el.style.animation = `barfill ${HOLD}ms linear forwards`;
    el.style.animationPlayState = paused ? "paused" : "running";
  }, [i, paused]);

  if (!n) return null;

  const active = projects[i];
  const host = prettyHost(active.url);

  return (
    <div
      className="stage min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ---- tarayıcı çerçevesi ---- */}
      <div className="frame">
        <div className="frame-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <div className="ml-3 flex min-w-0 flex-1 items-center">
            <span className="mono mono-ink truncate text-[10px] sm:text-[11px]">
              {host}
            </span>
          </div>
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mono link-slide hidden shrink-0 text-[10px] text-ink sm:inline-block"
          >
            Siteyi aç ↗
          </a>
        </div>

        {/* pencere */}
        <div className="win relative w-full overflow-hidden bg-wash">
          {projects.map((p, idx) => {
            const webp = webpFor(p.image_url);
            const on = idx === i;
            // yalnızca aktif ve komşu kareleri indir
            const near = Math.abs(idx - i) <= 1 || (i === 0 && idx === n - 1);
            if (!near && !loaded[idx]) return null;

            return (
              <div
                key={p.id ?? p.url}
                aria-hidden={!on}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: on ? 1 : 0, zIndex: on ? 2 : 1 }}
              >
                <div
                  className={on && !paused ? "creep" : undefined}
                  style={
                    {
                      "--dur": `${creepSeconds(p.image_url)}s`,
                    } as React.CSSProperties
                  }
                >
                  {p.image_url ? (
                    <picture>
                      {webp && <source srcSet={webp} type="image/webp" />}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image_url}
                        alt={`${p.title} — web sitesi, tam sayfa`}
                        className="block w-full"
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        onLoad={() =>
                          setLoaded((s) => (s[idx] ? s : { ...s, [idx]: true }))
                        }
                      />
                    </picture>
                  ) : (
                    <div className="grid h-[420px] w-full place-items-center">
                      <span className="display-sm text-3xl text-muted-2">
                        {p.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* alt kenarda devamı olduğunu belli eden ince gölge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* ilerleme çubuğu */}
        <div className="h-[2px] w-full bg-line">
          <div ref={barRef} className="h-full w-0 bg-ink" />
        </div>
      </div>

      {/* ---- seçim listesi ---- */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="mono">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Önceki referans"
            className="grid h-9 w-9 place-items-center border border-line-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Sonraki referans"
            className="grid h-9 w-9 place-items-center border border-line-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            →
          </button>
        </div>
      </div>

      <div className="no-bar fade-x -mx-1 mt-3 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:mt-5 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0 lg:px-0">
        {projects.map((p, idx) => (
          <button
            key={p.id ?? p.url}
            type="button"
            onClick={() => go(idx)}
            aria-current={idx === i}
            className={`group flex shrink-0 items-baseline gap-3 whitespace-nowrap border-t py-2.5 text-left transition-colors lg:whitespace-normal ${
              idx === i
                ? "border-ink text-ink"
                : "border-line text-muted hover:border-line-2 hover:text-ink"
            }`}
          >
            <span className="mono shrink-0 text-[10px]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="text-[14px] font-medium tracking-tight">
              {p.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
