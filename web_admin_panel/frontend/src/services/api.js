import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper for error handling
const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return { data: response.data, error: null };
  } catch (error) {
    console.error('API Error:', error);
    return { data: null, error: error.response?.data?.message || 'An error occurred' };
  }
};

export const adminConfig = {
  get: () => handleRequest(() => api.get('/api/admin/config')),
  update: (config) => handleRequest(() => api.post('/api/admin/config/update', config)),
};

export const adminSessions = {
  get: () => handleRequest(() => api.get('/api/admin/sessions')),
};

export const apiHealth = {
  check: () => handleRequest(() => api.get('/api/health')),
};

export const wishlist = {
  submit: (data) => handleRequest(() => api.post('/api/wishlist/submit', data)),
};

export default api;
