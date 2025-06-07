import { Gender, PaginatedResponse } from "./global.interface";

export interface Accountant {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender;
  avatarUrl: string;
  address: string;
  zipCode: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type AccountantResponse = PaginatedResponse<Accountant>;

export interface UpdateAccountantPayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender;
}
