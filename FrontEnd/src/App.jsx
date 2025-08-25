import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreateLogin from './components/CreateLogin';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { ContextListProvider } from './contexts/ContextList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <ContextListProvider>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route path="/register" element={<CreateLogin />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute token={token}>
              <DashboardPage onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </ContextListProvider>
  );
}

export default App;