import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const s = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

async function notifyByEmail(lead: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || site.email;
  const from = process.env.RESEND_FROM; // örn: "Site Formu <bildirim@alanadiniz.com>"
  if (!key || !from || !to) return;

  const html = `
    <h2>Yeni teklif talebi</h2>
    <ul>
      <li><b>Ad Soyad:</b> ${lead.name}</li>
      <li><b>Firma:</b> ${lead.company || "-"}</li>
      <li><b>Telefon:</b> ${lead.phone}</li>
      <li><b>E-posta:</b> ${lead.email || "-"}</li>
      <li><b>Hizmet:</b> ${lead.service || "-"}</li>
      <li><b>Bütçe:</b> ${lead.budget || "-"}</li>
    </ul>
    <p><b>Mesaj:</b><br>${(lead.message || "-").replace(/\n/g, "<br>")}</p>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Yeni teklif talebi — ${lead.name}`,
        html,
      }),
    });
  } catch (e) {
    console.error("E-posta bildirimi gönderilemedi:", e);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (s(body.website)) {
      return NextResponse.json({ ok: true }); // bot
    }

    const lead = {
      name: s(body.name, 80),
      email: s(body.email, 120),
      phone: s(body.phone, 30),
      company: s(body.company, 80),
      service: s(body.service, 60),
      budget: s(body.budget, 40),
      message: s(body.message, 2000),
    };

    if (!lead.name || !lead.phone) {
      return NextResponse.json(
        { error: "Ad ve telefon zorunludur." },
        { status: 400 }
      );
    }

    if (!sql) {
      return NextResponse.json(
        {
          error:
            "Form altyapısı henüz kurulmadı. Lütfen WhatsApp veya telefon ile ulaşın.",
        },
        { status: 503 }
      );
    }

    await ensureSchema();
    await sql`
      INSERT INTO leads (name, email, phone, company, service, budget, message)
      VALUES (${lead.name}, ${lead.email}, ${lead.phone}, ${lead.company},
              ${lead.service}, ${lead.budget}, ${lead.message})
    `;

    await notifyByEmail(lead);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact POST error:", e);
    return NextResponse.json(
      { error: "Gönderilemedi. Lütfen WhatsApp'tan ulaşın." },
      { status: 500 }
    );
  }
}
