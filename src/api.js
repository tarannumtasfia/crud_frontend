import axios from 'axios';

const API = axios.create({
  baseURL: 'https://crud-users-ntn1.onrender.com',
  withCredentials: true,
});

// Automatically attach token to all requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
