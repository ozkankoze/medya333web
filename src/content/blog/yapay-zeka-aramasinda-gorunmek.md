---
baslik: ChatGPT ve Gemini firmanızı nasıl buluyor? Yapay zekâ aramasında görünmek
ozet: İnsanlar artık "en iyi X firması" sorusunu Google'a değil yapay zekâya soruyor. Asistanların kaynağı nereden aldığını, sitenizin neden hiç görünmeyebileceğini ve abartısız olarak bugün yapılabilecekleri anlatıyoruz.
kisaCevap: Yapay zekâ asistanları cevaplarını canlı arama sonuçlarından derliyor, bu yüzden bir sitenin asistanda görünmesinin ön şartı arama motorlarında taranabilir olmasıdır. Asistanlar uzun sayfaları değil, soruyu doğrudan yanıtlayan kısa ve net paragrafları alıntılıyor. Yapılabilecek en somut üç şey: yapay zekâ botlarını robots.txt ile engellememek, her sayfaya soruyu tek başına cevaplayan kısa bir paragraf koymak ve firma bilgilerini internetteki her yerde aynı yazmak. Görünürlüğü garanti eden bir yöntem yoktur, bunu satan da yoktur.
tarih: 2026-10-28
etiket: Yapay Zeka
renk: "#6b5cf0"
---

Birkaç yıl önce "İstanbul'da iş güvenliği ekipmanı üreticisi" diye arayan biri Google'a yazardı ve on mavi link görürdü. Bugün aynı kişi aynı soruyu ChatGPT'ye ya da Gemini'ye soruyor ve **tek bir cevap** alıyor. O cevabın içinde üç firma adı geçiyor. Sizinki geçiyor mu?

Bu konu etrafında şu anda çok fazla gürültü var. "AI SEO paketi", "GEO danışmanlığı", "ChatGPT'de ilk sıra garantisi" satan epey insan türedi. Baştan söyleyelim: **böyle bir garanti yok.** Ama yapılabilecek, ölçülebilir ve ücretsiz şeyler var. Bu yazı onları anlatıyor.

## 1. Asistanlar cevabı nereden buluyor

Yapay zekâ asistanlarının bilgisi iki kaynaktan geliyor:

**Eğitim verisi.** Modelin eğitildiği tarihe kadarki internet. Bu veri donmuş durumda ve siz bugün bir şey yazarak değiştiremiyorsunuz.

**Canlı arama.** Asistan güncel bir şey sorulduğunda arama yapıyor, çıkan sayfaları okuyup cevabı derliyor ve çoğu zaman kaynak linki veriyor.

Firma aramaları neredeyse her zaman ikinci gruba giriyor, çünkü asistan "bu bilgi değişmiş olabilir" diye düşünüp arama yapıyor. Buradan çok basit bir sonuç çıkıyor:

**Arama motorlarında taranmayan bir site, yapay zekâ asistanında da yok.** Yapay zekâ görünürlüğü, SEO'nun yerine geçen bir şey değil; SEO'nun üstüne kurulan bir kat.

## 2. En sık yapılan hata: botu farkında olmadan engellemek

Pek çok sitede `robots.txt` dosyasına, güvenlik veya "içeriğim çalınmasın" kaygısıyla yapay zekâ botları engel olarak yazılmış durumda. Bu satırlar genelde bir eklentiyle ya da hosting panelindeki bir seçenekle, firma sahibinin haberi olmadan ekleniyor.

Sonuç şu: asistan sitenizi okuyamıyor, dolayısıyla sizi hiç önermiyor.

Kontrol etmek on saniye sürüyor. Tarayıcıya şunu yazın:

> `sitenizinadresi.com/robots.txt`

Çıkan metinde `GPTBot`, `OAI-SearchBot`, `Google-Extended`, `PerplexityBot`, `ClaudeBot` gibi adların yanında `Disallow: /` görüyorsanız, o botlara kapınız kapalı demektir.

