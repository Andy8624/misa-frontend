import {
  CreatePartnerPayload,
  PartnerResponse,
} from "@/interfaces/partner.interface";
import axiosInstance from "@/libs/axios";

const partnerPath = "/partners";
export const partnerService = {
  async callGetAll(param: string = "") {
    try {
      const path = partnerPath + param;
      const response = await axiosInstance.get<PartnerResponse>(path);
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
      const path = partnerPath + "/" + id;
      const response = await axiosInstance.get(path);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new Error("Không tìm thấy dữ liệu đối tác");
      }
      throw error;
    }
  },
  async create(data: CreatePartnerPayload) {
    try {
      const path = partnerPath;
      const response = await axiosInstance.post(path, data);
      return response?.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      // console.log(error);
      throw error;
    }
  },
  async update(id: string, data: CreatePartnerPayload) {
    try {
      const path = partnerPath + "/" + id;
      const response = await axiosInstance.patch(path, data);
      return response?.data;
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      // console.log(error);
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const path = partnerPath + "/" + id;
      const response = await axiosInstance.delete(path);
      if (response?.status === 200) return "Xóa thành công";
    } catch (error: any) {
      if (error?.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      // console.log(error);
      throw error;
    }
  },
};
