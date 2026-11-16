# Prototipe CRM Keanggotaan PFI

Situs statis prototipe Fase 1 (Portal Admin Sekretariat + Portal Anggota HP).
Platform dibuat oleh PT CaritaHub Peduli Lansia. Direktori anggota dari data publik PFI; angka lain simulasi; kontak tersamar/fiktif.

- `index.html` — prototipe interaktif (otomatis pas layar; di HP fokus ke aplikasi anggota)
- `assets/` — logo & gambar
- Deploy: Vercel, framework "Other", tanpa build command.
- Kunci kata sandi: `middleware.js` (HTTP Basic Auth), aktif bila `SITE_PASSWORD` diisi di Vercel → Settings → Environment Variables (Production). Nama pengguna bebas.
