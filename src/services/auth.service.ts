import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/interfaces/auth.interface";
import axiosInstance from "@/libs/axios";

const authPath = "/auth";

export const authService = {
  async login(payload: LoginPayload) {
    const response = await axiosInstance.post<AuthResponse>(
      authPath + "/login",
      payload
    );
    // console.log("Login res", response);
    if (response?.data?.access_token) {
      localStorage.setItem("access_token", response?.data?.access_token);
    }
    return response?.data;
  },

  async register(payload: RegisterPayload) {
    const response = await axiosInstance.post<AuthResponse>(
      authPath + "/register",
      payload
    );
    console.log("Register res", response);
    return response?.data;
  },

  async logout() {
    localStorage.removeItem("access_token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },
};
