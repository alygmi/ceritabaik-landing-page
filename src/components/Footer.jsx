import React from 'react';
import { footerCols } from '../config/campaigns';
import { BRAND, LOGO_IMG, LOGO_IMG_2X } from '../config/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            {BRAND.logoType === 'wordmark' && LOGO_IMG ? (
              <img
                src={LOGO_IMG}
                srcSet={LOGO_IMG_2X ? `${LOGO_IMG} 1x, ${LOGO_IMG_2X} 2x` : undefined}
                alt={`Logo ${BRAND.name}${BRAND.suffix}`}
                className="footer-wordmark"
              />
            ) : (
              <div className="footer-logo">
                {BRAND.name}
                <span className="logo-accent">{BRAND.suffix}</span>
              </div>
            )}
            <p className="footer-desc">
              Platform untuk berbagi kebaikan dan mengubah kehidupan melalui donasi yang
              transparan.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title} className="footer-col">
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#footer" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}
            {BRAND.suffix}
          </p>
          {BRAND.footerNote && <p>{BRAND.footerNote}</p>}
        </div>
      </div>
    </footer>
  );
}
