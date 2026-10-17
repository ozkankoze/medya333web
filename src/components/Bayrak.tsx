import type { DilKodu } from "@/lib/diller";

/**
 * Küçük bayrak ikonları — 24x16 kutuda, SVG olarak çizili.
 * Dışarıdan görsel çekmiyoruz ki sayfa hızına dokunmasın.
 */

/** Beş köşeli yıldız; r = dış yarıçap. */
function yildiz(cx: number, cy: number, r: number) {
  const ic = r * 0.382;
  const nokta: string[] = [];
  for (let i = 0; i < 10; i++) {
    const uzunluk = i % 2 === 0 ? r : ic;
    const aci = (Math.PI / 5) * i - Math.PI / 2;
    nokta.push(
      `${(cx + uzunluk * Math.cos(aci)).toFixed(2)},${(cy + uzunluk * Math.sin(aci)).toFixed(2)}`
    );
  }
  return nokta.join(" ");
}

export default function Bayrak({ kod }: { kod: DilKodu }) {
  const ortak = {
    viewBox: "0 0 24 16",
    width: 21,
    height: 14,
    "aria-hidden": true as const,
    className: "block rounded-[2px]",
  };

  if (kod === "tr") {
    return (
      <svg {...ortak}>
        <rect width="24" height="16" fill="#E30A17" />
        <circle cx="9.3" cy="8" r="4.1" fill="#fff" />
        <circle cx="10.7" cy="8" r="3.3" fill="#E30A17" />
        <polygon points={yildiz(14.8, 8, 2)} fill="#fff" />
      </svg>
    );
  }

  if (kod === "bs") {
    /* Mavi zemin, üst kenara ve sağ kenara yaslanan sarı dik üçgen,
       hipotenüs boyunca üstten alta inen dokuz yıldız. */
    return (
      <svg {...ortak}>
        <rect width="24" height="16" fill="#001489" />
        <polygon points="6.7,0 24,0 24,16" fill="#FFCD00" />
        <g fill="#fff">
          {[
            [3.44, -0.83],
            [5.61, 1.17],
            [7.78, 3.17],
            [9.95, 5.17],
            [12.12, 7.17],
            [14.29, 9.17],
            [16.46, 11.17],
            [18.63, 13.17],
            [20.8, 15.17],
          ].map(([x, y], i) => (
            <polygon key={i} points={yildiz(x, y, 1.15)} />
          ))}
        </g>
      </svg>
    );
  }

  /* İngilizce — Birleşik Krallık bayrağı */
  return (
    <svg {...ortak}>
      <clipPath id="bayrak-gb">
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath="url(#bayrak-gb)">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.9" />
        <path d="M12,0 V16 M0,8 H24" stroke="#fff" strokeWidth="5.3" />
        <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="3.2" />
      </g>
    </svg>
  );
}
