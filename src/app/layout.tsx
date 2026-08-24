import type { Metadata } from "next";
import { site } from "@/lib/site";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web Sitesi Tasarımı & E-Ticaret`,
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
    title: `${site.name} — Web Sitesi Tasarımı & E-Ticaret`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web Sitesi Tasarımı & E-Ticaret`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    ...(site.address
      ? { address: { "@type": "PostalAddress", addressLocality: site.address } }
      : {}),
    sameAs: Object.values(site.social).filter(Boolean),
    areaServed: "TR",
    serviceType: [
      "Web Sitesi Tasarımı",
      "E-Ticaret Sitesi Kurulumu",
      "SEO",
      "Landing Page Tasarımı",
    ],
  };

  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#08070a" />
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
