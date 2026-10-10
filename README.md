# Medya 333 Web — Portfolyo & Teklif Sitesi

Web tasarım hizmetini tanıtan, referansları listeleyen ve teklif talebi toplayan tek sayfalık site.
Yönetim paneli ile referansları ve gelen talepleri kod yazmadan yönetirsin.

**Teknoloji:** Next.js 16 (App Router) · Tailwind CSS 4 · Neon (Postgres) · Vercel

---

## 1. GitHub'a yükle

Bilgisayarında proje klasörünün içindeyken:

```bash
git init
git add .
git commit -m "ilk surum"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADIN/medya333web.git
git push -u origin main
```

> GitHub'da önce boş bir repo aç (README ekleme, boş bırak).

---

## 2. Neon veritabanını aç

1. [neon.tech](https://neon.tech) → ücretsiz hesap aç
2. **Create project** → bölge olarak **Europe (Frankfurt)** seç (Türkiye'ye en yakın)
3. Açılan ekranda **Connection string** kısmından **Pooled connection** adresini kopyala
   (şuna benzer: `postgresql://...-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`)

Tablolar otomatik oluşur, elle SQL çalıştırmana gerek yok.

---

## 3. Vercel'e deploy et

1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub reposunu seç
2. **Environment Variables** bölümüne şunları ekle:

| Değişken | Değer |
|---|---|
| `DATABASE_URL` | Neon'dan kopyaladığın pooled bağlantı adresi |
| `ADMIN_PASSWORD` | Panel şifren (güçlü olsun) |
| `ADMIN_SECRET` | Rastgele uzun bir metin |

3. **Deploy** → 1–2 dakikada yayında.

### Kendi domainini bağla

Vercel projesi → **Settings → Domains → Add** → domainini yaz.
Vercel sana DNS kayıtlarını verir; domain sağlayıcında (GoDaddy, Natro, İsimtescil vb.) o kayıtları ekle.
Genelde:

- `A` kaydı → `76.76.21.21`
- `CNAME` kaydı (`www`) → `cname.vercel-dns.com`

DNS yayılması 5 dakika ile birkaç saat arası sürer. SSL sertifikası otomatik gelir.

---

## 4. İlk ayarlar

### İletişim bilgileri

`src/lib/site.ts` dosyasında hazır:

- Telefon / WhatsApp: `0506 040 95 11`
- E-posta: `info@medya333web.com`
- Instagram: `instagram.com/medya333_tr`

Değiştirmek istersen sadece bu dosyayı düzenle. Ofis adresi eklemek istersen
`address` alanını doldur — dolduğunda iletişim bölümünde otomatik görünür.
Yeni sosyal medya hesabı eklemek için `social` içindeki boş alanı doldur.

Değişiklikten sonra:

```bash
git add . && git commit -m "guncelleme" && git push
```

Vercel otomatik yeniden yayınlar.

### Yönetim paneline gir

`https://senindomainin.com/admin` → `ADMIN_PASSWORD` ile giriş yap.

Panelde yapabileceklerin:

- **Teklif talepleri** — siteden gelen formlar, WhatsApp/arama kısayolları, durum takibi (Yeni → Arandı → Teklif verildi → Kazanıldı)
- **Referanslar** — yeni site ekle, düzenle, sırala, gizle/göster

İlk girişte **"Mevcut 4 referansı içeri aktar"** butonuna bas; koddaki 4 referans veritabanına aktarılır ve panelden düzenlenebilir hale gelir.

### Referans ekran görüntüsü ekleme

Sitedeki görseller **kırpılmamış, tam sayfa** ekran görüntüleridir. Vitrin
çerçevesinin içinde yavaşça aşağı kayarak sitenin tamamını gösterirler.

1. Sitenin **tam sayfa** (full page) ekran görüntüsünü al — genişlik 1200 px
2. `public/referanslar/` klasörüne hem `.jpg` hem `.webp` olarak koy, push et
3. Panelde **Görsel adresi** alanına `/referanslar/dosyaadi.jpg` yaz
4. `src/lib/shots.ts` içindeki `RATIO` listesine dosya adını ve
   `yükseklik / genişlik` oranını ekle (ör. 4333 / 1200 = `3.611`)

> 4. adım atlanırsa görsel yine görünür, sadece kayma hızı varsayılan değere düşer.

Şu an yayında olan 8 referans:

| Dosya | Site | Oran |
|---|---|---|
| `locksansafety` | locksansafety.com | 3.611 |
| `otocentermarket` | otocentermarket.com | 2.928 |
| `derengigi` | derengigi.com | 3.611 |
| `nextstop` | nextstopbackpackers.com | 1.813 |
| `erenmobilya` | erenmobilyatasarimatasehir.com | 3.611 |
| `kkdmarkt` | kkdmarkt.com | 2.700 |
| `sofilxloto` | sofilxloto.com | 3.611 |
| `ekedurunleri` | ekedurunleri.com | 3.611 |

Görsel yoksa otomatik olarak marka adıyla bir önizleme kartı gösterilir.

### Sonuç rakamları (kartlardaki ölçümler)

Her referans kartının altında ölçülmüş rakamlar var. Panelden
**Sonuç rakamları** alanına `·` ile ayırarak yazılır:

```
Google SEO 100/100 · Mobil hız 90/100 · İndekslenebilir sayfa 280
```

Son kelime büyük punto ile sağa yazılır — **rakamı sona koy**.
`280 sayfa indekslenebilir` değil, `İndekslenebilir sayfa 280`.

Şu anki rakamlar Ekim 2026'da ölçüldü:

- **Hız / SEO:** Google Lighthouse, mobil. Kendin kontrol etmek için
  [pagespeed.web.dev](https://pagespeed.web.dev)
- **İndekslenebilir sayfa:** sitenin kendi `sitemap.xml` dosyasındaki URL sayısı

> Müşteriden gerçek veri alabilirsen (&laquo;ayda 25 WhatsApp teklifi&raquo;,
> &laquo;sipariş %40 arttı&raquo;) en ikna edici şey odur — panelden ekle.
> Doğrulayamadığın hiçbir rakamı yazma; B2B alıcısı kontrol eder.

---

## Sektör sayfaları (outreach için)

Soğuk mesaj atarken ana sayfa yerine sektör sayfasının adresini gönder:

| Adres | Kime |
|---|---|
| `/is-guvenligi-web-tasarim` | LOTO / EKED / KKD firmaları (4 referansın var) |

Yeni sektör eklemek için `src/lib/sektor.ts` içine bir kayıt ekle — sayfa,
SEO etiketleri ve `sitemap.xml` kaydı otomatik oluşur.
`referansBasliklari` alanındaki isimler referansların başlığıyla birebir
aynı olmalı.

## Tasarım sistemi

**Sert siyah–beyaz, editoryal.** Renk vurgusu yok; boşluk, tipografi ve
hairline çizgiler konuşur. Tokenlar `src/app/globals.css` → `@theme`.

| Token | Değer | Kullanım |
|---|---|---|
| `paper` | `#ffffff` | ana zemin |
| `wash` | `#f4f4f2` | dönüşümlü bölüm zemini (Yöntem, S.S.S.) |
| `ink` | `#000000` | metin, koyu butonlar, footer |
| `muted` | `#5b5b5b` | açıklama metinleri |
| `muted-2` | `#8e8e8e` | mono etiketler, ikincil |
| `line` / `line-2` | `#e4e4e4` / `#c9c9c9` | ince ayraçlar, çerçeveler |

Yazı tipleri:

| Rol | Font | Sınıf |
|---|---|---|
| Başlık | **Bricolage Grotesque** 600 | `.display`, `.display-tight`, `.display-sm` |
| Gövde | **Inter** | varsayılan |
| Etiket / numara | **JetBrains Mono** 500 | `.mono` |

Önemli notlar:

- Satır aralığı **1'in altına indirilmez**. Türkçe'de `ğ ü ş ç ı` ve `y p`
  alt uzantıları bir üst satıra girer. (`.display` = `line-height: 1`)
- Vurgu için renk değil **ters blok** kullanılır:
  `<span className="bg-ink text-paper px-[0.12em]">kelime</span>`
- Bölümler dolgu ile değil **çizgi** ile ayrılır: `.rule-t` / `.rule-b`

### Vitrin (hero) nasıl çalışır

`src/components/Stage.tsx` — tarayıcı çerçevesi içinde tam sayfa görseli
`creep` animasyonuyla kaydırır, 9 saniyede bir sıradaki referansa geçer.
Fare üzerine gelince durur. Pencere yüksekliği `.stage { --win }` ile
breakpoint başına ayarlanır.

Kartlarda (`ProjectCard.tsx`) aynı görsel fare üzerine gelince kayar;
dokunmatik cihazlarda hover olmadığı için otomatik akar.



## 5. Google Ads dönüşüm takibi (kurulu)

Site, Google Ads hesabındaki (Karagöz Ticaret) dönüşüm etiketiyle bağlı.
Kod hazır, ekstra bir şey yapmana gerek yok — sadece push et, yayına alınca çalışmaya başlar.

| Ne | Değer |
|---|---|
| Google etiketi | `AW-17874832936` |
| Teklif formu gönderimi | `AW-17874832936/DVpsCI648uYcEKicsctC` |
| WhatsApp / telefon tıklaması | `AW-17874832936/tAwvCJG48uYcEKicsctC` |

Neler otomatik sayılıyor:

- **Teklif formu** — form gerçekten kaydedildiğinde (hata alırsa sayılmaz)
- **WhatsApp** — sayfadaki tüm WhatsApp butonları (menü, hero, iletişim, sağ alt köşedeki yuvarlak buton)
- **Telefon** — telefon numarasına tıklanması

Yeni bir WhatsApp veya telefon linki eklersen otomatik olarak sayılır, ekstra kod yazmana gerek yok.

Ayarlar `src/lib/gtag.ts` dosyasında; yakalama mantığı `src/components/Analytics.tsx` içinde.

> **Yayına aldıktan sonra:** Google Ads → Hedefler → Dönüşümler ekranında durum
> ilk birkaç saat "Doğrulanmadı" görünebilir. İlk form/WhatsApp tıklamasından
> sonra "Etkin"e döner. Veriler Ads ekranına 3–24 saat içinde yansır.

---

## 6. Google Search Console (indeksleme)

Site zaten `sitemap.xml` ve `robots.txt` üretiyor:

- https://www.medya333web.com/sitemap.xml
- https://www.medya333web.com/robots.txt

`/admin` ve `/api/` Google'a kapalı, ana sayfa açık.

### Doğrulama — iki yoldan biri

**A) Alan adı (önerilen, kod değişikliği yok)**

1. [search.google.com/search-console](https://search.google.com/search-console) → **Mülk ekle** → sol taraftaki **Alan adı** kutusu
2. `medya333web.com` yaz → **Devam**
3. Google bir **TXT kaydı** verir (`google-site-verification=...`)
4. Domain sağlayıcında DNS ayarlarına git, o TXT kaydını ekle → **Doğrula**

Bu yöntem www'lu, www'suz, http, https — hepsini tek seferde kapsar.

**B) HTML etiketi (DNS'e girmek istemezsen)**

1. Search Console → **URL öneki** kutusuna `https://www.medya333web.com` yaz
2. **HTML etiketi** yöntemini seç, verilen `content="..."` içindeki **değeri** kopyala
   (tüm `<meta>` etiketini değil, sadece tırnak içindeki kodu)
3. Vercel → proje → **Settings → Environment Variables** →
   `GOOGLE_SITE_VERIFICATION` adıyla o değeri ekle
4. **Redeploy** et, sonra Search Console'da **Doğrula**'ya bas

### Sitemap'i gönder

Doğrulama bittikten sonra: Search Console → sol menü **Site Haritaları** →
kutuya `sitemap.xml` yaz → **Gönder**.

Ardından üstteki arama kutusuna `https://www.medya333web.com/` yapıştırıp
**İndekslenmesini iste**'ye basarsan sıraya girer.

> İlk indeksleme genelde 2–7 gün sürer. `site:medya333web.com` diye aratarak
> Google'a girip girmediğini kontrol edebilirsin.

---

## 7. Opsiyonel: form gelince e-posta bildirimi

Talepler her hâlükârda panelde birikir. Anlık e-posta da istersen:

1. [resend.com](https://resend.com) → ücretsiz hesap → domainini doğrula
2. Vercel'e şu değişkenleri ekle: `RESEND_API_KEY`, `RESEND_FROM`, `NOTIFY_EMAIL`

---

## Lokal geliştirme

```bash
npm install
cp .env.example .env.local   # değerleri doldur
npm run dev                  # http://localhost:3000
```

---

## Proje yapısı

```
src/
  app/
    page.tsx           → ana sayfa
    admin/             → yönetim paneli
    api/contact/       → form kayıt servisi
    globals.css        → renkler, tipografi, animasyonlar
  components/
    Hero.tsx           → Canlı Vitrin bölümü
    Stage.tsx          → vitrin motoru (kayan tam sayfa görsel)
    Manifesto.tsx      → "Telefon çalsın diye yapılır" bölümü
    Portfolio.tsx      → referans kartları
    Analytics.tsx      → Google etiketi + otomatik dönüşüm yakalama
  lib/
    site.ts            → İLETİŞİM BİLGİLERİ ve site ayarları
    content.ts         → hizmetler, paketler, süreç, S.S.S. metinleri
    projects.ts        → başlangıç referansları
    shots.ts           → ekran görüntüsü oranları ve WebP eşleşmesi
    gtag.ts            → Google Ads dönüşüm etiketleri
    db.ts              → Neon bağlantısı ve tablolar
```

Metinleri değiştirmek için genelde sadece `src/lib/site.ts` ve `src/lib/content.ts` yeterli.

---

## Logo dosyaları

| Dosya | Kullanıldığı yer |
|---|---|
| `public/logo-mark.png` | Üst menü ve yönetim paneli (sadece 333) |
| `public/logo.png` | Alt bilgi (tam logo) |
| `src/app/icon.png` | Tarayıcı sekmesi ikonu (favicon) |
| `src/app/apple-icon.png` | iPhone/iPad ana ekran ikonu |

Logoyu değiştirmek istersen aynı isimlerle üzerine yaz, başka bir şey yapmana gerek yok.
