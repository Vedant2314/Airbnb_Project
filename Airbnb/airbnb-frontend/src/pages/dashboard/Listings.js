import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/properties');
      setProperties(res.data);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/api/properties/${id}`);
      alert('Listing deleted successfully.');
      fetchProperties(); // ✅ Re-fetch updated data
    } catch (err) {
      console.error('Failed to delete listing:', err);
      alert('Error deleting listing.');
    }
  };


  const handleEditClick = (property) => {
    setEditingId(property.id);
    setEditForm({
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      price: property.price,
      description: property.description,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/properties/${id}`, editForm);
      alert('Listing updated successfully.');
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      console.error('Failed to update listing:', err);
      alert('Error updating listing.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 shadow bg-white relative">
            {property.imagePath && (
              <img
                src={`http://localhost:8081/${property.imagePath}`}
                alt={property.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {editingId === property.id ? (
              <>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-1 border rounded"
                />
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-1 border rounded"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full mb-2 p-1 border rounded"
                />
                <button
                  onClick={() => handleSave(property.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.city}, {property.state}</p>
                <p className="text-gray-800 font-bold">₹{property.price} / night</p>
                <p className="text-sm text-gray-500 mt-2">{property.description}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
