import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('tt_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle responses and errors
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('tt_token');
          localStorage.removeItem('tt_user');
          window.location.href = '/enter-code';
          break;

        case 403:
          // Forbidden
          console.error('Access forbidden:', data.message);
          break;

        case 404:
          // Not found
          console.error('Resource not found:', data.message);
          break;

        case 422:
          // Validation error
          console.error('Validation error:', data.errors);
          break;

        case 500:
          // Server error
          console.error('Server error:', data.message);
          break;

        default:
          console.error('API error:', data.message || 'Unknown error');
      }

      // Return formatted error
      return Promise.reject({
        status,
        message: data.message || 'An error occurred',
        errors: data.errors || null,
        data: data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received');
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: null,
        data: null,
      });
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject({
        status: 0,
        message: error.message || 'Request failed',
        errors: null,
        data: null,
      });
    }
  }
);

// API methods for authentication
export const authAPI = {
  validateCode: (code) => api.post('/auth/validate-code', { code }),
  claimCode: (email, sessionToken) => api.post('/auth/claim-code', { email, sessionToken }),
  login: (email) => api.post('/auth/login', { email }),
};

// API methods for brand management
export const brandAPI = {
  save: (userId, brandData) => api.post('/brand/save', { userId, brandData }),
  get: (userId) => api.get(`/brand/${userId}`),
  update: (userId, updates) => api.patch(`/brand/${userId}`, updates),
};

// API methods for asset management
export const assetAPI = {
  initialize: (userId) => api.post('/assets/initialize', { userId }),
  generate: (templateId, userId, customizations) =>
    api.post(`/assets/generate/${templateId}`, { userId, customizations }),
  list: (userId) => api.get(`/assets/${userId}`),
  download: (assetId) => api.get(`/assets/download/${assetId}`, { responseType: 'blob' }),
  delete: (assetId) => api.delete(`/assets/${assetId}`),
};

// API methods for launch plan
export const launchPlanAPI = {
  getProgress: (userId) => api.get(`/launch-plan/${userId}`),
  completeWeek: (userId, week) => api.post('/launch-plan/complete-week', { userId, week }),
  resetProgress: (userId) => api.post('/launch-plan/reset', { userId }),
};

// API methods for file uploads
export const uploadAPI = {
  uploadImage: (file, userId) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);

    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadLogo: (file, userId) => {
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('userId', userId);

    return api.post('/upload/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('tt_token', token);
  } else {
    localStorage.removeItem('tt_token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('tt_token');
};

export const clearAuth = () => {
  localStorage.removeItem('tt_token');
  localStorage.removeItem('tt_user');
};

export default api;
