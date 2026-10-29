---
baslik: İhracat yapan firmalar için web sitesi — çok dilli kurulum ve yabancı alıcının aradığı şey
ozet: Yabancı alıcı sitenizi nasıl buluyor, neye bakıp teklif istiyor. Çeviri ile çok dilli site arasındaki fark, ürün adlarının İngilizcesi, sertifika bilgisi ve teklif akışı.
kisaCevap: İhracat için web sitesi, Türkçe sitenin çevrilmiş hâli değildir: her dilin kendi adresi olur ve arama motoruna hreflang ile hangi dilin hangi ülkeye ait olduğu bildirilir. Yabancı alıcı ürünü Türkçe adıyla değil, İngilizce terimi veya uluslararası standart numarasıyla arar; bu yüzden ürün adlarının ve sertifika bilgisinin doğru yazılması tasarımdan önemlidir. Satış da sepetten değil teklif talebinden geçer.
tarih: 2026-10-29
etiket: İhracat
renk: "#2AA7A0"
---

İhracat yapan bir üreticinin sitesi, iç pazara satan bir firmanınkiyle aynı işi yapmaz. İç pazarda müşteri sizi tanıyarak gelir; ihracatta çoğu zaman **sizi hiç duymamış biri**, bir arama sonucundan gelir ve beş dakika içinde ciddi bir firma olup olmadığınıza karar verir.

Bunu iş güvenliği, filtre ve yedek parça tarafında yaptığımız projelerde defalarca gördük. Bu yazıda yabancı alıcının gerçekte neye baktığını ve çok dilli bir sitenin nasıl kurulduğunu anlatıyoruz.

## 1. Çeviri ile çok dilli site aynı şey değil

Pek çok firma Türkçe sitesini tercüme ettirip aynı sayfaya koyuyor ya da tarayıcının otomatik çevirisine bırakıyor. Bu, arama motoru açısından çok dilli site sayılmıyor.

Çok dilli kurulumun üç şartı var:

**Her dilin kendi adresi olur.** `siteniz.com/en/urun-adi` gibi. Aynı sayfada dil değiştiren yapılarda Google yalnızca bir dili görür, diğerini hiç dizine almaz.

**hreflang etiketi konur.** Sayfanın başında "bu sayfanın İngilizcesi şurada, Türkçesi şurada" bilgisi verilir. Google böylece Almanya'daki aramaya İngilizce sayfayı, Türkiye'deki aramaya Türkçe sayfayı gösterir.

**Her dil ayrı dizine girer.** Doğru kurulduğunda tek siteniz değil, iki ayrı arama varlığınız olur.

Otomatik çeviri eklentileri bunların hiçbirini yapmaz. Üstelik teknik ürünlerde otomatik çeviri ciddi hatalar üretir: "kelebek vana" ifadesini kelimesi kelimesine çeviren bir sayfa, alıcı gözünde firmayı küçültür.

## 2. Yabancı alıcı ürünü Türkçe adıyla aramıyor

Bu, ihracat sitelerinde en çok kaybedilen yer.

Alıcı şunları yazıyor:

> `lockout tagout padlock`
> `EN 388 cut resistant gloves`
> `compressor air filter cross reference`
> `OSHA 1910.147 compliant`

Yani **İngilizce sektör terimi** ya da **uluslararası standart numarası.** Sitenizde bu ifadeler geçmiyorsa, ürün elinizde olsa bile o aramada yoksunuz.

Pratik karşılığı: ürün adlarının İngilizcesi tahminle değil, sektörde fiilen kullanılan terimle yazılmalı. Katalogunuzdaki İngilizce adlar, yabancı tedarikçilerinizin kullandığı adlar ve varsa fuar broşürleriniz bu konuda en güvenilir kaynak.

::proje:locksansafety::

## 3. Sertifika ve standart bilgisi, fiyattan önce gelir

İç pazarda alıcı fiyat sorar. İhracatta alıcı önce **uygunluk** sorar: ürün hangi standarda göre üretilmiş, belgesi var mı, test raporu alınabilir mi.

Ürün sayfasında şunlar açıkça yazmalı:

* Uyduğu standart ve numarası (EN, ISO, ANSI, OSHA…)
* Varsa belge/sertifika ve indirilebilir PDF'i
* Teknik föy — ölçü, malzeme, dayanım değerleri
* Menşe ve üretim yeri

Bu bilgiler sitede yoksa alıcı e-posta yazıp sormaz; genelde bilgisi tam olan rakibe geçer. Bir satın almacı için eksik bilgi, risk demektir.

## 4. Sepet değil, teklif

