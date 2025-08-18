import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="p-6 text-gray-500">No user data found. Please log in.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <div className="bg-white shadow p-4 rounded-lg space-y-3 max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Birth:</strong> {user.dob}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>
    </div>
  );
};

export default Profile;
