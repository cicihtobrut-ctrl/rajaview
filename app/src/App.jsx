import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      window.Telegram.WebApp.ready();
    } catch (e) {
      setError("Aplikasi harus dijalankan dari dalam Telegram.");
      console.error(e);
    }
  }, []);

  // Fungsi baru untuk memperbarui data pengguna dari komponen anak
  const handleUserUpdate = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  };

  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />;
  }
  
  // Kirim fungsi handleUserUpdate sebagai prop ke Dashboard
  return <Dashboard user={currentUser} onUserUpdate={handleUserUpdate} />;
}

export default App;

