"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import {
  COOKIE,
  MAX_AGE,
  ensureGezginSchema,
  jetonUret,
  oturumdakiGezgin,
  sifreDogrula,
  sifreOzetle,
} from "@/lib/gezgin";

const str = (fd: FormData, k: string, max = 500) =>
  String(fd.get(k) ?? "").trim().slice(0, max);

export async function girisAction(_prev: string | null, fd: FormData) {
  if (!sql) return "Veritabanı bağlı değil.";
  await ensureGezginSchema();
  const eposta = str(fd, "eposta", 160).toLowerCase();
  const sifre = String(fd.get("sifre") ?? "");
  if (!eposta || !sifre) return "E-posta ve şifre gerekli.";

  const satir = await sql`
    SELECT id, sifre_hash, aktif FROM gezginler WHERE eposta=${eposta}
  `;
  const g = satir[0] as { id: number; sifre_hash: string; aktif: boolean } | undefined;
  if (!g || !sifreDogrula(sifre, g.sifre_hash)) {
    return "E-posta ya da şifre hatalı.";
  }
  if (!g.aktif) return "Hesabın şu an kapalı. Özkan ile görüş.";

  const store = await cookies();
  store.set(COOKIE, jetonUret(g.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  redirect("/gezgin");
}

export async function cikisAction() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/gezgin");
}

export async function satisBildirAction(_prev: string | null, fd: FormData) {
  const gezgin = await oturumdakiGezgin();
  if (!gezgin || !sql) return "Oturum bulunamadı, yeniden giriş yap.";

  const firma = str(fd, "firma", 120);
  if (!firma) return "Firma adı zorunlu.";

  await sql`
    INSERT INTO gezgin_satislari
      (gezgin_id, firma, sehir, kisi, iletisim, tur, not_metni)
    VALUES (
      ${gezgin.id}, ${firma}, ${str(fd, "sehir", 90)}, ${str(fd, "kisi", 90)},
      ${str(fd, "iletisim", 160)}, ${str(fd, "tur", 60)}, ${str(fd, "not", 1500)}
    )
  `;
  revalidatePath("/gezgin");
  revalidatePath("/panel/gezginler");
  return "ok";
}

export async function sifreDegistirAction(_prev: string | null, fd: FormData) {
  const gezgin = await oturumdakiGezgin();
  if (!gezgin || !sql) return "Oturum bulunamadı.";

  const eski = String(fd.get("eski") ?? "");
  const yeni = String(fd.get("yeni") ?? "");
  if (yeni.length < 8) return "Yeni şifre en az 8 karakter olmalı.";

  const satir = await sql`SELECT sifre_hash FROM gezginler WHERE id=${gezgin.id}`;
  const kayit = (satir[0] as { sifre_hash: string } | undefined)?.sifre_hash ?? "";
  if (!sifreDogrula(eski, kayit)) return "Mevcut şifre hatalı.";

  await sql`UPDATE gezginler SET sifre_hash=${sifreOzetle(yeni)} WHERE id=${gezgin.id}`;
  return "ok";
}
