import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { InputEmployee } from "@/components/input-employee";
import { OPTION_PAYMENT_STATUS } from "@/components/sales-voucher";
import { EmployeeType, PartnerType } from "@types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherInventoryOutVoucher: React.FC<{
  paymentStatus: string;
  listPaymentTerms: any[];
  paymentTerms: string | undefined;
  setPaymentTerms: any;
  payWithinDays: number | undefined;
  setPayWithinDays: any;
  dueDate: string | undefined;
  setDueDate: any;
  listCustomer: any[];
  setInventoryOutVoucher: any;
  voucherNumber: string;
  setVoucherNumber: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  listEmployee: any[];
  customer: string | undefined;
  setCustomer: any;
  customerName: string | undefined;
  setCustomerName: any;
  customerTaxCode: string | undefined;
  setCustomerTaxCode: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
  inventoryOutVoucher: any;
}> = ({
  paymentStatus,
  paymentTerms,
  setPaymentTerms,
  listPaymentTerms,
  payWithinDays,
  setPayWithinDays,
  dueDate,
  setDueDate,
  listCustomer,
  setInventoryOutVoucher,
  voucherNumber,
  setVoucherNumber,
  postedDate,
  setPostedDate,
  voucherDate,
  setVoucherDate,
  listEmployee,
  customer,
  setCustomer,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  inventoryOutVoucher,
}) => {
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [receipient, setReceipient] = useState<string | undefined>(
      inventoryOutVoucher?.inventory_out_voucher_receipient || undefined
    );
    const [particular, setParticular] = useState<string | undefined>();
    const [withOriginalVoucher, setWithOriginalVoucher] = useState<number>();

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    useEffect(() => {
      setInventoryOutVoucher({
        inventory_out_voucher_receipient: receipient,
        inventory_out_voucher_storeperson: storePerson,
        inventory_out_voucher_particular: particular,
        inventory_out_voucher_with_original_voucher: withOriginalVoucher,
      });
    }, [receipient, storePerson, particular, withOriginalVoucher]);

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
              <div className="col-span-2">
                <p className="font-semibold">Người nhận</p>
                <input
                  type="text"
                  value={receipient}
                  onChange={(e) => setReceipient(e.target.value)}
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
                <p className="font-semibold">Lý do xuất</p>
                <input
                  type="text"
                  value={particular}
                  onChange={(e) => setParticular(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-6">
                <p className="font-semibold">Kèm theo</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={withOriginalVoucher}
                    onChange={(e) =>
                      setWithOriginalVoucher(Number(e.target.value))
                    }
                    className="w-[150px] h-10 px-2 outline-none border rounded-md text-right"
                  />
                  <p>Chứng từ gốc</p>
                </div>
              </div>
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
              <p className="font-semibold">Số phiếu xuất</p>
              <input
                type="text"
                value={voucherNumber}
                onChange={(e) => setVoucherNumber(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
          </div>
        </div>
        {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value && (
          <div className="flex gap-4">
            <div className="w-96">
              <p className="font-semibold">Điều khoản thanh toán</p>
              <div className="h-10 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  value={paymentTerms}
                  onChange={(id) => setPaymentTerms(id)}
                  options={listPaymentTerms.map((item: any) => ({
                    label: `${item?.code || ""} | ${item?.name || ""}`,
                    value: item.id,
                  }))}
                  variant="borderless"
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
              <p className="font-semibold">Hạn thanh toán</p>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    );
  };
