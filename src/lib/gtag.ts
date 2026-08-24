/**
 * GOOGLE ADS DÖNÜŞÜM TAKİBİ
 * Etiket ve dönüşüm etiketleri burada. Değiştirmen gerekmez.
 */

export const gtagId = "AW-17874832936";

export const conversions = {
  /** İletişim formu başarıyla gönderildiğinde */
  form: "AW-17874832936/DVpsCI648uYcEKicsctC",
  /** WhatsApp butonuna tıklandığında */
  whatsapp: "AW-17874832936/tAwvCJG48uYcEKicsctC",
} as const;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

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

  if (typeof window.gtag !== "function") {
    go();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "TRY",
    ...(url ? { event_callback: go } : {}),
  });

  // gtag callback gelmezse yine de yönlendir
  if (url) window.setTimeout(go, 900);
}
