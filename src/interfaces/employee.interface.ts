import { PaginatedResponse } from "./global.interface";
export interface Employee {
  id: string;
  employeeCode: string; // Mã nhân viên
  fullName: string;
  position: string; // Chức danh
  customerId: string; // Id khách hàng của ký toán (công ty)
  createdAt: string;
}

export type EmployeeResponse = PaginatedResponse<Employee>;

export interface CreateEmployeePayload {
  employeeCode: string; // Mã nhân viên
  fullName: string;
  position: string; // Chức danh
  customerId: string; // Id khách hàng của ký toán (công ty)
}
