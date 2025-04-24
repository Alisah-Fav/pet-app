import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
});
apiClient.interceptors.request.use((config) => {
    // get access token from local storage
    const token = localStorage.getItem("token");
    // Attach token to Authorix=zation header
    config.headers.Authorization = `Bearer ${token}`;
    // Return config
    return config;
  });
