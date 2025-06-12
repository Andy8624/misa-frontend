import { AccountantResponse } from "@/interfaces/accountant.interface";
import axiosInstance from "@/libs/axios";

const accountantPath = "/accountants";

export const accountantService = {
  async callGetAll(param: string = "") {
    const path = accountantPath + param;
    console.log(path);
    const response = await axiosInstance.get<AccountantResponse>(path);
    console.log("Accountant Data", response);
    return response?.data;
  },
};
