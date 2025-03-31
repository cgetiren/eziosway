# Şövalyeler ve Tuarekler

El Morad ve Luferson krallıkları arasındaki efsanevi savaşın bir parçası olun! Bu NativeScript tabanlı mobil RPG oyununda, kendi karakterinizi oluşturun ve maceraya atılın.

## 🎮 Oyun Özellikleri

- İki farklı ırk seçeneği: İnsan ve Tuarek
- 6 farklı karakter sınıfı:
  - Savaşçı
  - Haydut
  - Suikastçı
  - Büyücü
  - Rahip
- Dinamik savaş sistemi
- Görev sistemi
- Envanter yönetimi
- Harita keşfi
- Karakter geliştirme sistemi

## 🛠 Gereksinimler

- Node.js (v14 veya üzeri)
- NativeScript CLI
- Android Studio (Android geliştirme için)
- Xcode (iOS geliştirme için, sadece macOS)

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/sovalyeler-ve-tuarekler.git
cd sovalyeler-ve-tuarekler
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. NativeScript CLI'ı yükleyin:
```bash
npm install -g nativescript
```

4. Projeyi çalıştırın:
```bash
ns preview
```

## 📱 Geliştirme

### Proje Yapısı

```
app/
├── main-page.xml      # Ana sayfa arayüzü
├── main-page.ts       # Ana sayfa mantığı
├── main-view-model.ts # Oyun mantığı ve veri modeli
├── app.css           # Stil dosyası
└── app.ts            # Uygulama başlangıç noktası
```

### Özellik Geliştirme

1. Yeni bir branch oluşturun:
```bash
git checkout -b feature/yeni-ozellik
```

2. Değişikliklerinizi commit edin:
```bash
git commit -m "Yeni özellik: Açıklama"
```

3. Branch'inizi push edin:
```bash
git push origin feature/yeni-ozellik
```

## 🎨 Tasarım

Oyun, modern ve kullanıcı dostu bir arayüze sahiptir:
- Tailwind CSS ile stillendirilmiş
- Responsive tasarım
- Özel animasyonlar
- Koyu tema

## 📦 Derleme

### Android için
```bash
ns build android
```

### iOS için
```bash
ns build ios
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- NativeScript ekibine
- Tüm katkıda bulunanlara
- Oyun testçilerine 