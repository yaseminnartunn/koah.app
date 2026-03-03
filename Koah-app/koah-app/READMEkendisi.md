# KOAH Egzersiz Uygulaması - Teslimat Notları

Bu proje bir **Web Tabanlı Mobil Uygulama (Vite/React)** olarak geliştirilmiştir. Yarışma teslimatı için aşağıdaki seçenekleri kullanabilirsiniz:

## 1. Kaynak Kodlar (Teslim Edilmesi Gereken)
Projenin tüm kaynak kodları bu ZIP dosyasının içindedir. GitHub'a yüklemek için:
1. `node_modules` klasörü hariç tüm dosyaları GitHub deponuza yükleyin.
2. `README.md` dosyasının projenizi iyi açıkladığından emin olun.

## 2. Uygulama Çıktısı (Alternatifler)

### 📱 Neden APK Dosyası Yok?
Bu proje **React/Vite** (Web teknolojileri) ile yazılmıştır. Bu formatın doğrudan bir APK'sı olmaz. Bunun yerine "Web App" olarak sunulur. Eğer jüri APK istiyorsa, bu dosyayı bir "Web-to-APK" (örneğin: WebIntoApp.com veya Capacitor) servisinden gecirerek APK alabilirsiniz.

### 🔗 Expo Linki Yerine Ne Kullanılmalı? (En İyi Seçenek)
Web uygulamalarında Expo linkinin karşılığı **Canlı Web Bağlantısıdır**.
1. Projeyi **Vercel** veya **Netlify** platformuna (ikisi de ücretsiz) GitHub deponuz üzerinden bağlayın.
2. Size verilen `.vercel.app` veya `.netlify.app` linkini jüriye "Uygulama Linki" olarak iletin. Bu link, telefonda açıldığında tıpkı bir uygulama (Expo gibi) gibi çalışacaktır.

### 📦 Proje Build (dist)
`dist` klasörü projenin yayına hazır (derlenmiş) halidir. Herhangi bir web sunucusuna atıldığında doğrudan çalışır.

---
**Geliştirici Notu:** Uygulama tamamen **localStorage** ile çalıştığı için internet olmasa bile veriler (bugünkü egzersizler, toplam sayılar vb.) kullanıcının cihazında saklanır ve çalışmaya devam eder.
