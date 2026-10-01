# Design System v2 — Portofolio Norma Irkham Maulana

Status: **v2, branch `v2`**. Ukuran, spacing, warna, area klik, dan gerak mengikuti **Apple Human Interface Guidelines (HIG)**. Identitas (konsep, font, larangan AI slop, copywriting) tetap dari v1.

Semua halaman dan konten wajib mengikuti dokumen ini. Semua nilai di CSS memakai token di bawah. Nilai px mentah di luar blok token butuh alasan tertulis di sini. Kalau ada kasus yang tidak tercakup, tambahkan aturannya di sini dulu, baru bangun.

---

## 1. Konsep: "Process Registry"

Pekerjaan Norma: merancang, membangun, dan menjaga robot UiPath di production, plus web app, integrasi, dan AI gateway di sekitarnya. Setiap otomasi dikelola sebagai **process**: punya trigger, jadwal, robot yang menjalankannya, jalur exception, dan status. Itu yang dilihat RPA engineer setiap hari di Orchestrator, dan begitu juga cara ia mendokumentasikan solusi (Solution Design Document).

- **Halaman utama = daftar process.** Setiap sistem tampil sebagai satu baris: nama, trigger, jadwal, sejak kapan di production, hasil.
- **Halaman project = solution design.** Trigger, input, langkah process, exception handling (business vs system), output, hasil.
- Web dibaca seperti **CV panjang**, dari atas ke bawah. Tidak ada CTA berulang atau "section penjualan".
- Tidak meniru tampilan atau warna oranye UiPath.

---

## 2. Tipografi

### Font

| Peran | Font | Alasan |
|---|---|---|
| Display: nama, judul section, judul project, angka besar | **IBM Plex Sans Condensed** 600 | Editorial dan rapat. Satu keluarga Plex. |
| Teks | **IBM Plex Sans** 400 / 600 | Bukan font default AI. Satu keluarga dengan IBM AS400 yang diotomasi Norma. |
| Angka, trigger, jadwal, status, kode | **IBM Plex Mono** 400 / 600 | Bahasa visual log robot dan Orchestrator. |

SF Pro (font Apple) tidak dipakai sebagai web font karena lisensinya hanya untuk aplikasi di platform Apple. Fallback stack tetap menyertakan `-apple-system` sehingga perangkat Apple jatuh ke SF bila Plex gagal dimuat.

### Skala ukuran

Diambil dari text styles iOS di HIG (ukuran default "Large"). Satu-satunya tambahan: tiga ukuran display untuk judul web.

| Token | Gaya Apple | Ukuran | Tinggi baris | Pakai untuk |
|---|---|---|---|---|
| `--t-caption2` | Caption 2 | 11 | 13 | Label kecil di atas gambar (tag `person`). Ukuran minimum. |
| `--t-caption1` | Caption 1 | 12 | 16 | Eyebrow, meta, index, caption, kode selector |
| `--t-footnote` | Footnote | 13 | 18 | Top bar, link sekunder, nilai di bar, process log |
| `--t-subhead` | Subhead | 15 | 20 | Tabel, baris kompresi, stack, tab |
| `--t-callout` | Callout | 16 | 21 | Angka "sebelum" di hasil project |
| `--t-body` | Body | 17 | 25* | Semua teks berjalan. Default. |
| `--t-title3` | Title 3 | 20 | 25 | Tagline, ringkasan project, judul keputusan |
| `--t-title2` | Title 2 | 22 | 28 | Cadangan |
| `--t-title1` | Title 1 | 28 | 34 | Judul entri pengalaman |
| `--t-large` | Large Title | 34 | 41 | Batas bawah semua ukuran display |
| `--t-display-s` | (web) | 34–48 fluid | 1.0 | Judul baris process, angka hasil project |
| `--t-display-m` | (web) | 34–64 fluid | 0.95 | Judul section, email kontak, judul "next" |
| `--t-display-l` | (web) | 48–96 fluid | 0.95 | Nama, judul project, angka kompresi |

\* HIG memakai 22pt untuk body di UI aplikasi. Untuk paragraf panjang di web dipakai 25px (1.47), sama dengan apple.com.

Aturan:

- Tidak ada ukuran di luar tabel ini. Minimum 11px (batas HIG iOS).
- Berat hanya 400 dan 600. HIG melarang Ultralight, Thin, dan Light.
- Semua angka memakai `tabular-nums` dan rata kanan di tabel.
- Judul memakai sentence case. Huruf kapital semua hanya untuk nilai sistem literal (`RUNNING`, `ROBOT`, `BUSINESS`).
- Tidak ada kata miring sebagai aksen dan tidak ada teks gradien.

