import { site, waLink } from "@/lib/site";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  IconInstagram,
  IconFacebook,
  IconLinkedin,
  IconYoutube,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
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

  return (
    <section id="iletisim" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[440px] w-[820px] max-w-[125vw] -translate-x-1/2 rounded-full bg-accent/12 blur-[150px]" />

      <div className="container-x">
        <Reveal>
          <SectionHeading
            center
            eyebrow="İletişim"
            title="Projenizi konuşalım"
            desc="Formu doldurun ya da doğrudan arayın. İlk görüşme ve fiyat teklifi ücretsizdir."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          {/* sol: kanallar */}
          <Reveal>
            <div className="flex h-full flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/12 text-[#25D366]">
                  <IconWhatsApp className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] text-muted-2">
                    En hızlı yol
                  </span>
                  <span className="block truncate font-display text-[16px] font-semibold">
                    WhatsApp'tan yazın
                  </span>
                </span>
              </a>

              <a
                href={`tel:${site.phoneRaw}`}
                className="card card-hover flex items-center gap-4 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent-soft">
                  <IconPhone className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] text-muted-2">Telefon</span>
                  <span className="block truncate font-display text-[16px] font-semibold">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="card card-hover flex items-center gap-4 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-lite/12 text-gold-lite">
                  <IconMail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] text-muted-2">E-posta</span>
                  <span className="block truncate font-display text-[16px] font-semibold">
                    {site.email}
                  </span>
                </span>
              </a>

              {site.address && (
                <div className="card flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-muted">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] text-muted-2">Konum</span>
                    <span className="block truncate font-display text-[16px] font-semibold">
                      {site.address}
                    </span>
                  </span>
                </div>
              )}

              {socials.length > 0 && (
                <div className="card p-5">
                  <span className="block text-[12.5px] text-muted-2">
                    Sosyal medya
                  </span>
                  <div className="mt-3 flex gap-2.5">
                    {socials.map(([key, url]) => {
                      const Icon = socialIcons[key];
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={key}
                          className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* sağ: form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
