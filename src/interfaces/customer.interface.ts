import { PaginatedResponse } from "./global.interface";

export interface Customer {
  id: string;
  logoUrl: string;
  businessType: string;
  taxCode: string;
  customerName: string;
  customerGroup: string | null;
  foundedDate: string;
  vatTaxType: "month" | "quarter";
  customerStatus: "new" | "active" | "inactive";
  province: string;
  district: string;
  ward: string | null;
  streetAddress: string;
  fullAddress: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  position: string;
  createdAt: string;
}

export type CustomerResponse = PaginatedResponse<Customer>;

export interface CreateCustomerPayload {
  logoUrl: string;
  businessType: string;
  taxCode: string;
  customerName: string;
  customerGroup: string;
  foundedDate: string;
  vatTaxType: "month" | "quarter";
  customerStatus: "new" | "active" | "inactive";
  province: string;
  ward: string;
  district: string;
  streetAddress: string;
  fullAddress: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  position: string;
}
