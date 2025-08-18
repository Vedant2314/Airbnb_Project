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
      setBookings(bookings.filter((b) => b.id !== bookingId)); // Update state
    } catch (err) {
      console.error('Failed to cancel booking', err);
      alert("❌ Failed to cancel booking.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{booking.property.title}</h2>
              <p>{booking.property.city}, {booking.property.state}</p>
              <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p>Total: ₹{booking.totalAmount}</p>
              <button
                onClick={() => cancelBooking(booking.id)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-2"
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
