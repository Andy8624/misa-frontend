import {
  BankAccountType,
  ChartOfAccountsType,
  EmployeeType,
  GroupOfPurchasedGoodsType,
  PartnerType,
  PaymentTermsType,
  SubjectBankAccountType,
  UnitType,
  VatTaxType,
} from "@/types";
import axios from "axios";

export const fetchListBankAccount = async (): Promise<BankAccountType[]> => {
  let data: BankAccountType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/bank_account",
      {
        params: {
          fields: ["*", "bank.*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data || [];
  } catch (error: any) {
    console.log("Error ~ fetchListBankAccount ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListPartner = async (): Promise<PartnerType[]> => {
  let data: PartnerType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner",
      {
        params: {
          fields: ["*", "bank.*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ fetchListPartner ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListEmployee = async (): Promise<EmployeeType[]> => {
  let data: EmployeeType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee",
      {
        params: {
          fields: ["*", "bank_account.subject_bank_accounts_id.*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data =
      response?.data?.data && Array.isArray(response.data.data)
        ? response?.data?.data.map((employee: any) => {
            return {
              ...employee,
              bank_account: employee.bank_account.map(
                (account: {
                  employee_id: any;
                  subject_bank_accounts_id: SubjectBankAccountType;
                }) => account?.subject_bank_accounts_id
              ),
            };
          })
        : [];
  } catch (error: any) {
    console.log("Error ~ fetchListEmployee ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListChartOfAccounts = async (): Promise<
  ChartOfAccountsType[]
> => {
  let data: ChartOfAccountsType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/chart_of_accounts",
      {
        params: {
          fields: ["*", "bank.*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ fetchListChartOfAccounts ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListPaymentTerms = async (): Promise<PaymentTermsType[]> => {
  let data: PaymentTermsType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/payment_terms",
      {
        params: {
          fields: ["*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ fetchListChartOfAccounts ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListVatTax = async (): Promise<VatTaxType[]> => {
  let data: VatTaxType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/vat_tax",
      {
        params: {
          fields: ["*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ fetchListVatTax ~ ", error.message);
  } finally {
    return data;
  }
};

export const fetchListUnit = async (): Promise<UnitType[]> => {
  let data: UnitType[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit",
      {
        params: {
          fields: ["*"],
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ fetchListVatTax ~ ", error.message);
  } finally {
    return data;
  }
};

export const getInvoice = async (id: string | null | undefined) => {
  let data = null;
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/invoice/" + id,
      {
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response.data?.data || null;
  } catch (error) {
  } finally {
    return data;
  }
};

export const fetchListGroupOfPurchasedGoods = async (): Promise<
  GroupOfPurchasedGoodsType[]
> => {
  let data: any[] = [];
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ACCOUNTING_URL +
        "/items/group_of_purchased_goods",
      {
        params: {
          limit: 100000,
        },
        headers: {
          Authorization:
            "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
        },
      }
    );
    data = response?.data?.data;
  } catch (error: any) {
    console.log("Error ~ getListGroupOfPurchasedGoods ~ ", error.message);
  } finally {
    return data;
  }
};
