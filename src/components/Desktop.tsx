"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { metricList, prettyHost } from "@/lib/projects";
import { site, waLink } from "@/lib/site";

/** Klasör simgesi — üstüne başka bir rozet konabilir. */
function Klasor({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 34"
      aria-hidden
      className="block h-10 w-[46px] drop-shadow-[0_2px_3px_rgba(0,0,0,.55)]"
    >
      <path
        d="M1 5a2 2 0 0 1 2-2h11l4 4h19a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z"
        fill="#d9a528"
        stroke="#6b4e0d"
        strokeWidth="1.4"
      />
      <path
        d="M1 12h38v19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z"
        fill="#fcd462"
        stroke="#6b4e0d"
        strokeWidth="1.4"
      />
      {children}
    </svg>
  );
}

function KisayolOku() {
  return (
    <span className="absolute -bottom-0.5 -left-0.5 grid h-[15px] w-[15px] place-items-center rounded-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,.55)]">
      <svg viewBox="0 0 12 12" aria-hidden className="block h-[11px] w-[11px]">
        <path
          d="M3 9 9 3M9 3H4.6M9 3v4.4"
          fill="none"
          stroke="#111"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const IKON =
  "flex w-[84px] flex-col items-center gap-1.5 border-0 bg-transparent px-[3px] pb-1.5 pt-[7px] text-center text-[12.5px] text-white no-underline lg:w-24 lg:px-1";
const ETIKET =
  "rounded-[1px] bg-[rgba(0,0,40,.55)] px-1.5 py-0.5 leading-[1.22] [text-shadow:0_1px_2px_rgba(0,0,0,.85)] shadow-[0_1px_3px_rgba(0,0,0,.35)] group-hover:bg-[#00007b] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,.55)]";

export default function Desktop({ projects }: { projects: Project[] }) {
  const [acik, setAcik] = useState(false);
  const [saat, setSaat] = useState("—");
  const ekranRef = useRef<HTMLDivElement>(null);
  const kendiAcildi = useRef(false);

  useEffect(() => {
    const yaz = () => {
      const d = new Date();
      setSaat(
        `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes()
        ).padStart(2, "0")}`
      );
    };
    yaz();
    const t = window.setInterval(yaz, 20000);
    return () => window.clearInterval(t);
  }, []);

  // ekran görününce klasör kendi kendine açılsın — içerik tıklama ardında kalmasın
  useEffect(() => {
    const el = ekranRef.current;
    const ac = () => {
      if (!kendiAcildi.current) {
        kendiAcildi.current = true;
        setAcik(true);
      }
    };
    if (!el || typeof IntersectionObserver === "undefined") {
      ac();
      return;
    }
    const io = new IntersectionObserver(
      (g) =>
        g.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(ac, 420);
            io.disconnect();
          }
        }),
      { threshold: 0.35 }
    );
    io.observe(el);
    const failsafe = window.setTimeout(ac, 9000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <section id="isler" className="relative z-[2] bg-void py-[70px] lg:py-[72px]">
      <div className="gutter">
        {/* CRT gövdesi */}
        <div className="mx-auto max-w-[1060px] rounded-[22px] bg-[linear-gradient(170deg,#ded8c6,#c3bca8_42%,#a9a291)] p-4 pb-0 shadow-[inset_0_2px_0_rgba(255,255,255,.65),inset_0_-2px_0_rgba(0,0,0,.18),0_40px_90px_-40px_rgba(0,0,0,.9)] lg:rounded-[26px] lg:p-[22px] lg:pb-0">
          <div className="rounded-[10px] bg-[linear-gradient(160deg,#6f6a5c,#4c483e)] p-2.5 shadow-[inset_0_2px_5px_rgba(0,0,0,.6)]">
            <div
              ref={ekranRef}
              className="relative flex min-h-[470px] flex-col overflow-hidden rounded bg-[#2f7fc9] lg:min-h-[560px]"
            >
              {/* duvar kâğıdı — kendi çizimimiz */}
              <svg
                viewBox="0 0 1200 700"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
              >
                <defs>
                  <linearGradient id="gok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0f55b4" />
                    <stop offset=".34" stopColor="#2878cf" />
                    <stop offset=".68" stopColor="#78b6e8" />
                    <stop offset="1" stopColor="#cfe6f6" />
                  </linearGradient>
                  <linearGradient id="cim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#a7d64a" />
                    <stop offset=".28" stopColor="#7cc02f" />
                    <stop offset="1" stopColor="#3b8718" />
                  </linearGradient>
                  <linearGradient id="cim2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5ea32a" />
                    <stop offset="1" stopColor="#2d6b14" />
                  </linearGradient>
                  <linearGradient id="isik" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity=".30" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <filter id="bulut" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="13" />
                  </filter>
                </defs>

                <rect width="1200" height="700" fill="url(#gok)" />

                <g fill="#fff" filter="url(#bulut)">
                  <g opacity=".95">
                    <ellipse cx="150" cy="96" rx="104" ry="34" />
                    <ellipse cx="214" cy="80" rx="68" ry="27" />
                    <ellipse cx="96" cy="82" rx="54" ry="22" />
                  </g>
                  <g opacity=".8">
                    <ellipse cx="330" cy="168" rx="60" ry="19" />
                    <ellipse cx="372" cy="160" rx="38" ry="14" />
                  </g>
                  <g opacity=".7">
                    <ellipse cx="880" cy="120" rx="76" ry="22" />
                    <ellipse cx="930" cy="110" rx="46" ry="16" />
                  </g>
                  <g opacity=".55">
                    <ellipse cx="650" cy="226" rx="52" ry="14" />
                    <ellipse cx="1080" cy="250" rx="60" ry="15" />
                    <ellipse cx="470" cy="268" rx="44" ry="11" />
                  </g>
                </g>

                <path
                  d="M0 452 C 260 404, 520 392, 780 432 C 960 458, 1080 470, 1200 458 L1200 700 L0 700 Z"
                  fill="url(#cim2)"
                />
                <path
                  d="M0 496 C 230 404, 470 386, 742 452 C 930 498, 1060 526, 1200 512 L1200 700 L0 700 Z"
                  fill="url(#cim)"
                />
                <path
                  d="M0 496 C 230 404, 470 386, 742 452 C 930 498, 1060 526, 1200 512 L1200 560 C 1060 574, 930 546, 742 500 C 470 434, 230 452, 0 544 Z"
                  fill="url(#isik)"
                />
                <g stroke="#ffffff" strokeOpacity=".09" fill="none">
                  <path d="M0 560 C 240 486, 480 470, 742 532 C 930 576, 1060 600, 1200 588" />
                  <path d="M0 614 C 240 548, 480 534, 742 592 C 930 632, 1060 652, 1200 642" />
                  <path d="M0 666 C 240 608, 480 596, 742 650 C 930 686, 1060 702, 1200 694" />
                </g>
              </svg>

              {/* tarama çizgileri */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[9] bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,.055)_0_1px,transparent_1px_3px),radial-gradient(120%_120%_at_50%_50%,transparent_62%,rgba(0,0,0,.28)_100%)]"
              />

              <div className="relative flex-1 p-3.5">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[110px] bg-[linear-gradient(to_bottom,rgba(0,0,0,.34),transparent)] lg:right-auto lg:h-[360px] lg:w-[180px] lg:bg-[linear-gradient(135deg,rgba(0,0,0,.34),rgba(0,0,0,.10)_55%,transparent_78%)]"
                />

                {/* masaüstü simgeleri */}
                <div className="relative z-[1] flex flex-row items-start gap-0.5 lg:flex-col lg:gap-1">
                  <button
                    type="button"
                    onClick={() => setAcik((v) => !v)}
                    onDoubleClick={() => setAcik(true)}
                    aria-expanded={acik}
                    aria-controls="refpencere"
                    className={`group ${IKON}`}
                  >
                    <span className="relative block">
                      <Klasor />
                    </span>
                    <span className={ETIKET}>Referanslar</span>
                  </button>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${IKON}`}
                  >
                    <span className="relative block">
                      <Klasor>
                        <circle
                          cx="27"
                          cy="22"
                          r="8"
                          fill="#25d366"
                          stroke="#0d5c2e"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M23.6 18.9c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 1.5.6 2.1.6 2.6.5.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3s-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5 0-.2 0-.3-.1-.4 0-.1-.6-1.3-.8-1.8-.2-.4-.3-.4-.5-.4h-.3Z"
                          fill="#fff"
                        />
                      </Klasor>
                      <KisayolOku />
                    </span>
                    <span className={ETIKET}>WhatsApp</span>
                  </a>

                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${IKON}`}
                  >
                    <span className="relative block">
                      <Klasor>
                        <defs>
                          <linearGradient id="igr" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0" stopColor="#f9ce34" />
                            <stop offset=".5" stopColor="#ee2a7b" />
                            <stop offset="1" stopColor="#6228d7" />
                          </linearGradient>
                        </defs>
                        <rect
                          x="19"
                          y="14"
                          width="16"
                          height="16"
                          rx="4.6"
                          fill="url(#igr)"
                          stroke="#4a1f7a"
                          strokeWidth="1.1"
                        />
                        <circle
                          cx="27"
                          cy="22"
                          r="4"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1.7"
                        />
                        <circle cx="31.6" cy="17.4" r="1.1" fill="#fff" />
                      </Klasor>
                      <KisayolOku />
                    </span>
                    <span className={ETIKET}>Instagram</span>
                  </a>
                </div>

                {/* pencere */}
                <div
                  id="refpencere"
                  hidden={!acik}
                  className="absolute inset-x-3 bottom-3 top-[104px] z-[6] flex flex-col lg:bottom-[18px] lg:left-[126px] lg:right-[30px] lg:top-[52px]"
                  style={acik ? { animation: "acil .2s cubic-bezier(.2,.8,.3,1)" } : undefined}
                >
                  <div className="flex min-h-0 flex-1 flex-col border border-[#0a0a0a] bg-w-face text-[13px] text-w-ink shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686,5px_5px_0_rgba(0,0,0,.3)]">
                    <div className="m-[3px] flex items-center gap-[3px] bg-[linear-gradient(90deg,#00007b,#1084d0)] py-[3px] pl-[7px] pr-[3px] text-white">
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
                        Referanslar
                      </span>
                      <span className="h-[15px] w-[18px] bg-w-face text-center font-mono text-[9px] leading-[14px] text-w-ink shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686,0_0_0_1px_#0a0a0a]">
                        _
                      </span>
                      <span className="h-[15px] w-[18px] bg-w-face text-center font-mono text-[9px] leading-[14px] text-w-ink shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686,0_0_0_1px_#0a0a0a]">
                        □
                      </span>
                      <button
                        type="button"
                        onClick={() => setAcik(false)}
                        aria-label="Pencereyi kapat"
                        className="h-[15px] w-[18px] bg-w-face text-center font-mono text-[9px] leading-[14px] text-w-ink shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686,0_0_0_1px_#0a0a0a]"
                      >
                        ×
                      </button>
                    </div>

                    <div className="flex gap-px px-[5px] pb-1 pt-0.5">
                      {["Dosya", "Düzen", "Görünüm", "Yardım"].map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 text-[12.5px] hover:bg-w-navy hover:text-white"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 border-t border-w-mid px-2 pb-[7px] pt-[5px] shadow-[inset_0_1px_0_#fff]">
                      <span className="flex-none text-[12px] text-[#2a2a2a]">
                        Adres
                      </span>
                      <span className="min-w-0 flex-1 truncate bg-white px-1.5 py-[3px] font-mono text-[11.5px] shadow-[inset_1px_1px_0_#868686,inset_-1px_-1px_0_#fff,0_0_0_1px_#5a5a5a]">
                        {"C:\\MEDYA333\\REFERANSLAR"}
                      </span>
                    </div>

                    <div className="mx-[7px] mb-[7px] flex min-h-0 flex-1 bg-white shadow-[inset_1px_1px_0_#868686,0_0_0_1px_#5a5a5a]">
                      <div className="min-w-0 flex-1 overflow-auto">
                        <table className="w-full min-w-[620px] border-collapse">
                          <thead>
                            <tr>
                              {["Ad", "Tür", "Özellikler", "Durum"].map((h) => (
                                <th
                                  key={h}
                                  className="sticky top-0 z-[2] whitespace-nowrap border-r border-w-mid bg-w-face px-2 py-1 text-left text-[11.5px] font-medium shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686]"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map((p) => (
                              <tr
                                key={p.id ?? p.url}
                                data-url={p.url}
                                tabIndex={0}
                                onDoubleClick={() =>
                                  window.open(p.url, "_blank", "noopener")
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    window.open(p.url, "_blank", "noopener");
                                }}
                                className="group/row cursor-default hover:bg-w-navy hover:text-white"
                              >
                                <td className="whitespace-nowrap px-2 py-[5px] text-[12.5px]">
                                  <span className="inline-flex items-center gap-[7px]">
                                    <i
                                      className="block h-[15px] w-[15px] flex-none rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.35),inset_2px_2px_0_rgba(255,255,255,.4)]"
                                      style={{ background: p.accent }}
                                    />
                                    {p.title}{" "}
                                    <span className="font-mono text-[11px] text-[#4a4a4a] group-hover/row:text-[#c6d2ff]">
                                      {prettyHost(p.url)}
                                    </span>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-2 py-[5px] text-[12.5px]">
                                  {p.category}
                                </td>
                                <td className="whitespace-nowrap px-2 py-[5px]">
                                  <span className="font-mono text-[11px] text-[#4a4a4a] group-hover/row:text-[#c6d2ff]">
                                    {metricList(p.metrics).slice(0, 3).join(" · ")}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-2 py-[5px] text-right font-mono text-[11px]">
                                  Yayında ↗
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mx-[7px] mb-[7px] flex gap-1.5">
                      <span className="min-w-0 flex-1 px-2 py-[3px] text-[11.5px] shadow-[inset_1px_1px_0_#868686,inset_-1px_-1px_0_#fff]">
                        {projects.length} nesne
                      </span>
                      <span className="px-2 py-[3px] text-[11.5px] shadow-[inset_1px_1px_0_#868686,inset_-1px_-1px_0_#fff]">
                        Hepsi yayında
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* görev çubuğu */}
              <div className="relative z-[8] flex items-center gap-[5px] bg-w-face p-1 shadow-[inset_0_1px_0_#fff,inset_0_2px_0_rgba(255,255,255,.4)]">
                <span className="bg-w-face px-[9px] py-[3px] text-[12.5px] font-semibold text-w-ink shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#868686,0_0_0_1px_#4a4a4a]">
                  Başlat
                </span>
                {acik && (
                  <button
                    type="button"
                    onClick={() => setAcik(false)}
                    className="max-w-[180px] truncate bg-w-face px-[9px] py-[3px] text-[12.5px] text-w-ink shadow-[inset_1px_1px_0_#868686,inset_-1px_-1px_0_#fff,0_0_0_1px_#4a4a4a]"
                  >
                    Referanslar
                  </button>
                )}
                <span className="ml-auto px-[9px] py-[3px] font-mono text-[11.5px] shadow-[inset_1px_1px_0_#868686,inset_-1px_-1px_0_#fff]">
                  {saat}
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1060px] items-center gap-2.5 px-1.5 pb-[13px] pt-[11px]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#58e07a] shadow-[0_0_7px_#58e07a,inset_0_0_0_1px_rgba(0,0,0,.3)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
              Medya 333
            </span>
          </div>
        </div>

        <p className="mono mx-auto mt-3.5 max-w-[1060px] px-1 text-white/70">
          Klasörlere tıkla — listede satıra çift tıklayınca site açılır
        </p>
      </div>
    </section>
  );
}
