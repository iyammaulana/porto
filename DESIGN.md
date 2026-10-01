# Design System — Portofolio Norma Irkham Maulana

Status: **draft, menunggu persetujuan**. Semua halaman dan konten wajib mengikuti dokumen ini. Kalau ada kasus yang tidak tercakup, tambahkan aturannya di sini dulu, baru bangun.

---

## 1. Konsep: "Process Registry"

Pekerjaan Norma: merancang, membangun, dan menjaga robot UiPath di production, plus web app, integrasi, dan AI gateway di sekitarnya. Dalam pekerjaan itu, setiap otomasi dikelola sebagai **process**: punya trigger, jadwal, robot yang menjalankannya, jalur exception, dan status. Itulah yang dilihat seorang RPA engineer setiap hari di Orchestrator, dan itu juga cara ia mendokumentasikan solusi (Solution Design Document).

Web ini meminjam dua hal itu, tanpa meniru tampilan atau warna UiPath:

- **Halaman utama = daftar process.** Setiap sistem yang dibangun tampil sebagai satu baris: nama, trigger, jadwal, sejak kapan di production, hasil. Seperti daftar process yang di-deploy, bukan galeri kartu.
- **Halaman project = solution design.** Strukturnya mengikuti cara RPA engineer menjelaskan solusi: trigger, input, langkah process, penanganan exception (business vs system), output, hasil.

Konsekuensi lain:

- Web dibaca seperti **CV panjang**, dari atas ke bawah. Tidak ada hero, tidak ada CTA berulang, tidak ada "section penjualan".
- Urutan halaman utama mengikuti CV: kop, ringkasan, pengalaman, process yang dibangun, keahlian, sertifikasi, pendidikan, kontak.

### Primitive tanda tangan: baris process

Satu bentuk diulang terus sampai menjadi identitas web: **baris tabel bergaris**, kolom tetap, angka rata kanan, status sebagai teks monospace.

```
PROCESS                          TRIGGER        RUNS          SINCE   MANUAL → AUTO
──────────────────────────────────────────────────────────────────────────────────
Dispute Resolution System        Portal poll    24/7          2023    60 → 5–10 min
Core Banking Realtime            API + queue    On request    2023    30 → 10 min
Visa settlement                  Schedule       Daily         2023    60 → 10 min
BI-Fast reconciliation           Schedule       Every 15 min  2022    —
```

Daftar process, angka dampak, pengalaman, sertifikasi: semua memakai primitive ini. Tidak ada kartu.

---

## 2. Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display: nama, judul project, angka besar | **IBM Plex Sans Condensed** 600 | Gaya editorial ala Awwwards: huruf raksasa yang rapat. Tetap satu keluarga Plex, jadi tidak ada pasangan font acak. |
| Teks & judul kecil | **IBM Plex Sans** | Netral dan teknis, bukan font default AI (Inter, Geist, Space Grotesk). Kebetulan satu keluarga dengan IBM AS400, salah satu sistem yang diotomasi Norma. |
| Angka, trigger, jadwal, status, nama teknis | **IBM Plex Mono** | Bahasa visual log robot dan konfigurasi Orchestrator. |

Aturan:

- Semua angka memakai `font-variant-numeric: tabular-nums` dan rata kanan di tabel.
- Skala teks tetap, tidak ada ukuran di luar daftar ini:
  `12 / 14 / 16 / 20 / 28 / 40 px`. Body 16px, line-height 1.6.
- Skala display (hanya Plex Sans Condensed, fluid):
  `display-m: clamp(40px, 6vw, 80px)` untuk judul section dan baris process,
  `display-l: clamp(56px, 11vw, 168px)` untuk nama dan judul project. Line-height 0.9, letter-spacing -0.02em.
- Judul memakai **sentence case**. Huruf kapital semua hanya untuk nilai sistem literal (`RUNNING`, `FAULTED`, `ROBOT`).
- Tidak ada kata miring sebagai aksen di judul. Tidak ada teks gradien.
- Berat font hanya 400 dan 600.

## 3. Warna

Mengikuti setting perangkat: terang atau gelap (`prefers-color-scheme`). Palet terang di bawah adalah acuan; palet gelap hanya membalik nilai yang sama, tanpa menambah warna, glow, atau efek baru.

