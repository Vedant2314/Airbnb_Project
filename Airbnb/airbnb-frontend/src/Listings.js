import React, { useEffect, useState } from "react";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/listings")
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="border p-4 rounded shadow">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{listing.title}</h3>
            <p className="text-sm text-gray-500">{listing.location}</p>
            <p className="font-semibold">₹{listing.price} / night</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
