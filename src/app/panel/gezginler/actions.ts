"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import {
  ensureGezginSchema,
  gecurSifreUret,
  sifreOzetle,
} from "@/lib/gezgin";

const str = (fd: FormData, k: string, max = 500) =>
  String(fd.get(k) ?? "").trim().slice(0, max);

async function guard() {
  if (!(await isLoggedIn())) throw new Error("Yetkisiz işlem.");
  if (!sql) throw new Error("DATABASE_URL tanımlı değil.");
  await ensureGezginSchema();
}

/** Yeni gezgin hesabı açar ve geçici şifreyi bir kerelik geri döndürür. */
export async function gezginEkleAction(_prev: string | null, fd: FormData) {
  await guard();
  const ad = str(fd, "ad", 90);
  const eposta = str(fd, "eposta", 160).toLowerCase();
  if (!ad || !eposta) return "Ad ve e-posta zorunlu.";

  const varMi = await sql!`SELECT id FROM gezginler WHERE eposta=${eposta}`;
  if (varMi.length) return "Bu e-posta ile bir hesap zaten var.";

  const sifre = gecurSifreUret();
  await sql!`
    INSERT INTO gezginler (ad, eposta, telefon, instagram, sifre_hash, pay_yuzde, not_metni)
    VALUES (${ad}, ${eposta}, ${str(fd, "telefon", 40)}, ${str(fd, "instagram", 60)},
            ${sifreOzetle(sifre)}, ${Number(fd.get("pay") || 50)}, ${str(fd, "not", 500)})
  `;
  revalidatePath("/panel/gezginler");
  return `SIFRE:${sifre}`;
}

export async function sifreSifirlaAction(_prev: string | null, fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (!id) return "Kayıt bulunamadı.";
  const sifre = gecurSifreUret();
  await sql!`UPDATE gezginler SET sifre_hash=${sifreOzetle(sifre)} WHERE id=${id}`;
  revalidatePath("/panel/gezginler");
  return `SIFRE:${sifre}`;
}

export async function gezginDurumAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  const aktif = String(fd.get("aktif")) === "1";
  if (id) await sql!`UPDATE gezginler SET aktif=${aktif} WHERE id=${id}`;
  revalidatePath("/panel/gezginler");
}

export async function gezginSilAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (id) await sql!`DELETE FROM gezginler WHERE id=${id}`;
  revalidatePath("/panel/gezginler");
}

/** Satışın durumunu, tutarını ve notunu günceller; payı yüzdeye göre hesaplar. */
export async function satisGuncelleAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (!id) return;

  const durum = str(fd, "durum", 20) || "yeni";
  const tutar = Number(fd.get("tutar") || 0);
  const yoneticiNot = str(fd, "yonetici_not", 500);

  const satir = await sql!`
    SELECT s.gezgin_id, g.pay_yuzde
    FROM gezgin_satislari s JOIN gezginler g ON g.id = s.gezgin_id
    WHERE s.id=${id}
  `;
  const yuzde = Number((satir[0] as { pay_yuzde: number } | undefined)?.pay_yuzde ?? 50);
  const pay = Math.round(((tutar * yuzde) / 100) * 100) / 100;

  await sql!`
    UPDATE gezgin_satislari
    SET durum=${durum}, tutar=${tutar}, pay=${pay}, yonetici_not=${yoneticiNot},
        odendi_mi = CASE WHEN ${durum} = 'odendi' AND odendi_mi IS NULL
                         THEN NOW() ELSE odendi_mi END
    WHERE id=${id}
  `;
  revalidatePath("/panel/gezginler");
  revalidatePath("/gezgin");
}

export async function satisSilAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (id) await sql!`DELETE FROM gezgin_satislari WHERE id=${id}`;
  revalidatePath("/panel/gezginler");
  revalidatePath("/gezgin");
}
