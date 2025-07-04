import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { InputEmployee } from "@/components/input-employee";
import { EmployeeType, PartnerType } from "@/types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const ProvisionPurchaseVoucherDebtVoucher: React.FC<{
  listPartner: PartnerType[];
  listEmployee: any[];
  voucherNumber: string;
  setVoucherNumber: any;
  listPaymentTerms: any[];
  paymentTerms: string | undefined;
  setPaymentTerms: any;
  payWithinDays: number | undefined;
  setPayWithinDays: any;
  dueDate: string | undefined;
  setDueDate: any;
  setDebtVoucher: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  customer: string | undefined;
  setCustomer: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
  customerTaxCode: string | undefined;
  setCustomerTaxCode: any;
  customerName: string | undefined;
  setCustomerName: any;
  debtVoucher: any;
}> = ({
  listPartner,
  listEmployee,
  voucherNumber,
  setVoucherNumber,
  paymentTerms,
  setPaymentTerms,
  listPaymentTerms,
  payWithinDays,
  setPayWithinDays,
  dueDate,
  setDueDate,
  setDebtVoucher,
  postedDate,
  setPostedDate,
  voucherDate,
  setVoucherDate,
  customer,
  setCustomer,
  customerAddress,
  setCustomerAddress,
  customerTaxCode,
  setCustomerTaxCode,
  customerName,
  setCustomerName,
  debtVoucher,
}) => {
    const [contact, setContact] = useState<string | undefined>(
      debtVoucher?.debt_voucher_contact || undefined
    );
    const [description, setDescription] = useState<string | undefined>();
    const [storePerson, setStorePerson] = useState<string | undefined>();

    useEffect(() => {
      setDebtVoucher({
        debt_voucher_contact: contact,
        debt_voucher_storeperson: storePerson,
        debt_voucher_description: description,
      });
    }, [contact, storePerson, description]);

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
      setCustomerTaxCode(value?.tax_code || undefined);
      setDescription(`Bán hàng ${value?.name} theo hóa đơn số ${voucherNumber}`);
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div>
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
              <div className="col-span-5">
                <p className="font-semibold">Tên khách hàng</p>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Mã số thuế</p>
                <input
                  type="text"
                  value={customerTaxCode}
                  onChange={(e) => setCustomerTaxCode(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Người liên hệ</p>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-6">
                <p className="font-semibold">Địa chỉ</p>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
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
                <p className="font-semibold">Diễn giải</p>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="w-72 pl-10 ml-10 border-l border-neutral-300 flex flex-col gap-3">
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
        <div className="flex gap-4">
          <div className="w-96">
            <p className="font-semibold">Điều khoản thanh toán</p>
            <div className="h-10 w-full outline-none border rounded-md">
              <Select
                style={{ width: "100%", height: "100%" }}
                variant="borderless"
                value={paymentTerms}
                onChange={(id) => setPaymentTerms(id)}
                options={listPaymentTerms.map((item: any) => ({
                  label: `${item?.code || ""} | ${item?.name || ""}`,
                  value: item.id,
                }))}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">Số ngày được nợ</p>
            <input
              type="number"
              value={payWithinDays}
              onChange={(e) => setPayWithinDays(Number(e.target.value))}
              className="w-full h-10 px-2 outline-none border rounded-md text-right"
            />
          </div>
          <div>
            <InputDate
              title="Hạn thanh toán"
              value={dueDate}
              onChange={(value: string) => setDueDate(value)}
            />
          </div>
        </div>
      </div>
    );
  };
