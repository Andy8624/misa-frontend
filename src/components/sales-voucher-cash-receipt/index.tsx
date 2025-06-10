import { InputBankAccount } from "@/components/input-bank-account";
import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { InputEmployee } from "@/components/input-employee";
import { OPTION_SALES_TYPE } from "@/components/sales-voucher";
import { BankAccountType, EmployeeType, PartnerType } from "@types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherCashReceipt: React.FC<{
  listCustomer: any[];
  setCashReceipt: any;
  voucherNumber: string | undefined;
  setVoucherNumber: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  listEmployee: any[];
  listSupplier: any[];
  saleType: string;
  listBankAccount: BankAccountType[];
  customer: string | undefined;
  setCustomer: any;
  customerName: string | undefined;
  setCustomerName: any;
  customerTaxCode: string | undefined;
  setCustomerTaxCode: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
}> = ({
  listCustomer,
  setCashReceipt,
  voucherNumber,
  setVoucherNumber,
  postedDate,
  setPostedDate,
  voucherDate,
  setVoucherDate,
  listEmployee,
  listSupplier,
  saleType,
  listBankAccount,
  customer,
  setCustomer,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
}) => {
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [withOriginalVoucher, setWithOriginalVoucher] = useState<number>();
    const [cashInBankReceipt, setCashInBankReceipt] = useState<
      string | undefined
    >();
    const [bankName, setBankName] = useState<string | undefined>();
    const [principal, setPrincipal] = useState<string | undefined>();

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    useEffect(() => {
      setCashReceipt({
        cash_receipt_cash_in_bank_receipt: cashInBankReceipt,
        cash_receipt_bank_name: bankName,
        cash_receipt_storeperson: storePerson,
        cash_receipt_particular: particular,
        cash_receipt_principal: principal,
      });
    }, [cashInBankReceipt, bankName, storePerson, particular, principal]);

    const handleSelectCashInBankReceipt = (value: BankAccountType) => {
      setCashInBankReceipt(value?.id || undefined);
      setBankName(value?.bank?.full_name || undefined);
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div className="flex-grow-1">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-2">
                <p className="font-semibold">Mã khách hàng</p>
                <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                  <InputCustomer
                    fieldDisplay="code"
                    list={listCustomer}
                    value={customer}
                    onChange={handleSelectCustomer}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="font-semibold">Tên khách hàng</p>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-8">
                <p className="font-semibold">Địa chỉ</p>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Nộp vào TK</p>
                <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                  <InputBankAccount
                    list={listBankAccount}
                    value={cashInBankReceipt}
                    onChange={handleSelectCashInBankReceipt}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="font-semibold opacity-0">Tên ngân hàng</p>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Nhân viên bán hàng</p>
                <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                  <InputEmployee
                    fieldDisplay="name"
                    list={listEmployee}
                    value={storePerson}
                    onChange={(value: EmployeeType) =>
                      setStorePerson(value?.id || undefined)
                    }
                  />
                </div>
              </div>
              <div className="col-span-4">
                <p className="font-semibold">Lý do nộp</p>
                <input
                  type="text"
                  value={particular}
                  onChange={(e) => setParticular(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Kèm theo</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={withOriginalVoucher}
                    onChange={(e) =>
                      setWithOriginalVoucher(Number(e.target.value))
                    }
                    className="flex-grow-1 h-10 px-2 outline-none border rounded-md text-right"
                  />
                  <p className="whitespace-nowrap">Chứng từ gốc</p>
                </div>
              </div>
              {saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value && (
                <div className="col-span-5">
                  <p className="font-semibold">Đơn vị giao đại lý</p>
                  <div className="h-10 w-full outline-none border rounded-md">
                    <Select
                      style={{ width: "100%", height: "100%" }}
                      variant="borderless"
                      value={principal}
                      onChange={(id) => setPrincipal(id)}
                      options={listSupplier.map((item: any) => ({
                        label: `${item?.code || ""} | ${item?.name || ""}`,
                        value: item.id,
                      }))}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-72 pl-10 ml-10 border-l border-neutral-300 flex flex-col gap-4">
            <InputDate
              title="Ngày hạch toán"
              value={postedDate}
              onChange={(value: string) => setPostedDate(value)}
            />
            <InputDate
              title="Ngày chứng từ"
              value={voucherDate}
              onChange={(value: string) => setVoucherDate(value)}
            />
            <div className="col-span-6">
              <p className="font-semibold">Số chứng từ</p>
              <input
                type="text"
                value={voucherNumber}
                onChange={(e) => setVoucherNumber(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
