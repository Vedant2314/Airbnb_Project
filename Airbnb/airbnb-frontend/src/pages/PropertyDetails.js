import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Failed to fetch property:', err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="p-6 text-gray-600">Loading property details...</div>;
  }
  
  const handleBooking = () => {
    if (!localStorage.getItem('isLoggedIn')) {
      alert('Please log in to book a property.');
      navigate('/login');
    } else {
      navigate(`/booking/${property.id}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {property.imagePath && (
        <img
          src={`http://localhost:8081/${property.imagePath}`}
          alt={property.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-lg text-gray-600 mb-2">{property.city}, {property.state}</p>
      <p className="text-xl text-gray-800 font-bold mb-4">₹{property.price} / night</p>
      <p className="text-gray-700 mb-6">{property.description}</p>

      <button
        onClick={handleBooking}
        className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default PropertyDetails;
