import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://raja-view.vercel.app"; // Ganti dengan URL Anda!

function RoleSelection({ user, onRoleSelected }) {
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/set-role`, {
        telegramId: user.telegramId,
        role: role,
      });
      onRoleSelected(response.data); // Kirim data user yang sudah di-update
    } catch (error) {
      console.error("Gagal memilih peran:", error);
      window.Telegram?.WebApp?.showAlert('Gagal memilih peran. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Selamat Datang!</h2>
      <p>Pilih peran Anda untuk melanjutkan:</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => handleRoleSelect('publisher')} 
          disabled={loading}
          style={{ display: 'block', width: '100%', padding: '15px', marginBottom: '15px', fontSize: '16px' }}
        >
          {loading ? 'Memproses...' : 'Saya Ingin Menghasilkan Uang (Publisher)'}
        </button>
        <button 
          onClick={() => handleRoleSelect('advertiser')} 
          disabled={loading}
          style={{ display: 'block', width: '100%', padding: '15px', fontSize: '16px' }}
        >
          {loading ? 'Memproses...' : 'Saya Ingin Beriklan (Pengiklan)'}
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;