| Token | Gelap |
|---|---|
| `--paper` | `#15171B` |
| `--ink` | `#E8E6E1` |
| `--ink-2` | `#9A9EA6` |
| `--rule` | `#2C2F35` |
| `--link` | `#8EA8F0` |
| `--faulted` | `#E07A70` |
| `--success` | `#6CC38D` |

Palet terang:

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--paper` | `#F6F4EF` | Latar halaman |
| `--ink` | `#16181D` | Teks utama |
| `--ink-2` | `#5A5F69` | Teks sekunder, label kolom |
| `--rule` | `#D9D5CC` | Garis tabel, pemisah |
| `--link` | `#1D3F9E` | Tautan dan fokus. Satu-satunya warna aksen. |
| `--faulted` | `#A3261B` | Hanya status `FAULTED` / `EXCEPTION` dan angka manual |
| `--success` | `#1F6B3A` | Hanya status `SUCCESSFUL` / `RUNNING` dan angka otomatis |

Aturan:

- Merah dan hijau adalah warna status job robot, **hanya** dipakai pada status atau angka, tidak pernah sebagai latar, ikon, atau dekorasi.
- Tidak meniru oranye UiPath atau elemen merek pihak lain.
- Tidak ada gradien, glow, blur, glassmorphism, atau bayangan.
- Kontras teks minimal WCAG AA.

## 4. Layout

- Rata kiri. Tidak ada blok teks rata tengah.
- Satu kolom teks maksimal **680px**. Tabel process boleh melebar sampai **1040px**.
- Jarak vertikal hanya kelipatan 8: `8 / 16 / 24 / 40 / 64 / 96`.
- Struktur dibentuk oleh **garis 1px** (`--rule`), bukan kotak, kartu, atau latar berwarna.
- Sudut **0px** di semua elemen. Tidak ada border berwarna di satu sisi.
- Label section di kiri, isi di kanan (gaya CV dua kolom) di layar ≥ 900px; ditumpuk di layar kecil.
- Di HP, tabel process boleh digulir horizontal di dalam wadahnya sendiri; halaman tidak pernah ikut tergulir ke samping.

## 5. Komponen yang diizinkan

Hanya ini. Komponen baru harus ditambahkan ke daftar ini dulu.

1. **Kop**: nama, jabatan, lokasi, kontak dalam satu blok rata kiri, seperti kop CV.
2. **Baris process**: tabel bergaris dengan kolom tetap (process, trigger, jadwal, sejak, hasil). Primitive utama.
3. **Memo**: paragraf teks biasa dengan label kiri (Konteks, Peran, Keputusan).
4. **Process log**: blok monospace statis berisi langkah alur dengan kolom aktor (`ROBOT` / `HUMAN` / `SYSTEM`). Menggantikan diagram alur bernomor.
5. **Status**: teks monospace `RUNNING` / `SUCCESSFUL` / `FAULTED` / `PENDING`, berwarna teks saja.
6. **Tautan**: teks `--link` bergaris bawah. Tautan keluar diberi `↗`. Tidak ada tombol pill.
7. **Gambar sertifikat**: thumbnail berbingkai garis 1px, dibuka penuh dalam dialog (Radix Dialog).
8. **Kompresi waktu**: daftar bar horizontal per process, skala 60 menit = lebar penuh. Garis putus-putus = waktu manual, bar penuh = waktu otomatis.
9. **Potret "indicate element"**: foto Norma hitam-putih berbingkai 1px, dengan kotak sorot biru di wajah dan caption berupa selector UiPath (`<webctrl tag='PERSON' ... />`, "✓ Selector valid · 1 match"). Foto dipotong di server sehingga orang lain di foto asli tidak pernah terkirim ke browser.
10. **Cuplikan log**: panel kecil yang mengikuti kursor saat hover baris process (hanya perangkat dengan mouse).
11. **Tabs**: memilih process log bila satu project punya lebih dari satu alur (Radix Tabs).
12. **Robot**: satu ikon kepala robot bergaris (persegi, dua mata, antena), tanpa sudut membulat, warna `--ink`. Hanya dipakai di tiga tempat: caption selector di potret (16px, berkedip sesekali), penanda aktor `ROBOT` di process log (14px), dan favicon. Tidak ada maskot, ilustrasi, atau robot di tempat lain.

