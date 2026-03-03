# KOAH Egzersiz Uygulaması

KOAH (Kronik Obstrüktif Akciğer Hastalığı) hastaları için **egzersiz ve bilgilendirme odaklı** bir mobil uygulama.

## Özellikler
- **Bilgilendirme**: KOAH hakkında temel bilgilendirme ekranları
- **Egzersizler**: Egzersiz listesi ve egzersiz detay ekranı
- **Takip**: Egzersiz tamamlamaları ve ilerleme (bugün/toplam/aktif gün)
- **Arama & filtreleme**: Egzersiz arama ve kategoriye göre filtreleme
- **Kalıcı kayıt**: Tamamlanan egzersizlerin cihazda saklanması (AsyncStorage)

## Kullanılan Teknolojiler
- **Mobile**: Expo (React Native), Expo Router, NativeWind (Tailwind)
- **Web** : Vite + React

## Proje Yapısı
- `koah-app/mobile`: Expo (React Native) mobil uygulama
- `koah-app`: Web (Vite/React) proje klasörü

## Kurulum ve Çalıştırma

### Mobile (Expo)
```bash
cd koah-app/mobile
npm install
npx expo start --clear
```

Expo Go ile açmak için aynı Wi‑Fi ağında olunması önerilir.

```bash
npx expo start --tunnel --clear
```

### Web (Vite) 
```bash
cd koah-app
npm install
npm run dev
```

## Uygulama Çıktısı (Ekran Görüntüleri)

- **Ana Sayfa – Genel görünüm**

  ![Ana sayfa](koah-app/mobile/docs/screenshots/home.png)

- **Ana Sayfa – Günün egzersizi & kartlar**

  ![Ana sayfa - günün egzersizi](koah-app/mobile/docs/screenshots/home-warmup.png)

- **Kategori filtreleme (Tümü / Nefes / Isınma / Güçlendirme / Germe)**

  ![Kategori filtresi](koah-app/mobile/docs/screenshots/category-filter.png)

- **Egzersiz Detay Ekranı**

  ![Egzersiz detay](koah-app/mobile/docs/screenshots/detail.png)

- **Profil / İlerleme Takibi Ekranı**

  ![Profil ve istatistikler](koah-app/mobile/docs/screenshots/profile.png)

## Pano ile Karşılaştırma (İlham + Benim Katkım)

### Benzerlikler
- Üstte renkli **header** ve net ekran başlıkları
- İçerikte **kart (card) tabanlı** düzen ve okunabilir hiyerarşi
- **Egzersiz listesi → detay** akışı
- Profil/istatistik hissi veren **panel** yaklaşımı

### Benim yaptığım yenilikler / değişiklikler
- **Arama (search)**: Ana sayfada “Egzersiz ara” ile başlığa göre filtreleme
- **Kategori filtresi**: Nefes/Isınma/Güçlendirme/Germe gibi kategorilere göre filtreleme
- **İlerleme takibi**: Egzersiz tamamla → istatistikleri güncelle (bugün/toplam)
- **Kalıcı veri (persist)**: Tamamlanan egzersizler AsyncStorage ile cihazda saklanır
- **Detay ekranı zenginleştirme**: süre, zorluk, etiketler ve kapatılabilir “Dikkat” uyarısı
- **Hata yönetimi**: Kaydetme aşamasında hata olursa kullanıcıya uyarı gösterimi
- **Component mimarisi**: Tekrarlanan UI parçaları `StatsCard`, `ExerciseCard`, `CategoryFilter` gibi component’lere ayrıldı





## Teslimat Notu
- **Hedef kitle**: KOAH hastaları ve yakınları
- **Çözmek istediği problem**: Egzersizlere erişimi kolaylaştırmak, temel bilgilendirme sağlamak ve düzenli egzersizi teşvik etmek
- **Panodan ilham**: Sade arayüz, okunabilir kart yapısı, tutarlı renk paleti ve net başlık hiyerarşisi

## Çalışma Durumu ve Video Kaydı

Hocam merhaba,

Yaklaşık **2 gün boyunca** hem **APK çıktısı** hem de **Expo Go üzerinden paylaşılabilir link (EAS Build)** alabilmek için uğraştım.  
EAS Build tarafında Windows/OneDrive izinlerinden kaynaklanan `EPERM: operation not permitted` hataları ve Gradle tarafında JDK sürüm uyumsuzluğu yaşadığım için, build işlemlerini tamamlayamadım.

Uygulama kodu ve arayüzü sorunsuz çalışıyor. Bu yüzden:

- Uygulamayı gerçek cihazımda **Expo Go** ile ayağa kaldırdım,
- Tüm ekranların (ana sayfa, listeleme, detay, profil) **ekran videosunu** aldım,
- Bu videoyu, uygulamanın gerçekten çalıştığını göstermek için teslim ediyorum.

[youtube linki: https://youtube.com/shorts/I_5fAv5AuhM?si=ln40xoI-Q6wUtekg ]

## Teslim Gecikme Notu

Hocam, projeyi **geç saatte teslim etmemin sebebi** derste bilgisayar şarj aletimi okula getirmeyi unutmuş olmam.  
Bu yüzden derste veya hemen sonrasında projeyi GitHub’a ve sisteme yükleyemedim; 

