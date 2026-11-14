/**
 * META PIXEL (Facebook / Instagram reklamları)
 *
 * Etiketin kendisi layout.tsx içinde <head>'e basılır; burada yalnızca
 * kimlik ve olay gönderme işi var — Google tarafındaki `gtag.ts` ile
 * aynı düzen.
 *
 * ⚠️ ASIL DÖNÜŞÜM WHATSAPP TIKLAMASI. Sayfa görüntüleme reklamın işe
 * yarayıp yaramadığını söylemiyor; teklif isteyen kişi WhatsApp'a
 * basan kişi. Bu yüzden `Contact` olayı Analytics.tsx'teki tıklama
 * dinleyicisinden gönderiliyor, Google dönüşümüyle aynı yerden.
 */

export const metaPixelId = "1887999052188021";

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Aynı sayfa görüntülemesinde aynı olay iki kez gitmesin. */
const gonderildi = new Set<string>();

/**
 * Meta'ya standart bir olay gönderir.
 *
 * Yönlendirmeyi geciktirmiyoruz: Meta'nın piksel isteği `sendBeacon`
 * benzeri çalışıp sayfa kapansa bile tamamlanıyor. Google tarafında
 * olduğu gibi `event_callback` beklemek, kullanıcıyı boşuna bekletirdi.
 */
export function metaOlay(ad: "Contact" | "Lead" | "PageView") {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (gonderildi.has(ad)) return;
  gonderildi.add(ad);
  window.fbq("track", ad);
}
