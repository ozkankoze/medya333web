import { Project } from "@/lib/projects";
import { saveProjectAction, deleteProjectAction } from "./actions";

const field =
  "w-full rounded-lg border border-line bg-ink-2/70 px-3 py-2.5 text-[14px] outline-none focus:border-accent/70";
const label = "mb-1.5 block text-[12px] text-muted";

export default function ProjectForm({ p }: { p?: Project }) {
  const isNew = !p;
  return (
    <form action={saveProjectAction} className="grid gap-3.5 sm:grid-cols-2">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div>
        <label className={label}>Başlık *</label>
        <input name="title" required defaultValue={p?.title} className={field} placeholder="Örn. KKD Markt" />
      </div>
      <div>
        <label className={label}>Site adresi *</label>
        <input name="url" required defaultValue={p?.url} className={field} placeholder="https://..." />
      </div>
      <div>
        <label className={label}>Kategori</label>
        <input name="category" defaultValue={p?.category ?? "Kurumsal Web Sitesi"} className={field} placeholder="E-Ticaret" />
      </div>
      <div>
        <label className={label}>Görsel adresi (ekran görüntüsü URL&apos;si)</label>
        <input name="image_url" defaultValue={p?.image_url} className={field} placeholder="/referanslar/site.jpg" />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Açıklama</label>
        <textarea name="description" rows={3} defaultValue={p?.description} className={`${field} resize-y`} />
      </div>
      <div>
        <label className={label}>Etiketler (virgülle ayırın)</label>
        <input name="tags" defaultValue={p?.tags} className={field} placeholder="E-Ticaret, SEO, Mobil" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={label}>Renk</label>
          <input name="accent" type="color" defaultValue={p?.accent ?? "#6E56F8"} className="h-[42px] w-full rounded-lg border border-line bg-ink-2" />
        </div>
        <div>
          <label className={label}>Sıra</label>
          <input name="sort_order" type="number" defaultValue={p?.sort_order ?? 0} className={field} />
        </div>
        <div>
          <label className={label}>Yayında</label>
          <label className="flex h-[42px] items-center gap-2 rounded-lg border border-line bg-ink-2/70 px-3">
            <input name="published" type="checkbox" defaultChecked={p ? p.published : true} className="h-4 w-4 accent-[#c9922f]" />
            <span className="text-[13px] text-muted">Göster</span>
          </label>
        </div>
      </div>

      <div className="flex gap-2.5 sm:col-span-2">
        <button className="rounded-lg bg-gradient-to-r from-accent to-accent-soft px-5 py-2.5 text-[14px] font-semibold text-[#1a1206]">
          {isNew ? "Referans ekle" : "Kaydet"}
        </button>
        {p && (
          <button
            formAction={deleteProjectAction}
            formNoValidate
            className="rounded-lg border border-red-500/40 px-4 py-2.5 text-[14px] text-red-300 hover:bg-red-500/10"
          >
            Sil
          </button>
        )}
      </div>
    </form>
  );
}