---

## 3. Warna

Peran semantik ala Apple (label, secondary label, separator, background, link). Mengikuti setting perangkat lewat `prefers-color-scheme`. Warna sistem memakai varian **increased contrast** dari HIG supaya lolos kontras untuk teks.

| Token | Peran Apple | Terang | Gelap | Pakai untuk |
|---|---|---|---|---|
| `--bg` | systemBackground | `#FFFFFF` | `#000000` | Latar halaman |
| `--bg-2` | secondarySystemBackground | `#F2F2F7` | `#1C1C1E` | Latar foto saat dimuat |
| `--label` | label | `#000000` | `#FFFFFF` | Teks utama, garis kepala section |
| `--label-2` | secondary text | `#6E6E73` | `#98989D` | Teks sekunder, meta, kolom tabel |
| `--label-3` | systemGray | `#8E8E93` | `#636366` | Hanya non-teks (outline, ikon). Tidak lolos kontras untuk teks kecil. |
| `--separator` | opaqueSeparator | `#C6C6C8` | `#38383A` | Garis tabel dan pemisah |
| `--link` | systemBlue (increased contrast) | `#1E6EF4` | `#5CB8FF` | Tautan, fokus, kotak sorot potret, aktor `HUMAN` |
| `--success` | systemGreen (increased contrast) | `#008932` | `#4AD968` | Angka otomatis, status `RUNNING` |
| `--error` | systemRed (increased contrast) | `#E9152D` | `#FF6165` | Angka manual, garis putus-putus "sebelum" |

Kontras (HIG = WCAG AA):

| Teks | Minimum |
|---|---|
| Sampai 17px | 4.5:1 |
| 18px ke atas, atau tebal | 3:1 |

Semua token teks di atas sudah dicek ≥ 4.5:1 terhadap `--bg` masing-masing mode.

Aturan:

- Biru adalah satu-satunya warna aksen. Merah dan hijau hanya untuk angka sebelum/sesudah dan status.
- Warna tidak pernah jadi satu-satunya penanda (HIG). Angka manual juga dicoret atau diberi label, status juga ditulis sebagai teks.
- Tidak ada gradien, glow, blur, glassmorphism, atau bayangan.

---

## 4. Spacing, ukuran, dan layout

### Spacing: grid 8 poin

| Token | px | Contoh pakai |
|---|---|---|
| `--s-1` | 4 | Jarak judul–meta, sel unit orang |
| `--s-2` | 8 | Jarak kecil dalam komponen |
| `--s-3` | 12 | Padding baris tabel |
| `--s-4` | 16 | Antar paragraf, gutter HP |
| `--s-5` | 24 | Antar elemen dalam section, gutter tablet |
| `--s-6` | 32 | Antar keputusan |
| `--s-7` | 40 | Kepala section ke isi, gutter desktop |
| `--s-8` | 48 | Padding section project |
| `--s-9` | 64 | Padding hero |
| `--s-10` | 80 | Kolom index section |
| `--s-11` | 96 | Padding section besar |
| `--s-12` | 120 | Jarak antar section beranda |

Tidak ada jarak di luar daftar ini.

### Lebar

| Token | Nilai | Asal |
|---|---|---|
| `--w-page` | 980px | Lebar konten apple.com |
| `--w-text` | 692px | Lebar baca paragraf (~70 karakter di 17px) |
| `--gutter` | 40 / 24 / 16px | Desktop / tablet / HP |

### Breakpoint (apple.com)

| Nama | Lebar | Perubahan |
|---|---|---|
| Large | > 1068px | Layout penuh |
| Medium | ≤ 1068px | Hero dan kepala kompresi jadi satu kolom, link top bar disembunyikan |
| Small | ≤ 734px | Semua dua kolom ditumpuk, gutter 16px |

Layout mengikuti lebar layar, bukan jenis perangkat (HIG).

### Ukuran area klik

| Perangkat | Minimum | Sumber |
|---|---|---|
| Layar sentuh (`pointer: coarse`) | 44 × 44px | HIG iOS |
| Mouse / trackpad | 28 × 28px | HIG macOS |

Berlaku untuk link top bar, link hero, tab, tombol tutup dialog, caption sertifikat, dan link kembali di halaman project. Token: `--target`.

### Aturan layout lain

