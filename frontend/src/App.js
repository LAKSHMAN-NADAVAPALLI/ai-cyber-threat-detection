import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AnalyzePredict from './components/AnalyzePredict';
import AuthPage from './components/AuthPage';
import AdminAuthPage from './components/AdminAuthPage';
import HomePage from './components/Homepage';
import AdminDashboard from './components/AdminDashboard';
import EditUser from './components/EditUser';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import Features from './components/Features'
import About from './components/About';
import './index.css';
import Contact from './components/Contact';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // NEW

  useEffect(() => {
    // simulate async auth loading
     document.title = "CyberShield AI";
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role')?.toUpperCase();

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(userRole === 'ADMIN');
    }
    setAuthLoading(false); // done loading auth status
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleLoginSuccess = (role) => {
    const normalizedRole = role?.toUpperCase() || '';

    setIsLoggedIn(true);
    setIsAdmin(normalizedRole === 'ADMIN');
  };

  // While auth state is loading, don't render routes (avoid unwanted redirects)
  if (authLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
         <Route path="/features" element={<Features/>} />
          <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
        {/* User Login/Register Page */}
        <Route
          path="/login/user"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Admin Login Page */}
        <Route
          path="/login/admin"
          element={
            isLoggedIn ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <AdminAuthPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Admin Dashboard Page */}
        <Route
          path="/admin-dashboard"
          element={
            isLoggedIn && isAdmin ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/admin" replace />
            )
          }
        />

        {/* User Management Page (Admin Only) */}
        <Route
          path="/admin/usermanagement"
          element={
            isLoggedIn && isAdmin ? (
              <UserManagement />
            ) : (
              <Navigate to="/login/admin" replace />
            )
          }
        />

        {/* View Analytics Page (Admin Only) */}
        <Route
          path="/admin/analytics"
          element={
            isLoggedIn && isAdmin ? (
              <Analytics />
            ) : (
              <Navigate to="/login/admin" replace />
            )
          }
        />

        {/* User Dashboard (Protected Route) */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && !isAdmin ? (
              <AnalyzePredict onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/user" replace />
            )
          }
        />

        {/* Edit User Page (Admin Only) */}
        <Route
          path="/admin/users/edit-user/:id"
          element={
            isLoggedIn && isAdmin ? (
              <EditUser onLogout={handleLogout} />
            ) : (
              <Navigate to="/login/admin" replace />
            )
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<p className="text-center mt-20 text-lg">404 - Page Not Found</p>}
        />
      </Routes>
    </div>
  );
}

export default App;
