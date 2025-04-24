// src/services/auth.js
import { apiClient } from "./config";

// Signup function with your existing endpoint
export const apiSignUp = (payload) => {
  return apiClient.post("/user/register", payload, {
    headers: {
      "Content-Type": 'application/json'
    }
  });
};

// Login function with your existing endpoint
export const apiSignIn = (payload) => {
  return apiClient.post("/user/login", payload, {
    headers: {
      "Content-Type": 'application/json'
    }
  });
};

// Add auth token to requests
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

// Initialize token from localStorage if it exists
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default apiClient;


