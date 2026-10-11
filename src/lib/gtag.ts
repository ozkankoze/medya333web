/**
 * GOOGLE ADS DÖNÜŞÜM TAKİBİ
 *
 * Tek etiket: AW-18452628149.
 * Etiketin kendisi layout.tsx içinde <head>'e basılır; burada sadece
 * dönüşüm etiketleri ve gönderme işi var.
 */

export const gtagId = "AW-18452628149";

export const conversions = {
  /** WhatsApp bağlantısına tıklandığında */
  whatsapp: `${gtagId}/3xFbCIGVkJkdELWF895E`,
  /** Telefon numarasına tıklandığında */
  telefon: `${gtagId}/Kh1bCISVkJkdELWF895E`,
} as const;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** Aynı sayfa görüntülemesinde aynı dönüşüm iki kez sayılmasın. */
const gonderildi = new Set<string>();

/**
 * Google Ads'e dönüşüm gönderir.
 * `url` verilirse dönüşüm gönderildikten sonra o adrese yönlendirir
 * (tıklama dönüşümlerinin kaybolmaması için).
 */
export function trackConversion(sendTo: string, url?: string) {
  if (typeof window === "undefined") return;

  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    if (url) window.location.href = url;
  };

  if (typeof window.gtag !== "function" || gonderildi.has(sendTo)) {
    go();
    return;
  }
  gonderildi.add(sendTo);

  window.gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "TRY",
    transport_type: "beacon",
    ...(url ? { event_callback: go } : {}),
  });

  // gtag callback gelmezse yine de yönlendir
  if (url) window.setTimeout(go, 900);
}
