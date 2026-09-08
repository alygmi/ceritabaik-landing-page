const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/** Format angka rupiah: 601098 -> "Rp 601.098" */
export function formatIDR(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 'Rp 0';
  return idrFormatter.format(number).replace(/\u00A0/g, ' ');
}

/** Persentase perolehan dana, dibatasi 0-100 */
export function progressPercent(raised, target) {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((raised / target) * 100)));
}

/** Label sisa waktu: "18 hari lagi", "Berakhir hari ini", atau status kampanye */
export function timeLeftLabel(campaign) {
  if (!campaign?.deadline || campaign.status === 'selesai') {
    return campaign?.status === 'selesai' ? 'Selesai' : 'Aktif';
  }
  const msPerDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(campaign.deadline);
  deadline.setHours(0, 0, 0, 0);
  const days = Math.round((deadline - today) / msPerDay);

  if (days > 1) return `${days} hari lagi`;
  if (days === 1) return 'Besok berakhir';
  if (days === 0) return 'Berakhir hari ini';
  return 'Berakhir';
}
