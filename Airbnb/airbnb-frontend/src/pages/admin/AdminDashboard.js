import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageBookings from "./ManageBookings";
import ManageProperties from "./ManageProperties";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("welcome"); // default view

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    alert("Admin logged out");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activePage) {
      case "bookings":
        return <ManageBookings />;
      case "properties":
        return <ManageProperties />;
	  case "users":
		return <ManageUsers />;
      default:
        return <h2 className="text-2xl font-bold">Welcome, Admin!</h2>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActivePage("properties")}
            className="block w-full text-left hover:bg-gray-700 p-2 rounded"
          >
            Manage Properties
          </button>
          <button
            onClick={() => setActivePage("bookings")}
            className="block w-full text-left hover:bg-gray-700 p-2 rounded"
          >
            Manage Bookings
          </button>
		  <button
	          onClick={() => setActivePage("users")}
	          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
	        >
	          Manage Users
	        </button>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded mt-6 w-full"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
