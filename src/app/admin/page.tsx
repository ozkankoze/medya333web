import type { Metadata } from "next";
import { isLoggedIn } from "@/lib/auth";
import { sql, ensureSchema, hasDb } from "@/lib/db";
import LoginForm from "./LoginForm";
import ProjectForm from "./ProjectForm";
import {
  logoutAction,
  importSeedAction,
  updateLeadStatusAction,
  deleteLeadAction,
} from "./actions";
import type { Project } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: string;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  yeni: "border-gold-lite/50 text-gold-lite",
  arandi: "border-amber-400/50 text-amber-300",
  teklif: "border-accent/60 text-accent-soft",
  kazanildi: "border-emerald-400/50 text-emerald-300",
  kapandi: "border-line text-muted-2",
};

const statusLabels: Record<string, string> = {
  yeni: "Yeni",
  arandi: "Arandı",
  teklif: "Teklif verildi",
  kazanildi: "Kazanıldı",
  kapandi: "Kapandı",
};

export default async function AdminPage() {
  if (!(await isLoggedIn())) return <LoginForm />;

  if (!hasDb || !sql) {
    return (
      <div className="container-x py-20">
        <div className="card mx-auto max-w-lg p-8 text-center">
          <h1 className="font-display text-[20px] font-bold">
            Veritabanı bağlı değil
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
            Vercel proje ayarlarından <code className="text-accent-soft">DATABASE_URL</code>{" "}
            değişkenini Neon bağlantı adresiyle tanımlayın, sonra projeyi yeniden
            deploy edin.
          </p>
        </div>
      </div>
    );
  }

  await ensureSchema();
  const leads = (await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`) as Lead[];
  const projects = (await sql`SELECT * FROM projects ORDER BY sort_order ASC, id ASC`) as Project[];

  const newCount = leads.filter((l) => l.status === "yeni").length;

  return (
    <div className="min-h-dvh pb-24">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="container-x flex h-[68px] items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={68} height={30} className="h-[30px] w-auto" />
            <span className="font-display text-[15px] font-semibold">
              Yönetim Paneli
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-[13.5px] text-muted hover:text-fg">
              Siteyi gör
            </a>
            <form action={logoutAction}>
              <button className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] text-muted hover:text-fg">
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-x pt-10">
        {/* özet */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { v: leads.length, l: "Toplam talep" },
            { v: newCount, l: "Yeni / okunmamış" },
            { v: projects.length, l: "Yayındaki referans" },
          ].map((s) => (
            <div key={s.l} className="card p-5">
              <div className="font-display text-[26px] font-bold">{s.v}</div>
              <div className="mt-1 text-[13px] text-muted">{s.l}</div>
            </div>
          ))}
        </div>

        {/* talepler */}
        <section className="mt-12">
          <h2 className="font-display text-[20px] font-bold">Teklif talepleri</h2>
          {leads.length === 0 ? (
            <p className="mt-4 text-[14.5px] text-muted">
              Henüz talep yok. Siteden form gönderildiğinde burada görünecek.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {leads.map((l) => (
                <details key={l.id} className="card overflow-hidden">
                  <summary className="flex cursor-pointer flex-wrap items-center gap-3 px-5 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium ${
                        statusStyles[l.status] ?? statusStyles.yeni
                      }`}
                    >
                      {statusLabels[l.status] ?? l.status}
                    </span>
                    <span className="font-display text-[15px] font-semibold">
                      {l.name}
                    </span>
                    <span className="text-[13.5px] text-muted">{l.phone}</span>
                    <span className="ml-auto text-[12.5px] text-muted-2">
                      {new Date(l.created_at).toLocaleString("tr-TR")}
                    </span>
                  </summary>

                  <div className="border-t border-line px-5 py-5">
                    <dl className="grid gap-x-6 gap-y-2.5 text-[14px] sm:grid-cols-2">
                      {[
                        ["Firma", l.company],
                        ["E-posta", l.email],
                        ["Hizmet", l.service],
                        ["Bütçe", l.budget],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <dt className="w-24 shrink-0 text-muted-2">{k}</dt>
                          <dd className="min-w-0 break-words">{v || "-"}</dd>
                        </div>
                      ))}
                    </dl>
                    {l.message && (
                      <p className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-ink-2/60 p-4 text-[14px] leading-relaxed text-fg/90">
                        {l.message}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, "").replace(/^0/, "90")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[#25D366]/50 px-3.5 py-2 text-[13.5px] text-[#25D366] hover:bg-[#25D366]/10"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${l.phone}`}
                        className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] text-muted hover:text-fg"
                      >
                        Ara
                      </a>
                      <form action={updateLeadStatusAction} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={l.id} />
                        <select
                          name="status"
                          defaultValue={l.status}
                          className="rounded-lg border border-line bg-ink-2/70 px-3 py-2 text-[13.5px] outline-none focus:border-accent/70"
                        >
                          {Object.entries(statusLabels).map(([k, v]) => (
                            <option key={k} value={k} className="bg-ink-2">
                              {v}
                            </option>
                          ))}
                        </select>
                        <button className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] hover:border-accent/60">
                          Güncelle
                        </button>
                      </form>
                      <form action={deleteLeadAction} className="ml-auto">
                        <input type="hidden" name="id" value={l.id} />
                        <button className="rounded-lg border border-red-500/40 px-3.5 py-2 text-[13.5px] text-red-300 hover:bg-red-500/10">
                          Sil
                        </button>
                      </form>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>

        {/* referanslar */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-[20px] font-bold">Referanslar</h2>
            {projects.length === 0 && (
              <form action={importSeedAction}>
                <button className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] hover:border-accent/60">
                  Mevcut 4 referansı içeri aktar
                </button>
              </form>
            )}
          </div>

          {projects.length === 0 && (
            <p className="mt-4 text-[14.5px] text-muted">
              Veritabanında referans yok — site şu an koddaki başlangıç
              referanslarını gösteriyor. Yukarıdaki butonla onları panele
              aktarabilir, sonra buradan düzenleyebilirsiniz.
            </p>
          )}

          <div className="mt-5 space-y-3">
            {projects.map((p) => (
              <details key={p.id} className="card overflow-hidden">
                <summary className="flex cursor-pointer flex-wrap items-center gap-3 px-5 py-4">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="font-display text-[15px] font-semibold">
                    {p.title}
                  </span>
                  <span className="text-[13px] text-muted-2">{p.category}</span>
                  {!p.published && (
                    <span className="rounded-full border border-line px-2 py-0.5 text-[11.5px] text-muted-2">
                      Gizli
                    </span>
                  )}
                  <span className="ml-auto text-[12.5px] text-muted-2">
                    sıra: {p.sort_order}
                  </span>
                </summary>
                <div className="border-t border-line px-5 py-5">
                  <ProjectForm p={p} />
                </div>
              </details>
            ))}
          </div>

          <div className="card mt-5 p-5">
            <h3 className="font-display mb-4 text-[16px] font-semibold">
              Yeni referans ekle
            </h3>
            <ProjectForm />
          </div>
        </section>
      </div>
    </div>
  );
}
