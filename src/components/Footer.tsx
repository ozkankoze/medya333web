import { site } from "@/lib/site";

export default function Footer() {
  const yil = new Date().getFullYear();

  return (
    <footer className="relative z-[2] bg-void">
      <div className="gutter">
        <div className="mono flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 border-t border-[var(--line)] pb-8 pt-[18px] text-faint">
          <span>
            © {yil} {site.name} — Tüm hakları saklıdır
          </span>
          <a href="/blog" className="hover:text-chalk">
            Blog
          </a>
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
