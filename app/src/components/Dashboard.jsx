// src/components/Dashboard.jsx
import React from 'react';

// Styling sederhana di dalam file yang sama
const styles = {
  dashboard: {
    fontFamily: 'sans-serif',
    padding: '16px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    color: '#333',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '12px',
    backgroundColor: '#ccc', // Placeholder color
  },
  userInfo: {
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    margin: 0,
  },
  balance: {
    margin: 0,
    color: '#007bff',
  },
  tasksContainer: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tasksTitle: {
    marginBottom: '16px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  taskButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    textAlign: 'left',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
  }
};

function Dashboard({ user }) {
  // Kita bisa menambahkan foto profil jika tersedia
  // const avatarUrl = user.photo_url || `https://api.dicebear.com/8.x/initials/svg?seed=${user.username}`;

  return (
    <div style={styles.dashboard}>
      {/* Bagian Header Informasi Pengguna */}
      <header style={styles.header}>
        <div style={styles.avatar}></div> {/* Nanti bisa diganti <img> */}
        <div style={styles.userInfo}>
          <p style={styles.username}>{user.username || 'Pengguna'}</p>
          <p style={styles.balance}>Saldo: Rp {parseFloat(user.balance).toLocaleString('id-ID')}</p>
        </div>
      </header>

      {/* Bagian Konten Utama untuk Tugas */}
      <main style={styles.tasksContainer}>
        <h2 style={styles.tasksTitle}>Tugas Harian</h2>
        <button style={styles.taskButton}>✅ Check-in Harian</button>
        <button style={styles.taskButton}>📺 Tonton Iklan</button>
        <button style={styles.taskButton}>👥 Undang Teman</button>
      </main>
    </div>
  );
}

export default Dashboard;
