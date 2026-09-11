# Mohamad Fikri & Husna Syakirin

Kad jemputan digital Melayu premium yang dibina sebagai kad bercetak dahulu, pengalaman digital kemudian. Reka bentuk menggunakan ivory paper, emerald heritage, antique gold, monogram, ornamen, animasi ceremonial yang terkawal, dan layout yang sesuai untuk cetakan.

## Jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Ubah kandungan

Semua maklumat perkahwinan berada di [src/data/wedding.ts](src/data/wedding.ts):

- nama pasangan, tarikh, venue, alamat dan pautan peta
- RSVP, WhatsApp, jadual dan galeri
- maklumat hadiah, dress code, parking dan wishes

Nama tetamu boleh dipaparkan secara peribadi melalui `?kepada=Ahmad%20bin%20Ali`. Input dihadkan kepada 60 aksara dan aksara HTML dibersihkan.

## Tema

Tukar satu baris `activeTheme` dalam [src/data/theme.ts](src/data/theme.ts) kepada `emerald`, `maroon`, `ivory` atau `midnight`. Semua tema berkongsi struktur yang sama.

## Interaksi

- Pembukaan kad dengan reveal halus dan wax-seal pulse
- Reveal seksyen sekali sahaja menggunakan `IntersectionObserver`
- Share melalui Web Share API atau salin pautan
- Muat turun kalendar `.ics` tanpa backend
- Galeri lightbox dengan Escape dan anak panah keyboard
- Ucapan melalui WhatsApp, RSVP dan lokasi luaran
- Copy nombor akaun dengan maklum balas `Disalin`
- `prefers-reduced-motion` mematikan motion bukan penting

Bunyi tidak diaktifkan kerana tiada aset audio disertakan. Ini memastikan jemputan kekal opt-in dan ringan.

## Build dan deploy

```bash
npm run lint
npm run build
```

`output: "export"` menghasilkan folder `/out`. Projek boleh dideploy ke Vercel, Netlify, GitHub Pages, atau static host lain. Tiada database, API route, environment variable, atau backend diperlukan.

## Cetak

Gunakan Ctrl/Cmd+P. Print CSS menyembunyikan navigasi, galeri, countdown, RSVP dan kawalan interaktif supaya kandungan utama kekal seperti suite jemputan.

## SEO dan aset

Metadata, Open Graph dan canonical URL berada di [src/app/layout.tsx](src/app/layout.tsx). Visual perkongsian statik berada di [public/og.svg](public/og.svg). Untuk domain sebenar, kemas kini `metadataBase`, canonical, sitemap dan URL sosial sebelum deploy.

## Nota teknikal

Projek menggunakan Next.js App Router, React, TypeScript strict dan CSS native. Imej contoh kini menggunakan URL Unsplash yang boleh diganti dengan aset lokal WebP/AVIF dalam konfigurasi galeri.
