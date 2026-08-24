import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "m333_admin";
const MAX_AGE = 60 * 60 * 12; // 12 saat

function secret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "degistirilmemis-gizli-anahtar"
  );
}

function sign(exp: number) {
  return createHmac("sha256", secret()).update(String(exp)).digest("hex");
}

export function makeToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token?: string) {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !mac || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(exp);
  if (expected.length !== mac.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(mac));
  } catch {
    return false;
  }
}

export function checkPassword(input: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export const COOKIE_NAME = COOKIE;
export const COOKIE_MAX_AGE = MAX_AGE;
