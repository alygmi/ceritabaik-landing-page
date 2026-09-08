import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DemoBanner from './components/DemoBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CampaignDetail from './pages/CampaignDetail';
import Payment from './pages/Payment';
import { BRAND } from './config/constants';

function NotFound() {
  return (
    <div className="app">
      <Navbar />
      <div className="container empty-page">
        <h1>404 — Halaman tidak ditemukan</h1>
        <p>Tautan yang Anda buka tidak tersedia.</p>
        <Link to="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      {BRAND.showDemoBanner && <DemoBanner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/campaign/:id/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
