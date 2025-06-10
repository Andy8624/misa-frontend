import { InputBankAccount } from "@/components/input-bank-account";
import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { InputEmployee } from "@/components/input-employee";
import { BankAccountType, EmployeeType, PartnerType } from "@types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const ProvisionPurchaseVoucherCashReceipt: React.FC<{
  listPartner: PartnerType[];
  listBankAccount: any[];
  voucherNumber: string | undefined;
  setVoucherNumber: any;
  setCashReceipt: any;
  listEmployee: any[];
  customer: string | undefined;
  setCustomer: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
  customerName: string | undefined;
  setCustomerName: any;
}> = ({
  listPartner,
  listBankAccount,
  voucherNumber,
  setVoucherNumber,
  setCashReceipt,
  listEmployee,
  customer,
  setCustomer,
  customerAddress,
  setCustomerAddress,
  customerName,
  setCustomerName,
}) => {
    const [bankAccountId, setBankAccountId] = useState<string | undefined>();
    const [bankAccountName, setBankAccountName] = useState<string | undefined>();
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [postedDate, setPostedDate] = useState<string | undefined>();
    const [voucherDate, setVoucherDate] = useState<string | undefined>();

    useEffect(() => {
      setCashReceipt({
        cash_receipt_back_account: bankAccountId,
        cash_receipt_back_name: bankAccountName,
        cash_receipt_storeperson: storePerson,
        cash_receipt_particular: particular,
      });
    }, [bankAccountId, bankAccountName, storePerson, particular]);

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    const handleSelectBankAccount = (value: BankAccountType) => {
      setBankAccountId(value?.id || undefined);
      setBankAccountName(value?.bank?.full_name || undefined);
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
                    list={listPartner}
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
                <p className="font-semibold">Tài khoản ngân hàng</p>
                <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                  <InputBankAccount
                    list={listBankAccount}
                    value={bankAccountId}
                    onChange={handleSelectBankAccount}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="font-semibold opacity-0">Tên ngân hàng</p>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
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
              <div className="col-span-6">
                <p className="font-semibold">Lý do nộp</p>
                <input
                  type="text"
                  value={particular}
                  onChange={(e) => setParticular(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="w-72 pl-10 ml-10 border-l border-neutral-300 flex flex-col gap-4">
            <InputDate title="Ngày hạch toán" value={postedDate} onChange={(value: string) => setPostedDate(value)} />
            <InputDate title="Ngày chứng từ" value={postedDate} onChange={(value: string) => setVoucherDate(value)} />
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
