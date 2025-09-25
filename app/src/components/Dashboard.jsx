import React from 'react';
import { styles } from '../styles/Dashboard.styles';
import { HomeIcon, WalletIcon, UserIcon, CheckCircleIcon, TvIcon, UsersIcon, CubeIcon, LinkIcon } from '../icons';

function Dashboard({ user, onUserUpdate, onNavigate }) {
  const handleComingSoon = () => {
    window.Telegram?.WebApp?.showAlert('Fitur ini akan segera hadir!');
  };

  // Mengambil dan memformat 3 saldo baru dari objek user
  const mainBalance = parseFloat(user?.mainBalance || 0).toLocaleString('id-ID');
  const advertisingBalance = parseFloat(user?.advertisingBalance || 0).toLocaleString('id-ID');
  const earningBalance = parseFloat(user?.earningBalance || 0).toLocaleString('id-ID');
  const username = user?.username || 'Pengguna';

  return (
    <div style={styles.dashboard}>
      {/* Header Pengguna (sekarang lebih simpel) */}
      <header style={styles.header}>
        <div style={styles.avatar}>{(username).substring(0, 2).toUpperCase()}</div>
        <div style={styles.userInfo}>
          <p style={styles.username}>{username}</p>
          <span style={styles.level}>Level {user?.level || 1}</span>
        </div>
      </header>

      {/* ====================================================== */}
      {/* KARTU SALDO BARU SESUAI DESAIN ANDA                   */}
      {/* ====================================================== */}
      <div style={styles.card}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>Total Saldo Utama</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>
            Rp {mainBalance}
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Saldo Iklan</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600' }}>Rp {advertisingBalance}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Poin (Hasil Tugas)</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600' }}>{earningBalance} Poin</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleComingSoon} style={{...styles.taskButton, flex: 1, justifyContent: 'center', padding: '10px'}}>Deposit</button>
          <button onClick={handleComingSoon} style={{...styles.taskButton, flex: 1, justifyContent: 'center', padding: '10px'}}>Withdraw</button>
        </div>
      </div>
      
      {/* Kartu Tugas Harian (tidak berubah) */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Harian</h2>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <CheckCircleIcon style={styles.taskIcon} /> Check-in Harian
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <TvIcon style={styles.taskIcon} /> Tonton Iklan
        </button>
      </div>

      {/* ... (Kartu lain dan Navbar tetap sama seperti sebelumnya) ... */}

      <nav style={styles.navbar}>
        <button style={{...styles.navButton, ...styles.activeNav}}>
          <HomeIcon style={styles.navIcon} />
          <span style={styles.navText}>Home</span>
        </button>
        <button onClick={() => onNavigate('tasks')} style={styles.navButton}>
          <span style={styles.navIcon}>📝</span>
          <span style={styles.navText}>Tasks</span>
        </button>
        <button onClick={() => onNavigate('ads')} style={styles.navButton}>
          <span style={styles.navIcon}>📢</span>
          <span style={styles.navText}>Ads</span>
        </button>
        <button onClick={() => onNavigate('refer')} style={styles.navButton}>
          <span style={styles.navIcon}>👥</span>
          <span style={styles.navText}>Refer</span>
        </button>
      </nav>
    </div>
  );
}

export default Dashboard;

