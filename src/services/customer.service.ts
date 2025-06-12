import {
  CustomerResponse,
  CreateCustomerPayload,
} from "@/interfaces/customer.interface";
import axiosInstance from "@/libs/axios";

const customerPath = "/customers";
export const customerService = {
  async callGetAll(param: string = "") {
    try {
      const path = customerPath + param;
      const response = await axiosInstance.get<CustomerResponse>(path);
      // console.log(response?.data?.data);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new Error("Không tìm thấy dữ liệu khách hàng");
      }
      throw error;
    }
  },

  async create(data: CreateCustomerPayload) {
    try {
      const path = customerPath;
      const response = await axiosInstance.post(path, data);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      throw error;
    }
  },

  async callGetOne(id: string) {
    try {
      const path = customerPath + "/" + id;
      const response = await axiosInstance.get(path);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new Error("Không tìm thấy dữ liệu khách hàng");
      }
      throw error;
    }
  },
};
