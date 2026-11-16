// Kunci kata sandi sederhana (HTTP Basic Auth) untuk situs prototipe.
// Aktif hanya jika environment variable SITE_PASSWORD diisi di Vercel (Settings → Environment Variables).
// Nama pengguna bebas; yang dicek hanya kata sandi.
export const config = { matcher: '/(.*)' };

const pass = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

export default function middleware(request) {
  const secret = process.env.SITE_PASSWORD;
  if (!secret) return pass();
  // Atas persetujuan pemilik (16 Nov 2026): berkas suara & gambar di /assets/ tidak dikunci,
  // karena Safari/iPhone tidak mengirim kata sandi saat memutar audio. Halaman prototipe tetap dikunci.
  if (new URL(request.url).pathname.startsWith('/assets/')) return pass();
  const auth = request.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try {
      const raw = atob(auth.slice(6));
      const pw = raw.slice(raw.indexOf(':') + 1);
      if (pw === secret) return pass();
    } catch (e) { /* header rusak → minta login lagi */ }
  }
  return new Response('Prototipe CRM PFI dilindungi kata sandi.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Prototipe CRM PFI", charset="UTF-8"', 'content-type': 'text/plain; charset=utf-8' }
  });
}
