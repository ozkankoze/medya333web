import type { Metadata } from "next";
import Link from "next/link";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { kirintiSemasi } from "@/lib/seo";

/**
 * /lululu — UÇAN LÜLÜLÜ GİZLİLİK POLİTİKASI
 *
 * App Store, giriş gerektirmeyen oyunlarda bile çalışan bir gizlilik
 * politikası adresi istiyor. Bu sayfa o adres.
 *
 * ⚠️ BURADAKİ HER CÜMLE OYUNUN GERÇEK DAVRANIŞI OLMALI. Gizlilik
 * politikası pazarlama metni değil, taahhüttür. Oyuna yeni bir veri
 * alanı ya da yeni bir reklam ağı eklendiğinde önce bu sayfa güncellenir.
 *
 * ⚠️ APP STORE CONNECT CEVAPLARI BU SAYFAYA GİRMEZ. Apple'ın gizlilik
 * etiketlerinde hangi kutunun işaretleneceği iç nottur; burası
 * kullanıcının okuduğu metin.
 */

/**
 * Supabase projesinin bölgesi (Project Settings › General).
 * Veri Japonya'da duruyor; bu bir yurt dışına aktarımdır ve KVKK'nın
 * aktarım kuralları geçerlidir. Bölge değişirse burası da değişir.
 */
const SUPABASE_BOLGE = "ap-northeast-1 (Tokyo, Japonya)";

const GUNCELLEME = "11 Kasım 2026";
const GUNCELLEME_EN = "November 11, 2026";

