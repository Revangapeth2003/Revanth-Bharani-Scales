import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bharani-scales-backend-roan.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// Contact API endpoints
export const contactAPI = {
  submit: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  }
};

export default api;
