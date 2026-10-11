/**
 * GOOGLE ADS DÖNÜŞÜM TAKİBİ
 *
 * İki Google Ads etiketi birlikte çalışır:
 *   - AW-17874832936 — eski hesap (eski kampanyaların dönüşümü kaybolmasın diye duruyor)
 *   - AW-18452628149 — yeni hesap
 *
 * Eski hesabı tamamen kapatmak istersen ETIKETLER listesinden ve aşağıdaki
 * dönüşüm dizilerinden o satırları silmen yeterli.
 */

const ESKI = "AW-17874832936";
const YENI = "AW-18452628149";

/** Sayfada yapılandırılacak etiketler. */
export const gtagIds = [ESKI, YENI] as const;

/** Geriye dönük uyumluluk için ilk etiket. */
export const gtagId = ESKI;

export const conversions = {
  /** WhatsApp bağlantısına tıklandığında */
  whatsapp: [`${ESKI}/tAwvCJG48uYcEKicsctC`, `${YENI}/3xFbCIGVkJkdELWF895E`],
  /** Telefon numarasına tıklandığında */
  telefon: [`${YENI}/Kh1bCISVkJkdELWF895E`],
  /** İletişim formu — sitede form yok, kayıt olarak duruyor */
  form: [`${ESKI}/DVpsCI648uYcEKicsctC`],
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
export function trackConversion(
  sendTo: string | readonly string[],
  url?: string
) {
  if (typeof window === "undefined") return;

  const etiketler = (Array.isArray(sendTo) ? sendTo : [sendTo]) as string[];
  const anahtar = etiketler.join("|");

  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    if (url) window.location.href = url;
  };

  if (typeof window.gtag !== "function" || gonderildi.has(anahtar)) {
    go();
    return;
  }
  gonderildi.add(anahtar);

  window.gtag("event", "conversion", {
    send_to: etiketler,
    value: 1.0,
    currency: "TRY",
    transport_type: "beacon",
    ...(url ? { event_callback: go } : {}),
  });

  // gtag callback gelmezse yine de yönlendir
  if (url) window.setTimeout(go, 900);
}
