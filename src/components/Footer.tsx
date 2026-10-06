import { site, waLink } from "@/lib/site";
import { IconWhatsApp, IconArrowUpRight } from "./Icons";

const links = [
  { href: "#referanslar", label: "İşler" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#surec", label: "Süreç" },
  { href: "#paketler", label: "Paketler" },
  { href: "#sss", label: "S.S.S." },
  { href: "#iletisim", label: "İletişim" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2">
      {/* kapanış çağrısı */}
      <div className="container-x border-b border-line py-20 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,4.2rem)]">
            Sıradaki proje <span className="serif text-gold">sizinki</span> olsun.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="#iletisim" className="btn btn-dark">
              Teklif alın
              <IconArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <IconWhatsApp className="h-[18px] w-[18px]" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* alt bilgi */}
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={site.name}
              width={160}
              height={111}
              className="h-[56px] w-auto"
            />
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-muted">
              {site.tagline}. İstanbul merkezli, Türkiye geneline hizmet veren
              web tasarım stüdyosu.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">Menü</span>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14.5px] text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="eyebrow">İletişim</span>
            <ul className="mt-4 space-y-2.5 text-[14.5px]">
              <li>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-ink"
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
                    className="text-muted transition-colors hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-7 text-[13.5px] text-muted-2 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Tüm hakları saklıdır.
          </p>
          <a
            href={site.parentBrand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Bir {site.parentBrand.name} markasıdır
          </a>
        </div>
      </div>
    </footer>
  );
}
