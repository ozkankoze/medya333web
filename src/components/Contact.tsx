import { site, waLink } from "@/lib/site";
import ContactForm from "./ContactForm";
import {
  IconInstagram,
  IconFacebook,
  IconLinkedin,
  IconYoutube,
} from "./Icons";

const socialIcons = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  linkedin: IconLinkedin,
  youtube: IconYoutube,
} as const;

export default function Contact() {
  const socials = Object.entries(site.social).filter(([, url]) => url) as [
    keyof typeof socialIcons,
    string
  ][];

  const channels = [
    { label: "WhatsApp", value: "En hızlı yol", href: waLink, ext: true },
    { label: "Telefon", value: site.phoneDisplay, href: `tel:${site.phoneRaw}` },
    { label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    ...(site.address
      ? [{ label: "Konum", value: site.address, href: "" }]
      : []),
  ];

  return (
    <section id="iletisim" className="rule-b">
      <div className="wrap">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
          {/* sol */}
          <div className="lg:col-span-5">
            <span className="mono">006 — İletişim</span>

            <h2 className="display-tight mt-7 text-[clamp(2.3rem,6.2vw,4.4rem)]">
              Bir kahve içip
              <br />
              sohbet edelim.
            </h2>

            <p className="mt-7 max-w-[42ch] text-[16px] leading-[1.65] text-muted">
              İlk görüşme ve fiyat teklifi ücretsiz. Ne istediğinizi tam
              bilmiyorsanız da sorun değil — birlikte netleştiririz.
            </p>

            <dl className="mt-10 border-t border-ink">
              {channels.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.ext
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="mono mono-ink">{c.label}</span>
                    <span className="link-slide text-right text-[15px] font-medium tracking-tight">
                      {c.value}
                    </span>
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="mono mono-ink">{c.label}</span>
                    <span className="text-right text-[15px] font-medium tracking-tight">
                      {c.value}
                    </span>
                  </div>
                )
              )}
            </dl>

            {socials.length > 0 && (
              <div className="mt-8 flex items-center gap-3">
                <span className="mono">Sosyal</span>
                {socials.map(([key, url]) => {
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="grid h-10 w-10 place-items-center border border-line-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <Icon className="h-[17px] w-[17px]" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* sağ: form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