- Rata kiri. Elemen terpenting di kiri atas (HIG).
- Struktur dibentuk garis 1px (`--hairline`, `--separator`), bukan kartu atau latar berwarna.
- Sudut 0px di semua elemen. Ini pilihan identitas, berbeda dari sudut membulat Apple.
- Tabel lebar boleh digulir horizontal di wadahnya sendiri; halaman tidak pernah ikut tergulir ke samping.

---

## 5. Komponen yang diizinkan

Hanya ini. Komponen baru harus ditambahkan ke daftar ini dulu.

1. **Kop**: nama, jabatan, perusahaan, lokasi, kontak.
2. **Baris process**: daftar process dengan kolom tetap (nama, jenis, trigger, jadwal, sejak, hasil).
3. **Memo**: paragraf dengan label kiri (Context, What I built, Decisions).
4. **Process log**: langkah alur dengan kolom aktor (`ROBOT` / `HUMAN` / `SYSTEM`).
5. **Status**: teks monospace `RUNNING` / `PILOT`, berwarna teks saja.
6. **Tautan**: teks `--link` bergaris bawah. Tautan keluar diberi `↗`. Tidak ada tombol pill.
7. **Sertifikat**: thumbnail berbingkai 1px, dibuka penuh dalam dialog (Radix Dialog).
8. **Kompresi waktu**: bar per process, 60 menit = lebar penuh. Garis putus-putus = manual, bar penuh = otomatis.
9. **Kompresi orang**: satu kotak per orang. Garis putus-putus = tidak dibutuhkan lagi, penuh = tetap di process.
10. **Potret "indicate element"**: foto Norma berwarna, bingkai 1px, kotak sorot biru di wajah, caption berupa selector UiPath. Yang dipakai adalah `public/norma.jpeg`, foto yang sudah dipotong Norma sendiri (3:4), sehingga orang lain di foto asli tidak ikut. Foto asli tidak pernah di-commit.
11. **Cuplikan log**: panel yang mengikuti kursor saat hover baris process (hanya perangkat dengan mouse).
12. **Tabs**: memilih process log bila satu project punya lebih dari satu alur (Radix Tabs).
13. **Robot**: satu ikon kepala robot bergaris. Hanya di caption potret (16px), penanda aktor `ROBOT` (14px), dan favicon.

Ditolak:

- **Peta sistem** (jalur antar sistem per project): membuat project terlihat lebih sederhana dari aslinya.
- **Panel jadwal** di hero: gimmick, tidak menjelaskan Norma.

---

## 6. Yang dilarang (anti AI slop)

Visual:

- Mode gelap permanen, latar grid, gradien, glow, blob, bayangan lembut.
- Kartu dengan border + radius + shadow yang sama di mana-mana.
- Bento grid, kartu fitur 3 kolom dengan ikon di atas.
- Badge/pill di atas H1, titik "status online" berkedip.
- Baris statistik besar (stat banner) di bawah hero.
- Langkah bernomor dalam lingkaran.
- Fade-up generik di setiap blok, efek mengetik, kursor berkedip, hover yang mengangkat elemen.
- Emoji dan ikon dekoratif.

Struktur:

- Pola landing page: hero → stats → fitur → testimoni → CTA.
- Tombol CTA berulang ("Get in touch", "Let's talk").

---

## 7. Aturan copywriting

Bahasa situs: Inggris. Orang pertama, lugas, seperti engineer menjelaskan ke engineer lain.

Wajib:

- Setiap klaim punya angka atau nama sistem.
- Kata kerja lampau dan konkret: built, parsed, replaced, posted, reconciled.
- Judul section adalah label, bukan slogan.
- Maksimal ~25 kata per kalimat.
- Sebut batas peran dengan jujur saat relevan.
- Konten hanya dari CV, sertifikat, dokumen project, dan hal yang sudah dikonfirmasi Norma.

Dilarang:

- Em dash (—) di kalimat. Rentang angka pakai en dash: 5–10.
- Pola "not just X, but Y" / "doesn't just X" / "X, not Y".
- Formula "I turn X into Y", "I help companies…", "passionate about…".
- Pertanyaan retoris sebagai judul.
- Rangkaian tiga kata sifat.
- Kata: seamless, robust, leverage, cutting-edge, delve, landscape, journey, empower, unlock, elevate, game-changer, passionate, innovative, crucial, pivotal.

Uji sebelum menerbitkan teks:

