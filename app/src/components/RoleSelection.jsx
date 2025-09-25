import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://rajaview.vercel.app"; // Pastikan ini benar!

function RoleSelection({ user, onRoleSelected }) {
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/set-role`, {
        telegramId: user.telegramId,
        role: role,
      });
      onRoleSelected(response.data);
    } catch (error) {
      console.error("Gagal memilih peran:", error);

      // --- INI BAGIAN BARU YANG PENTING ---
      // Ambil pesan error yang lebih detail dari server
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      
      // Tampilkan pesan error yang lebih detail di pop-up
      window.Telegram?.WebApp?.showAlert(`Gagal memilih peran: ${errorMessage}`, () => {
        setLoading(false); // Aktifkan lagi tombol setelah pop-up ditutup
      });
      // --- AKHIR BAGIAN BARU ---

    } 
    // setLoading(false) dipindahkan ke dalam callback showAlert
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

