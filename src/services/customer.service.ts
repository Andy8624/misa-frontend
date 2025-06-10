import {
  CustomerResponse,
  CreateCustomerPayload,
} from "@/interfaces/customer.interface";
import axiosInstance from "@/libs/axios";

export const customerService = {
  async callGetAll(param: string = "") {
    const path = `/customers${param}`;
    const response = await axiosInstance.get<CustomerResponse>(path);
    // console.log(response?.data?.data);
    return response?.data;
  },
  async create(data: CreateCustomerPayload) {
    const path = `/customers`;
    const response = await axiosInstance.post(path, data);
    return response?.data;
  },
  async callGetOne(id: string) {
    const path = `/customers/${id}`;
    const response = await axiosInstance.get(path);
    return response?.data;
  },
};
