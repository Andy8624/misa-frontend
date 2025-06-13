import { PaginatedResponse } from "./global.interface";
export interface Employee {
  id: string;
  employeeCode: string; // Mã nhân viên
  fullName: string;
  dob: Date;
  sex: string;
  address: string;
  position: string; // Chức danh
  phoneNumber: string; // Số điện thoại
  passportNumber: string; // Số hộ chiếu
  idCardNumber: string; // Số CCCD
  idCardIssuedDate: string; // Ngày cấp CCCD
  idCardPlaceOfIssue: string; // Nơi cấp CCCD

  customerId: string; // Id khách hàng của ký toán (công ty)
  createdAt: string;
}

export type EmployeeResponse = PaginatedResponse<Employee>;

export interface CreateEmployeePayload {
  employeeCode: string; // Mã nhân viên
  fullName: string;
  dob: Date;
  sex: string;
  address: string;
  position: string; // Chức danh
  phoneNumber: string; // Số điện thoại
  passportNumber: string; // Số hộ chiếu
  idCardNumber: string; // Số CCCD
  idCardIssuedDate: string; // Ngày cấp CCCD
  idCardPlaceOfIssue: string; // Nơi cấp CCCD

  customerId: string; // Id khách hàng của ký toán (công ty)
}
