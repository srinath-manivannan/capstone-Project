import axios from 'axios';

// Central axios instance - every API call in the app goes through this,
// so the base URL and auth token only need to be set up ONCE.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Automatically attaches the saved login token (if any) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
