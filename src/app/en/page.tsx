import type { Metadata } from "next";
import YabanciSayfa from "@/components/YabanciSayfa";
import { SOZLUK } from "@/lib/diller";

const s = SOZLUK.en;

export const revalidate = 60;

export const metadata: Metadata = {
  title: s.meta.baslik,
  description: s.meta.aciklama,
  alternates: {
    canonical: "/en",
    languages: { tr: "/", en: "/en", bs: "/bs" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/en",
    title: s.meta.baslik,
    description: s.meta.aciklama,
  },
};

export default function Sayfa() {
  return <YabanciSayfa kod="en" s={s} />;
}
