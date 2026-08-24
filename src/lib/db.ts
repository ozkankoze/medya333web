import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres bağlantısı.
 * DATABASE_URL tanımlı değilse (örn. lokal geliştirme, ilk build) sistem
 * çökmez; veritabanı gerektiren yerler otomatik olarak yedek veriye düşer.
 */
export const hasDb = Boolean(process.env.DATABASE_URL);

export const sql = hasDb ? neon(process.env.DATABASE_URL!) : null;

let initialized = false;

/** Tabloları ilk kullanımda oluşturur (migration'a gerek yok). */
export async function ensureSchema() {
  if (!sql || initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id            SERIAL PRIMARY KEY,
      title         TEXT NOT NULL,
      url           TEXT NOT NULL,
      category      TEXT NOT NULL DEFAULT 'Kurumsal Web Sitesi',
      description   TEXT NOT NULL DEFAULT '',
      image_url     TEXT NOT NULL DEFAULT '',
      tags          TEXT NOT NULL DEFAULT '',
      accent        TEXT NOT NULL DEFAULT '#6E56F8',
      sort_order    INT  NOT NULL DEFAULT 0,
      published     BOOLEAN NOT NULL DEFAULT TRUE,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL DEFAULT '',
      phone       TEXT NOT NULL DEFAULT '',
      company     TEXT NOT NULL DEFAULT '',
      service     TEXT NOT NULL DEFAULT '',
      budget      TEXT NOT NULL DEFAULT '',
      message     TEXT NOT NULL DEFAULT '',
      status      TEXT NOT NULL DEFAULT 'yeni',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  initialized = true;
}
