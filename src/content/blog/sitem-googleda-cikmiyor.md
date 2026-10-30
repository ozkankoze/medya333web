---
baslik: Sitem Google'da neden çıkmıyor? Sırayla kontrol edilecek 7 sebep
ozet: Site yayında ama aramada yok. Bunun yedi tipik sebebi var ve neredeyse hepsi on dakikada kontrol edilebiliyor. Hangisinin sizde olduğunu bulmanın sırasını anlatıyoruz.
kisaCevap: Sitenizin Google'da çıkmamasının en sık sebebi, sitenin aslında dizine eklenmiş olup sizin rekabetçi bir kelimede aramanızdır; ikinci sırada ise sitede unutulmuş bir noindex etiketi veya robots.txt engeli gelir. Önce tarayıcıya site:siteniz.com yazıp kaç sayfanızın dizinde olduğuna bakın: sonuç geliyorsa sorun görünürlük değil sıralamadır, sonuç gelmiyorsa teknik bir engel vardır. Yeni kurulmuş sitelerde Google'ın taraması bir haftayı, bütün sayfalara ulaşması birkaç haftayı bulabilir; bu sürede panik yapmaya gerek yoktur.
tarih: 2026-10-30
etiket: SEO
renk: "#C2255C"
---

"Sitemiz yayına gireli bir ay oldu, Google'da hiç çıkmıyoruz." Bize en sık gelen cümlelerden biri bu.

Çoğu zaman ortada büyük bir felaket yok. Yedi tipik sebep var, neredeyse hepsi on dakikada kontrol edilebiliyor ve sırayla bakıldığında hangisinin sizde olduğu hızla anlaşılıyor.

Bu yazı o sırayı veriyor. Baştan başlayın, atlamayın — çünkü ikinci maddeyi düzeltmeye çalışıp birinci maddenin kurbanı olan çok firma gördük.

## 0. Önce şunu yapın: dizinde misiniz, değil misiniz?

Her şeyden önce bu sorunun cevabı lazım. Tarayıcıya şunu yazın:

> `site:siteniz.com`

**Sonuçlar geliyorsa** siteniz Google'ın dizininde. O hâlde sorununuz "çıkmamak" değil, **sıralama**. Doğrudan 5. maddeye geçin.

**Hiç sonuç gelmiyorsa** gerçekten bir engel var. 1'den 4'e kadar olan maddeleri sırayla kontrol edin.

Bu ayrım kritik. İkisi tamamen farklı problemler ve tamamen farklı çözümleri var.

## 1. Sitede unutulmuş bir "noindex" etiketi

En sık sebep bu ve en sinsisi, çünkü hiçbir hata vermez. Site kusursuz çalışır, sadece Google görmez.

Nasıl oluyor: site geliştirilirken, hazır olmadan Google'a düşmesin diye sayfalara `noindex` etiketi konur. Yayına alınırken kaldırılması unutulur.

Kontrolü: sayfaya sağ tıklayıp **"Sayfa kaynağını görüntüle"** deyin, `noindex` diye arayın. Şöyle bir satır varsa sebebiniz budur:

> `<meta name="robots" content="noindex">`

WordPress kullanıyorsanız ayrıca **Ayarlar → Okuma** bölümüne bakın: "Arama motorlarının bu siteyi dizine eklemesini engelle" kutusu işaretliyse işaretini kaldırın. Bu kutu tek başına koca siteyi görünmez yapar.

## 2. robots.txt bütün siteyi kapatıyor

`siteniz.com/robots.txt` adresine gidin. Şunu görüyorsanız sitenizin taranması tamamen kapalı demektir:

> `User-agent: *`
> `Disallow: /`

Bu dosya da genelde geliştirme aşamasından kalır. Son satırdaki `/` işareti tek başına bütün siteyi kapatmaya yeter.

## 3. Yeni siteyseniz — mesele sadece zaman olabilir

Google'ın kendi dokümanı şunu söylüyor: yeni bir sitede taramanın başlaması **yaklaşık bir hafta** sürebilir, sitenin tamamına ulaşması **birkaç haftayı** bulabilir. Ayrıca Google her sayfanın dizine ekleneceğini garanti etmiyor.

Yani iki haftalık bir sitede "çıkmıyoruz" demek erken. Ama beklerken boş durmayın:

* **Google Search Console** hesabı açın ve sitenizi doğrulayın. Bu ücretsiz ve SEO'nun tek zorunlu adımı.
* **Sitemap.xml** dosyanızı Search Console'a gönderin.
* Ana sayfanızı **URL Denetimi** aracına yapıştırıp "Dizine eklenmeyi iste" deyin.

Search Console yoksa kör uçuyorsunuz. Google size sorunun ne olduğunu bu araçta yazıyor, başka hiçbir yerde yazmıyor.

## 4. Search Console "dizine eklenmedi" diyor — peki hangi sebeple?

Search Console → **Sayfalar** raporu, dizine eklenmeyen her sayfanın sebebini yazar. En sık görülen üçü:

**"Bulundu - şu anda dizine eklenmedi"**
Google adresi biliyor ama henüz taramamış; siteyi yormamak için ertelemiş. Sayfanın menüden veya başka bir sayfadan bağlantılı olduğundan ve sitemap'te yer aldığından emin olun.

