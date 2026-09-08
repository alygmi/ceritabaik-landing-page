import React, { useState } from 'react';
import './App.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const campaigns = [
  {
    id: 1,
    title: 'Qurban Baik 2026',
    tag: 'Keagamaan',
    raised: 'Rp 601.098',
    pct: 6,
    days: '18 hari lagi',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/ceritabaikdotorg-1.jpg',
  },
  {
    id: 2,
    title: 'Cerita Ramadhan 2026',
    tag: 'Sosial',
    raised: 'Rp 4.186.683',
    pct: 20,
    days: 'Selesai',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/program-sedekah-sembako-1024x709.jpg',
  },
  {
    id: 3,
    title: 'Rumah Singgah Cerita Baik',
    tag: 'Infrastruktur',
    raised: 'Rp 1.840.043',
    pct: 12,
    days: 'Selesai',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/galang-dana-1024x709.jpg',
  },
  {
    id: 4,
    title: 'Cerita Agustusan 2025',
    tag: 'Kemanusiaan',
    raised: 'Rp 18.444.114',
    pct: 80,
    days: 'Aktif',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/ceritabaikdotorg-1.jpg',
  },
  {
    id: 5,
    title: 'Sedekah Subuh Rutin',
    tag: 'Keagamaan',
    raised: 'Rp 476.476',
    pct: 30,
    days: 'Aktif',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/program-sedekah-sembako-1024x709.jpg',
  },
  {
    id: 6,
    title: 'Sedekah Makanan Lansia',
    tag: 'Sosial',
    raised: 'Rp 813.169',
    pct: 45,
    days: 'Aktif',
    img: 'https://ceritabaik.org/wp-content/uploads/2024/07/galang-dana-1024x709.jpg',
  },
];

const categories = [
  { name: 'Pendidikan',   icon: '🎓' },
  { name: 'Kesehatan',    icon: '🏥' },
  { name: 'Bencana Alam', icon: '⛈️' },
  { name: 'Panti Asuhan', icon: '🏠' },
  { name: 'Pangan',       icon: '🌾' },
  { name: 'Ekonomi',      icon: '💼' },
  { name: 'Zakat',        icon: '✨' },
  { name: 'Wakaf',        icon: '🕌' },
];

const stats = [
  { n: '10.000+', label: 'Donatur Aktif' },
  { n: '500+',    label: 'Program Selesai' },
  { n: 'Rp 2M+',  label: 'Dana Terkumpul' },
  { n: '8',       label: 'Kategori Program' },
];

const navLinks = ['Program', 'Donasi', 'Zakat', 'Wakaf', 'Rekening', 'Tentang'];
const tabs = ['Semua', 'Infrastruktur', 'Kemanusiaan', 'Lainnya'];
const footerCols = [
  { title: 'Program', links: ['Donasi', 'Zakat', 'Wakaf', 'Infak', 'Sedekah'] },
  { title: 'Info',    links: ['Tentang Kami', 'Kontak', 'Rekening', 'Blog'] },
  { title: 'Akun',   links: ['Daftar', 'Masuk', 'Dashboard', 'Riwayat'] },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ProgressBar({ pct }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function CampaignCard({ c }) {
  return (
    <div className="campaign-card">
      <div className="campaign-img-wrap">
        <img src={c.img} alt={c.title} className="campaign-img" />
        <span className="badge-tag">{c.tag}</span>
        <span className="badge-days">{c.days}</span>
      </div>
      <div className="campaign-body">
        <h3 className="campaign-title">{c.title}</h3>
        <div className="campaign-bottom">
          <ProgressBar pct={c.pct} />
          <div className="campaign-meta">
            <span className="raised">{c.raised}</span>
            <span className="meta-label">terkumpul</span>
          </div>
          <button className="btn-donate">Donasi Sekarang</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('Semua');

  const filtered =
    activeTab === 'Semua'
      ? campaigns
      : campaigns.filter((c) => c.tag === activeTab);

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img
              src="https://ceritabaik.org/wp-content/uploads/2024/07/logo-ceritabaikdotorg.png"
              alt="logo"
              className="logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="logo-text">
              ceritabaik<span className="logo-accent">.org</span>
            </span>
          </a>
          <div className="nav-links">
            {navLinks.map((l) => (
              <a key={l} href="#nav" className="nav-link">{l}</a>
            ))}
            <button className="btn-primary">Donasi</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-content">
          <div className="hero-pill">🌿 Yayasan Agro Bina Alam Mandiri</div>
          <h1 className="hero-heading">
            Sudahkah Anda<br />
            <span className="hero-accent">Berbagi Hari Ini?</span>
          </h1>
          <p className="hero-sub">
            Bersama Ceritabaik.org, setiap kebaikan kecil bisa mengubah kehidupan
            nyata. Program sosial, kesehatan, pendidikan, dan keagamaan untuk mereka
            yang membutuhkan.
          </p>
          <div className="hero-actions">
            <button className="btn-white">Donasi Sekarang</button>
            <button className="btn-outline-white">Tentang Kami</button>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="quick-links">
        {[
          { icon: '❤️', label: 'Donasi' },
          { icon: '✨', label: 'Zakat' },
          { icon: '🕌', label: 'Wakaf' },
          { icon: '🏦', label: 'Rekening' },
        ].map((q) => (
          <a key={q.label} href="#quick" className="quick-item">
            <span className="quick-icon">{q.icon}</span>
            <span className="quick-label">{q.label}</span>
          </a>
        ))}
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-number">{s.n}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="campaigns-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Program Terpilih</p>
              <h2 className="section-heading">Pilih Program Kebaikan</h2>
            </div>
            <div className="tabs">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`tab ${activeTab === t ? 'tab-active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="campaigns-grid">
              {filtered.map((c) => <CampaignCard key={c.id} c={c} />)}
            </div>
          ) : (
            <p className="empty-state">Belum ada program di kategori ini.</p>
          )}

          <div className="see-all-wrap">
            <button className="btn-outline-green">Lihat Semua Program →</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-centered">
            <p className="section-eyebrow-light">Kategori Program</p>
            <h2 className="section-heading-light">Favorit Kamu</h2>
          </div>
          <div className="categories-grid">
            {categories.map((c) => (
              <a key={c.name} href="#cat" className="category-card">
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-name">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-heading">Galang Dana Bersama Kami</h2>
          <p className="cta-sub">
            Buat kampanye kebaikan Anda sendiri dan ajak lebih banyak orang untuk
            berpartisipasi dalam kebaikan.
          </p>
          <button className="btn-primary-lg">Buat Akun Sekarang</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                ceritabaik<span className="logo-accent">.org</span>
              </div>
              <p className="footer-desc">
                Yayasan Agro Bina Alam Mandiri — lembaga filantropi dengan program
                sosial, ekonomi, kesehatan, kemanusiaan &amp; keagamaan.
              </p>
              <div className="socials">
                {['Instagram', 'WhatsApp', 'YouTube'].map((s) => (
                  <a key={s} href="#social" className="social-pill">{s}</a>
                ))}
              </div>
            </div>
            {footerCols.map((col) => (
              <div key={col.title} className="footer-col">
                <h4 className="footer-col-title">{col.title}</h4>
                {col.links.map((l) => (
                  <a key={l} href="#footer" className="footer-link">{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2025 Ceritabaik.org — All Rights Reserved</p>
            <p>Dibuat dengan ❤️ oleh Mulaiweb.com</p>
          </div>
        </div>
      </footer>

    </div>
  );
}