import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../Login.css';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/admin-dashboard');
    } else if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email && !isAdminMode) {
      newErrors.email = 'Email is required';
    } else if (!isAdminMode && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isAdminMode) {
        if (formData.password === 'admin123') {
          localStorage.setItem('isAdmin', 'true');
          setIsAdmin(true);
          alert('✅ Admin login successful!');
          navigate('/admin-dashboard');
        } else {
          setServerError('❌ Invalid admin password.');
        }
      } else {
        try {
          const response = await axios.post('http://localhost:8081/api/users/login', formData, {
            headers: { 'Content-Type': 'application/json' }
          });

          alert('✅ Login successful!');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.data));
          setIsLoggedIn(true);

          navigate('/');
        } catch (error) {
          console.error('Login failed:', error);
          if (error.response && error.response.status === 500) {
            setServerError('Invalid email or password.');
          } else {
            setServerError('Login error. Please try again.');
          }
        }
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">
          {isAdminMode ? 'Admin Login' : 'Login to Airbnb'}
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          {serverError && <p className="error-text">{serverError}</p>}

          {!isAdminMode && (
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="login-button">
            {isAdminMode ? 'Login as Admin' : 'Log In'}
          </button>

          {/* Toggle Link under button */}
          <div style={{ textAlign: 'right', marginTop: '5px' }}>
            <span
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setServerError('');
                setErrors({});
              }}
              style={{
                fontSize: '0.9rem',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Switch to {isAdminMode ? 'User Login' : 'Admin Login'}
            </span>
          </div>

          {!isAdminMode && (
            <p className="signup-text"> Don’t have an account? 
			<span 
			style={{
                fontSize: '0.9rem',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}>		
             <Link to="/signup">Sign up</Link>
			  </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
