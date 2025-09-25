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

  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />;
  }
  
  return <Dashboard user={currentUser} />;
}

export default App;

