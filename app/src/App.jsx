import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Efek ini hanya untuk inisialisasi awal
  useEffect(() => {
    try {
      // Memberi tahu Telegram bahwa aplikasi siap
      window.Telegram.WebApp.ready();
    } catch (e) {
      setError("Aplikasi harus dijalankan dari dalam Telegram.");
      console.error(e);
    }
  }, []);

  // Tampilkan halaman Login jika belum ada user
  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />;
  }
  
  // Tampilkan dasbor jika sudah berhasil login
  return <Dashboard user={currentUser} />;
}

export default App;

