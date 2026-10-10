"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * WhatsApp sohbet kutusu.
 *
 * Ziyaretçi mesajını yazar, yukarıdaki yeşil balonda canlı görür ve
 * Gönder'e basınca mesaj hazır halde WhatsApp'ta açılır.
 *
 * Gönder bir <a href="https://wa.me/..."> — böylece hem güvenilir çalışır
 * hem de Analytics bileşeni bunu Google Ads dönüşümü olarak sayar.
 */
export default function Chat() {
  const [mesaj, setMesaj] = useState("");
  const [saat, setSaat] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const gonderRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const d = new Date();
    setSaat(
      `${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes()
      ).padStart(2, "0")}`
    );
  }, []);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(110, ta.scrollHeight)}px`;
  }, [mesaj]);

  const temiz = mesaj.trim();
  const href = temiz
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(temiz)}`
    : `https://wa.me/${site.whatsapp}`;

  return (
    <section id="iletisim" className="relative z-[2] bg-void">
      <div className="gutter">
        <div className="grid items-center gap-9 pb-[26px] pt-[66px] lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-14">
          <div>
            <h2 className="display m-0 max-w-[13ch] text-[clamp(2.2rem,6.4vw,4.4rem)] leading-[1.02]">
              Sıradaki sizinki olsun.
            </h2>
            <p className="mt-[18px] max-w-[40ch] text-[15px] leading-[1.6] text-mute">
              Ne yapmak istediğinizi birkaç cümleyle yazın. Gönder&apos;e basınca
              WhatsApp açılır, mesajınız hazır gelir — tekrar yazmanıza gerek yok.
            </p>
            <div className="mono mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-mute">
              <a href={`tel:${site.phoneRaw}`} className="hover:text-chalk">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-chalk">
                {site.email}
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-chalk"
              >
                @medya333_tr ↗
              </a>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0b141a] shadow-[0_28px_70px_-30px_rgba(0,0,0,.9)]">
              {/* başlık */}
              <div className="flex items-center gap-[11px] border-b border-white/[0.07] bg-[#1f2c34] px-3.5 py-[11px]">
                <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full bg-[#0e1419] shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mockup/pp.webp"
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <b className="flex items-center gap-[5px] text-[14.5px] font-medium tracking-[-0.01em] text-[#e9edef]">
                    Medya 333
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Doğrulanmış hesap"
                      className="block h-[15px] w-[15px] flex-none"
                    >
                      <circle cx="12" cy="12" r="11" fill="#1d9bf0" />
                      <path
                        d="m7 12.4 3.2 3.2L17 8.9"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </b>
                  <i className="mt-px block text-[11.5px] not-italic text-[#8696a0]">
                    Genelde birkaç dakika içinde yanıtlar
                  </i>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-[22px] w-[22px] flex-none text-[#25d366]"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
                </svg>
              </div>

              {/* mesajlar */}
              <div className="flex min-h-[212px] flex-col gap-2 bg-[#0b141a] px-3.5 pb-2.5 pt-4 [background-image:radial-gradient(rgba(255,255,255,.028)_1px,transparent_1px),radial-gradient(rgba(255,255,255,.028)_1px,transparent_1px)] [background-position:0_0,13px_13px] [background-size:26px_26px,26px_26px]">
                <p className="max-w-[84%] self-start whitespace-pre-wrap break-words rounded-[9px] rounded-tl-[2px] bg-[#202c33] px-[11px] pb-1.5 pt-[7px] text-[14px] leading-[1.45] text-[#e9edef]">
                  Merhaba 👋 Medya 333&apos;ten yazıyoruz.
                </p>
                <p className="max-w-[84%] self-start whitespace-pre-wrap break-words rounded-[9px] rounded-tl-[2px] bg-[#202c33] px-[11px] pb-1.5 pt-[7px] text-[14px] leading-[1.45] text-[#e9edef]">
                  Ne yaptırmak istiyorsunuz? Mevcut siteniz varsa adresini de
                  yazın.
                </p>
                <p
                  className={`mt-1.5 max-w-[84%] self-end whitespace-pre-wrap break-words rounded-[9px] rounded-tr-[2px] bg-[#005c4b] px-[11px] pb-1.5 pt-[7px] text-[14px] leading-[1.45] ${
                    temiz ? "text-[#e9edef]" : "text-[#e9edef]/40"
                  }`}
                >
                  {temiz || "Mesajınız burada görünecek…"}
                  <span className="mt-0.5 block text-right text-[10.5px] tabular-nums text-[#e9edef]/55">
                    {saat}
                  </span>
                </p>
              </div>

              {/* yazma çubuğu */}
              <div className="flex items-end gap-2 bg-[#1f2c34] px-2.5 py-[9px]">
                <label htmlFor="mesaj" className="sr-only absolute h-px w-px overflow-hidden">
                  Mesajınız
                </label>
                <textarea
                  id="mesaj"
                  ref={taRef}
                  rows={1}
                  maxLength={600}
                  value={mesaj}
                  onChange={(e) => setMesaj(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (mesaj.trim()) gonderRef.current?.click();
                    }
                  }}
                  placeholder="Mesaj yazın"
                  className="max-h-[110px] min-w-0 flex-1 resize-none rounded-[18px] border-0 bg-[#2a3942] px-3.5 py-2.5 text-[14.5px] leading-[1.4] text-[#e9edef] outline-none placeholder:text-[#8696a0]"
                />
                <a
                  ref={gonderRef}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!temiz}
                  aria-label="WhatsApp'tan gönder"
                  className={`grid h-[42px] w-[42px] flex-none place-items-center rounded-full bg-[#25d366] text-[#0b141a] transition-transform hover:scale-105 ${
                    temiz ? "" : "pointer-events-none opacity-40"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="block h-[19px] w-[19px]"
                  >
                    <path d="M2.3 21.3 22 12 2.3 2.7 2.29 9.9 16 12 2.29 14.1Z" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="mono mt-2.5 px-0.5 text-faint">
              Gönder — WhatsApp açılır, mesajınız hazır gelir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
