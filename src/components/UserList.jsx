import React from "react";
import API from "../api";

const UserList = ({ users, error, onDelete }) => {
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
            <td className="border border-gray-400 px-4 py-2">{user.username}</td>
            <td className="border border-gray-400 px-4 py-2">{user.email || "N/A"}</td>
            <td className="border border-gray-400 px-4 py-2">{user.address || "N/A"}</td>
            <td className="border border-gray-400 px-4 py-2 text-center">
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default UserList;
