export interface ChartOfAccountsType {
  id: string;
  account_name: string;
  account_number: string;
  primary_account: ChartOfAccountsType | undefined;
  characteristics: string;
  english_name: string;
  particular: string | undefined;
}

export interface EmployeeType {
  id: string;
  code: string;
  name: string;
  job_title: string | undefined;
  date_of_birth: string | undefined;
  sex: string;
  passport_number: string | undefined;
  id_card_number: string | undefined;
  issuance_date: string | undefined;
  place_of_issue: string | undefined;
  phone_number: string | undefined;
  address: string | undefined;
  bank_account: SubjectBankAccountType[];
}

export interface EntityGroupType {
  id: string;
  code: string;
  name: string;
  description: string | undefined;
}

export interface PartnerType {
  id: string;
  type: string;
  options: string;
  is_supplier: boolean;
  is_customer: boolean;
  tax_code: string;
  code: string;
  gov_unit_code: string;
  phone_number: string;
  website: string;
  name: string;
  address: string;
  entity_group: EntityGroupType | undefined;
  bank_account: SubjectBankAccountType[];
}

export interface BankType {
  id: string;
  short_name: string | undefined;
  full_name: string | undefined;
  english_name: string | undefined;
  headquarter_address: string | undefined;
  description: string | undefined;
  logo: any;
}

export interface BankAccountType {
  id: string;
  account_number: string;
  bank: BankType;
  province_or_city: string | undefined;
  branch: string | undefined;
  branch_address: string | undefined;
  account_holder: string | undefined;
  particular: string | undefined;
}

export interface SubjectBankAccountType {
  id: string;
  account_number: string;
  bank_name: string;
  branch: string | undefined;
  opened_at: string | undefined;
}

export interface SubjectType {
  id: string;
  code: string;
  name: string;
  tax_code: string | undefined;
  address: string | undefined;
  tel: string | undefined;
}

export interface LoanAgreementType {
  id: string;
  agreement_no: string;
  disbursement_date: string | undefined;
  lender: PartnerType | undefined;
}

export interface PaymentTermsType {
  id: string;
  code: string | undefined;
  name: string | undefined;
}

export interface VatTaxType {
  id: string;
  name: string;
  percent: number;
}

export interface UnitType {
  id: string;
  unit: string | undefined;
  status: string | undefined;
  description: string | undefined;
}

export interface GroupOfPurchasedGoodsType {
  id: string;
  code: string;
  name: string | undefined;
  description: string | undefined;
}

export interface ItemType {
  id: string;
  name: string;
  code: string;
  material_group: any;
  primary_unit: any;
  vat_decrease: string;
  minimum_stock_quantity: number;
  warranty_period: any;
  image: any;
  source: string;
  description: string;
  purchase_description: string;
  sale_description: string;
  latest_purchase_price: number;
  warehouse_account: ChartOfAccountsType | undefined;
  return_account: ChartOfAccountsType | undefined;
  expense_account: ChartOfAccountsType | undefined;
  sales_allowance_account: ChartOfAccountsType | undefined;
  vat_tax: VatTaxType | undefined;
  discount_account: ChartOfAccountsType | undefined;
}
