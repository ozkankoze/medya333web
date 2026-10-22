import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";

/**
 * YAZI TİPLERİ
 *
 * Fontları Google'ın sunucusundan <link> ile çekmiyoruz. next/font, dosyaları
 * derleme anında indirip kendi alan adımızdan servis eder. Sebepleri:
 *
 *  1. Reklam ve gizlilik engelleyicileri fonts.googleapis.com isteğini
 *     kesebiliyor. O zaman sayfa Georgia / Segoe UI gibi çok daha geniş
 *     yedek fontlara düşüyor ve dev başlık taşıyor.
 *  2. Üçüncü taraf istek kalkınca ilk boyama hızlanıyor.
 *  3. next/font, yedek fonta otomatik ölçü düzeltmesi (size-adjust) koyar,
 *     font yüklenene kadar yazı kayması olmaz.
 *
 * Değişkenler globals.css içindeki @theme bloğunda kullanılıyor.
 */

export const serifYazi = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--yt-display",
});

export const sansYazi = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--yt-sans",
});

export const monoYazi = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--yt-mono",
});

/** <html> etiketine verilecek sınıf listesi. */
export const yaziSiniflari = `${serifYazi.variable} ${sansYazi.variable} ${monoYazi.variable}`;
