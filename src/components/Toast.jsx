import React, { useEffect } from 'react';

/** Notifikasi ringan pengganti alert(); menutup sendiri setelah beberapa detik. */
export default function Toast({ message, tone = 'success', onClose, duration = 2600 }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${tone}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="toast-close" aria-label="Tutup notifikasi" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
