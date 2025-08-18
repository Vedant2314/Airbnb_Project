import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Stays from './pages/Stays';
import Host from './pages/Host';
import Home from './pages/Home';
import SearchBar from "./components/SearchBar";
import Dashboard from "./pages/dashboard/Dashboard";
import PropertyDetails from './pages/PropertyDetails';
import BookingPage from './pages/BookingPage';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageProperties from "./pages/admin/ManageProperties";
import ManageUsers from './pages/admin/ManageUsers';

import Profile from "./pages/dashboard/Profile";
import Bookings from "./pages/dashboard/Bookings";
import Listings from "./pages/dashboard/Listings";
import Messages from "./pages/dashboard/Messages";
import Settings from "./pages/dashboard/Settings";
import Logout from "./pages/dashboard/Logout";
import Service from './pages/Service';

const AppWrapper = () => {
  const location = useLocation();

  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const dashboardRef = useRef(null);

  // Close dashboard when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        setShowDashboard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Protect user dashboard
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  // Protect admin dashboard
  const AdminRoute = ({ children }) => {
    return isAdmin ? children : <Navigate to="/login" />;
  };

  // Hide navbar if on admin pages
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50">
      {/* Sidebar Dashboard for User */}
      {showDashboard && isLoggedIn && !hideNavbar && (
        <div ref={dashboardRef}>
          <Dashboard />
        </div>
      )}

      {/* Navbar (only if not admin) */}
      {!hideNavbar && (
        <header className="flex flex-col md:flex-row md:justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-40 gap-4">
		{/* Logo */}
		<Link to="/" className="flex items-center">
		  <img 
		    src={require("./Logo/logo.png")} 
		    alt="Airbnb Logo" 
		    className="h-10 w-auto"
		  />
		</Link>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>

          {/* Nav Right Side */}
          <div className="flex items-center space-x-4">
            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Link to="/stays" className="hover:underline">Stays</Link>
              <Link to="/host" className="hover:underline">Host</Link>
              <Link to="/service" className="hover:underline">Services</Link>
            </nav>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="border px-3 py-1 rounded-full hover:bg-gray-100 transition">Login</Link>
                <Link to="/signup" className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition">Sign Up</Link>
              </>
            ) : null}

            {/* ☰ Dashboard Toggle - only if logged in */}
            {isLoggedIn && (
              <button
                className="text-3xl ml-2"
                onClick={() => setShowDashboard(!showDashboard)}
              >
                ☰
              </button>
            )}
          </div>
        </header>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/host" element={<Host />} />
        <Route path="/service" element={<Service />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />

        {/* User Dashboard */}
        <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
        <Route path="/dashboard/listings" element={<PrivateRoute><Listings /></PrivateRoute>} />
        <Route path="/dashboard/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path="/dashboard/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout setIsLoggedIn={setIsLoggedIn} /></PrivateRoute>} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
		<Route path="/admin/manage-properties" element={<AdminRoute><ManageProperties /></AdminRoute>} />
		<Route path="/admin/manage-bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
		<Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
