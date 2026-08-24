"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql, ensureSchema } from "@/lib/db";
import {
  checkPassword,
  makeToken,
  isLoggedIn,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
} from "@/lib/auth";
import { seedProjects } from "@/lib/projects";

const str = (fd: FormData, k: string, max = 500) =>
  String(fd.get(k) ?? "").trim().slice(0, max);

async function guard() {
  if (!(await isLoggedIn())) throw new Error("Yetkisiz işlem.");
  if (!sql) throw new Error("DATABASE_URL tanımlı değil.");
  await ensureSchema();
}

export async function loginAction(_prev: string | null, fd: FormData) {
  const pw = String(fd.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) {
    return "ADMIN_PASSWORD ortam değişkeni tanımlı değil.";
  }
  if (!checkPassword(pw)) return "Şifre hatalı.";
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/admin");
}

export async function saveProjectAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  const data = {
    title: str(fd, "title", 120),
    url: str(fd, "url", 300),
    category: str(fd, "category", 60) || "Kurumsal Web Sitesi",
    description: str(fd, "description", 1000),
    image_url: str(fd, "image_url", 500),
    tags: str(fd, "tags", 300),
    accent: str(fd, "accent", 20) || "#6E56F8",
    sort_order: Number(fd.get("sort_order") || 0),
    published: fd.get("published") === "on",
  };
  if (!data.title || !data.url) throw new Error("Başlık ve adres zorunludur.");

  if (id > 0) {
    await sql!`
      UPDATE projects SET
        title=${data.title}, url=${data.url}, category=${data.category},
        description=${data.description}, image_url=${data.image_url},
        tags=${data.tags}, accent=${data.accent},
        sort_order=${data.sort_order}, published=${data.published}
      WHERE id=${id}
    `;
  } else {
    await sql!`
      INSERT INTO projects (title,url,category,description,image_url,tags,accent,sort_order,published)
      VALUES (${data.title},${data.url},${data.category},${data.description},
              ${data.image_url},${data.tags},${data.accent},${data.sort_order},${data.published})
    `;
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProjectAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (id > 0) await sql!`DELETE FROM projects WHERE id=${id}`;
  revalidatePath("/");
  revalidatePath("/admin");
}

/** Koddaki başlangıç referanslarını veritabanına aktarır. */
export async function importSeedAction() {
  await guard();
  const rows = await sql!`SELECT COUNT(*)::int AS c FROM projects`;
  if ((rows[0]?.c ?? 0) > 0) return;
  for (const p of seedProjects) {
    await sql!`
      INSERT INTO projects (title,url,category,description,image_url,tags,accent,sort_order,published)
      VALUES (${p.title},${p.url},${p.category},${p.description},
              ${p.image_url},${p.tags},${p.accent},${p.sort_order},${p.published})
    `;
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  const status = str(fd, "status", 20) || "yeni";
  if (id > 0) await sql!`UPDATE leads SET status=${status} WHERE id=${id}`;
  revalidatePath("/admin");
}

export async function deleteLeadAction(fd: FormData) {
  await guard();
  const id = Number(fd.get("id") || 0);
  if (id > 0) await sql!`DELETE FROM leads WHERE id=${id}`;
  revalidatePath("/admin");
}
