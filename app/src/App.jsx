import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AutoAds from './components/AutoAds'; // <-- Impor komponen baru

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

  const handleUserUpdate = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  };

  return (
    <>
      <AutoAds /> {/* <-- Tambahkan komponen iklan otomatis di sini */}

      {!currentUser ? (
        <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />
      ) : (
        <Dashboard user={currentUser} onUserUpdate={handleUserUpdate} />
      )}
    </>
  );
}

export default App;

