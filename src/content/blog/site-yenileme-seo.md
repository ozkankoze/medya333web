---
baslik: Sitemi yenilersem Google sıralamam düşer mi? Yenilemede kaybetmemenin yolu
ozet: Site yenilemenin en çok korkulan tarafı sıralamayı kaybetmek. Sıralamayı taşıyan şeyin ne olduğunu, 301 yönlendirmenin neden şart olduğunu ve yenileme öncesi mutlaka yapılması gereken hazırlığı anlatıyoruz.
kisaCevap: Doğru yapılan bir yenilemede sıralama düşmez, genellikle artar — çünkü sıralamayı taşıyan şey tasarım değil, sayfa adresleri ve içeriktir. Eski adresler yenilerine 301 ile yönlendirilir ve metinler korunursa Google sıralamayı yeni sayfaya taşır. Düşüş yaşanan projelerde sebep neredeyse her zaman aynıdır: adreslerin değişip yönlendirilmemesi veya içeriğin kısaltılması. Toparlanma süresi tipik olarak birkaç haftadır.
tarih: 2026-10-29
etiket: SEO
renk: "#E8863C"
---

Site yenilemeyi düşünen firmaların bize sorduğu ilk soru neredeyse hep aynı: **"Sıralamam düşer mi?"**

Bu haklı bir korku. Yıllarca emek verilmiş, belli kelimelerde üst sıralara gelinmiş bir site var ve ona dokunmak riskli geliyor. Pek çok firma bu yüzden 2015'ten kalma siteyle devam ediyor.

Kısa cevap: **doğru yapılırsa düşmez, genellikle artar.** Ama "doğru yapmak" bir tercih değil, bir kontrol listesi. Bu yazıda o listeyi veriyoruz.

## 1. Sıralamayı taşıyan şey tasarım değil

En yaygın yanlış anlama bu. Google sitenizin tasarımını sıralamıyor; **sayfalarınızı** sıralıyor. Bir sayfanın sıralamasını taşıyan üç şey var:

* **Adresi (URL)** — Google o sayfayı bu adresle tanıyor
* **İçeriği** — başlık, metin, ürün bilgisi
* **Aldığı bağlantılar** — başka sitelerin o adrese verdiği linkler

Tasarımı tamamen değiştirip bu üçüne dokunmazsanız, sıralama yerinde kalır. Tersine, tasarımı hiç değiştirmeyip adresleri değiştirirseniz sıralama çöker.

Yani asıl soru "tasarımı değiştirsek mi" değil, **"adreslere ne olacak"**.

## 2. 301 yönlendirme: pazarlıksız tek madde

Yeni sitede adresler değişiyorsa — ki genelde değişir — her eski adres yenisine **301 yönlendirme** ile bağlanmalı.

301, tarayıcıya ve arama motoruna "bu sayfa kalıcı olarak şu adrese taşındı" der. Google bu bilgiyi alınca sıralamayı ve bağlantı değerini yeni adrese aktarır.

Örnek:

> `siteniz.com/urunler.php?id=42` → `siteniz.com/urunler/kilitleme-seti`

Bu yönlendirme yoksa ne olur: eski adrese giren ziyaretçi 404 hata sayfası görür, Google o sayfayı silinmiş sayar, yıllarca biriken değer sıfırlanır. Dışarıdan gelen bağlantılar da boşa düşer.

Dikkat edilecek üç nokta:

* **301 olacak, 302 değil.** 302 "geçici" demektir ve değeri aktarmaz.
* **Sayfa sayfa eşleştirilecek.** Bütün eski adresleri ana sayfaya yönlendirmek en sık yapılan hatadır; Google bunu yönlendirme değil, sayfanın kaybı olarak okur.
* **Karşılığı olmayan sayfa için en yakın üst kategori** seçilir.

## 3. Yenileme öncesi hazırlık — asıl iş burada

Yeni site yazılmaya başlamadan önce elinizde şunlar olmalı:

**Mevcut adreslerin tam listesi.** Sitenizin bütün sayfalarının adresi. Kaynağı: eski sitenin sitemap.xml dosyası ve Google Search Console.

**En çok trafik alan 20 sayfa.** Search Console → Performans → Sayfalar. Bu 20 sayfa sitenizin değerinin büyük kısmını taşıyor. Yenilemede en çok dikkat edilecek sayfalar bunlar.

**Hangi kelimelerde çıkıyorsunuz.** Yine Search Console'dan. Bu liste, yeni sitede hangi metinleri korumanız gerektiğini söylüyor.

