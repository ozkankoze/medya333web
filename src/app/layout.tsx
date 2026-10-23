import type { Metadata } from "next";
import { site } from "@/lib/site";
import { gtagId } from "@/lib/gtag";
import { yaziSiniflari } from "@/lib/yazitipi";
import { kurumSemasi } from "@/lib/seo";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — İnternetteki Yüzünüz`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web tasarım",
    "web sitesi yaptırma",
    "kurumsal web sitesi",
    "e-ticaret sitesi",
    "landing page",
    "SEO",
    "web tasarım ajansı",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — İnternetteki Yüzünüz`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — İnternetteki Yüzünüz`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en", bs: "/bs" },
  },
  // Google Search Console doğrulaması.
  // Search Console "HTML etiketi" yöntemindeki content="..." değerini
  // Vercel'de GOOGLE_SITE_VERIFICATION değişkenine yapıştırman yeterli.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ⚠️ Kurum şeması TEK YERDE (src/lib/seo.ts). Telefon ve adres `site`
  //    nesnesinden gelir; iki yerde ayrı yazılsaydı biri değiştiğinde
  //    diğeri sessizce eski kalırdı.
  const jsonLd = kurumSemasi();

  return (
    <html lang="tr" className={yaziSiniflari}>
      <head>
        <meta name="theme-color" content="#050508" />

        {/* Google etiketi (gtag.js) — Medya 333 Google Ads */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtagId}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