Ditolak: **peta sistem** (jalur antar sistem per project). Membuat project terlihat lebih sederhana dari aslinya.

## 6. Yang dilarang (daftar anti AI slop)

Visual:

- Mode gelap permanen, latar grid, gradien, glow, blob, bayangan lembut.
- Kartu dengan border tipis + radius + shadow yang sama di mana-mana.
- Bento grid, deretan kartu fitur 3 kolom dengan ikon di atas.
- Badge/pill di atas H1, titik "status online" berkedip.
- Baris statistik besar (stat banner) di bawah hero.
- Langkah bernomor `01 02 03` dalam lingkaran.
- Fade-up generik di setiap blok, efek mengetik, kursor berkedip, hover yang mengangkat elemen. (Gerak yang diizinkan diatur di bagian 9.)
- Emoji dan ikon dekoratif.

Struktur:

- Pola landing page: hero → stats → fitur → testimoni → CTA.
- Tombol CTA berulang ("Get in touch", "Let's talk").

## 7. Aturan copywriting

Bahasa situs: Inggris. Suara: orang pertama, lugas, seperti engineer menjelaskan ke engineer lain.

Wajib:

- **Setiap klaim punya angka atau nama sistem.** "Cut Visa settlement from 60 to 10 minutes", bukan "streamlined settlement".
- **Kata kerja lampau dan konkret**: built, parsed, replaced, posted, reconciled.
- Judul section adalah **label**, bukan slogan: "Experience", "Systems", bukan "Systems that close the loop".
- Maksimal ~25 kata per kalimat. Satu ide per kalimat.
- Sebut batas peran dengan jujur saat relevan (siapa membangun bagian lain).

Dilarang:

- Em dash (—) di kalimat. Pakai titik atau koma. (Rentang angka pakai en dash: 5–10.)
- Pola "not just X, but Y" / "doesn't just X, it Y" / "X, not Y" sebagai pembuka.
- Formula "I turn X into Y", "I help companies…", "passionate about…".
- Pertanyaan retoris sebagai judul ("Have a process that still takes hours?").
- Rangkaian tiga kata sifat ("fast, reliable, and scalable").
- Kata: seamless, robust, leverage, cutting-edge, delve, landscape, journey, empower, unlock, elevate, game-changer, passionate, innovative, crucial, pivotal.
- Ajakan menjual di akhir section.

Uji sebelum menerbitkan teks:

1. Apakah kalimat ini masih benar kalau nama Norma diganti orang lain? Kalau ya, terlalu generik. Tulis ulang dengan fakta spesifik.
2. Apakah ada angka, nama sistem, atau keputusan teknis? Kalau tidak, hapus atau isi.
3. Hitung em dash. Harus nol.

## 8. Struktur halaman

### Halaman utama (`/`)

1. Kop: nama, jabatan, perusahaan, lokasi, email, LinkedIn, unduh CV.
2. Ringkasan: 2–3 kalimat faktual.
3. Pengalaman: Bank Mega, Hackathon ICStar.
4. Process yang dibangun: semua project sebagai baris process, tautan ke halaman solution design.
5. Keahlian: tabel dua kolom (kategori, daftar), teks biasa.
6. Sertifikasi & pendidikan.
7. Kontak: satu baris email dan LinkedIn.

### Solution design (`/projects/[slug]`)

Urutan tetap untuk semua project, mengikuti cara RPA engineer mendokumentasikan solusi:

1. Header: judul, peran, sejak kapan di production, status.
2. Ringkasan satu paragraf.
3. Spesifikasi: trigger, jadwal, input, output, robot yang terlibat (tabel dua kolom).
4. Hasil: baris Manual → Otomatis.
5. Konteks: masalah sebelum otomasi.
6. Process log: alur langkah dengan aktor.
7. Exception handling: business exception vs system exception, dan apa yang terjadi saat gagal.
8. Keputusan teknis.
9. Stack: daftar teks dipisah titik tengah ( · ).
10. Navigasi: sebelumnya / berikutnya.

