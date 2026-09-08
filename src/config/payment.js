/**
 * Rekening tujuan per ID kampanye.
 * SEMUA NOMOR DI BAWAH ADALAH DATA CONTOH — bukan rekening yang bisa menerima
 * transfer. Ganti dengan data asli (idealnya dari API/env) bila dipakai sungguhan.
 */
export const BANK_ACCOUNTS = {
  1: [
    {
      id: 'bca_001',
      bank: 'BCA',
      accountNumber: '1234 5678 90',
      accountHolder: 'Yayasan Demo Qurban',
      description: 'Rekening untuk Program Qurban Baik 2026',
      placeholder: true,
    },
    {
      id: 'mandiri_001',
      bank: 'Mandiri',
      accountNumber: '0987 6543 21',
      accountHolder: 'Yayasan Demo Qurban',
      description: 'Rekening alternatif Mandiri',
      placeholder: true,
    },
  ],
  2: [
    {
      id: 'bca_002',
      bank: 'BCA',
      accountNumber: '1122 3344 55',
      accountHolder: 'Yayasan Demo Ramadhan',
      description: 'Rekening untuk Program Ramadhan',
      placeholder: true,
    },
  ],
  3: [
    {
      id: 'bca_003',
      bank: 'BCA',
      accountNumber: '5544 3322 11',
      accountHolder: 'Yayasan Demo Infrastruktur',
      description: 'Rekening untuk Program Infrastruktur',
      placeholder: true,
    },
  ],
};

export const PAYMENT_METHODS = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    description: 'Transfer langsung ke rekening tujuan',
  },
  {
    id: 'e_wallet',
    name: 'E-Wallet',
    description: 'Donasi melalui aplikasi dompet digital',
  },
];

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
};

/** Batas ukuran unggahan bukti transfer (byte). */
export const MAX_PROOF_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
