import React, { useState } from 'react';
import axios from 'axios';
import '../Login.css';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate hook

const Host = () => {
  const navigate = useNavigate(); // ✅ for redirect
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    price: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError('');
    setSuccessMessage('');
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setServerError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post('http://localhost:8081/api/properties/upload', data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Listed Successfully!");
      setSuccessMessage('Property listed successfully!');
      navigate("/"); // ✅ Redirect to homepage

      // Reset form
      setFormData({
        title: '',
        address: '',
        city: '',
        state: '',
        price: '',
        description: '',
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setServerError('❌ Failed to list property. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">List Your Property</h2>

        <form onSubmit={handleSubmit} className="login-form" encType="multipart/form-data">
          {serverError && <p className="error-text">{serverError}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}

          <div>
            <label>Property Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter property title"
              required
            />
          </div>

          <div>
            <label>Address</label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div>
            <label>City</label>
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>

          <div>
            <label>State</label>
            <input
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>

          <div>
            <label>Price per night (₹)</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter property description"
              required
            />
          </div>

          <div>
            <label>Upload Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Host;
