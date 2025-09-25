import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from '../styles/Dashboard.styles';
import { HomeIcon, WalletIcon, UserIcon, CheckCircleIcon, TvIcon, UsersIcon, CubeIcon, LinkIcon } from '../icons';

// GANTI DENGAN URL VERCEL ANDA!
const API_URL = "https://rajaview.vercel.app"; 
// GANTI DENGAN USERNAME BOT TELEGRAM ANDA (tanpa @)!
const BOT_USERNAME = "rajaviewbot"; 

function Dashboard({ user, onUserUpdate }) {
  // State untuk fungsionalitas tombol
  const [isCheckInDisabled, setCheckInDisabled] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState('Check-in Harian');
  const [adStatus, setAdStatus] = useState('Tonton Iklan');

  // Efek untuk memeriksa status check-in saat komponen dimuat
  useEffect(() => {
    if (user.lastCheckIn) {
      const now = new Date();
      const lastCheckInDate = new Date(user.lastCheckIn);
      now.setHours(0, 0, 0, 0);
      lastCheckInDate.setHours(0, 0, 0, 0);
      if (lastCheckInDate.getTime() === now.getTime()) {
        setCheckInDisabled(true);
        setCheckInMessage('Sudah Check-in Hari Ini');
      }
    }
  }, [user.lastCheckIn]);

  // Fungsi untuk menangani klik tombol Check-in
  const handleCheckIn = async () => {
    setCheckInDisabled(true);
    setCheckInMessage('Memproses...');
    try {
      const response = await axios.post(`${API_URL}/api/check-in`, { telegramId: user.telegramId });
      onUserUpdate(response.data.user);
      setCheckInMessage('Check-in Berhasil!');
      window.Telegram?.WebApp?.showAlert(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan.';
      setCheckInMessage(errorMessage);
      window.Telegram?.WebApp?.showAlert(errorMessage);
      if (error.response?.status !== 400) {
        setCheckInDisabled(false);
      }
    }
  };

  // Fungsi untuk menangani klik tombol Tonton Iklan
  const handleWatchAd = () => {
    setAdStatus('Memuat iklan...');
    const rewardUser = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/reward-ad`, { telegramId: user.telegramId });
        onUserUpdate(response.data.user);
        window.Telegram?.WebApp?.showAlert(response.data.message);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Gagal mendapatkan reward.';
        window.Telegram?.WebApp?.showAlert(errorMessage);
      } finally {
        setAdStatus('Tonton Iklan');
      }
    };
    try {
      if (typeof window.show_9929126 === 'function') {
        window.show_9929126().then(rewardUser).catch((e) => {
          console.error("Monetag ad error:", e);
          window.Telegram?.WebApp?.showAlert("Iklan gagal dimuat. Coba lagi nanti.");
          setAdStatus('Tonton Iklan');
        });
      } else {
        throw new Error("Fungsi iklan Monetag tidak ditemukan.");
      }
    } catch (e) {
      console.error("Gagal menjalankan script iklan:", e);
      window.Telegram?.WebApp?.showAlert("Gagal memulai iklan.");
      setAdStatus('Tonton Iklan');
    }
  };

  // Fungsi untuk menyalin link referral
  const referralLink = `https://t.me/${BOT_USERNAME}?start=${user.referralCode}`;
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        window.Telegram?.WebApp?.showAlert('Link referral berhasil disalin!');
      })
      .catch(err => {
        console.error('Gagal menyalin:', err);
        window.Telegram?.WebApp?.showAlert('Gagal menyalin link.');
      });
  };

  // Fungsi utilitas lainnya
  const getInitials = (name) => (name ? name.substring(0, 2).toUpperCase() : 'U');
  const handleComingSoon = () => window.Telegram?.WebApp?.showAlert('Fitur ini akan segera hadir!');

  // Variabel untuk ditampilkan di UI
  const username = user?.username || 'Pengguna';
  const level = user?.level || 1;
  const balance = parseFloat(user?.balance || 0).toLocaleString('id-ID');

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <div style={styles.avatar}>{getInitials(username)}</div>
        <div style={styles.userInfo}>
          <p style={styles.username}>{username}</p>
          <span style={styles.level}>Level {level}</span>
        </div>
        <div style={styles.balance}>Rp {balance}</div>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Undang Teman & Dapatkan Bonus!</h2>
        <input 
          type="text" 
          value={referralLink} 
          readOnly 
          style={{ width: 'calc(100% - 22px)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
        />
        <button onClick={handleCopyReferral} style={{...styles.taskButton, marginBottom: 0}}>
          Salin Link
        </button>
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Harian</h2>
        <button onClick={handleCheckIn} style={styles.taskButton} disabled={isCheckInDisabled}>
          <CheckCircleIcon style={styles.taskIcon} /> {checkInMessage}
        </button>
        <button onClick={handleWatchAd} style={styles.taskButton} disabled={adStatus !== 'Tonton Iklan'}>
          <TvIcon style={styles.taskIcon} /> {adStatus}
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <UsersIcon style={styles.taskIcon} /> Tugas Referral Lain
        </button>
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Utama</h2>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <CubeIcon style={styles.taskIcon} /> Offerwall
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <LinkIcon style={styles.taskIcon} /> Shortener
        </button>
      </div>
      
      <nav style={styles.navbar}>
        <button style={{...styles.navButton, ...styles.activeNav}}>
          <HomeIcon style={styles.navIcon} />
          <span style={styles.navText}>Home</span>
        </button>
        <button onClick={handleComingSoon} style={styles.navButton}>
          <WalletIcon style={styles.navIcon} />
          <span style={styles.navText}>Tarik Dana</span>
        </button>
        <button onClick={handleComingSoon} style={styles.navButton}>
          <UserIcon style={styles.navIcon} />
          <span style={styles.navText}>Profil</span>
        </button>
      </nav>
    </div>
  );
}

export default Dashboard;

