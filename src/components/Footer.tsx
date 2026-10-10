import { site } from "@/lib/site";

export default function Footer() {
  const yil = new Date().getFullYear();

  return (
    <footer className="relative z-[2] bg-void">
      <div className="gutter">
        <div className="mono flex flex-wrap justify-between gap-2.5 border-t border-[var(--line)] pb-8 pt-[18px] text-faint">
          <span>
            © {yil} {site.name} — Tüm hakları saklıdır
          </span>
          {site.parentBrand.url ? (
            <a
              href={site.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-chalk"
            >
              Bir {site.parentBrand.name} markasıdır ↗
            </a>
          ) : (
            <span>Bir {site.parentBrand.name} markasıdır</span>
          )}
        </div>
      </div>
    </footer>
  );
}
