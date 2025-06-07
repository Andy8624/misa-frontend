import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Ignore localStorage errors during SSR
      console.debug("Unable to access localStorage during SSR", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    } catch (error) {
      console.debug("Error handling unauthorized response", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
