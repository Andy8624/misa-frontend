import { Gender } from "./global.interface";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    birthDate: string;
    gender: Gender;
    createdAt: string;
  };
}
