import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(`http://localhost:8081/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const saveUser = async () => {
    try {
      await axios.put(
        `http://localhost:8081/api/users/${editingUser.id}`,
        editingUser
      );
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">
                {editingUser?.id === u.id ? (
                  <input
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                ) : (
                  u.name
                )}
              </td>
              <td className="p-2 border">
                {editingUser?.id === u.id ? (
                  <input
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                ) : (
                  u.email
                )}
              </td>
              <td className="p-2 border">
                {editingUser?.id === u.id ? (
                  <input
                    value={editingUser.dob}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, dob: e.target.value })
                    }
                  />
                ) : (
                  u.dob
                )}
              </td>
              <td className="p-2 border">
                {editingUser?.id === u.id ? (
                  <input
                    value={editingUser.mobile}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, mobile: e.target.value })
                    }
                  />
                ) : (
                  u.mobile
                )}
              </td>
              <td className="p-2 border">
                {editingUser?.id === u.id ? (
                  <>
                    <button
                      onClick={saveUser}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingUser(u)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
