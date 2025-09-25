import React from 'react';

// Styling untuk dasbor yang lebih lengkap
const styles = {
  dashboard: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '16px',
    paddingBottom: '80px', // Beri ruang untuk navbar bawah
  },
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
    color: '#333',
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
    color: '#333',
  },
  taskButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px',
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333',
    transition: 'background-color 0.2s ease-in-out',
  },
  taskButtonHover: {
    backgroundColor: '#f0f2f5',
  },
  taskIcon: {
    marginRight: '12px',
    width: '24px',
    height: '24px',
    color: '#007bff', // Warna ikon tugas
  },
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
    zIndex: 1000,
  },
  navButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#555',
    fontSize: '12px',
    padding: '4px 0',
    flex: 1, // Agar tombol mengisi ruang secara merata
  },
  navIcon: {
    width: '24px',
    height: '24px',
    marginBottom: '4px',
  },
  navText: {
    fontSize: '11px', // Sedikit lebih kecil untuk mobile
    fontWeight: '500',
  },
  activeNav: {
    color: '#007bff', // Warna untuk tombol navigasi aktif
  }
};

// --- Komponen Ikon SVG ---
// Anda bisa mendapatkan lebih banyak ikon dari https://heroicons.com/ (versi mini lebih bagus)
// Atau https://feathericons.com/

const HomeIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const WalletIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15M21 12a2.25 2.25 0 01-2.25 2.25H15m0 0l-3 3m0-3l3-3m-4.5-5.25H9M12 10.5h.008v.008H12V10.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const UserIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CheckCircleIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TvIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3.645A11.05 11.05 0 0112 3c3.737 0 7.04-1.123 9.375-3.248M2.25 16.125a11.05 11.05 0 011.995-3.805L2.25 16.125zm14.438-9.75L21.75 7.5m-4.244 5.38a1.242 1.242 0 01-1.255 1.255h-.03V13.5a.75.75 0 00-.75-.75h-.007a.75.75 0 00-.75.75v.007c0 .414.336.75.75.75h.007a.75.75 0 00.75-.75v-.007L17.75 14.25h.03c.414 0 .75-.336.75-.75v-.03c0-.414-.336-.75-.75-.75z" />
  </svg>
);

const UsersIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CubeIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const LinkIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.393-.707l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);


function Dashboard({ user }) {
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U'; // 'U' untuk default User
  };
  
  const handleComingSoon = () => {
    window.Telegram?.WebApp?.showAlert('Fitur ini akan segera hadir!');
  };

  const username = user?.username || 'Pengguna';
  const level = user?.level || 1;
  const balance = parseFloat(user?.balance || 0).toLocaleString('id-ID');

  return (
    <div style={styles.dashboard}>
      {/* Header Pengguna */}
      <header style={styles.header}>
        <div style={styles.avatar}>{getInitials(username)}</div>
        <div style={styles.userInfo}>
          <p style={styles.username}>{username}</p>
          <span style={styles.level}>Level {level}</span>
        </div>
        <div style={styles.balance}>
          Rp {balance}
        </div>
      </header>
      
      {/* Kartu Tugas Harian */}
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
      
      {/* Kartu Tugas Utama */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Tugas Utama</h2>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <CubeIcon style={styles.taskIcon} /> Offerwall
        </button>
        <button onClick={handleComingSoon} style={styles.taskButton}>
          <LinkIcon style={styles.taskIcon} /> Shortener
        </button>
      </div>
      
      {/* Navigasi Bawah */}
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

