---
baslik: Siteniz kaç saniyede açılıyor? 3 saniye kuralı ve siteyi yavaşlatan beş şey
ozet: Yavaş açılan site ziyaretçiyi daha içeri girmeden kaybediyor. Hızı neyin düşürdüğünü, kendi sitenizi nasıl ölçeceğinizi ve yaptığımız sitelerin gerçek ölçüm sonuçlarını anlatıyoruz.
kisaCevap: Mobilde bir sayfa 3 saniyede açılmazsa ziyaretçilerin yaklaşık yarısı geri dönüyor; bu Google'ın mobil ölçümüne dayanan bir bulgudur. Siteyi en çok yavaşlatan beş şey sıkıştırılmamış görseller, ağır hazır temalar, fazla eklenti, yavaş hosting ve gereksiz dış servislerdir. Kendi sitenizi PageSpeed Insights ile ücretsiz ölçebilirsiniz; bizim yayına aldığımız sitelerde mobilde ilk görüntü süresi 1 saniyenin altındadır.
tarih: 2026-10-27
etiket: Performans
renk: "#C4A669"
---

Web sitesi hızı, firma sahiplerinin en az ilgilendiği ama ziyaretçinin ilk karşılaştığı şey. Tasarım beğenilmeden, yazı okunmadan, ürün görülmeden önce yaşanan tek deneyim: **sayfanın açılmasını beklemek.**

Bu yazıda hız neden bu kadar belirleyici, siteyi tam olarak ne yavaşlatıyor, kendi sitenizi nasıl ölçersiniz ve yaptığımız sitelerde gerçek rakamlar ne — hepsini anlatıyoruz.

## 1. 3 saniye kuralı

Google'ın mobil ziyaretler üzerine yaptığı ölçüm basit bir sonuç veriyor: **bir sayfa 3 saniyede açılmıyorsa ziyaretçilerin yaklaşık yarısı sayfayı terk ediyor.** Daha siteye girmeden, içeriği görmeden.

Bu rakamın anlamı üzerinde biraz durmak gerekiyor. Reklam veriyorsanız, tıklama başına ödeme yapıyorsunuz. Tıklayan kişi sayfa açılmadan geri dönüyorsa, o tıklamanın parası ödenmiş ama karşılığında hiçbir şey alınmamış oluyor. Yani yavaş site sadece ziyaretçi kaybettirmiyor, **reklam bütçesini açılış ekranında harcıyor.**

Organik tarafta da benzeri geçerli. Google, mobil sayfa deneyimini sıralama sinyalleri arasında kullanıyor. Yavaş site hem daha az görünüyor hem gördüğünü daha az tutuyor.

## 2. Siteyi yavaşlatan beş şey

Pratikte karşımıza çıkan yavaşlık sebepleri neredeyse hep aynı beş başlıkta toplanıyor.

**Sıkıştırılmamış görseller.** En yaygın sebep bu. Telefondan çekilmiş 4 MB'lık bir fotoğraf doğrudan siteye yükleniyor, sayfada 400 piksel genişliğinde gösteriliyor. Ziyaretçi o 4 MB'ı indiriyor, tarayıcı küçültüp gösteriyor. On görselli bir sayfa 40 MB oluyor. Doğru boyutta ve modern bir formatta (WebP) verildiğinde aynı sayfa 1 MB'ın altına iniyor.

**Ağır hazır temalar.** Satın alınan temalar herkese uysun diye her özelliği barındırır: on farklı slider, altı menü tipi, yirmi hazır blok. Siz bunların ikisini kullanırsınız ama ziyaretçi hepsinin kodunu indirir.

**Eklenti yığını.** Her eklenti kendi CSS ve JavaScript dosyasını ekler. Tek tek küçük, toplamda ağır. "Şu özelliği de ekleyelim" diye geçen iki yılın sonunda sayfa açılışı iki katına çıkmış olur.

**Yavaş hosting.** Ucuz paylaşımlı hosting'de sunucu yüzlerce siteyle paylaşılır. Sayfanız hazır olsa bile sunucu cevap vermeye geç başlar. Bu, ölçümlerde "ilk bayt süresi" olarak görünür ve kullanıcının hiçbir şekilde telafi edemeyeceği bir gecikmedir.

**Gereksiz dış servisler.** Her chat widget'ı, her analitik kodu, her yazı tipi servisi dışarıdan bir dosya çağırır. Üç tanesi sorun değil; on beş tanesi sayfanın yarısını bekletir.

## 3. Kendi sitenizi nasıl ölçersiniz

İki yöntem var; biri on saniye, diğeri iki dakika sürer.

**Telefon testi.** Sitenizi mobil veri üzerinden (wifi değil) açın ve içten içe sayın. Beş saniyeyi geçiyorsa sorun var ve bunu doğrulamak için başka araca ihtiyacınız yok.

**PageSpeed Insights.** `pagespeed.web.dev` adresine sitenizin adresini yazın. Google'ın ücretsiz aracı. Önemli olan tek bir puan değil, şu iki satır:

