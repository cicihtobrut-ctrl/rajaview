import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "https://rajaview.vercel.app"; // Ganti dengan URL Anda!

function Login({ onLoginSuccess, onError, onLoadingChange }) {
  const [status, setStatus] = useState('Menginisialisasi...');

  useEffect(() => {
    onLoadingChange(true);
    const authenticate = async () => {
      try {
        if (typeof window.Telegram === 'undefined' || !window.Telegram.WebApp) {
          throw new Error("Aplikasi ini harus dibuka dari Telegram.");
        }
        
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe?.user;
        const refCode = tg.initDataUnsafe?.start_param; // <-- AMBIL KODE REFERRAL DARI SINI

        if (!user) {
          throw new Error("Gagal mengambil data user Telegram.");
        }
        
        setStatus("Mengautentikasi dengan server...");
        const response = await axios.post(`${API_URL}/api/auth`, {
          telegramId: user.id,
          username: user.username,
          refCode: refCode || null, // Kirim kode referral ke backend
        });
        
        onLoginSuccess(response.data);
      } catch (err) {
        const message = err.message || "Terjadi kesalahan.";
        setStatus(`Error: ${message}`);
        onError(message);
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

