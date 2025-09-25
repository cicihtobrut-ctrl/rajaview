import React, { useState } from 'react';
import axios from 'axios';

// Ganti dengan URL Vercel Anda!
const API_URL = "https://rajaview.vercel.app";

function WithdrawPage({ user, onBack, onUserUpdate }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    const amountToConvert = parseFloat(amount);
    if (!amount || isNaN(amountToConvert) || amountToConvert <= 0) {
      window.Telegram?.WebApp?.showAlert('Masukkan jumlah poin yang valid.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/convert/earning-to-main`, {
        telegramId: user.telegramId,
        amount: amountToConvert,
      });
      onUserUpdate(response.data.user); // Update saldo di seluruh aplikasi
      window.Telegram?.WebApp?.showAlert(response.data.message);
      setAmount(''); // Kosongkan input setelah berhasil
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Terjadi kesalahan.';
      window.Telegram?.WebApp?.showAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const earningBalance = parseFloat(user?.earningBalance || 0);
  const mainBalance = parseFloat(user?.mainBalance || 0).toLocaleString('id-ID');

  const styles = {
    page: { padding: '16px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' },
    header: { display: 'flex', alignItems: 'center', marginBottom: '16px' },
    backButton: { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '24px', marginRight: '10px' },
    title: { margin: 0, fontSize: '20px' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '16px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' },
    cardTitle: { margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' },
    balanceInfo: { margin: '0 0 16px 0', fontSize: '14px' },
    input: { width: 'calc(100% - 22px)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px', fontSize: '16px' },
    actionButton: { width: '100%', padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backButton}>&larr;</button>
        <h1 style={styles.title}>Tarik Dana</h1>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Konversi Poin ke Saldo Utama</h2>
        <p style={styles.balanceInfo}>Poin Anda Saat Ini: <strong>{earningBalance.toLocaleString('id-ID')} Poin</strong></p>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Jumlah poin yang akan dikonversi"
          style={styles.input}
        />
        <button onClick={handleConvert} disabled={loading} style={styles.actionButton}>
          {loading ? 'Memproses...' : 'Konversi Sekarang'}
        </button>
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. Tarik Saldo Utama</h2>
        <p style={styles.balanceInfo}>Saldo Utama Anda: <strong>Rp {mainBalance}</strong></p>
        <p style={{textAlign: 'center', color: '#888'}}>Fitur penarikan ke E-Wallet akan segera hadir.</p>
      </div>
    </div>
  );
}

export default WithdrawPage;

