import { site, waLink } from "@/lib/site";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import {
  IconInstagram,
  IconFacebook,
  IconLinkedin,
  IconYoutube,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
  IconArrowUpRight,
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
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* sol: başlık + kanallar */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">İletişim</span>
              <h2 className="display-sm mt-5 text-[clamp(2rem,4.6vw,3.2rem)]">
                Bir kahve içimi{" "}
                <span className="serif text-gold">sohbet</span> edelim.
              </h2>
              <p className="mt-6 max-w-[42ch] text-[16.5px] leading-relaxed text-muted">
                İlk görüşme ve fiyat teklifi ücretsiz. Ne istediğinizi tam
                bilmiyorsanız da sorun değil — birlikte netleştiririz.
              </p>

              <div className="mt-10 space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-all hover:border-line-2 hover:bg-paper-2"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366]/10 text-[#1EA952]">
                    <IconWhatsApp className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] text-muted-2">
                      En hızlı yol
                    </span>
                    <span className="block truncate text-[16px] font-medium">
                      WhatsApp'tan yazın
                    </span>
                  </span>
                  <IconArrowUpRight className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href={`tel:${site.phoneRaw}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-all hover:border-line-2 hover:bg-paper-2"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] text-muted-2">
                      Telefon
                    </span>
                    <span className="block truncate text-[16px] font-medium">
                      {site.phoneDisplay}
                    </span>
                  </span>
                  <IconArrowUpRight className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-all hover:border-line-2 hover:bg-paper-2"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-paper-3 text-ink">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] text-muted-2">
                      E-posta
                    </span>
                    <span className="block truncate text-[16px] font-medium">
                      {site.email}
                    </span>
                  </span>
                  <IconArrowUpRight className="h-4 w-4 shrink-0 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                {site.address && (
                  <div className="flex items-center gap-4 rounded-2xl border border-line p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-paper-3 text-muted">
                      <IconPin className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] text-muted-2">
                        Konum
                      </span>
                      <span className="block truncate text-[16px] font-medium">
                        {site.address}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {socials.length > 0 && (
                <div className="mt-8 flex items-center gap-3">
                  <span className="text-[13px] text-muted-2">Sosyal medya</span>
                  <span className="hairline w-8" />
                  {socials.map(([key, url]) => {
                    const Icon = socialIcons[key];
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={key}
                        className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:border-ink hover:text-ink"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    );
                  })}
                </div>
              )}
            </Reveal>
          </div>

          {/* sağ: form */}
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
