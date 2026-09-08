import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { campaigns } from '../config/campaigns';
import { formatIDR, progressPercent, timeLeftLabel } from '../utils/format';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = campaigns.find((c) => c.id === Number.parseInt(id, 10));

  if (!campaign) {
    return (
      <div className="app">
        <Navbar />
        <div className="container empty-page">
          <h1>Program tidak ditemukan</h1>
          <p>Program yang Anda cari mungkin sudah dihapus atau tautannya keliru.</p>
          <Link to="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pct = progressPercent(campaign.raised, campaign.target);

  return (
    <div className="app">
      <Navbar />

      <div className="container page-body">
        <button
          className="btn-outline-green"
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          ← Kembali
        </button>

        <div className="campaign-detail">
          <div className="detail-header">
            <img
              src={campaign.img}
              alt={campaign.title}
              className="detail-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="detail-meta">
              <span className="badge-tag badge-static">{campaign.tag}</span>
              <h1>{campaign.title}</h1>
              <p className="detail-creator">Oleh: {campaign.creator}</p>
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-main">
              <section className="detail-section">
                <h2>Tentang Program</h2>
                <p>{campaign.description}</p>
              </section>

              <section className="detail-section">
                <h2>Progres Pengumpulan Dana</h2>
                <div
                  className="progress-track"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="progress-stats">
                  <div>
                    <div className="stat-value">{formatIDR(campaign.raised)}</div>
                    <div className="stat-label">terkumpul</div>
                  </div>
                  <div>
                    <div className="stat-value">{pct}%</div>
                    <div className="stat-label">dari {formatIDR(campaign.target)}</div>
                  </div>
                  <div>
                    <div className="stat-value">{timeLeftLabel(campaign)}</div>
                    <div className="stat-label">sisa waktu</div>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Cara Berdonasi</h2>
                <ol className="step-list">
                  <li>Klik tombol “Mulai Donasi”.</li>
                  <li>Pilih rekening tujuan.</li>
                  <li>Lakukan transfer dari aplikasi bank Anda.</li>
                  <li>Unggah bukti transfer.</li>
                  <li>Tunggu verifikasi dari tim kami.</li>
                </ol>
              </section>
            </div>

            <aside className="detail-sidebar">
              <div className="sidebar-card">
                <h3>Siap untuk Berdonasi?</h3>
                <p>Setiap donasi Anda sangat berarti untuk mengubah kehidupan.</p>
                <button
                  className="btn-primary-lg full-width"
                  onClick={() => navigate(`/campaign/${campaign.id}/payment`)}
                >
                  Mulai Donasi
                </button>
              </div>

              <div className="sidebar-card">
                <h3>Info Program</h3>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value">{timeLeftLabel(campaign)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Kategori</span>
                  <span className="info-value">{campaign.tag}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Target</span>
                  <span className="info-value">{formatIDR(campaign.target)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
