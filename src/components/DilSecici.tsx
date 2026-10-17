import Link from "next/link";
import Bayrak from "./Bayrak";
import { DILLER, type DilKodu } from "@/lib/diller";

/**
 * Bayraklı dil seçici. Üstteki başlık çubuğunda durur.
 * Aktif dil altın çerçeveyle belli olur.
 */
export default function DilSecici({ aktif }: { aktif: DilKodu }) {
  return (
    <nav
      aria-label="Dil / Language"
      className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.07] p-[3px] backdrop-blur-[14px]"
    >
      {DILLER.map((d) => {
        const secili = d.kod === aktif;
        return (
          <Link
            key={d.kod}
            href={d.yol}
            hrefLang={d.kod}
            title={d.ad}
            aria-label={d.ad}
            aria-current={secili ? "true" : undefined}
            className={[
              "grid h-[26px] w-[32px] place-items-center rounded-full transition",
              secili
                ? "bg-white/15 ring-1 ring-gold/70"
                : "opacity-55 hover:opacity-100",
            ].join(" ")}
          >
            <Bayrak kod={d.kod} />
          </Link>
        );
      })}
    </nav>
  );
}
