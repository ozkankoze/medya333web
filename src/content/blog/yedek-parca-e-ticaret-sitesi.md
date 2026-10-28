---
baslik: Yedek parça e-ticaret sitesi — müşteri ürünü koddan buluyor, menüden değil
ozet: Yedek parça, filtre ve teknik ürün satan firmaların sitesi neden normal e-ticaretten farklı kurulur. OEM ve muadil kodu araması, araç ve makine uyumluluğu, teklif akışı — üç canlı projeden çıkardıklarımız.
kisaCevap: Yedek parça satan bir sitede müşteri ürünü kategoriden değil koddan bulur: OEM numarası, muadil kodu, araç veya makine modeli. Bu yüzden sitenin merkezinde menü değil arama motoru vardır ve aramanın yazım farklarını (boşluk, tire, küçük-büyük harf) tolere etmesi gerekir. Uyumluluk bilgisi ürün sayfasında net yazmazsa satın almacı riski almayıp telefon eder ya da rakibe gider.
tarih: 2026-10-28
etiket: Sektör
renk: "#3B6EF0"
---

Yedek parça satan bir firmanın sitesi, kıyafet satan bir mağazanın sitesine benzemez. Bunu üç ayrı projede öğrendik: [Oto Center Market](https://www.otocentermarket.com) (2.600 ürün, 54 araç markası), [Sofilx](https://www.sofilx.com) (kompresör ve vakum pompası filtreleri) ve [Sofilx LOTO](https://www.sofilxloto.com).

Üçünün ortak noktası şu: **müşteri ürünün adını bilmiyor, kodunu biliyor.** Site bu gerçeğin üzerine kurulmazsa, ne kadar güzel görünürse görünsün satmıyor.

Bu yazıda bu tip sitelerde neyin işe yaradığını, neyin boşa para olduğunu anlatıyoruz.

## 1. Menü değil, arama motoru

Normal e-ticarette insan kategoriye girer, filtreler, kaydırır. Yedek parçada böyle olmuyor. Karşınızdaki kişinin elinde eski parça var, üstünde bir numara yazıyor, o numarayı arıyor.

Oto Center Market'te 2.600 ürün ve 54 araç markası var. Bu hacimde kategori ağacı kurmak işe yaramaz — dördüncü alt kategoriye inene kadar müşteri çıkar. Çözüm, siteyi arama etrafında kurmak oldu: OEM koduyla, motor koduyla ya da araç seçerek parçaya ulaşmak.

Pratik ölçü şu: **müşteri ana sayfadan parçaya kaç adımda ulaşıyor?** Üçten fazlaysa site, telefonla sorulan sorulara mahkûm olur.

::proje:otocentermarket::

## 2. Arama, yazım farklarını affetmeli

Bu, en çok gözden kaçan ve en çok satış kaybettiren ayrıntı.

Aynı parça numarası şu şekillerde yazılabiliyor:

> `06A 115 561 B`
> `06A115561B`
> `06a-115-561-b`

Müşteri hangisini yazarsa yazsın aynı ürünü bulmalı. Aramanız boşluğa ve tireye takılıyorsa, ürün sitenizde duruyor ama müşteri "yok" sanıp çıkıyor. Bunu test etmek bedava: kendi sitenizde bir parça kodunu üç farklı şekilde yazıp arayın.

Aynı mantık muadil kodlarda da geçerli. Sofilx tarafında müşteri genelde **orijinal** kodu biliyor, sizin sattığınız ise muadil. Çapraz referans tablosu kurulmazsa o müşteri ürünü hiç bulamaz. Kurulduğunda ise orijinal kodu arayan herkes size geliyor — rakipleriniz bunu çoğu zaman yapmıyor.

## 3. Uyumluluk, ürün sayfasında net yazmalı

Yedek parçada satın alma kararının önündeki engel fiyat değil, **risk**. "Bu parça benim aracıma / makineme uyar mı?" Cevap net değilse insan sipariş vermez, çünkü yanlış parçanın iadesi herkes için zahmet.

Ürün sayfasında şu üçü açıkça durmalı:

* **Hangi model ve yıllarla uyumlu** — liste halinde, kısaltmadan
* **Orijinal ve muadil kod karşılıkları** — hangi numaranın yerine geçiyor
* **Ölçü ve teknik değerler** — çap, uzunluk, bağlantı tipi, mikron

Bu bilgiyi ürün sayfasına yazmak aynı zamanda en ucuz SEO'dur. İnsanlar o kodları Google'a da yazıyor; kod sayfanızda geçmiyorsa o aramada yoksunuz.

## 4. Sepet mi, teklif mi

Perakende satıyorsanız sepet ve kartlı ödeme doğru. Ama bu sektörde müşterinin önemli bir kısmı sanayi, servis ve bayi — onlar 30 kalemlik listeyi sepete atıp kart girmiyor, **teklif** istiyor.

Pratikte en iyi çalışan yapı ikisinin birlikte olması: perakende müşteri sepetten alsın, kurumsal müşteri aynı ürünleri teklif listesine eklesin ve tek tuşla göndersin. Sofilx LOTO'da teklif akışı doğrudan WhatsApp'a bağlı, çünkü o sektörde yazışma orada yürüyor.

Teklif alırken şunu sorun: **"Kurumsal müşteri 30 kalemlik listeyi bana nasıl gönderecek?"** Cevap "telefon eder" ise, sitenin satış sürecindeki payı düşük kalır.

## 5. Ürün verisi, işin asıl yükü

Bu tip projelerde zamanın çoğu kodlamaya değil veriye gidiyor. 2.600 ürünü siteye taşımak, ürünlerin şu halde olmasını gerektiriyor:

* Her ürünün tek ve değişmez bir stok kodu
* Uyumluluk bilgisinin ayrı sütunda, tutarlı yazımla
* Görsellerin ürün koduyla eşleşen dosya adlarında
* Fiyatların tek para biriminde ve KDV durumu belli

Bu dördü tamamsa toplu aktarım hızlı. Değilse — ki çoğu firmada değil — işin ilk adımı veri temizliği oluyor. Bunu baştan kabul etmek, sonradan sürprizle karşılaşmaktan iyi. Sürecin tamamını [e-ticaret sitesi kurmak](/blog/e-ticaret-sitesi-kurmak) yazısında adım adım anlattık.

## 6. Hız, bu sektörde daha da önemli

Yedek parça arayan kişi genelde acele ediyor: araç serviste, makine durmuş. Sayfa yavaş açılırsa beklemiyor, bir sonraki sonuca geçiyor.

Üstelik bu tip sitelerde sayfa sayısı yüksek olduğu için yavaşlık Google tarafında da sorun çıkarıyor: binlerce ürün sayfası varsa ve her biri geç açılıyorsa, arama motoru hepsini taramaya vakit ayırmıyor. Konuyu ölçümlerle [site hızı yazısında](/blog/web-sitesi-hizi-3-saniye) anlattık.

## 7. Boşa para giden üç şey

Üç projede de işe yaramadığını gördüğümüz kalemler:

**Ana sayfadaki büyük slider.** Kimse bakmıyor. Yedek parça arayan insan ana sayfada ortalama birkaç saniye kalıyor, doğrudan aramaya gidiyor. O alana arama kutusu koymak daha iyi.

**Aşırı kategori derinliği.** Beş seviyeli menü kurmak hem pahalı hem kullanılmıyor. İki seviye + güçlü arama, beş seviyeden iyi çalışıyor.

**Müşteri üyeliği zorunluluğu.** Teklif almak için üye olmayı zorunlu kılmak, teklif sayısını düşürüyor. Üyelik bayi fiyatı görmek isteyenler için seçenek olmalı, herkes için şart değil.

## Sık sorulan sorular

**Elimde Excel'de parça listesi var, tek tek mi gireceğim?**
Hayır. Excel ya da CSV listesini toplu aktarıyoruz. Görseller klasör halinde gelse de olur, eşleştirmeyi kod üzerinden yapıyoruz.

**Muadil kod eşleştirmesi için ayrı bir liste tutmam gerekiyor mu?**
Evet, çapraz referans ancak elinizde bir eşleştirme tablosu varsa kurulabilir. Tablo dağınıksa önce onu düzenliyoruz; kurulduktan sonra güncellemesi panelden yapılıyor.

**Fiyatları herkese göstermek istemiyorum.**
Yapılabilir. Fiyat tamamen gizlenip "teklif iste" ile çalışılabilir, ya da bayi girişi olanlara bayi fiyatı, diğerlerine liste fiyatı gösterilecek şekilde kurulabilir.

**Mevcut sitemin Google sıralaması kaybolur mu?**
Yenileme projelerinde eski adresler yeni adreslere yönlendiriliyor (301). Ürün sayfaları korunduğu sürece sıralama taşınır, genelde teknik iyileştirme sayesinde artar.

**Kaç üründen sonra arama motoru şart oluyor?**
Kabaca 150-200 ürün. Altındaysanız iyi bir kategori yapısı yeter; üstüne çıktığınızda arama, sitenin en çok kullanılan parçası haline geliyor.

**Ne kadar sürede yayına alınıyor?**
Ürün verisi düzenliyse 2–7 gün. Veri dağınıksa süreyi belirleyen şey düzenleme işi oluyor, yazılım değil.

## Nereden başlamalı

Teklif istemeden önce üç soruyu cevaplayın: müşteriniz parçayı hangi bilgiyle arıyor (kod mu, araç/makine modeli mi, ölçü mü), elinizde muadil eşleştirme tablosu var mı, ve kurumsal müşteri oranınız ne kadar. Bu üçü belliyse gelen teklifler de karşılaştırılabilir olur.

Yaptığımız işleri [ana sayfadan](/) inceleyebilir, kendi ürün yapınızı konuşmak için WhatsApp'tan yazabilirsiniz. Aynı gün dönüş yapıyoruz.
