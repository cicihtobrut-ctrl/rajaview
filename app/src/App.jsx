// src/App.jsx
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // <-- Impor dasbor baru

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Logika untuk menampilkan halaman login atau dasbor
  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} />;
  }

  // Jika user sudah login, tampilkan Dasbor baru yang lebih lengkap
  return <Dashboard user={currentUser} />;
}

export default App;

