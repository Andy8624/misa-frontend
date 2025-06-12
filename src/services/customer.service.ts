import {
  CustomerResponse,
  CreateCustomerPayload,
} from "@/interfaces/customer.interface";
import axiosInstance from "@/libs/axios";

const customerPath = "/customers";
export const customerService = {
  async callGetAll(param: string = "") {
    const path = customerPath + param;
    const response = await axiosInstance.get<CustomerResponse>(path);
    // console.log(response?.data?.data);
    return response?.data;
  },
  async create(data: CreateCustomerPayload) {
    console.log(localStorage.getItem("access_token"));
    const path = customerPath;
    const response = await axiosInstance.post(path, data);
    return response?.data;
  },
  async callGetOne(id: string) {
    const path = customerPath + "/" + id;
    const response = await axiosInstance.get(path);
    return response?.data;
  },
};
