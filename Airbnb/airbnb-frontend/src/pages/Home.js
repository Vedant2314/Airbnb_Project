// /frontend/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      city: params.get('city') || '',
    };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const { city } = getQueryParams();
      const endpoint = city
        ? `http://localhost:8081/api/properties?city=${encodeURIComponent(city)}`
        : `http://localhost:8081/api/properties`;

      try {
        const res = await axios.get(endpoint);
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setProperties([]);
      }
    };

    fetchProperties();
  }, [location.search]);

  const { city } = getQueryParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {city ? `Properties in "${city}"` : 'Available Stays'}
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-600">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link key={property.id} to={`/property/${property.id}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
                {property.imagePath && (
                  <img
                    src={`http://localhost:8081/${property.imagePath}`}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">
                  {property.city}, {property.state}
                </p>
                <p className="text-gray-800 font-bold">₹{property.price} / night</p>
                <p className="text-sm text-gray-500 mt-2">{property.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