**"Tarandı - şu anda dizine eklenmedi"**
Google sayfayı gördü ama dizine almaya değer bulmadı. Google bu durumda "yeniden göndermenize gerek yok" diyor. Gerçek çözüm teknik değil: o sayfada başka sitelerde olmayan bir şey olması lazım. İki paragraflık "Hakkımızda" sayfaları genelde burada takılır.

**"Kullanıcı tarafından seçilmiş kurallı sayfa olmadan yinelenen"**
Aynı içerik birden fazla adreste yayınlanıyor ve Google başka bir adresi asıl kabul etmiş. En sık sebebi: sitenin hem `www`'li hem `www`'siz, hem `http` hem `https` sürümünün açık olması. Tek sürüme yönlendirin.

## 5. Dizindesiniz ama üst sıralarda değilsiniz

`site:` aramanız sonuç verdiyse siz buradasınız. Bu, görünürlük sorunu değil **rekabet** sorunu.

Burada en sık yapılan hata, yanlış kelimeyle test etmek. "Web sitesi" gibi bir kelimede ilk sayfaya çıkmak yıllar alır. Ama şunları deneyin:

* **Firma adınız.** Burada çıkmıyorsanız gerçek bir sorun var.
* **Hizmet + şehir.** "kadıköy kuaför", "bursa cnc torna"
* **Uzun ve belirgin bir cümle.** Sitenizdeki bir paragrafı tırnak içinde aratın. Çıkıyorsa o sayfa kesinlikle dizinde.

Marka adınızda çıkıp hizmet kelimelerinde çıkmıyorsanız durum normaldir: sıralama zaman, içerik ve bağlantı ister. Yerel aramalarda ayrıca **Google İşletme Profili** devreye girer; bunu [ayrı bir yazıda](/blog/google-isletme-profili-yeterli-mi) anlattık.

## 6. Sayfalarınız JavaScript ile geliyor

Sitenizin içeriği tarayıcıda JavaScript çalıştıktan sonra beliriyorsa, Google'ın gördüğü ilk hâli boş olabilir. Tek sayfalık uygulama (SPA) mantığıyla yapılmış bazı siteler bu yüzden yıllarca aramada yer almıyor.

Kontrolü: sayfada sağ tık → **"Sayfa kaynağını görüntüle"**. Açılan metinde yazılarınızı göremiyor, sadece birkaç satır kod görüyorsanız sebep bu olabilir. Search Console'un URL Denetimi aracındaki ekran görüntüsü de Google'ın sayfayı nasıl gördüğünü gösterir.

Çözümü sunucu tarafında render almak. Bu bir ayar değil, mimari karar — site yeniden yazılmadan düzelmeyebilir.

## 7. Site çok yavaş veya mobilde bozuk

Bu doğrudan "çıkmama" sebebi değil ama tarama bütçenizi düşürür ve sıralamayı aşağı çeker. Üç saniyenin neden eşik olduğunu [hız yazımızda](/blog/web-sitesi-hizi-3-saniye) ölçümlerle anlattık.

## Sık sorulanlar

**Google'a para verirsem dizine girer miyim?**
Hayır. Google Ads reklamdır, dizine ekleme ile ilgisi yoktur. Reklamı durdurduğunuzda sıralamanız değişmez, çünkü zaten etkilenmemiştir.

**"Dizine eklenmeyi iste" düğmesine kaç kez basmalıyım?**
Bir kez. Google'ın dokümanı açıkça "dizine ekleme hiçbir zaman anında değildir, doğrudan istek göndermiş olsanız bile" diyor. Tekrar tekrar basmak süreci hızlandırmıyor.

**Sitemap göndermek sıralamamı yükseltir mi?**
Hayır, sadece bulunmanızı kolaylaştırır. Sitemap bir davet, garanti değil.

**Eski sitemde çıkıyordum, yenisinde çıkmıyorum.**
Adresler değişmiş ve 301 yönlendirme yapılmamış olabilir. Bu durumu ve çözümünü [site yenileme yazımızda](/blog/site-yenileme-seo) ayrıntılı anlattık.

**Yapay zekâ araçlarında da çıkmıyorum, aynı şey mi?**
Benzer ama aynı değil. ChatGPT gibi araçların sitenizi nasıl gördüğünü [ayrı bir yazıda](/blog/yapay-zeka-aramasinda-gorunmek) ele aldık.

## Nereden başlamalı

Sırayı bozmayın: önce `site:siteniz.com` araması, sonra sayfa kaynağında `noindex` kontrolü, sonra `robots.txt`. Bu üçü on dakika sürer ve vakaların çoğunu çözer. Hiçbiri çıkmazsa Search Console kurun ve Sayfalar raporunun ne dediğine bakın — cevap orada yazıyor.

Kontrolleri yaptınız ama rapor anlaşılmadıysa, sitenizin adresini [WhatsApp'tan](https://wa.me/905370108611) yazın; bakıp ne olduğunu söyleyelim. Yaptığımız işleri [ana sayfadan](/) inceleyebilirsiniz.