1. Masih benar kalau nama Norma diganti orang lain? Kalau ya, terlalu generik.
2. Ada angka, nama sistem, atau keputusan teknis? Kalau tidak, hapus atau isi.
3. Jumlah em dash harus nol.

---

## 8. Struktur halaman

### Beranda (`/`)

1. Hero: nama (Title 1, 28px) dan jabatan di atas; headline "I turn ~~hours~~ of banking operations into minutes." sebagai teks terbesar (pengecualian yang disetujui Norma untuk larangan formula "I turn X into Y", karena didukung angka 1–2 h → 3–10 min) ("hours" abu-abu dan dicoret, "minutes" bergaris bawah, tanpa warna aksen); deskripsi; baris bukti; baris fokus; link kontak; potret di kanan. Nama sengaja tidak dibuat raksasa: yang paling besar adalah pesan dan buktinya.
2. Kompresi waktu.
3. Kompresi orang.
4. Processes I built.
5. Experience (termasuk pendidikan).
6. Skills.
7. Certifications.
8. Contact.

### Halaman project (`/projects/[slug]`)

1. Header: jenis, sejak, status, judul, ringkasan.
2. Hasil: manual → otomatis.
3. Specification.
4. Context.
5. What I built.
6. Robots (bila ada).
7. Process log.
8. Exception handling.
9. Decisions.
10. Scope (bila ada).
11. Stack.
12. Next process.

---

## 9. Gerak (motion)

HIG: gerak harus punya tujuan, singkat, tidak memaksa orang menunggu, dan opsional. Di web ini setiap gerak membawa data atau urutan nyata dari pekerjaan Norma.

| Gerak | Data yang dibawa |
|---|---|
| Headline hero muncul per baris saat halaman dibuka (sekali) | Pesan utama: waktu proses dari jam ke menit. |
| Judul section muncul per baris saat masuk layar | Penanda pindah section. Hanya judul. |
| Potret: foto terbuka, kotak sorot muncul di wajah, baris selector muncul, lalu "✓ Selector valid" (sekali) | Cara robot UiPath mengenali elemen di layar. |
| Kompresi waktu dan orang: bar menyusut / kotak mengosong, angka turun (sekali, berbasis waktu) | Angka manual → otomatis asli dari setiap project. |
| Hover baris process memunculkan cuplikan log | Langkah robot yang sebenarnya. |
| Langkah process log menyala berurutan saat discroll | Urutan eksekusi robot. |
| Mata robot berkedip tiap ~5 detik | Gerak "karakter" satu-satunya, sekecil mungkin. |

Aturan:

- **Animasi yang menampilkan angka tidak boleh terikat posisi scroll.** Kalau pengunjung berhenti di tengah, layar menunjukkan angka yang salah.
- Durasi 0.4–1.6 detik, easing `power3` / `expo`. Tidak ada bounce atau elastic (HIG).
- Reduced motion: smooth scroll mati, semua animasi mati, konten tampil langsung di posisi akhir.
- Konten tidak boleh tersembunyi kalau JavaScript gagal: state awal animasi diatur JavaScript, bukan CSS.
- Library: GSAP (ScrollTrigger, SplitText), Motion, Lenis, Radix UI (fondasi shadcn/ui, dengan gaya dari dokumen ini).

---

## Sumber riset

Apple:

- HIG Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- HIG Color: https://developer.apple.com/design/human-interface-guidelines/color
- HIG Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- HIG Accessibility (area klik, kontras): https://developer.apple.com/design/human-interface-guidelines/accessibility
- HIG Motion: https://developer.apple.com/design/human-interface-guidelines/motion

Anti AI slop dan referensi visual:

- AI design slop, 16 pola: https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- Kenapa UI buatan AI terlihat generik: https://smoothui.dev/blog/ai-design-slop
- Tanda website buatan AI: https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated
- Frasa tulisan AI: https://www.ritnerdigital.com/blog/the-phrases-that-give-away-ai-writing-and-how-to-edit-them-out-before-they-cost-you-trust
- Em dash sebagai tanda tulisan AI: https://www.techradar.com/computing/artificial-intelligence/did-chatgpt-ruin-the-em-dash-heres-how-to-stop-it-putting-them-everywhere
- Tipografi fintech dan angka tabular: https://medium.com/design-bootcamp/the-elements-of-fintech-typography-part-1-readable-money-b6c1226acbde
- Awwwards portofolio: https://www.awwwards.com/websites/portfolio/
- Awwwards nominees: https://www.awwwards.com/websites/nominees/