İhracatta satış sepetten geçmez. Alıcı 40 kalemlik bir liste hazırlar, adet ve teslim şekliyle birlikte fiyat ister.

Sitenin işi bu akışı kolaylaştırmaktır:

* **Teklif sepeti** — ürünleri biriktir, tek seferde gönder
* **Katalog ve föy indirme** — satın almacı dosyayı kendi sistemine koyacak
* **Net iletişim** — e-posta, WhatsApp, telefon; saat dilimi farkını düşünerek

Yaptığımız iş güvenliği projelerinin hepsinde ödeme ekranı yerine teklif akışı kurduk, çünkü o sektörde fiyat adede ve müşteriye göre değişiyor. Aynı mantık ihracatta daha da geçerli. Süreci [e-ticaret sitesi kurmak](/blog/e-ticaret-sitesi-kurmak) yazısında ayrıntılı anlattık.

## 5. Hangi dilleri eklemeli

Herkesin cevabı farklı ve tahminle verilmemeli. İki kaynağa bakın:

**Search Console / Analytics.** Siteniz hâlihazırda hangi ülkelerden ziyaret alıyor? Çoğu firma burada sürpriz yaşıyor.

**Mevcut müşteri ve talep listeniz.** Son iki yılda size hangi ülkelerden teklif isteği geldi?

Pratikte çoğu Türk üreticisi için **Türkçe + İngilizce** doğru başlangıç. İngilizce, Türkiye'den ihracatta ortak dil olarak çalışıyor. Üçüncü dil, verinin işaret ettiği pazar neyse o olmalı — Arapça, Rusça, Almanca. Üç dili birden "olsun" diye açmak, bakımı yapılmayan iki ölü bölüm demek.

## 6. Para birimi, ölçü ve küçük ayrıntılar

Yabancı alıcının gözünde ciddiyet, bu ayrıntılardan okunuyor:

* Fiyat gösteriyorsanız para birimi net olsun; göstermiyorsanız "request a quote" deyin, boş bırakmayın
* Ölçüler metrik ve gerekiyorsa inç karşılığıyla
* Telefon numarası **ülke koduyla**: +90…
* Adres, şirket unvanı ve vergi bilgisi görünür olsun — kurumsal alıcı bunu arar
* Tarih biçimi karışıklık yaratmasın

Küçük görünüyorlar ama ülke kodu olmayan bir telefon numarası, yurt dışından aranamayan bir numaradır.

## 7. Site hızı ihracatta daha da kritik

Ziyaretçi başka bir kıtadan geliyorsa, sunucunuz Türkiye'deyse ve sayfa ağırsa, açılış süresi iç pazardakinden belirgin biçimde uzun olur. Çözüm, sayfaların dağıtım ağı üzerinden sunulması ve görsellerin doğru formatta verilmesi. Ölçümlerle [site hızı yazısında](/blog/web-sitesi-hizi-3-saniye) anlattık.

## Sık sorulan sorular

**Türkçe sitemin yanına İngilizce eklersek Türkçe sıralamam düşer mi?**
Hayır. Doğru kurulumda diller ayrı adreslerde durur ve birbiriyle yarışmaz. Yanlış kurulumda (aynı adreste iki dil) sorun çıkar.

**Çeviriyi kim yapacak?**
Teknik ürünlerde çeviriyi sektörü bilen biri yapmalı. Biz yapıyı kurar, alanları hazırlarız; metinler sizden ya da anlaştığınız çevirmenden gelir. Ürün adlarını tahminle çevirmiyoruz.

**Otomatik çeviri eklentisi yeter mi?**
Yetmez. Arama motoru açısından çok dilli site sayılmaz ve teknik terimlerde hata üretir.

**Ayrı bir .com alan adı mı almalıyım?**
Çoğu firma için gerek yok. Tek alan adı altında `/en/` dizini hem yönetimi kolaylaştırır hem de alan adınızın birikmiş değerini bölmez.

**Ne kadar sürede yayına girer?**
Ürün verisi ve çeviriler hazırsa 2–7 gün. Süreyi uzatan şey genelde çevirinin beklenmesi oluyor.

## Nereden başlamalı

Üç şeyi netleştirin: son iki yılda hangi ülkelerden talep aldığınızı, ürünlerinizin sektörde kullanılan İngilizce adlarını ve elinizde hangi sertifika/föy dosyalarının bulunduğunu. Bu üçü hazırsa çok dilli kurulum teknik olarak basit bir iştir.

İhracat yapan firmalar için yaptığımız siteleri [ana sayfadan](/) inceleyebilir, kendi ürün yapınızı konuşmak için WhatsApp'tan yazabilirsiniz.
