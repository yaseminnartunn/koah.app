# Mobile (Expo) — KOAH Egzersiz

Bu klasör Expo (React Native) mobil uygulamasını içerir.

## Kurulum
```bash
npm install
```

## Çalıştırma
```bash
npx expo start --clear
```

Port doluysa:
```bash
npx expo start --clear --port 8082
```

## Sık Karşılaşılan Sorunlar
- **NativeWind / PostCSS hatası** görürsen: `node_modules` + `.expo` temizleyip tekrar `npm install` yap.

## Expo Linki (Publish) (opsiyonel)
Expo Go ile paylaşılabilir link için güncel yaklaşım **EAS Update**:

```bash
npm i -g eas-cli
eas login
eas init
eas update --branch preview --message "Initial publish"
```

Komut çıktısında verilen linki teslim edebilirsin.

## APK Alma (Android) (opsiyonel)
Bu proje için `eas.json` içinde `apk` profili hazır.

```bash
npm i -g eas-cli
eas login
eas init
eas build -p android --profile apk
```

Build bittikten sonra EAS sana indirilebilir bir `.apk` linki verecek.

