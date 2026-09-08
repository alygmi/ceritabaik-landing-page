import React, { useState } from 'react';
import { MAX_PROOF_SIZE, ACCEPTED_PROOF_TYPES } from '../config/payment';
import { formatIDR } from '../utils/format';

const EMPTY_FORM = {
  donorName: '',
  amount: '',
  transactionId: '',
  paymentProof: null,
  notes: '',
};

export default function PaymentVerification({ onSubmit, loading }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    if (file && !ACCEPTED_PROOF_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, paymentProof: 'Format harus JPG, PNG, WEBP, atau PDF.' }));
      setFormData((prev) => ({ ...prev, paymentProof: null }));
      return;
    }
    if (file && file.size > MAX_PROOF_SIZE) {
      setErrors((prev) => ({
        ...prev,
        paymentProof: `Ukuran berkas maksimal ${MAX_PROOF_SIZE / 1024 / 1024} MB.`,
      }));
      setFormData((prev) => ({ ...prev, paymentProof: null }));
      return;
    }

    setErrors((prev) => ({ ...prev, paymentProof: undefined }));
    setFormData((prev) => ({ ...prev, paymentProof: file }));
  };

  const validate = () => {
    const next = {};
    if (!formData.donorName.trim()) next.donorName = 'Nama donatur wajib diisi.';
    if (!formData.amount || Number(formData.amount) < 1000) {
      next.amount = 'Nominal minimal Rp 1.000.';
    }
    if (!formData.transactionId.trim()) next.transactionId = 'ID/referensi transfer wajib diisi.';
    if (!formData.paymentProof) next.paymentProof = 'Bukti transfer wajib diunggah.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(formData);
  };

  const amountPreview = Number(formData.amount) > 0 ? formatIDR(formData.amount) : null;

  return (
    <form className="payment-verification" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Verifikasi Donasi</h2>

      <div className="form-group">
        <label htmlFor="donorName">Nama Donatur</label>
        <input
          type="text"
          id="donorName"
          name="donorName"
          value={formData.donorName}
          onChange={handleChange}
          placeholder="Nama Anda"
          aria-invalid={Boolean(errors.donorName)}
        />
        {errors.donorName && <span className="field-error">{errors.donorName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Jumlah Donasi</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="1000"
          step="1000"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Contoh: 50000"
          aria-invalid={Boolean(errors.amount)}
        />
        {amountPreview && <small className="field-hint">{amountPreview}</small>}
        {errors.amount && <span className="field-error">{errors.amount}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="transactionId">ID/Referensi Transfer</label>
        <input
          type="text"
          id="transactionId"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          placeholder="Nomor referensi dari aplikasi bank"
          aria-invalid={Boolean(errors.transactionId)}
        />
        {errors.transactionId && <span className="field-error">{errors.transactionId}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="paymentProof">Bukti Transfer</label>
        <input
          type="file"
          id="paymentProof"
          name="paymentProof"
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp,application/pdf"
          aria-invalid={Boolean(errors.paymentProof)}
        />
        <small className="field-hint">
          JPG, PNG, WEBP, atau PDF · maksimal {MAX_PROOF_SIZE / 1024 / 1024} MB
          {formData.paymentProof ? ` · ${formData.paymentProof.name}` : ''}
        </small>
        {errors.paymentProof && <span className="field-error">{errors.paymentProof}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Catatan (opsional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Pesan atau doa untuk penerima donasi"
          rows="3"
        />
      </div>

      <button type="submit" className="btn-primary-lg" disabled={loading}>
        {loading ? 'Memproses…' : 'Kirim Bukti Donasi'}
      </button>
    </form>
  );
}
