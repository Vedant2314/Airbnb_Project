import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/bookings/user/${user.id}`);
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:8081/api/bookings/${bookingId}`);
      alert("✅ Booking cancelled successfully.");
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error('Failed to cancel booking', err);
      alert("❌ Failed to cancel booking.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">Property</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Check-in</th>
              <th className="p-2 border">Check-out</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-2 border">{booking.id}</td>
                <td className="p-2 border">{booking.property.title}</td>
                <td className="p-2 border">
                  {booking.property.city}, {booking.property.state}
                </td>
                <td className="p-2 border">{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td className="p-2 border">{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td className="p-2 border">₹{booking.totalAmount}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