**Mevcut başlık ve açıklamalar.** İyi çalışan bir sayfanın başlığını sırf "daha şık olsun" diye değiştirmek gereksiz risk.

Search Console hesabınız yoksa yenilemeden önce kurun ve birkaç hafta veri biriksin. Veri olmadan neyi koruduğunuzu bilemezsiniz.

## 4. En sık yapılan beş hata

**Adreslerin değişip yönlendirilmemesi.** Birinci sıradaki sebep. Çoğu zaman kimse kötü niyetli değil, sadece listeyi kimse çıkarmamıştır.

**İçeriğin kısaltılması.** Yeni tasarım "daha temiz" olsun diye sayfalardaki metinler siliniyor. Google'ın okuduğu şey o metindi. Tasarım sadeleşirken içerik sadeleşmemeli.

**Blog ve eski yazıların taşınmaması.** "Zaten kimse okumuyordu" diye silinen yazılar, çoğu sitede arama trafiğinin önemli bölümünü getiren sayfalardır.

**Görsel alt metinlerinin kaybı.** Görsel aramadan gelen trafik sessizce yok olur.

**Yeni sitenin yanlışlıkla aramaya kapalı açılması.** Geliştirme sırasında konan `noindex` etiketi yayında unutuluyor. Site mükemmel çalışır, Google hiç göremez. Yayın günü kontrol edilecek ilk şey budur.

::proje:locksansafety::

## 5. Yayın günü kontrol listesi

1. `robots.txt` aramaya açık mı, `noindex` kalmış mı?
2. Yeni `sitemap.xml` oluştu mu, Search Console'a gönderildi mi?
3. Eski adreslerin 20-30 tanesini elle açıp yönlendirmeyi kontrol ettiniz mi?
4. 404 veren sayfa var mı? (Search Console → Dizine ekleme → Sayfalar)
5. Mobilde açılış hızı ölçüldü mü? (Konuyu [ayrı bir yazıda](/blog/web-sitesi-hizi-3-saniye) ölçümlerle anlattık.)
6. Google İşletme Profilindeki site adresi güncellendi mi?

## 6. Ne kadar sürede oturur

Google yeni yapıyı taramak ve yönlendirmeleri işlemek için zamana ihtiyaç duyar. Tipik olarak:

* **İlk günler:** sayfalar yeniden taranır, sıralamalarda dalgalanma normaldir
* **2-4 hafta:** çoğu sayfa yerini bulur
* **6 hafta sonrası:** teknik iyileştirmelerin (hız, mobil, yapısal veri) etkisi görülmeye başlar

Bu dönemde en sık yapılan ikinci hata panikle geri dönmek. Dalgalanma süreç, kayıp değil. Ancak altı haftada toparlamayan bir düşüşün arkasında genelde eksik yönlendirme vardır ve bakılması gerekir.

## Sık sorulan sorular

**Alan adım aynı kalacak, yine de yönlendirme gerekir mi?**
Sayfa adresleri değişiyorsa evet. Yönlendirme alan adıyla değil, sayfa adresleriyle ilgilidir.

**Eski sitem çalışırken yenisi hazırlanabilir mi?**
Evet, standart yöntem budur. Yeni site ayrı bir adreste kurulur, siz onayladıktan sonra yayına alınır. Ziyaretçi açısından kesinti olmaz.

**Hiç sıralamam yok, yine de dikkat etmeli miyim?**
Daha az kritik ama yine de eski adreslerinizi yönlendirin. Dışarıdan tek bir bağlantı bile gelse kaybetmeye değmez.

**Yenileme SEO'mu kendiliğinden iyileştirir mi?**
Kendiliğinden değil. Ama yeni site hızlı, mobil uyumlu ve yapısal verisi doğruysa, eski siteye göre avantaj kazanır. Fiyatı neyin belirlediğini [web sitesi yaptırmak rehberinde](/blog/web-sitesi-yaptirmak-rehber) anlattık.

**Yönlendirmeleri ne kadar süre tutmalıyım?**
Kaldırmayın. 301'ler kalıcıdır ve maliyeti yoktur.

## Nereden başlamalı

Yenilemeyi konuşmadan önce iki dosya çıkarın: **mevcut adreslerinizin listesi** ve **Search Console'daki en çok trafik alan 20 sayfanız.** Bu iki dosya elinizdeyse yenileme risksiz hale gelir; yoksa en iyi ajans bile körlemesine çalışır.

Mevcut sitenizin adres yapısına birlikte bakmamızı isterseniz [ana sayfadan](/) işlerimize göz atabilir, WhatsApp'tan yazabilirsiniz.
