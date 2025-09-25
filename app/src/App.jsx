// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

// Ganti dengan URL Vercel Anda yang sebenarnya!
const API_URL = "https://nama-proyek-anda.vercel.app";

function App() {
  const [users, setUsers] = useState([]); // State untuk menyimpan daftar pengguna
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  // useEffect akan berjalan saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users`);
        setUsers(response.data); // Simpan data ke state
      } catch (err) {
        setError("Gagal memuat data pengguna."); // Simpan pesan error
        console.error(err);
      } finally {
        setLoading(false); // Hentikan loading, apapun hasilnya
      }
    };

    fetchUsers();
  }, []); // Array kosong artinya efek ini hanya berjalan sekali

  if (loading) return <p>Sedang memuat...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Daftar Pengguna Terdaftar</h1>
      {users.length === 0 ? (
        <p>Belum ada pengguna.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.userId}>
              ID: {user.telegramId} - Username: {user.username || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
