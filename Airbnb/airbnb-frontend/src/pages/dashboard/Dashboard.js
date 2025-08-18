import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const menuItems = [
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Bookings", path: "/dashboard/bookings" },
    { label: "Listings", path: "/dashboard/listings" },
    //{ label: "Messages", path: "/dashboard/messages" },
    //{ label: "Settings", path: "/dashboard/settings" },
    { label: "Logout", path: "/logout" },
  ];

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="text-blue-600 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
