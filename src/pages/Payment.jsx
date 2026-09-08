import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import BankAccountSelector from '../components/BankAccountSelector';
import PaymentVerification from '../components/PaymentVerification';
import { campaigns } from '../config/campaigns';
import { BANK_ACCOUNTS } from '../config/payment';
import { PAYMENT_INSTRUCTIONS, BRAND } from '../config/constants';
import { formatIDR } from '../utils/format';

const STEPS = { ACCOUNT: 'account', VERIFY: 'verify', DONE: 'done' };

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaignId = Number.parseInt(id, 10);
  const campaign = campaigns.find((c) => c.id === campaignId);

  const bankAccounts = useMemo(() => BANK_ACCOUNTS[campaignId] ?? [], [campaignId]);

  const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0] ?? null);
  const [step, setStep] = useState(STEPS.ACCOUNT);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setSelectedAccount(bankAccounts[0] ?? null);
    setStep(STEPS.ACCOUNT);
  }, [bankAccounts]);

  if (!campaign) {
    return (
      <div className="app">
        <Navbar />
        <div className="container empty-page">
          <h1>Program tidak ditemukan</h1>
          <Link to="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const showToast = (message, tone = 'success') => setToast({ message, tone });

  const handleVerificationSubmit = async (formData) => {
    setLoading(true);
    try {
      // TODO: BACKEND — ganti simulasi di bawah dengan panggilan API sungguhan:
      // const body = new FormData();
      // body.append('campaignId', campaign.id);
      // body.append('bankAccountId', selectedAccount.id);
      // Object.entries(formData).forEach(([key, value]) => body.append(key, value));
      // await fetch('/api/donations', { method: 'POST', body });
      await new Promise((resolve) => setTimeout(resolve, 700));

      setReceipt({
        donorName: formData.donorName,
        amount: Number(formData.amount),
        transactionId: formData.transactionId,
        proofName: formData.paymentProof?.name ?? '-',
        bank: selectedAccount?.bank,
      });
      setStep(STEPS.DONE);
    } catch (error) {
      console.error('Gagal mengirim verifikasi donasi:', error);
      showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="container page-body">
        <button
          className="btn-outline-green"
          onClick={() => navigate(`/campaign/${campaign.id}`)}
          style={{ marginBottom: '20px' }}
        >
          ← Kembali
        </button>

        <div className="payment-page">
          <header className="payment-header">
            <h1>Donasi untuk {campaign.title}</h1>
            <ol className="step-indicator">
              <li className={step === STEPS.ACCOUNT ? 'current' : 'done'}>1. Pilih rekening</li>
              <li
                className={
                  step === STEPS.VERIFY ? 'current' : step === STEPS.DONE ? 'done' : ''
                }
              >
                2. Verifikasi
              </li>
              <li className={step === STEPS.DONE ? 'current' : ''}>3. Selesai</li>
            </ol>
          </header>

          <div className="payment-content">
            <div className="payment-main">
              {bankAccounts.length === 0 && (
                <div className="error-state">
                  <p>Belum ada rekening tujuan untuk program ini.</p>
                </div>
              )}

              {step === STEPS.ACCOUNT && bankAccounts.length > 0 && (
                <>
                  <BankAccountSelector
                    accounts={bankAccounts}
                    selectedAccount={selectedAccount}
                    onSelect={setSelectedAccount}
                    onCopied={showToast}
                    showPlaceholderNote={bankAccounts.some((a) => a.placeholder)}
                  />

                  <div className="payment-instructions">
                    <h2>Instruksi Pembayaran</h2>
                    <ol className="step-list">
                      {PAYMENT_INSTRUCTIONS.bank_transfer.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ol>
                  </div>

                  <button
                    className="btn-primary-lg"
                    onClick={() => setStep(STEPS.VERIFY)}
                    disabled={!selectedAccount}
                    style={{ marginTop: '20px' }}
                  >
                    Sudah Transfer? Lanjut ke Verifikasi →
                  </button>
                </>
              )}

              {step === STEPS.VERIFY && (
                <>
                  <button
                    className="btn-outline-green"
                    onClick={() => setStep(STEPS.ACCOUNT)}
                    style={{ marginBottom: '20px' }}
                  >
                    ← Ganti rekening
                  </button>
                  <PaymentVerification onSubmit={handleVerificationSubmit} loading={loading} />
                </>
              )}

              {step === STEPS.DONE && receipt && (
                <div className="payment-success">
                  <div className="success-mark" aria-hidden="true">
                    ✓
                  </div>
                  <h2>Bukti donasi terkirim</h2>
                  <p>
                    Terima kasih, {receipt.donorName}. Bukti transfer Anda sedang menunggu
                    verifikasi tim kami.
                  </p>
                  <dl className="receipt">
                    <div>
                      <dt>Program</dt>
                      <dd>{campaign.title}</dd>
                    </div>
                    <div>
                      <dt>Nominal</dt>
                      <dd>{formatIDR(receipt.amount)}</dd>
                    </div>
                    <div>
                      <dt>Rekening tujuan</dt>
                      <dd>{receipt.bank}</dd>
                    </div>
                    <div>
                      <dt>ID transaksi</dt>
                      <dd>{receipt.transactionId}</dd>
                    </div>
                    <div>
                      <dt>Berkas bukti</dt>
                      <dd>{receipt.proofName}</dd>
                    </div>
                  </dl>
                  <p className="success-note">
                    Ini adalah demo — tidak ada data yang benar-benar dikirim ke mana pun.
                  </p>
                  <button className="btn-primary-lg" onClick={() => navigate('/')}>
                    Kembali ke Beranda
                  </button>
                </div>
              )}
            </div>

            <aside className="payment-sidebar">
              <div className="sidebar-card">
                <h3>Ringkasan Donasi</h3>
                <div className="summary-item">
                  <span>Program</span>
                  <span>{campaign.title}</span>
                </div>
                <div className="summary-item">
                  <span>Kategori</span>
                  <span>{campaign.tag}</span>
                </div>
                <div className="summary-item">
                  <span>Terkumpul</span>
                  <span>{formatIDR(campaign.raised)}</span>
                </div>
                {selectedAccount && (
                  <div className="summary-item">
                    <span>Ke rekening</span>
                    <span>{selectedAccount.bank}</span>
                  </div>
                )}
              </div>

              <div className="sidebar-card">
                <h3>Bantuan</h3>
                <p>Ada pertanyaan soal proses donasi? Hubungi kami:</p>
                {BRAND.email && <p className="contact-line">{BRAND.email}</p>}
                {BRAND.phone && <p className="contact-line">{BRAND.phone}</p>}
                {BRAND.mode === 'demo' && <small>Kontak contoh untuk keperluan demo.</small>}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Toast
        message={toast?.message}
        tone={toast?.tone}
        onClose={() => setToast(null)}
      />
      <Footer />
    </div>
  );
}