export const metadata: Metadata = {
  title: "Uçan Lülülü Gizlilik Politikası",
  description:
    "Uçan Lülülü yalnızca seçtiğiniz takma adı ve en yüksek skorunuzu saklar. Uygulama içi satın alma yoktur; oyun Google AdMob reklamları gösterir.",
  alternates: { canonical: "/lululu" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${site.url}/lululu`,
    siteName: site.name,
    title: `Uçan Lülülü Gizlilik Politikası | ${site.name}`,
    description:
      "Uçan Lülülü yalnızca takma ad ve en yüksek skor saklar. Verileriniz satılmaz; reklamlar Google AdMob tarafından gösterilir.",
  },
};

const TOPLANAN = [
  {
    veri: "Takma ad (3–16 karakter, sizin seçtiğiniz)",
    yer: "Sunucu ve cihazınız",
    neden: "Liderlik tablosunda görünmesi için",
  },
  {
    veri: "En yüksek skor",
    yer: "Sunucu ve cihazınız",
    neden: "Sıralamayı oluşturmak için",
  },
  {
    veri: "Rastgele cihaz anahtarı",
    yer: "Sunucu ve cihazınız",
    neden:
      "Skorun size ait olduğunu bilmek için; adınızla ya da cihazınızla bağlantısı yoktur",
  },
  {
    veri: "Kayıt ve güncelleme zamanı",
    yer: "Sunucu",
    neden:
      "Eşit skorlarda sırayı belirlemek, hızlı ve hileli gönderimleri engellemek için",
  },
  {
    veri: "Şikâyet kaydı (kimin, hangi adı bildirdiği)",
    yer: "Sunucu",
    neden: "Uygunsuz adları gizlemek için",
  },
  {
    veri: "Toplam altın, ses tercihi",
    yer: "Yalnızca cihazınız",
    neden: "Oyun ayarlarını hatırlamak için",
  },
];

const TOPLANMAYAN = [
  "Gerçek adınız, e-posta adresiniz, telefon numaranız",
  "Konumunuz, rehberiniz, fotoğraflarınız, mikrofon veya kamera erişimi",
  "Reklam kimliği, siz izin vermedikçe (bkz. Reklamlar)",
  "Satın alma veya ödeme bilgisi; oyunda uygulama içi satın alma yoktur",
];

export default function LululuPage() {
  const kirinti = kirintiSemasi([
    { ad: "Ana sayfa", yol: "/" },
    { ad: "Uçan Lülülü Gizlilik Politikası", yol: "/lululu" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirinti) }}
      />
      <Cursor />
      <main>
        <section className="border-b border-[var(--line)]">
          <div className="gutter">
            <header className="flex items-center justify-between gap-4 py-[15px]">
              <Link href="/" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mockup/logo-beyaz.webp"
                  alt={site.name}
                  width={300}
                  height={133}
                  className="block h-[26px] w-auto"
                />
              </Link>
              <Link href="/blog" className="pill">
                Blog
              </Link>
            </header>

            <div className="gir mx-auto max-w-[68ch] py-12 lg:py-16">
              <p className="mono text-faint">Gizlilik Politikası</p>
              <h1 className="duz mt-3 text-[clamp(2.1rem,5vw,3.4rem)]">Uçan Lülülü</h1>
              <p className="mono mt-3 text-faint">Son güncelleme: {GUNCELLEME}</p>

              <h2 className="duz mt-10 text-[clamp(1.4rem,3vw,2rem)]">Kısaca</h2>
              <p className="mt-5 text-[17px] leading-[1.7] text-chalk">
                Uçan Lülülü, liderlik tablosu için yalnızca seçtiğiniz{" "}
                <strong>takma adı</strong> ve <strong>en yüksek skorunuzu</strong> saklar.
                Adınızı, e-postanızı, telefon numaranızı, konumunuzu ya da rehberinizi
                istemeyiz; verilerinizi kimseye satmayız. Oyunun ücretsiz kalması için
                Google AdMob reklamları gösteriyoruz; reklamlarla ilgili veriler aşağıdaki{" "}
                <strong>Reklamlar</strong> bölümünde anlatılıyor.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Bu politika <strong>Medya 333</strong> (“biz”) tarafından yayımlanan Uçan
                Lülülü mobil oyunu için geçerlidir.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">
                Topladığımız veriler
              </h2>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px] leading-[1.6]">
                  <thead>
                    <tr className="border-b border-[var(--line)]">
                      <th className="py-3 pr-4 font-medium text-chalk">Veri</th>
                      <th className="py-3 pr-4 font-medium text-chalk">Nerede saklanır</th>
                      <th className="py-3 font-medium text-chalk">Neden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOPLANAN.map((s) => (
                      <tr key={s.veri} className="border-b border-[var(--line)] align-top">
                        <td className="py-3 pr-4 text-chalk">{s.veri}</td>
                        <td className="py-3 pr-4 text-mute">{s.yer}</td>
                        <td className="py-3 text-mute">{s.neden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                Cihaz anahtarı, oyun ilk açıldığında rastgele üretilir. Telefonunuzun
                reklam kimliği, seri numarası veya Apple hesabınız gibi bilgilerden
                türetilmez.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Sunucumuz, her internet hizmetinde olduğu gibi, güvenlik amacıyla
                bağlantının IP adresi ve zamanı gibi teknik kayıtları kısa süreliğine
                tutabilir. Bu kayıtları sizi tanımak için kullanmayız.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">
                Verilerin kullanımı ve saklanması
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                Verilerinizi yalnızca liderlik tablosunu göstermek, uygunsuz adları
                gizlemek ve hileli skorları engellemek için kullanırız. Takma adınız ve
                skorunuz oyunu oynayan herkese açık olarak listede görünür; bu yüzden takma
                ad olarak gerçek adınızı kullanmamanızı öneririz.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Veriler, veritabanı hizmet sağlayıcımız Supabase Inc.’in sunucularında,{" "}
                <strong>{SUPABASE_BOLGE}</strong> bölgesinde saklanır. Supabase verileri
                yalnızca bizim adımıza işler, kendi amaçları için kullanmaz. Supabase’in
                gizlilik politikası:{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  supabase.com/privacy
                </a>
                .
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Verilerinizi oyun yayında kaldığı sürece saklarız. Oyun yayından
                kaldırılırsa liderlik tablosu verileri 90 gün içinde silinir. Oyunu
                telefonunuzdan silerseniz cihazınızdaki veriler de silinir; sunucudaki
                kaydınızın silinmesini isterseniz aşağıdaki iletişim adresinden bize
                yazabilirsiniz.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Toplamadıklarımız</h2>
              <ul className="mt-5 flex flex-col gap-2.5 text-[16px] leading-[1.65] text-mute">
                {TOPLANMAYAN.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">Çocuklar:</strong> Oyun her yaşa uygundur ve
                çocuklardan bilerek kişisel bilgi toplamaz. Çocuğunuzun gerçek adını takma
                ad olarak girdiğini düşünüyorsanız bize yazın, kaydı sileriz.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">Reklamlar</h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                Oyunda iki tür Google AdMob reklamı vardır: oyun bittiğinde isteğe bağlı
                “reklam izle, devam et” videosu ve birkaç oyunda bir gösterilen tam ekran
                reklam. Reklamları Google sağlar; reklam göstermek, ölçmek ve dolandırıcılığı
                önlemek için cihazınızın reklam kimliğini (IDFA), IP adresinden çıkarılan
                yaklaşık konumunuzu, cihaz ve uygulama bilgilerini ve reklamlarla
                etkileşiminizi toplayabilir.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                iPhone’da reklam kimliğiniz yalnızca “Takip etmesine izin ver” seçeneğini
                seçerseniz kullanılır; izin vermezseniz kişiselleştirilmemiş reklam
                görürsünüz. Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre’deki
                oyunculardan Google’ın izin formuyla ayrıca onay istenir. Kararınızı
                iPhone’da <strong>Ayarlar › Gizlilik ve Güvenlik › Takip</strong>{" "}
                bölümünden istediğiniz zaman değiştirebilirsiniz.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Google’ın bu verileri nasıl kullandığı:{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                . Takma adınız ve skorunuz reklam ortaklarıyla paylaşılmaz.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">
                Uygunsuz adlar ve bildirim
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                Küfür, hakaret ve nefret söylemi içeren takma adlar kayıt sırasında otomatik
                olarak reddedilir. Filtreyi aşan bir adı görürseniz, liderlik tablosunda o
                adın yanındaki bayrak simgesine dokunarak bildirebilirsiniz. Üç farklı
                oyuncu tarafından bildirilen adlar listeden otomatik olarak gizlenir;
                bildirimleri ayrıca 24 saat içinde inceleriz.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Bir bildirimde yalnızca bildiren oyuncunun rastgele cihaz anahtarı saklanır;
                kimin bildirdiği diğer oyunculara gösterilmez.
              </p>

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">
                Haklarınız ve iletişim
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
                verilerinize erişme, düzeltilmesini ve silinmesini isteme hakkınız vardır.
                Takma adınızı oyun içinden istediğiniz zaman değiştirebilirsiniz. Kaydınızın
                silinmesi için bize takma adınızla birlikte yazmanız yeterlidir; talebinizi
                en geç 30 gün içinde yanıtlarız.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                İletişim:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>{" "}
                ·{" "}
                <Link href="/" className="text-chalk underline-offset-4 hover:underline">
                  medya333.com
                </Link>
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                Bu politikayı değiştirirsek güncel hâlini bu sayfada, yeni tarihiyle
                yayımlarız.
              </p>

              <hr className="mt-14 border-[var(--line)]" />

              <h2 className="duz mt-12 text-[clamp(1.4rem,3vw,2rem)]">English version</h2>
              <p className="mono mt-3 text-faint">Last updated: {GUNCELLEME_EN}</p>
              <p className="mt-5 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">In short:</strong> Uçan Lülülü stores only
                the nickname you choose and your best score, to run the public leaderboard.
                We do not ask for your name, email, phone number, location or contacts.
                There are no in-app purchases and we never sell your data. The game shows
                Google AdMob ads to stay free; see Ads below. This policy is published by{" "}
                <strong className="text-chalk">Medya 333</strong>.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">What we collect:</strong> your nickname (3–16
                characters) and best score, stored on our server and your device; a random
                device key generated on first launch, used only to link your score to you
                and not derived from any device or Apple identifier; creation and update
                times, used for ranking ties and anti-cheat; and reports of inappropriate
                nicknames. Your total coins and sound setting stay on your device only. Our
                server may briefly keep technical logs such as IP address and time of
                connection for security.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">How we use and store it:</strong> only to
                show the leaderboard, hide inappropriate nicknames and block cheating. Your
                nickname and score are visible to all players, so please do not use your
                real name. Data is stored by our database provider Supabase Inc. in the{" "}
                {SUPABASE_BOLGE} region, processed only on our behalf (
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  supabase.com/privacy
                </a>
                ). We keep it while the game is available and delete leaderboard data within
                90 days if the game is removed.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">Ads:</strong> the game shows an optional
                rewarded video (“watch an ad to continue”) and an occasional full-screen ad,
                both served by Google AdMob. Google may collect your device’s advertising
                identifier (IDFA), approximate location derived from your IP address, device
                and app information and ad interactions to serve and measure ads and prevent
                fraud. On iPhone, your advertising identifier is used only if you choose
                “Allow” in the tracking prompt; otherwise you see non-personalised ads.
                Players in the EEA, UK and Switzerland are also asked for consent through
                Google’s consent form. You can change your choice any time in Settings ›
                Privacy &amp; Security › Tracking. How Google uses this data:{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                . Your nickname and score are never shared with ad partners.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">Inappropriate nicknames:</strong> offensive
                nicknames are rejected automatically. Tap the flag next to a nickname on the
                leaderboard to report it; nicknames reported by three different players are
                hidden automatically, and we review reports within 24 hours.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">Children:</strong> the game is suitable for
                all ages and does not knowingly collect personal information from children.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                <strong className="text-chalk">Your rights and contact:</strong> you can
                change your nickname in the game at any time. To have your record deleted,
                email us with your nickname at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-chalk underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                ; we respond within 30 days.
              </p>

              <div className="mt-12 flex flex-wrap gap-3">
                <Link href="/" className="pill">
                  Ana sayfa
                </Link>
                <Link href="/hakkimizda" className="pill">
                  Medya 333 hakkında
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
