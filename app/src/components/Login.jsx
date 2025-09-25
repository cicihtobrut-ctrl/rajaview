import { useEffect, useState } from 'react';
import axios from 'axios';

// Ganti dengan URL Vercel Anda!
const API_URL = "https://raja-view.vercel.app";

function Login({ onLoginSuccess, onError, onLoadingChange }) {
  const [status, setStatus] = useState('Menginisialisasi...');

  useEffect(() => {
    onLoadingChange(true);
    const authenticate = async () => {
      // Pastikan objek Telegram Web App sudah ada
      if (typeof window.Telegram === 'undefined' || !window.Telegram.WebApp) {
        setStatus("Error: Script Telegram tidak ditemukan.");
        onError("Aplikasi ini harus dibuka dari Telegram.");
        onLoadingChange(false);
        return;
      }
      
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      
      if (!user) {
        setStatus("Mode Debug: Tidak ada data user Telegram. Buka dari aplikasi Telegram asli untuk fungsionalitas penuh.");
        onError("Gagal mengambil data user.");
        onLoadingChange(false);
        return;
      }
      
      try {
        setStatus("Mengautentikasi dengan server...");
        const response = await axios.post(`${API_URL}/api/auth`, {
          telegramId: user.id,
          username: user.username,
        });
        
        onLoginSuccess(response.data);
      } catch (err) {
        setStatus(`Error: Gagal terhubung ke server. ${err.message}`);
        onError(err.message);
        console.error(err);
      } finally {
        onLoadingChange(false);
      }
    };

    authenticate();
  }, [onLoginSuccess, onError, onLoadingChange]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>{status}</p>
    </div>
  );
}

export default Login;

