import { useState } from 'react';
import Login from './components/Login';
import RoleSelection from './components/RoleSelection';
import Dashboard from './components/Dashboard';
import AdvertiserDashboard from './components/AdvertiserDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleUserUpdate = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  };
  
  // Tahap 1: Login & ambil data user
  if (!currentUser) {
    return <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />;
  }

  // Tahap 2: Jika user baru, tampilkan pemilihan peran
  if (currentUser.role === 'new') {
    return <RoleSelection user={currentUser} onRoleSelected={handleUserUpdate} />;
  }
  
  // Tahap 3: Jika sudah punya peran, tampilkan dasbor yang sesuai
  if (currentUser.role === 'publisher') {
    return <Dashboard user={currentUser} onUserUpdate={handleUserUpdate} />;
  }
  
  if (currentUser.role === 'advertiser') {
    return <AdvertiserDashboard user={currentUser} />;
  }

  // Fallback jika ada status peran yang tidak dikenali
  return <p>Status akun tidak valid.</p>;
}

export default App;

