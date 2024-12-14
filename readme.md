# Personal Notes Starter

## Deskripsi
**Personal Notes Starter** adalah aplikasi web sederhana untuk mengelola catatan. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, mengarsipkan, dan menghapus catatan. Selain itu, aplikasi mendukung pencarian catatan, pengelompokan catatan aktif dan arsip, serta fitur *speech-to-text* untuk menambahkan catatan secara langsung melalui suara.

## Fitur
1. **Kelola Catatan**
   - Tambah catatan baru.
   - Arsipkan atau hapus catatan.
   - Lihat detail catatan.
2. **Pencarian**
   - Cari catatan berdasarkan judul.
3. **Pengelompokan**
   - Pisahkan catatan aktif dan arsip.
4. **Speech-to-Text**
   - Dukungan untuk bahasa Indonesia
5. **Keyboard Shortcuts**
   - **Ctrl+Shift+D**: Hapus semua catatan.
   - **Ctrl+D**: Hapus catatan yang dipilih.
   - **Ctrl+Shift+A**: Arsipkan semua catatan.
   - **Ctrl+A**: Arsipkan catatan yang dipilih.
   - **Ctrl+S**: Aktifkan atau hentikan *speech-to-text*.

## Instalasi

### Prasyarat
- Node.js (versi terbaru)
- npm atau yarn

### Langkah Instalasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/yazidDev88/dicoding-noto
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd personal-notes-starter
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
   atau jika menggunakan yarn:
   ```bash
   yarn install
   ```
4. Jalankan proyek:
   ```bash
   npm run dev
   ```
   atau jika menggunakan yarn:
   ```bash
   yarn dev
   ```
5. Buka aplikasi di browser di `http://localhost:5173`.

## Struktur Proyek
```
.
├── src
│   ├── components
│   │   ├── Card.jsx
│   │   ├── Container.jsx
│   │   ├── FormNote.jsx
│   │   ├── NoteDetail.jsx
│   │   ├── Notes.jsx
│   │   └── NoteList.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── utils.js
├── public
│   └── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Teknologi yang Digunakan
- **React**: Untuk membuat antarmuka pengguna.
- **Vite**: Untuk pengembangan aplikasi.
- **SpeechRecognition API**: Untuk mendukung *speech-to-text*.

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
