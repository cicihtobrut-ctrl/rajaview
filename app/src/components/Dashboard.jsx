import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from '../styles/Dashboard.styles';
import { HomeIcon, WalletIcon, UserIcon, CheckCircleIcon, TvIcon, UsersIcon, CubeIcon, LinkIcon } from '../icons';

// Ganti dengan URL Vercel Anda!
const API_URL = "https://rajaview.vercel.app";

function Dashboard({ user, onUserUpdate }) { // Terima prop onUserUpdate
  const [isCheckInDisabled, setCheckInDisabled] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState('Check-in Harian');

  // Cek status check-in saat komponen dimuat
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

  const handleCheckIn = async () => {
    setCheckInDisabled(true);
    setCheckInMessage('Memproses...');

    try {
      const response = await axios.post(`${API_URL}/api/check-in`, {
        telegramId: user.telegramId,
      });

      // Update data user di state utama App.jsx
      onUserUpdate(response.data.user);
      setCheckInMessage('Check-in Berhasil!');

      // Tampilkan notifikasi sukses
      window.Telegram?.WebApp?.showAlert(response.data.message);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan.';
      setCheckInMessage(errorMessage);
      window.Telegram?.WebApp?.showAlert(errorMessage);
      // Jika error bukan karena "sudah check-in", tombol bisa diaktifkan kembali
      if (error.response?.status !== 400) {
          setCheckInDisabled(false);
      }
    }
  };
  
  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : 'U';
  const handleComingSoon = () => window.Telegram?.WebApp?.showAlert('Fitur ini akan segera hadir!');

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
        <h2 style={styles.cardTitle}>Tugas Harian</h2>
        <button onClick={handleCheckIn} style={styles.taskButton} disabled={isCheckInDisabled}>
          <CheckCircleIcon style={styles.taskIcon} /> {checkInMessage}
        </button>
        {/* ... tombol lainnya ... */}
      </div>
      
      {/* ... sisa kode dasbor ... */}
    </div>
  );
}

export default Dashboard;

