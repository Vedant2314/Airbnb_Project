import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Signup.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    mobile: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8081/api/users/signup',
        formData
      );

      alert('Signup successful! You can now log in.');
      console.log('User response:', response.data);

      // ✅ Only store user data if needed, do NOT auto-login
      localStorage.setItem('newUser', JSON.stringify(response.data));

      // ✅ Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please check your backend connection.');
    }
  };

  return (
    <div className="signup-container">
      <div className="background-overlay"></div>

      <div className="form-wrapper">
        <h2 className="form-title">Join Airbnb</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              maxLength={12}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              maxLength={12}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g. 9XXXXXXXXX"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
