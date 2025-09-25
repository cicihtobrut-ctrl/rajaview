import React from 'react';
// Impor style dari file terpisah
import { styles } from '../styles/Dashboard.styles';
// Impor semua ikon dari satu tempat
import { 
  HomeIcon, WalletIcon, UserIcon, CheckCircleIcon, TvIcon, UsersIcon, CubeIcon, LinkIcon 
} from '../icons';

function Dashboard({ user }) {
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };
  
  const handleComingSoon = () => {
    window.Telegram?.WebApp?.showAlert('Fitur ini akan segera hadir!');
  };

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
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <CheckCircleIcon style={styles.taskIcon} /> Check-in Harian
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <TvIcon style={styles.taskIcon} /> Tonton Iklan
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <UsersIcon style={styles.taskIcon} /> Undang Teman
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

