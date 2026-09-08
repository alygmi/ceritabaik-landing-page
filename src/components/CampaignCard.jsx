import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatIDR, progressPercent, timeLeftLabel } from '../utils/format';

function ProgressBar({ pct }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progres penggalangan dana"
    >
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function CampaignCard({ campaign }) {
  const navigate = useNavigate();
  const pct = progressPercent(campaign.raised, campaign.target);

  return (
    <article className="campaign-card">
      <div className="campaign-img-wrap">
        <img
          src={campaign.img}
          alt={campaign.title}
          className="campaign-img"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="badge-tag">{campaign.tag}</span>
        <span className="badge-days">{timeLeftLabel(campaign)}</span>
      </div>
      <div className="campaign-body">
        <h3 className="campaign-title">{campaign.title}</h3>
        <div className="campaign-bottom">
          <ProgressBar pct={pct} />
          <div className="campaign-meta">
            <span className="raised">{formatIDR(campaign.raised)}</span>
            <span className="meta-label">
              terkumpul · {pct}% dari {formatIDR(campaign.target)}
            </span>
          </div>
          <button
            className="btn-donate"
            onClick={() => navigate(`/campaign/${campaign.id}`)}
          >
            Donasi Sekarang
          </button>
        </div>
      </div>
    </article>
  );
}
