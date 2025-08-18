import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    }
  };

  const deleteProperty = async (id) => {
    if (window.confirm("Delete this property?")) {
      try {
        await axios.delete(`http://localhost:8081/api/properties/${id}`);
        fetchProperties();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Properties</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">{p.city}</td>
              <td className="p-2 border">₹{p.price}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteProperty(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
