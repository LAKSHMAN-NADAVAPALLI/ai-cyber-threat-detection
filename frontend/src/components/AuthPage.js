import React, { useState, useEffect } from 'react';
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
    document.title = isLogin ? 'Login | Job Portal' : 'Register | Job Portal';
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost:8080/api/auth/login'
      : 'http://localhost:8080/api/auth/register';

    const payload = isLogin ? { email, password } : { name, email, password };

    setMessage(''); // Clear previous message
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const headerToken = response.headers.get('authorization')?.split(' ')[1];
      const text = await response.text();

      let body = {};
      try {
        body = JSON.parse(text);
      } catch {
        console.warn('⚠️ Could not parse JSON response body');
      }

      if (response.ok) {
        if (isLogin) {
          const token = headerToken || body.token;
          const role = body.role || 'USER';

          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (onLoginSuccess) onLoginSuccess(role);

            // Navigate only after successful login
            if (navigate) {
              navigate('/dashboard');
            }
          } else {
            setMessage('❌ Login failed. No token received.');
          }
        } else {
          // Registration success
          setMessage(body.message || '✅ Registration successful! You can now login.');
          setIsLogin(true); // Switch to login form after registration
        }
      } else {
        // Handle server error messages for both login and register
        setMessage(body.message || `❌ ${isLogin ? 'Login' : 'Registration'} failed.`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={() => {
              setMessage('');
              setIsLogin(!isLogin);
            }}
          >
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