* **LCP (en büyük içeriğin görünmesi)** — sayfanın asıl içeriğinin ekrana gelme süresi. 2,5 saniyenin altı iyi kabul edilir.
* **INP / etkileşim gecikmesi** — tıkladığınızda sayfanın tepki verme süresi.

Mobil sekmesine bakın, masaüstü sekmesine değil. Ziyaretçilerinizin çoğu telefonda.

Bir uyarı: PageSpeed puanı 100 üzerinden verilir ve insanlar bu sayıya takılır. 100 almak bir hedef değil. 90 alan ama LCP'si 1 saniye olan bir site, 100 alan ama sunucusu geç cevap veren bir siteden iyidir.

## 4. Bizim ölçümlerimiz

Kendi yaptığımız sitelerde ilk görüntü süresini düzenli ölçüyoruz: mobil bağlantı, önbellek boş, sayfanın asıl içeriğinin ekrana gelme süresi. Ekim 2026 ölçümü:

* **lockoutturkey.com** — 0,70 sn
* **locksansafety.com** — 0,82 sn
* **medya333.com** — 0,94 sn

Üçü de 1 saniyenin altında. Bunlar beş sayfalık tanıtım siteleri de değil: ikisi yüzlerce ürünlü katalog sitesi.

::proje:lockoutturkey::

Bu rakamlar bir yetenek göstergesi değil, bir **tercih** göstergesi. Hazır tema kullanmadığımız için sayfada kullanılmayan kod yok. Görseller yüklenirken otomatik olarak doğru boyuta ve WebP formatına çevriliyor. Sayfalar önceden oluşturulup dağıtım ağına atıldığı için sunucunun cevap vermesi beklenmiyor.

Yani hız, sonradan yapılan bir "optimizasyon" değil, baştan verilen kararların sonucu.

## 5. Mevcut siteniz yavaşsa ne yapmalı

Sıfırdan yeni site her zaman cevap değil. Yavaş bir sitede çoğu zaman şu sırayla ilerlenir:

1. **Görselleri düzeltin.** Çoğu sitede kazancın yarısı buradan gelir ve en ucuz adımdır.
2. **Kullanılmayan eklentileri kaldırın.** Her birini kaldırdıktan sonra siteyi kontrol edin.
3. **Hosting'i ölçün.** İlk bayt süresi 1 saniyenin üstündeyse sorun sitenizde değil, sunucuda. Taşımak, yeniden yazmaktan ucuzdur.
4. **Dış servisleri sayın.** Kullanmadığınız chat, pop-up ve takip kodlarını temizleyin.

Bu dördü yapıldıktan sonra hâlâ 3 saniyenin üstündeyseniz, sorun temanın kendisindedir ve o noktadan sonra yama yapmak yeniden yazmaktan pahalıya gelir.

## Sık sorulan sorular

**Site hızı SEO'yu gerçekten etkiliyor mu?**
Evet, ama tek başına belirleyici değil. Google mobil sayfa deneyimini sıralama sinyalleri arasında sayıyor. Asıl etki dolaylı: yavaş sayfadan geri dönen ziyaretçi, sıralamayı da zamanla aşağı çekiyor.

**Kaç saniye iyi sayılır?**
Mobilde içeriğin 2,5 saniyenin altında ekrana gelmesi iyi, 1 saniyenin altı çok iyi. 3 saniye sınırdır, 5 saniye ciddi kayıp demektir.

**Hosting'imi değiştirsem hızlanır mı?**
İlk bayt süreniz yüksekse evet, belirgin şekilde. Sorun görsellerde veya temadaysa hosting değişikliği az şey değiştirir. Önce ölçün, sonra karar verin.

**WordPress yavaş mıdır?**
WordPress'in kendisi değil, üzerine yüklenenler yavaşlatır. Ağır tema ve otuz eklentiyle kurulmuş bir WordPress yavaş olur; sade kurulmuş bir WordPress makul hızda çalışır.

**Siteyi hızlandırmak için yeniden yapmak şart mı?**
Hayır. Görsel, eklenti ve hosting düzeltmeleriyle çoğu sitede ciddi kazanç elde edilir. Yeniden yazmak, bu dördü yapıldıktan sonra hâlâ yetersizse gündeme gelir.

## Nereden başlamalı

Sitenizin adresini `pagespeed.web.dev` adresine yazın, mobil sekmesine bakın ve LCP değerini not edin. Rakam 3 saniyenin üstündeyse, önce yukarıdaki dört adımı uygulayın.

Ölçüm sonucunu bize WhatsApp'tan gönderirseniz, sitenizi hangi kalemin yavaşlattığını söyleyip yapılması gerekenleri ücretsiz çıkarırız. Yaptığımız işleri [ana sayfadan](/) inceleyebilir, fiyatı neyin belirlediğini [web sitesi yaptırmak rehberinde](/blog/web-sitesi-yaptirmak-rehber) okuyabilirsiniz.
