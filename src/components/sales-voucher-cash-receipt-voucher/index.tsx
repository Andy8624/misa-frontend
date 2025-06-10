import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { InputEmployee } from "@/components/input-employee";
import { InputSupplier } from "@/components/input-supplier";
import { OPTION_SALES_TYPE } from "@/components/sales-voucher";
import { EmployeeType, PartnerType } from "@types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherCashReceiptVoucher: React.FC<{
  listCustomer: any[];
  setCashReceiptVoucher: any;
  voucherNumber: string | undefined;
  setVoucherNumber: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  listEmployee: any[];
  listSupplier: any[];
  saleType: string;
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
  setCashReceiptVoucher,
  voucherNumber,
  setVoucherNumber,
  postedDate,
  setPostedDate,
  voucherDate,
  setVoucherDate,
  listEmployee,
  listSupplier,
  saleType,
  customer,
  setCustomer,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
}) => {
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [payer, setPayer] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [withOriginalVoucher, setWithOriginalVoucher] = useState<number>();
    const [principal, setPrincipal] = useState<string | undefined>();

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    useEffect(() => {
      setCashReceiptVoucher({
        cash_receipt_voucher_payer: payer,
        cash_receipt_voucher_storeperson: storePerson,
        cash_receipt_voucher_particular: particular,
        cash_receipt_voucher_with_original_voucher: withOriginalVoucher,
        cash_receipt_voucher_principal: principal,
      });
    }, [payer, storePerson, particular, withOriginalVoucher, principal]);

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
                <p className="font-semibold">Người nộp</p>
                <input
                  type="text"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
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
                  <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                    <InputSupplier
                      list={listSupplier}
                      fieldDisplay="name"
                      value={principal}
                      onChange={(value: PartnerType) =>
                        setPrincipal(value?.id || undefined)
                      }
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
              title="Ngày phiếu thu"
              value={voucherDate}
              onChange={(value: string) => setVoucherDate(value)}
            />
            <div className="col-span-6">
              <p className="font-semibold">Số phiếu thu</p>
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
