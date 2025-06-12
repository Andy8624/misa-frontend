import { PaginatedResponse } from "./global.interface";

// Table column keys
export enum PartnerTableKey {
  PARTNER_CODE = "partnerCode",
  PARTNER_TYPE = "partnerType",
  LEGAL_TYPE = "legalType",
  TAX_CODE = "taxCode",
  GOV_UNIT_CODE = "govUnitCode",
  FULL_NAME = "fullName",
  ADDRESS = "address",
  PHONE_NUMBER = "phoneNumber",
  WEBSITE_URL = "websiteUrl",
  ID = "id",
}

export enum PartnerType {
  CLIENT = "client",
  SUPPLIER = "supplier",
}

export enum LegalType {
  ORGANIZATION = "organization",
  INDIVIDUAL = "individual",
}

export interface Partner {
  id: string;
  partnerCode: string;
  partnerType: PartnerType;
  legalType: LegalType;
  taxCode: string;
  govUnitCode: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  websiteUrl: string;
  customerId: string;
  createdAt: string;
}

export type PartnerResponse = PaginatedResponse<Partner>;

export interface CreatePartnerPayload {
  partnerCode: string;
  partnerType: PartnerType;
  legalType: LegalType;
  taxCode: string;
  govUnitCode: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  websiteUrl: string;
  customerId: string;
}
