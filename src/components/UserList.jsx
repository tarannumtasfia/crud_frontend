import React, { useState } from "react";
import API from "../api";

const UserList = ({ users, error, onDelete, onUpdate }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    address: ""
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/api/authuser/delete/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditData({
      username: user.username,
      email: user.email || "",
      address: user.address || ""
    });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditData({ username: "", email: "", address: "" });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await API.put(`/api/authuser/update/${id}`, editData);
      onUpdate(id, res.data); // Optional: refresh UI
      cancelEdit();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Username</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Email</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Address</th>
              <th className="border border-gray-400 px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                {editingUserId === user._id ? (
                  <>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-400 px-4 py-2">{user.email || "N/A"}</td>
                    <td className="border border-gray-400 px-4 py-2">{user.address || "N/A"}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
