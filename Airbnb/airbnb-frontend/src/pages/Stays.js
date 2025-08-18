import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ← Add Link for routing

const Stays = () => {
  const [groupedProperties, setGroupedProperties] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/properties');

        // Group by city
        const grouped = res.data.reduce((acc, property) => {
          const city = property.city || 'Other';
          if (!acc[city]) {
            acc[city] = [];
          }
          acc[city].push(property);
          return acc;
        }, {});

        setGroupedProperties(grouped);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse All Stays by City</h1>

      {Object.entries(groupedProperties).map(([city, stays]) => (
        <div key={city} className="mb-10">
          <h2 className="text-xl font-semibold mb-2">{city}</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {stays.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="min-w-[300px] border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
              >
                {property.imagePath && (
                  <img
                    src={`http://localhost:8081/${property.imagePath}`}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.city}, {property.state}</p>
                <p className="text-gray-800 font-bold">₹{property.price} / night</p>
                <p className="text-sm text-gray-500 mt-2">{property.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stays;
