import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={site.name} width={92} height={64} className="h-16 w-auto" />
            <div className="text-left">
              <div className="font-display text-[14.5px] font-semibold">
                {site.name}
              </div>
              <div className="text-[12.5px] text-muted-2">{site.tagline}</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] text-muted">
            <a href="#hizmetler" className="hover:text-fg">Hizmetler</a>
            <a href="#referanslar" className="hover:text-fg">Referanslar</a>
            <a href="#paketler" className="hover:text-fg">Paketler</a>
            <a href="#iletisim" className="hover:text-fg">İletişim</a>
            <a
              href={site.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              {site.parentBrand.name}
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-center text-[12.5px] text-muted-2">
          © {year} {site.name}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
