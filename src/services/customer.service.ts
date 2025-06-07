import {
  CustomerResponse,
  CreateCustomerPayload,
} from "@/interfaces/customer.interface";
import axiosInstance from "@/lib/axios";

export const customerService = {
  async callGetAll(param: string = "") {
    const path = `/customers${param}`;
    const response = await axiosInstance.get<CustomerResponse>(path);
    // console.log(response?.data?.data);
    return response?.data;
  },
  create: async (data: CreateCustomerPayload) => {
    const path = `/customers`;
    const response = await axiosInstance.post(path, data);
    return response.data;
  },
};
