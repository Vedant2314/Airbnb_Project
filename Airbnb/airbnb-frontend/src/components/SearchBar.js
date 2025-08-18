// /frontend/components/SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }
    navigate(`/?city=${encodeURIComponent(city.trim())}`);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-md rounded-full flex items-center px-4 py-2 space-x-4 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full outline-none text-sm text-gray-800 placeholder-gray-500"
        />
        <button
          className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
