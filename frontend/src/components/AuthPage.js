import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = isLogin ? 'Login | AI CYBER SHIELD' : 'Register | AI CYBER SHIELD';
  }, [isLogin]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const endpoint = isLogin
      ? 'https://backend-edwk.onrender.com/api/auth/login'
      : 'https://backend-edwk.onrender.com/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
      });

      const token = response.headers.get('authorization')?.split(' ')[1];
      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        if (isLogin) {
          if (token || body.token) {
            localStorage.setItem('token', token || body.token);
            localStorage.setItem('role', body.role || 'USER');
            if (onLoginSuccess) onLoginSuccess(body.role || 'USER');
            navigate('/dashboard');
          } else {
            setMessage('❌ Login failed. No token received.');
          }
        } else {
          setMessage(body.message || '✅ Registration successful! You can now login.');
          setIsLogin(true);
        }
      } else {
        setMessage(body.message || `❌ ${isLogin ? 'Login' : 'Registration'} failed.`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, name, isLogin, navigate, onLoginSuccess]);

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-left-panel">
          <h2>{isLogin ? 'Hello Again!' : 'Join Us Today!'}</h2>
          <p>
            {isLogin
              ? 'To keep connected with us please login with your personal info.'
              : 'Enter your personal details and start your journey with us.'}
          </p>
          <button onClick={() => { setMessage(''); setIsLogin(!isLogin); }}>
            {isLogin ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </div>
        <div className="auth-right-panel">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            <button type="submit" disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          {message && <p className="auth-msg">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;