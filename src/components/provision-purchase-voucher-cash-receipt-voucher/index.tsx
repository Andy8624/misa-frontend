import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { EmployeeType, PartnerType } from "@types";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const ProvisionPurchaseVoucherCashReceiptVoucher: React.FC<{
  listPartner: PartnerType[];
  listEmployee: any[];
  voucherNumber: string | undefined;
  setVoucherNumber: any;
  cashReceiptVoucher: any;
  setCashReceiptVoucher: any;
  customer: string | undefined;
  setCustomer: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
  customerName: string | undefined;
  setCustomerName: any;
}> = ({
  listPartner,
  listEmployee,
  voucherNumber,
  setVoucherNumber,
  cashReceiptVoucher,
  setCashReceiptVoucher,
  customer,
  setCustomer,
  customerAddress,
  setCustomerAddress,
  customerName,
  setCustomerName,
}) => {
    const [payer, setPayer] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [withOriginalVoucher, setWithOriginalVoucher] = useState<number>();
    const [postedDate, setPostedDate] = useState<string | undefined>();
    const [voucherDate, setVoucherDate] = useState<string | undefined>();
    const [storePerson, setStorePerson] = useState<string | undefined>();

    useEffect(() => {
      setCashReceiptVoucher({
        cash_receipt_voucher_payer: payer,
        cash_receipt_voucher_storeperson: storePerson,
        cash_receipt_voucher_particular: particular,
        cash_receipt_voucher_with_original_voucher: withOriginalVoucher,
      });
    }, [payer, storePerson, particular, withOriginalVoucher]);

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div className="flex-grow-1">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-2">
                <p className="font-semibold">Mã khách hàng</p>
                <div className="h-10 w-full outline-none border rounded-md">
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
                  <InputCustomer fieldDisplay="name" list={listEmployee} value={storePerson} onChange={(value: EmployeeType) => setStorePerson(value?.id || undefined)} />
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
                    placeholder="Số lượng"
                    value={withOriginalVoucher}
                    onChange={(e) =>
                      setWithOriginalVoucher(Number(e.target.value))
                    }
                    className="w-full h-10 px-2 outline-none border rounded-md text-right"
                  />
                  <p className="whitespace-nowrap">Chứng từ gốc</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 pl-10 ml-10 border-l border-neutral-300 flex flex-col gap-3">
            <InputDate title="Ngày hạch toán" value={postedDate} onChange={(value: string) => setPostedDate(value)} />
            <InputDate title="Ngày phiếu thu" value={voucherDate} onChange={(value: string) => setVoucherDate(value)} />
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
