import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CampaignCard from '../components/CampaignCard';
import PromoBanner from '../components/PromoBanner';
import { campaigns, categories, stats, tabs, quickLinks } from '../config/campaigns';
import { BRAND } from '../config/constants';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const filtered = useMemo(
    () => (activeTab === 'Semua' ? campaigns : campaigns.filter((c) => c.tag === activeTab)),
    [activeTab]
  );

  return (
    <div className="app">
      <Navbar full />

      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-content">
          <div className="hero-pill">
            <img
              src="https://api.iconify.design/mdi/leaf.svg?color=white"
              alt=""
              className="pill-icon"
            />
            {BRAND.organization}
          </div>
          <h1 className="hero-heading">
            Sudahkah Anda<br />
            <span className="hero-accent">Berbagi Hari Ini?</span>
          </h1>
          <p className="hero-sub">
            {BRAND.tagline} Program sosial, kesehatan, pendidikan, dan keagamaan untuk
            mereka yang membutuhkan.
          </p>
          <div className="hero-actions">
            <button
              className="btn-white"
              onClick={() => navigate(`/campaign/${campaigns[0].id}`)}
            >
              Donasi Sekarang
            </button>
            <button className="btn-outline-white">Tentang Kami</button>
          </div>
        </div>
      </section>

      <section className="quick-links">
        {quickLinks.map((q) => (
          <a key={q.label} href="#quick" className="quick-item">
            <img src={q.icon} alt="" className="quick-icon" />
            <span className="quick-label">{q.label}</span>
          </a>
        ))}
      </section>

      <PromoBanner />

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

      <section className="campaigns-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Program Terpilih</p>
              <h2 className="section-heading">Pilih Program Kebaikan</h2>
            </div>
            <div className="tabs" role="tablist" aria-label="Filter kategori program">
              {tabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeTab === t}
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
              {filtered.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          ) : (
            <p className="empty-state">Belum ada program di kategori ini.</p>
          )}

          <div className="see-all-wrap">
            <button className="btn-outline-green" onClick={() => setActiveTab('Semua')}>
              Lihat Semua Program →
            </button>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header-centered">
            <p className="section-eyebrow-light">Kategori Program</p>
            <h2 className="section-heading-light">Favorit Kamu</h2>
          </div>
          <div className="categories-grid">
            {categories.map((c) => (
              <a key={c.name} href="#cat" className="category-card">
                <img src={c.icon} alt="" className="cat-icon" />
                <span className="cat-name">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

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

      <Footer />
    </div>
  );
}
