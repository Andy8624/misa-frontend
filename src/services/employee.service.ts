import {
  CreateEmployeePayload,
  EmployeeResponse,
} from "@/interfaces/employee.interface";
import axiosInstance from "@/libs/axios";

const employeePath = "/employees";
export const employeeService = {
  async callGetAll(param: string = "") {
    try {
      const path = employeePath + param;
      const response = await axiosInstance.get<EmployeeResponse>(path);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new Error("Không tìm thấy dữ liệu đối tác");
      }
      throw error;
    }
  },
  async callGetOne(id: string) {
    try {
      const path = employeePath + "/" + id;
      const response = await axiosInstance.get(path);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new Error("Không tìm thấy dữ liệu đối tác");
      }
      throw error;
    }
  },
  async create(data: CreateEmployeePayload) {
    try {
      const path = employeePath;
      const response = await axiosInstance.post(path, data);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      throw error;
    }
  },
  async update(id: string, data: CreateEmployeePayload) {
    try {
      const path = employeePath + "/" + id;
      const response = await axiosInstance.patch(path, data);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const path = employeePath + "/" + id;
      const response = await axiosInstance.delete(path);
      if (response?.status === 200) return "Xóa thành công";
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      throw error;
    }
  },
};