## 9. Gerak (motion)

Acuan: portofolio pemenang Awwwards (smooth scroll berbobot, tipografi kinetik, section yang di-pin saat scroll). Pembedanya: **setiap gerak di web ini membawa data atau urutan nyata dari pekerjaan Norma.** Gerak yang hanya dekorasi tidak dipakai.

Yang diizinkan:

| Gerak | Data yang dibawa |
|---|---|
| Nama muncul per huruf saat halaman dibuka (sekali) | Identitas. Satu-satunya gerak dekoratif, dibatasi di kop. |
| Judul section muncul per baris saat masuk layar | Penanda pindah section. Hanya judul, tidak pernah paragraf atau kartu. |
| **Kompresi waktu**: saat section terlihat, bar setiap process menyusut dari durasi manual ke durasi otomatis, angkanya ikut turun. Diputar sekali berbasis waktu (bukan posisi scroll), jadi selalu selesai | Angka manual → otomatis yang asli dari setiap project. Momen tanda tangan web ini. |

Aturan tambahan: **animasi yang menampilkan angka tidak boleh terikat posisi scroll (scrub).** Kalau pengunjung berhenti di tengah, layar akan menunjukkan angka yang salah.
| Potret: foto terbuka dari atas, kotak sorot muncul di wajah, baris selector muncul berurutan lalu "✓ Selector valid". Sekali, saat halaman dibuka | Cara robot UiPath mengenali elemen di layar, pekerjaan Norma sehari-hari. |
| Hover baris process memunculkan cuplikan process log yang mengikuti kursor | Langkah robot yang sebenarnya, ganti gambar thumbnail. |
| Langkah process log menyala berurutan saat discroll, garis progres terisi | Urutan eksekusi robot. |
| Mata robot berkedip tiap ~5 detik | Satu-satunya gerak "karakter", dijaga sekecil mungkin. |

Aturan teknis:

- Library: **GSAP + ScrollTrigger + SplitText** untuk animasi yang terikat scroll, **Motion** untuk interaksi (hover, layout, tab), **Lenis** untuk smooth scroll, **Radix UI** untuk komponen interaktif yang aksesibel (tabs, dialog). Radix adalah fondasi shadcn/ui; tampilannya mengikuti token di dokumen ini, bukan gaya bawaan shadcn.
- Semua animasi dibungkus `prefers-reduced-motion: no-preference`. Dengan reduced motion: smooth scroll mati, semua konten tampil langsung di posisi akhir.
- Durasi 0.4–0.9 detik, easing `power3.out` / `expo.out`. Tidak ada bounce atau elastic.
- Konten tidak boleh tersembunyi kalau JavaScript gagal: state awal animasi diatur oleh JavaScript, bukan oleh CSS.

---

## Sumber riset

- AI design slop, 16 pola dan perbaikannya: https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- Kenapa UI buatan AI terlihat generik: https://smoothui.dev/blog/ai-design-slop
- Tanda website buatan AI: https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated
- Frasa dan tanda tulisan AI: https://www.ritnerdigital.com/blog/the-phrases-that-give-away-ai-writing-and-how-to-edit-them-out-before-they-cost-you-trust
- Em dash sebagai tanda tulisan AI: https://www.techradar.com/computing/artificial-intelligence/did-chatgpt-ruin-the-em-dash-heres-how-to-stop-it-putting-them-everywhere
- Tipografi fintech dan angka tabular: https://medium.com/design-bootcamp/the-elements-of-fintech-typography-part-1-readable-money-b6c1226acbde
- Panduan angka dalam tipografi: https://ilovetypography.com/2025/05/22/a-font-lovers-guide-to-numerals/
- Contoh portofolio engineer: https://www.sitebuilderreport.com/inspiration/engineer-portfolios
- Awwwards, portofolio terbaik: https://www.awwwards.com/websites/portfolio/
- Awwwards, situs GSAP terbaik: https://www.awwwards.com/websites/gsap/
- Awwwards, Portfolio '26 (fintech, GSAP): https://www.awwwards.com/sites/portfolio-26
