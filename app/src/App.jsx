import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import WithdrawPage from './components/WithdrawPage';
import RoleSelection from './components/RoleSelection';
import AdvertiserDashboard from './components/AdvertiserDashboard';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
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
  
  const navigateTo = (page) => setCurrentPage(page);

  const renderContent = () => {
    if (!currentUser) {
      return <Login onLoginSuccess={setCurrentUser} onError={setError} onLoadingChange={setLoading} />;
    }

    switch (currentUser.role) {
      case 'new':
        return <RoleSelection user={currentUser} onRoleSelected={handleUserUpdate} />;
      case 'advertiser':
        return <AdvertiserDashboard user={currentUser} />;
      case 'publisher':
        // Router untuk publisher
        switch (currentPage) {
          case 'withdraw':
            return <WithdrawPage user={currentUser} onBack={() => navigateTo('dashboard')} onUserUpdate={handleUserUpdate} />;
          case 'dashboard':
          default:
            return <Dashboard user={currentUser} onUserUpdate={handleUserUpdate} onNavigate={navigateTo} />;
        }
      default:
        return <p>Status akun tidak valid.</p>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}

export default App;

