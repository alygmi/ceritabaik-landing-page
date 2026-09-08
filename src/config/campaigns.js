
import { coverFor, iconFor } from './brand';

/**
 * Data contoh. Bentuk objek sengaja dibuat menyerupai payload API supaya
 * penggantian ke fetch() nanti tidak mengubah komponen.
 * `raised` & `target` disimpan sebagai angka; format rupiah dan persentase
 * dihitung di src/utils/format.js.
 */
export const campaigns = [
  {
    id: 1,
    title: 'Qurban Baik 2026',
    tag: 'Keagamaan',
    raised: 601098,
    target: 10000000,
    status: 'aktif',
    deadline: '2026-12-31',
    img: coverFor(1),
    description:
      'Program qurban untuk membantu masyarakat yang membutuhkan mendapatkan daging qurban berkualitas.',
    creator: 'Tim Demo',
  },
  {
    id: 2,
    title: 'Cerita Ramadhan 2026',
    tag: 'Sosial',
    raised: 4186683,
    target: 20000000,
    status: 'selesai',
    deadline: null,
    img: coverFor(2),
    description:
      'Memberikan paket sembako kepada keluarga yang kurang mampu selama bulan Ramadhan.',
    creator: 'Tim Demo',
  },
  {
    id: 3,
    title: 'Rumah Singgah',
    tag: 'Infrastruktur',
    raised: 1840043,
    target: 15000000,
    status: 'selesai',
    deadline: null,
    img: coverFor(3),
    description:
      'Membangun rumah singgah untuk memberikan tempat istirahat bagi anak jalanan dan fakir miskin.',
    creator: 'Tim Demo',
  },
  {
    id: 4,
    title: 'Cerita Agustusan 2026',
    tag: 'Kemanusiaan',
    raised: 18444114,
    target: 23000000,
    status: 'aktif',
    deadline: '2026-11-30',
    img: coverFor(4),
    description:
      'Program perayaan kemerdekaan dengan membagikan hadiah dan bantuan kepada anak-anak.',
    creator: 'Tim Demo',
  },
  {
    id: 5,
    title: 'Sedekah Subuh Rutin',
    tag: 'Keagamaan',
    raised: 476476,
    target: 1600000,
    status: 'aktif',
    deadline: '2027-01-31',
    img: coverFor(5),
    description:
      'Program sedekah rutin setiap subuh untuk membantu masyarakat yang membutuhkan.',
    creator: 'Tim Demo',
  },
  {
    id: 6,
    title: 'Sedekah Makanan Lansia',
    tag: 'Sosial',
    raised: 813169,
    target: 1800000,
    status: 'aktif',
    deadline: '2026-10-31',
    img: coverFor(6),
    description: 'Menyediakan makanan sehat dan bergizi untuk lansia yang tinggal sendiri.',
    creator: 'Tim Demo',
  },
];

/** Tab filter dibangun dari data, bukan daftar statis, agar tidak pernah kosong. */
export const tabs = ['Semua', ...Array.from(new Set(campaigns.map((c) => c.tag)))];

const REMOTE_ICON = (slug) => `https://api.iconify.design/mdi/${slug}.svg?color=%2345beb0`;

/** `icon` diisi berkas lokal bila ada di src/assets/icons/<slug>.svg. */
export const categories = [
  { name: 'Pendidikan', slug: 'pendidikan', icon: iconFor('pendidikan', REMOTE_ICON('school')) },
  { name: 'Kesehatan', slug: 'kesehatan', icon: iconFor('kesehatan', REMOTE_ICON('hospital-box')) },
  { name: 'Bencana Alam', slug: 'bencana-alam', icon: iconFor('bencana-alam', REMOTE_ICON('weather-lightning')) },
  { name: 'Panti Asuhan', slug: 'panti-asuhan', icon: iconFor('panti-asuhan', REMOTE_ICON('home-group')) },
  { name: 'Pangan', slug: 'pangan', icon: iconFor('pangan', REMOTE_ICON('food-apple')) },
  { name: 'Ekonomi', slug: 'ekonomi', icon: iconFor('ekonomi', REMOTE_ICON('briefcase')) },
  { name: 'Zakat', slug: 'zakat', icon: iconFor('zakat', REMOTE_ICON('star-outline')) },
  { name: 'Wakaf', slug: 'wakaf', icon: iconFor('wakaf', REMOTE_ICON('mosque')) },
];

export const stats = [
  { n: '10.000+', label: 'Donatur Aktif' },
  { n: '500+', label: 'Program Selesai' },
  { n: 'Rp 2M+', label: 'Dana Terkumpul' },
  { n: String(new Set(campaigns.map((c) => c.tag)).size), label: 'Kategori Aktif' },
];

/**
 * Banner promosi — dipanggil langsung dari server ceritabaik.org, tidak ikut
 * di-bundle. Konsekuensinya: gambar bergantung pada server itu (URL berubah saat
 * migrasi WordPress = banner hilang) dan tidak melewati optimasi build Vite.
 * Kosongkan `image` untuk mematikan banner (mis. di branch demo).
 */
export const promoBanner = {
  image: 'https://ceritabaik.org/wp-content/uploads/2026/07/banner-website-.png',
  alt: 'Banner program Cerita Baik',
  width: 1771,
  height: 1125,
  href: '',
};

export const navLinks = ['Program', 'Donasi', 'Zakat', 'Wakaf', 'Rekening', 'Tentang'];

export const quickLinks = [
  { slug: 'donasi', label: 'Donasi', icon: iconFor('donasi', REMOTE_ICON('heart')) },
  { slug: 'zakat', label: 'Zakat', icon: iconFor('zakat', REMOTE_ICON('star')) },
  { slug: 'wakaf', label: 'Wakaf', icon: iconFor('wakaf', REMOTE_ICON('mosque')) },
  { slug: 'rekening', label: 'Rekening', icon: iconFor('rekening', REMOTE_ICON('bank')) },
];

export const footerCols = [
  { title: 'Program', links: ['Donasi', 'Zakat', 'Wakaf', 'Infak', 'Sedekah'] },
  { title: 'Info', links: ['Tentang Kami', 'Kontak', 'Rekening', 'Blog'] },
  { title: 'Akun', links: ['Daftar', 'Masuk', 'Dashboard', 'Riwayat'] },
];
