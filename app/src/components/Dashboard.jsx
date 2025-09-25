import React from 'react';

// Styling untuk dasbor yang lebih lengkap
const styles = {
  // Kontainer utama
  dashboard: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '16px',
    paddingBottom: '80px', // Beri ruang untuk navbar bawah
  },
  // Header yang berisi info pengguna
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '20px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginRight: '16px',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  userInfo: {
    flexGrow: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: '18px',
    margin: '0 0 4px 0',
  },
  level: {
    margin: 0,
    color: '#555',
    fontSize: '14px',
    backgroundColor: '#eee',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'inline-block',
  },
  balance: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#28a745',
  },
  // Kartu untuk setiap bagian tugas
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '20px',
  },
  cardTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
  },
  // Tombol tugas
  taskButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
  },
  // Navigasi bawah
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTop: '1px solid #ddd',
    padding: '8px 0',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
  },
  navButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#555',
  },
  navIcon: {
    fontSize: '24px',
  },
  navText: {
    fontSize: '12px',
  },
};

function Dashboard({ user }) {
  // Mendapatkan inisial dari username untuk ditampilkan di avatar
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };
  
  // Fungsi placeholder untuk tombol yang belum berfungsi
  const handleComingSoon = () => {
    window.Telegram.WebApp.showAlert('Fitur ini akan segera hadir!');
  };
  
  return (
    <div style={styles.dashboard}>
      {/* Header Pengguna */}
      <header style={styles.header}>
        <div style={styles.avatar}>{getInitials(user.username)}</div>
        <div style={styles.userInfo}>
          <p style={styles.username}>{user.username || 'Pengguna'}</p>
          <span style={styles.level}>Level {user.level}</span>
        </div>
        <div style={styles.balance}>
          Rp {parseFloat(user.balance).toLocaleString('id-ID')}
        </div>
      </header>
      
      {/* Kartu Tugas Harian */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Harian</h2>
        <button onClick={handleComingSoon} style={styles.taskButton}>✅ Check-in Harian</button>
        <button onClick={handleComingSoon} style={styles.taskButton}>📺 Tonton Iklan</button>
        <button onClick={handleComingSoon} style={styles.taskButton}>👥 Undang Teman</button>
      </div>
      
      {/* Kartu Tugas Utama */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Utama</h2>
        <button onClick={handleComingSoon} style={styles.taskButton}>🧱 Offerwall</button>
        <button onClick={handleComingSoon} style={styles.taskButton}>🔗 Shortener</button>
        <button onClick={handleComingSoon} style={styles.taskButton}>📱 Ikuti Media Sosial</button>
      </div>
      
      {/* Navigasi Bawah */}
      <nav style={styles.navbar}>
        <button style={{...styles.navButton, color: '#007bff'}}>
          <span style={styles.navIcon}>🏠</span>
          <span style={styles.navText}>Home</span>
        </button>
        <button onClick={handleComingSoon} style={styles.navButton}>
          <span style={styles.navIcon}>💸</span>
          <span style={styles.navText}>Tarik Dana</span>
        </button>
        <button onClick={handleComingSoon} style={styles.navButton}>
          <span style={styles.navIcon}>👤</span>
          <span style={styles.navText}>Profil</span>
        </button>
      </nav>
    </div>
  );
}

export default Dashboard;

