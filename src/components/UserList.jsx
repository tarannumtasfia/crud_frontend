import React, { useState } from "react";
import API from "../api";
import "./UserList.css"; // Import CSS file

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
      onUpdate(id, res.data);
      cancelEdit();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {editingUserId === user._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    </td>
                    <td className="actions">
                      <button onClick={() => handleUpdate(user._id)} className="save-btn">Save</button>
                      <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.username}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.address || "N/A"}</td>
                    <td className="actions">
                      <button onClick={() => startEdit(user)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
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
