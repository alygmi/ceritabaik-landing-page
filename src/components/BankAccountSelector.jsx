import React, { useState } from 'react';

export default function BankAccountSelector({
  accounts,
  selectedAccount,
  onSelect,
  onCopied,
  showPlaceholderNote = false,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (account) => {
    const plain = account.accountNumber.replace(/\s/g, '');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plain);
      } else {
        // Fallback untuk browser lama / konteks non-HTTPS
        const field = document.createElement('textarea');
        field.value = plain;
        field.setAttribute('readonly', '');
        field.style.position = 'absolute';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        document.body.removeChild(field);
      }
      setCopiedId(account.id);
      setTimeout(() => setCopiedId((id) => (id === account.id ? null : id)), 2000);
      onCopied?.('Nomor rekening disalin.');
    } catch {
      onCopied?.('Gagal menyalin. Silakan salin manual.', 'error');
    }
  };

  return (
    <section className="bank-account-selector">
      <h2 className="selector-title">Pilih Rekening Transfer</h2>
      {showPlaceholderNote && (
        <p className="selector-note">
          Nomor di bawah masih <strong>data contoh</strong> — ganti di{' '}
          <code>src/config/payment.js</code> sebelum dipakai menerima donasi.
        </p>
      )}

      <div className="account-list" role="radiogroup" aria-label="Rekening tujuan">
        {accounts.map((account) => {
          const isSelected = selectedAccount?.id === account.id;
          return (
            <label
              key={account.id}
              className={`account-card ${isSelected ? 'selected' : ''}`}
              htmlFor={`account-${account.id}`}
            >
              <div className="account-header">
                <div className="bank-info">
                  <span className="bank-name">{account.bank}</span>
                  <span className="account-holder">{account.accountHolder}</span>
                </div>
                <input
                  type="radio"
                  id={`account-${account.id}`}
                  name="bank-account"
                  value={account.id}
                  checked={isSelected}
                  onChange={() => onSelect(account)}
                />
              </div>

              <div className="account-number">
                <span className="label">Nomor Rekening</span>
                <span className="number">{account.accountNumber}</span>
                <button
                  type="button"
                  className={`btn-copy ${copiedId === account.id ? 'copied' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy(account);
                  }}
                >
                  {copiedId === account.id ? 'Tersalin' : 'Salin'}
                </button>
              </div>

              {account.description && (
                <p className="account-description">{account.description}</p>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
}