Burada bilinçli bir karar da verebilirsiniz: içeriğinizin model eğitiminde kullanılmasını istemiyor olabilirsiniz. Ama **arama botu ile eğitim botu farklı şeylerdir.** Eğitim botunu kapatıp arama botunu açık bırakmak mümkün. İkisini birden kapatırsanız, cevaplarda hiç görünmezsiniz.

## 3. Asistanlar sayfayı değil, paragrafı alıntılıyor

Bu, pratikte en çok fark yaratan şey.

Bir asistan sorunun cevabını ararken sayfanın tamamını özetlemiyor; **soruyu tek başına yanıtlayan kısa bölümü** alıp kullanıyor. Yani sayfanızda cevap varsa ama üç paragraf hikâyenin ardına gömülmüşse, alıntılanma ihtimali düşüyor.

Pratik karşılığı şu: her önemli sayfanın başına, o sayfanın cevapladığı soruyu **bağlamsız olarak** yanıtlayan 2-4 cümlelik bir paragraf koyun. "Yukarıda anlattığımız gibi" ile başlayan bir cümle alıntılanamaz, çünkü tek başına anlamsız.

Kötü örnek:

> Bu konuda birçok etken var ve aşağıda hepsini sırayla ele alacağız.

İyi örnek:

> Kurumsal bir web sitesi, içerikler hazır olduğunda 2–7 günde yayına alınır. Süreyi en çok etkileyen şey yazılım değil, metin ve görsellerin hazır olup olmamasıdır.

İkincisi tek başına doğru, tek başına anlamlı ve tek başına alıntılanabilir. Bu sitedeki her yazının en üstünde duran kısa cevap paragrafları tam olarak bunun için var.

## 4. Sorulan soruyla aynı cümleyi kullanın

İnsanlar asistana tam cümle soruyor: "İstanbul'da e-ticaret sitesi yaptırmak ne kadar tutar?" Google'a ise üç kelime yazıyorlardı: "e-ticaret sitesi fiyat".

Bu, içeriğin yazılışını değiştiriyor. Sayfalarınızda **soruyu olduğu gibi başlık yapmak** ve hemen altında cevaplamak, asistanın eşleştirmesini kolaylaştırıyor. "Sık sorulan sorular" bölümleri bu yüzden eskisinden daha değerli — sadece ziyaretçi için değil.

Soruları uydurmayın: müşterilerinizin WhatsApp'tan ve telefondan gerçekten sorduğu cümleleri yazın. O cümleler zaten doğal dildir ve asistana sorulan cümlelere en çok onlar benziyor.

## 5. Bilginiz her yerde aynı olmalı

Asistanlar bir firma hakkında konuşurken tek kaynağa güvenmiyor; birkaç yerde gördüğü bilgiyi karşılaştırıyor. Çelişki gördüğünde ise o firmayı cevaba koymakta tereddüt ediyor.

Şu dördünü açıp karşılaştırın:

* Web siteniz
* Google İşletme Profiliniz
* Instagram / LinkedIn hesaplarınız
* Sektör rehberlerindeki kayıtlarınız

Firma adı, adres, telefon ve ne iş yaptığınız dördünde de **aynı** mı? Birinde "Medya 333", diğerinde "Medya333 Reklam Ajansı" yazıyorsa bu bir çelişkidir. İşletme profilinin bu işteki yerini [ayrı bir yazıda](/blog/google-isletme-profili-yeterli-mi) anlatmıştık.

## 6. Yapısal veri: yardımcı, sihir değil

Sayfanıza eklenen yapısal veri (schema.org işaretlemesi), arama motoruna "bu bir firma, bu bir hizmet, bu bir soru-cevap" diye açıkça söylüyor. Google bunu uzun süredir kullanıyor ve arama tarafındaki faydası net.

Yapay zekâ tarafında ise durum daha mütevazı: yapısal veri sayfanın ne hakkında olduğunu netleştiriyor, ama tek başına sizi cevaplara sokmuyor. Faydalı, ucuz, zararsız — ama "AI SEO" diye pazarlanacak bir sihir değil.

