export const styles = {
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
    color: '#333',
  },
  // Tombol tugas
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

