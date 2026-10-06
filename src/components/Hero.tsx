import { getProjects } from "@/lib/projects";
import { site, waLink } from "@/lib/site";
import Stage from "./Stage";

export default async function Hero() {
  const projects = await getProjects();

  return (
    <section className="relative rule-b">
      <div className="wrap">
        <div className="grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-16">
          {/* ---- sol: iddia ---- */}
          <div className="min-w-0 lg:col-span-5 lg:pr-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              <span className="mono mono-ink">Canlı vitrin</span>
            </div>

            <h1 className="display mt-7 text-[clamp(2.6rem,7.4vw,5.1rem)]">
              Sekiz marka.
              <br />
              Sekiz canlı site.
              <br />
              <span className="text-muted-2">Hepsi şu an</span>
              <br />
              internette.
            </h1>

            <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-muted lg:text-[17px]">
              Portfolyo diye kırpılmış görseller koymuyoruz. Gördüğün şey
              müşterimizin sitesinin{" "}
              <span className="text-ink underline-ink">tamamı</span> — ilk
              pikselinden son pikseline kadar, kendi kendine akıyor. Beğenmediğin
              yeri göster, konuşalım.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn">
                İşimi konuşalım
              </a>
              <a href="#isler" className="btn btn-ghost">
                Hepsini gör
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
              <span className="mono">İstanbul</span>
              <span className="mono">7+ yıl</span>
              <span className="mono">Ortalama teslim 9 gün</span>
              <a
                href={`tel:${site.phoneRaw}`}
                className="mono mono-ink link-slide"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          {/* ---- sağ: vitrin ---- */}
          <div className="min-w-0 lg:col-span-7">
            <Stage projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
}