## 7. llms.txt konusunda dürüst olalım

Son bir yılda `llms.txt` diye bir dosya konuşuluyor: sitenin içeriğini yapay zekâ modellerine özetleyen bir metin dosyası. Mantıklı bir fikir ve biz de bu sitede tutuyoruz.

Ama olduğu gibi söyleyelim: **büyük asistanların hiçbiri bu dosyayı kullandığını resmen açıklamadı** ve dosyayı tutan sitelerin kayıtlarına bakıldığında neredeyse hiç okunmadığı görülüyor. Yani bugün itibarıyla llms.txt, maliyeti sıfır olduğu için yapılan bir hazırlıktır; sonuç getiren bir yöntem değil. Size bunu bir paket olarak satan olursa, sattığı şeyin bu olduğunu bilin.

## 8. Ölçemediğiniz bir alan olduğunu kabul edin

Google Search Console size kaç gösterim aldığınızı gösterir. Yapay zekâ asistanlarında böyle bir panel yok. Kimsenin elinde "ChatGPT'de 142 kez önerildiniz" diyen bir rapor yok.

Yapabileceğiniz tek dürüst ölçüm şu: **müşterilerinizin sorduğu soruları kendiniz sorun.** Ayda bir, ChatGPT'ye ve Gemini'ye şu tip cümleleri yazın:

> "İstanbul'da [sektörünüz] firması önerir misin?"
> "[Ürününüz] üreten Türk firmaları hangileri?"

Çıkan cevabı bir yere not edin. Üç ay sonra tekrar sorun. Firma adınızın girip girmediği, elinizdeki tek gerçek veridir — ve bedava.

## Sık sorulan sorular

**Yapay zekâ aramasında çıkmak için ayrı bir site mi gerekiyor?**
Hayır. Taranabilir, hızlı ve net yazılmış bir site yeterli. Ayrı bir "AI sitesi" diye bir şey yok.

**SEO artık gereksiz mi oldu?**
Tam tersi. Asistanlar cevabı arama sonuçlarından derlediği için, arama sonuçlarında olmayan bir site asistanda da yok. SEO bu işin ön şartı.

**Botları engellersem içeriğim korunur mu?**
Eğitim botlarını engellemek içeriğinizin modele girmesini azaltır, ama arama botlarını da engellerseniz cevaplarda hiç görünmezsiniz. İki kararı ayrı ayrı vermek gerekiyor.

**Garantili "ChatGPT'de ilk sıra" hizmeti alsam olur mu?**
Böyle bir sıralama kavramı yok. Asistan sıralama yapmıyor, cevap üretiyor ve her kullanıcıda farklı çıkabiliyor. Garanti veren bir teklif, olmayan bir şeyi satıyor demektir.

**Bu iş ne kadar sürede sonuç verir?**
Sayfalarınız taranıp dizine girdikten sonra, haftalar. Hiçbir müdahale "yarın görünürsünüz" sonucunu vermiyor.

**Küçük bir firma için değer mi?**
Bu yazıdaki maddelerin tamamı ücretsiz ve birkaç saatlik iş. Değmeyen şey, aynı işi paket halinde pahalıya satın almak.

## Nereden başlamalı

Bugün yapabileceğiniz üç şey var ve üçü de bedava:

1. `siteniz.com/robots.txt` dosyasını açın, yapay zekâ botlarını engellemediğinizden emin olun.
2. En önemli üç sayfanızın başına, o sayfanın sorusunu tek başına cevaplayan 2-4 cümlelik bir paragraf koyun.
3. ChatGPT'ye ve Gemini'ye kendi sektörünüzün sorusunu sorun, çıkan cevabı not edin.

Üçüncü madde size bulunduğunuz yeri gösterir; ilk ikisi oradan ilerlemenizi sağlar. Sitenizin teknik tarafını birlikte bakmak isterseniz [ana sayfadan](/) işlerimize göz atabilir, WhatsApp'tan yazabilirsiniz.
