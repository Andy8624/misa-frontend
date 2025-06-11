import { ROUTES } from "@/constants/routes";
import axios from "axios";
import { useMessage } from "@/providers/MessageProvider";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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

// Hàm để xử lý lỗi 401
export const handle401Error = () => {
  const messageApi = useMessage();
  localStorage.removeItem("access_token");
  messageApi.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

  if (typeof window !== "undefined") {
    window.location.href = ROUTES.AUTH.LOGIN;
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response?.status === 401) {
        handle401Error();
      }
    } catch (error) {
      console.debug("Error handling unauthorized response", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
