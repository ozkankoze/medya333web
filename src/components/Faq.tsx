import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section id="sss" className="rule-b bg-wash">
      <div className="wrap">
        <div className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <span className="mono">007 — Sorular</span>
            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.4vw,4.2rem)]">
              Herkesin
              <br />
              sorduğu
              <br />
              yedi şey.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line-2">
              {faqs.map((f, i) => (
                <details
                  key={f.q}
                  className="group border-b border-line-2 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-5">
                    <span className="mono mt-1.5 shrink-0 text-[10px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-sm flex-1 text-[clamp(1.1rem,2.2vw,1.4rem)]">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-2 block h-3 w-3 shrink-0"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 pl-10 text-[15px] leading-[1.7] text-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
