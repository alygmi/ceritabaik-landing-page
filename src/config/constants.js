export {
  BRAND,
  LOGO_IMG,
  LOGO_IMG_2X,
  LOGO_FALLBACK,
  BRAND_COLOR,
  coverFor,
  iconFor,
} from './brand';

export const ROUTES = {
  HOME: '/',
  CAMPAIGN_DETAIL: '/campaign/:id',
  PAYMENT: '/campaign/:id/payment',
};

export const PAYMENT_INSTRUCTIONS = {
  bank_transfer: [
    'Salin nomor rekening tujuan.',
    'Buka aplikasi perbankan Anda.',
    'Lakukan transfer sesuai jumlah donasi.',
    'Kembali ke halaman ini dan unggah bukti transfer.',
    'Tunggu verifikasi dari tim kami.',
  ],
};
