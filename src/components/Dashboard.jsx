import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import API from '../api';

const Dashboard = ({ loggedIn }) => {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState('');

const handleUserDelete = (id) => {
  setUsers((prev) => prev.filter((user) => user._id !== id));
};
const handleUpdate = (id, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, ...updatedUser } : user
      )
    );
  };
useEffect(() => {
  if (!loggedIn) return;

  API.get('/api/authuser/getallusers')
    .then(res => {
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setError('');
      } else {
        setError('Invalid data format received from server');
      }
    })
    .catch(err => {
      console.error(err);
      setError(err.response?.data?.message || 'Error fetching users');
    });
}, [loggedIn]);


  return (
    <div>
     
      <UserList users={users} error={error} onDelete={handleUserDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default Dashboard;
