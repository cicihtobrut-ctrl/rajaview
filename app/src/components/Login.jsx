import { useEffect, useState } from 'react';
import axios from 'axios';

// GANTI DENGAN URL VERCEL ANDA YANG SEBENARNYA!
const API_URL = "https://rajaview.vercel.app";

function Login({ onLoginSuccess, onError, onLoadingChange }) {
  const [status, setStatus] = useState('Menginisialisasi...');

  useEffect(() => {
    onLoadingChange(true);
    const authenticate = async () => {
      if (typeof window.Telegram === 'undefined' || !window.Telegram.WebApp) {
        setStatus("Error: Gagal memuat script Telegram.");
        onError("Aplikasi ini harus dibuka dari Telegram.");
        onLoadingChange(false);
        return;
      }
      
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      
      if (!user) {
        setStatus("Mode Debug: Tidak ada data user Telegram. Buka dari aplikasi Telegram asli.");
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
        setStatus(`Error: Gagal terhubung ke server. (${err.message})`);
        onError(err.message);
        console.error(err);
      } finally {
        onLoadingChange(false);
      }
    };

    authenticate();
  }, [onLoginSuccess, onError, onLoadingChange]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <p>{status}</p>
    </div>
  );
}

export default Login;

