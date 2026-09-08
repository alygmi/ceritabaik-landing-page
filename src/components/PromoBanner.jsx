import React, { useState } from 'react';
import { promoBanner } from '../config/campaigns';

/**
 * Banner promosi. Sumbernya URL jarak jauh (server ceritabaik.org), bukan berkas
 * ter-bundle — jadi ukurannya dikunci lewat aspect-ratio supaya tata letak tidak
 * melompat saat gambar belum termuat, dan seluruh blok disembunyikan bila gagal.
 */
export default function PromoBanner() {
  const [failed, setFailed] = useState(false);

  if (!promoBanner?.image || failed) return null;

  const banner = (
    <img
      src={promoBanner.image}
      alt={promoBanner.alt}
      className="promo-img"
      width={promoBanner.width}
      height={promoBanner.height}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );

  return (
    <section className="promo-section">
      <div className="container">
        <div className="promo-banner">
          {promoBanner.href ? (
            <a href={promoBanner.href} className="promo-link">
              {banner}
            </a>
          ) : (
            banner
          )}
        </div>
      </div>
    </section>
  );
}
