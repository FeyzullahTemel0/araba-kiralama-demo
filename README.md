# RotaCar Araç Kiralama Demo

RotaCar, müşteri sunumlarında kullanılmak üzere hazırlanmış kurgusal bir araç kiralama arayüzüdür. Bu proje Temeloji Dijital'in herhangi bir mevcut sitesine veya veritabanına bağlı değildir.

## Yerel geliştirme

```bash
npm install
npm run dev
```

## Komutlar

- `npm run dev` — yerel geliştirme sunucusu
- `npm run lint` — ESLint kontrolü
- `npm run build` — production derlemesi
- `npm run start` — production sunucusu

## Vercel

Projeyi bağımsız GitHub deposu olarak ekleyip Vercel'de Framework Preset olarak **Next.js** seçin. Ek environment variable veya harici servis gerekmez.

## Demo güvenliği ve kapsamı

- Rezervasyon akışı yalnızca tarayıcıdaki geçici arayüz state'ini kullanır; bilgi sunucuya gönderilmez veya kalıcı saklanmaz.
- Gerçek ödeme, iletişim, kimlik veya ehliyet bilgisi istenmez.
- Rezervasyon onayı ve paneldeki tüm kayıtlar örnek veridir. Gerçek rezervasyon, filo veya işletme koşulu sunmaz.
- İşletme panelindeki örnek talep akışı ve metrikler 10 saniyede bir yalnızca ekranda simüle edilir; rezervasyon formu panelle veri paylaşmaz.
- Görseller `public/images` altında yerel dosyalardır; çalışma anında harici görsel sunucusuna ihtiyaç duyulmaz.
