## Al-Quran Book

![Vercel](https://vercelbadge.vercel.app/api/wisnuwiry/alquran-id)
[![Build](https://github.com/wisnuwiry/alquran-id/actions/workflows/ci.yaml/badge.svg)](https://github.com/wisnuwiry/alquran-id/actions/workflows/ci.yaml)

Sebuah projek pribadi untuk aplikasi al-qur'an bahasa Indonesia digital berbasis web dan juga digital e-book. 

Project ini dibangun menggunakan beberapa tech-stack yaitu [Dart](https://dart.dev)(sebagai generator dari API quran.com ke markdown) dan [honkit](https://honkit.netlify.app) sebagai generator dari markdown ke web dan generate e-book dengan format (PDF, EPUB dan MOBI).

Versi digital web dapat diakses melalui alamat: [https://alquranid.vercel.app](alquranid.vercel.app)

Download Versi E-Book:

- [PDF](https://cdn.statically.io/gh/wisnuwiry/alquran-id/main/book/quran.pdf)
- [EPUB](https://cdn.statically.io/gh/wisnuwiry/alquran-id/main/book/quran.epub)
- [MOBI](https://cdn.statically.io/gh/wisnuwiry/alquran-id/main/book/quran.mobi)

## Cara Menjalankan Lewat Lokal Komputer

### Persyaratan

Harap install beberapa software ini supaya dapat berjalan proses generate booknya

- [Dart SDK](https://dart.dev)
- [Honkit](https://honkit.netlify.app)
- [Calibre Ebook](https://calibre-ebook.com)

### Run via Browser

```sh
npm install
npx honkit serve
```
Dan setelah compile selesai, buka di browser dengan alamat https://localhost:4000

### Generate Menjadi E-Book

```sh
// Untuk generate menjadi format PDF
npx honkit pdf

// Untuk generate menjadi format EPUB
npx honkit epub

// Untuk generate menjadi format MOBI
npx honkit mobi
```

### Refresh Al-Qur'an Data

Untuk merefresh data hasil generate dari Dart yang berasal dari API quran.com, jalankan di terminal seperti ini:

```sh
dart run bin/alquran_book.dart 
```

Di balik script dart tersebut, sebenarnya di dalam kode Dart memanggil API dari quran.com kemudian dari hasil response REST-API dart akan menerjemahkan ke dalam format markdown file.