import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const { id } = useParams(); // Get property ID from route
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Fetch property by ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch property:', err);
      }
    };
    fetchProperty();
  }, [id]);

  // 2. Recalculate total price
  useEffect(() => {
    if (checkIn && checkOut && property) {
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setTotalPrice(nights * property.price);
    }
  }, [checkIn, checkOut, property]);

  // 3. Directly save booking without Razorpay
  const handleBooking = async () => {
    if (!user) {
      alert("🔒 Please log in first.");
      return navigate('/login');
    }

    if (!checkIn || !checkOut || !property) {
      alert("⚠️ Select valid check-in and check-out dates.");
      return;
    }

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const amountToPay = nights * property.price;

    try {
      await axios.post('http://localhost:8081/api/bookings', {
        userId: user.id,
        propertyId: property.id,
        checkIn: checkIn.toISOString().split('T')[0],  // ✅ LocalDate format
        checkOut: checkOut.toISOString().split('T')[0],
        totalAmount: amountToPay
      });

      alert("✅ Booking successful!");
      navigate('/dashboard/bookings');
    } catch (err) {
      if (err.response?.status === 409) {
        alert("⚠️ Property already booked for these dates.");
      } else {
        console.error("❌ Booking save failed:", err);
        alert("Booking failed. Try again.");
      }
    }
  };


  // 4. Loading state
  if (!property) {
    return <div className="p-6 text-gray-600">Loading property...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <p className="mb-2 text-gray-600">₹{property.price} / night</p>

      <div className="space-y-4">
        <div>
          <label>Check-in:</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            className="border p-2"
            minDate={new Date()}
          />
        </div>
        <div>
          <label>Check-out:</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            className="border p-2"
            minDate={checkIn || new Date()}
          />
        </div>

        {totalPrice > 0 && (
          <div className="text-lg font-semibold">
            Total: ₹{totalPrice}
          </div>
        )}

        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
