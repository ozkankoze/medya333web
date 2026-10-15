import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { sql } from "./db";

/**
 * Gezgin Ortaklık Programı.
 *
 * Gezginler /gezgin adresinden kendi hesaplarıyla girer; sattıkları işleri
 * bildirir, durumunu ve hak ettikleri tutarı buradan takip eder.
 * Hesapları yönetici /panel/gezginler sayfasından açar.
 */

export const COOKIE = "m333_gezgin";
export const MAX_AGE = 60 * 60 * 24 * 14; // 14 gün

export type Gezgin = {
  id: number;
  ad: string;
  eposta: string;
  telefon: string;
  instagram: string;
  pay_yuzde: number;
  aktif: boolean;
  notu: string;
  created_at: string;
};

export type Satis = {
  id: number;
  gezgin_id: number;
  gezgin_ad?: string;
  firma: string;
  sehir: string;
  kisi: string;
  iletisim: string;
  tur: string;
  tutar: number;
  pay: number;
  durum: string;
  notu: string;
  yonetici_not: string;
  odendi_mi: string | null;
  created_at: string;
};

export const DURUMLAR = [
  "yeni",
  "onaylandi",
  "yapiliyor",
  "yayinda",
  "odendi",
  "iptal",
] as const;

export const DURUM_ADI: Record<string, string> = {
  yeni: "Yeni bildirim",
  onaylandi: "Onaylandı",
  yapiliyor: "Yapılıyor",
  yayinda: "Yayında",
  odendi: "Ödendi",
  iptal: "İptal",
};

export const DURUM_RENK: Record<string, string> = {
  yeni: "border-gold/40 text-gold",
  onaylandi: "border-sky-400/50 text-sky-300",
  yapiliyor: "border-amber-400/50 text-amber-300",
  yayinda: "border-emerald-400/50 text-emerald-300",
  odendi: "border-emerald-500/60 text-emerald-200",
  iptal: "border-line text-muted-2",
};

/* ---------------------------------------------------------------- şema */

let hazir = false;

export async function ensureGezginSchema() {
  if (!sql || hazir) return;
  await sql`
    CREATE TABLE IF NOT EXISTS gezginler (
      id          SERIAL PRIMARY KEY,
      ad          TEXT NOT NULL,
      eposta      TEXT NOT NULL UNIQUE,
      telefon     TEXT NOT NULL DEFAULT '',
      instagram   TEXT NOT NULL DEFAULT '',
      sifre_hash  TEXT NOT NULL,
      pay_yuzde   INT  NOT NULL DEFAULT 50,
      aktif       BOOLEAN NOT NULL DEFAULT TRUE,
      not_metni   TEXT NOT NULL DEFAULT '',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS gezgin_satislari (
      id            SERIAL PRIMARY KEY,
      gezgin_id     INT NOT NULL REFERENCES gezginler(id) ON DELETE CASCADE,
      firma         TEXT NOT NULL,
      sehir         TEXT NOT NULL DEFAULT '',
      kisi          TEXT NOT NULL DEFAULT '',
      iletisim      TEXT NOT NULL DEFAULT '',
      tur           TEXT NOT NULL DEFAULT '',
      tutar         NUMERIC(10,2) NOT NULL DEFAULT 0,
      pay           NUMERIC(10,2) NOT NULL DEFAULT 0,
      durum         TEXT NOT NULL DEFAULT 'yeni',
      not_metni     TEXT NOT NULL DEFAULT '',
      yonetici_not  TEXT NOT NULL DEFAULT '',
      odendi_mi     TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  hazir = true;
}

/* ------------------------------------------------------------- şifreler */

/** scrypt$tuz$ozet biçiminde saklanır; düz şifre hiçbir yerde durmaz. */
export function sifreOzetle(sifre: string) {
  const tuz = randomBytes(16).toString("hex");
  const ozet = scryptSync(sifre, tuz, 64).toString("hex");
  return `scrypt$${tuz}$${ozet}`;
}

export function sifreDogrula(sifre: string, kayit: string) {
  const [tip, tuz, ozet] = (kayit || "").split("$");
  if (tip !== "scrypt" || !tuz || !ozet) return false;
  const deneme = scryptSync(sifre, tuz, 64).toString("hex");
  const a = Buffer.from(deneme);
  const b = Buffer.from(ozet);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Yeni hesap açarken okunabilir, güçlü bir geçici şifre üretir. */
export function gecurSifreUret() {
  const harf = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const rakam = "23456789";
  const b = randomBytes(10);
  let s = "";
  for (let i = 0; i < 4; i++) s += harf[b[i] % harf.length];
  s += "-";
  for (let i = 4; i < 8; i++) s += rakam[b[i] % rakam.length];
  return s;
}

/* --------------------------------------------------------------- oturum */

function gizli() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "degistirilmemis-gizli-anahtar"
  );
}

function imzala(govde: string) {
  return createHmac("sha256", gizli()).update(govde).digest("hex");
}

export function jetonUret(gezginId: number) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const govde = `${gezginId}.${exp}`;
  return `${govde}.${imzala(govde)}`;
}

export function jetonCoz(jeton?: string): number | null {
  if (!jeton) return null;
  const parcalar = jeton.split(".");
  if (parcalar.length !== 3) return null;
  const [idStr, expStr, mac] = parcalar;
  const id = Number(idStr);
  const exp = Number(expStr);
  if (!id || !exp || exp < Math.floor(Date.now() / 1000)) return null;
  const beklenen = imzala(`${id}.${exp}`);
  if (beklenen.length !== mac.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(beklenen), Buffer.from(mac))) return null;
  } catch {
    return null;
  }
  return id;
}

/** Oturumdaki gezgini döndürür; yoksa ya da pasifse null. */
export async function oturumdakiGezgin(): Promise<Gezgin | null> {
  if (!sql) return null;
  const store = await cookies();
  const id = jetonCoz(store.get(COOKIE)?.value);
  if (!id) return null;
  await ensureGezginSchema();
  const satir = await sql`
    SELECT id, ad, eposta, telefon, instagram, pay_yuzde, aktif,
           not_metni AS notu, created_at
    FROM gezginler WHERE id=${id} AND aktif = TRUE
  `;
  return ((satir[0] as unknown) as Gezgin) ?? null;
}

/** "1.234,50" değil, panelde kullanacağımız sade dolar biçimi. */
export function dolar(n: number | string) {
  const s = Number(n || 0);
  return s.toLocaleString("tr-TR", { maximumFractionDigits: 0 }) + " $";
}
