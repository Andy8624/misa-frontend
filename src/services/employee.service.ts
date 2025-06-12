import { AccountantResponse } from "@/interfaces/accountant.interface";
import { EmployeeResponse } from "@/interfaces/employee.interface";
import axiosInstance from "@/libs/axios";

const employeePath = "/employees";

export const employeeService = {
  async callGetAll(param: string = "") {
    const path = employeePath + param;
    console.log(path);
    const response = await axiosInstance.get<EmployeeResponse>(path);
    console.log("Employee Data", response);
    return response?.data;
  },
};
