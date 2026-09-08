import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_IMG, LOGO_IMG_2X, LOGO_FALLBACK, BRAND } from '../config/constants';
import { navLinks } from '../config/campaigns';

/**
 * Navbar dipakai di seluruh halaman.
 * `full` menampilkan menu navigasi + tombol donasi (halaman utama);
 * tanpa `full` hanya logo, agar halaman detail & pembayaran tetap fokus.
 */
export default function Navbar({ full = false }) {
  const navigate = useNavigate();
  const isWordmark = BRAND.logoType === 'wordmark' && LOGO_IMG;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!full) return undefined;
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = (e) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [full]);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label={`${BRAND.name}${BRAND.suffix} — beranda`}>
          <img
            src={LOGO_IMG ?? LOGO_FALLBACK}
            srcSet={LOGO_IMG_2X ? `${LOGO_IMG} 1x, ${LOGO_IMG_2X} 2x` : undefined}
            alt={`Logo ${BRAND.name}${BRAND.suffix}`}
            className={isWordmark ? 'logo-wordmark' : 'logo-img'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.srcset = '';
              e.target.src = LOGO_FALLBACK;
            }}
          />
          {!isWordmark && (
            <span className="logo-text">
              {BRAND.name}
              {BRAND.suffix && <span className="logo-accent">{BRAND.suffix}</span>}
            </span>
          )}
          {BRAND.showDemoBanner && <span className="logo-demo-chip">DEMO</span>}
        </Link>

        {full && (
          <div className="nav-right">
            <button
              type="button"
              className="hamburger"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="nav-links"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
            <button className="btn-primary" onClick={() => navigate('/campaign/1')}>
              Donasi
            </button>
            <div id="nav-links" className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#nav"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
