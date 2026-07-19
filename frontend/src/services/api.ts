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

// If the backend ever rejects our token (expired / invalid / not logged in),
// clear it and send the user back to login. This runs OUTSIDE React, so we
// use window.location rather than react-router's navigate.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      // Guard against redirect loops if a 401 happens while already on /login
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;