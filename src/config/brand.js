/**
 * Satu-satunya sumber identitas merek.
 *
 * Branch `main`   → VITE_BRAND_MODE=demo   (portofolio, aset placeholder)
 * Branch `client` → VITE_BRAND_MODE=client (branding penuh, aset asli)
 *
 * Kode di kedua branch IDENTIK. Yang berbeda hanya berkas `.env` dan isi
 * folder src/assets/brand/ — jadi merge antar-branch tidak pernah konflik
 * di file JSX.
 */

const MODE = import.meta.env.VITE_BRAND_MODE === 'client' ? 'client' : 'demo';

const PROFILES = {
  demo: {
    name: 'ceritabaik',
    suffix: '.demo',
    organization: 'Proyek Portofolio',
    tagline: 'Setiap kebaikan kecil bisa mengubah kehidupan nyata.',
    email: 'halo@example.com',
    phone: '0800-0000-0000',
    showDemoBanner: true,
    footerNote: 'Proyek portofolio, tidak berafiliasi dengan lembaga mana pun.',
    logoType: 'mark',
  },
  client: {
    name: 'ceritabaik',
    suffix: '.org',
    organization: 'Cerita Baik',
    tagline: 'Setiap kebaikan kecil bisa mengubah kehidupan nyata.',
    email: '',
    phone: '',
    showDemoBanner: false,
    footerNote: '',
    /** Logo klien berupa wordmark memanjang, bukan ikon kotak. */
    logoType: 'wordmark',
  },
};

/** Nilai .env menimpa profil, jadi data klien tidak perlu masuk ke kode. */
const fromEnv = {
  name: import.meta.env.VITE_BRAND_NAME,
  suffix: import.meta.env.VITE_BRAND_SUFFIX,
  organization: import.meta.env.VITE_BRAND_ORG,
  tagline: import.meta.env.VITE_BRAND_TAGLINE,
  email: import.meta.env.VITE_BRAND_EMAIL,
  phone: import.meta.env.VITE_BRAND_PHONE,
  footerNote: import.meta.env.VITE_BRAND_FOOTER_NOTE,
};

export const BRAND = {
  mode: MODE,
  ...PROFILES[MODE],
  ...Object.fromEntries(Object.entries(fromEnv).filter(([, v]) => v != null && v !== '')),
};

/**
 * Aset diambil lewat glob, bukan impor satu per satu, supaya berkas asli
 * (.jpg/.png/.webp) bisa langsung menggantikan placeholder (.svg) tanpa
 * menyunting kode — cukup samakan penamaannya: cover-1, cover-2, ... logo.
 */
const coverModules = import.meta.glob('../assets/brand/cover-*.{svg,png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});

export const covers = Object.keys(coverModules)
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  .map((key) => coverModules[key]);

/**
 * Dua berkas logo hidup berdampingan:
 *   logo.*       → logo asli (dipakai mode client)
 *   logo-demo.*  → penanda buatan sendiri (dipakai mode demo)
 * logo@2x.* opsional, dipakai sebagai srcSet untuk layar retina.
 */
const logoModules = import.meta.glob('../assets/brand/logo.{svg,png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});
const logoDemoModules = import.meta.glob('../assets/brand/logo-demo.{svg,png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});
const logo2xModules = import.meta.glob('../assets/brand/logo@2x.{svg,png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});

const realLogo = Object.values(logoModules)[0] ?? null;
const demoLogo = Object.values(logoDemoModules)[0] ?? null;

export const LOGO_IMG = MODE === 'client' ? (realLogo ?? demoLogo) : (demoLogo ?? realLogo);
export const LOGO_IMG_2X = MODE === 'client' ? (Object.values(logo2xModules)[0] ?? null) : null;

/** Warna aksen merek, diambil dari logo. */
export const BRAND_COLOR = '#45beb0';
export const LOGO_FALLBACK = 'https://api.iconify.design/mdi/community.svg?color=%230f766e';

/**
 * Ikon lokal di src/assets/icons/. Selama berkasnya belum ada, dipakai ikon
 * daring sebagai cadangan — begitu berkas <nama>.svg diletakkan di folder itu,
 * ikon lokal otomatis menang tanpa perlu menyunting kode.
 */
const iconModules = import.meta.glob('../assets/icons/*.svg', {
  eager: true,
  import: 'default',
});

export function iconFor(name, fallback = null) {
  const key = Object.keys(iconModules).find((k) => k.endsWith(`/${name}.svg`));
  return key ? iconModules[key] : fallback;
}

/** Ambil sampul ke-n dengan aman, walau jumlah berkas tidak sama. */
export function coverFor(index) {
  if (covers.length === 0) return null;
  return covers[(index - 1) % covers.length];
}
