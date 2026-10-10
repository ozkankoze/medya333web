import { site, waLink } from "@/lib/site";

const links = [
  { href: "/#isler", label: "İşler" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#yontem", label: "Yöntem" },
  { href: "/#paketler", label: "Paketler" },
  { href: "/#sss", label: "S.S.S." },
  { href: "/#iletisim", label: "İletişim" },
];

const sayfalar = [
  { href: "/is-guvenligi-web-tasarim", label: "İş güvenliği firmaları" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      {/* kapanış çağrısı */}
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/15 py-16 lg:flex-row lg:items-end lg:py-20">
          <h2 className="display-tight max-w-[14ch] text-[clamp(2.2rem,6.4vw,4.6rem)]">
            Sıradaki proje sizinki olsun.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="#iletisim"
              className="inline-flex h-[52px] items-center border border-paper bg-paper px-7 text-[15px] font-medium text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              Teklif alın
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center border border-white/30 px-7 text-[15px] font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* alt bilgi */}
        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-[34ch] text-[15px] leading-[1.65] text-white/60">
              {site.tagline}. İstanbul merkezli, Türkiye geneline hizmet veren
              web tasarım stüdyosu.
            </p>
            <a
              href={site.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono link-slide mt-6 inline-block text-white/45"
            >
              Bir {site.parentBrand.name} markasıdır ↗
            </a>
          </div>

          <div className="md:col-span-2">
            <span className="mono text-white/40">Menü</span>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-slide text-[15px] text-white/75 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <span className="mono text-white/40">Sayfalar</span>
            <ul className="mt-4 space-y-2">
              {sayfalar.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-slide text-[15px] text-white/75 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="mono text-white/40">İletişim</span>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="link-slide text-white/75 hover:text-paper"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-slide text-white/75 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
              {site.social.instagram && (
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-slide text-white/75 hover:text-paper"
                  >
                    Instagram ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* dev kelime markası — sayfanın kapanışı */}
      <div className="overflow-hidden px-[2vw] pb-[2vw]">
        <div
          aria-hidden
          className="display-tight select-none whitespace-nowrap text-center text-[18.2vw] leading-[0.78] text-white/90"
        >
          MEDYA&nbsp;333
        </div>
      </div>

      <div className="wrap">
        <div className="border-t border-white/15 py-6">
          <p className="mono text-white/40">
            © {year} {site.name} — Tüm hakları saklıdır
          </p>
        </div>
      </div>
    </footer>
  );
}
