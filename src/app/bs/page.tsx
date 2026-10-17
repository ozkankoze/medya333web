import type { Metadata } from "next";
import YabanciSayfa from "@/components/YabanciSayfa";
import { SOZLUK } from "@/lib/diller";

const s = SOZLUK.bs;

export const revalidate = 60;

export const metadata: Metadata = {
  title: s.meta.baslik,
  description: s.meta.aciklama,
  alternates: {
    canonical: "/bs",
    languages: { tr: "/", en: "/en", bs: "/bs" },
  },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: "/bs",
    title: s.meta.baslik,
    description: s.meta.aciklama,
  },
};

export default function Sayfa() {
  return <YabanciSayfa kod="bs" s={s} />;
}
