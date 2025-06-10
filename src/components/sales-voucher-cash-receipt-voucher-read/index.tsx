import {
  OPTION_PAYMENT_STATUS,
  OPTION_SALES_TYPE,
} from "@/components/sales-voucher";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherCashReceiptVoucherRead: React.FC<{
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
  salesVoucher: any;
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
  salesVoucher,
}) => {
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [payer, setPayer] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [withOriginalVoucher, setWithOriginalVoucher] = useState<number>();
    const [principal, setPrincipal] = useState<string | undefined>();

    const handleSelectCustomer = (id: string) => {
      const customer = listCustomer.find((item: any) => item?.id === id);
      if (customer) {
        setCustomer(customer?.id || undefined);
        setCustomerName(customer?.name || undefined);
        setCustomerAddress(customer?.address || "");
      }
    };

    // useEffect(() => {
    //   setCashReceiptVoucher({
    //     cash_receipt_voucher_payer: payer,
    //     cash_receipt_voucher_storeperson: storePerson,
    //     cash_receipt_voucher_particular: particular,
    //     cash_receipt_voucher_with_original_voucher: withOriginalVoucher,
    //     cash_receipt_voucher_principal: principal,
    //   });
    // }, [payer, storePerson, particular, withOriginalVoucher, principal]);

    useEffect(() => {
      if (salesVoucher?.id) {
        setStorePerson(salesVoucher?.cash_receipt_storeperson || undefined);
        setPayer(salesVoucher?.cash_receipt_voucher_payer || undefined);
        setParticular(salesVoucher?.cash_receipt_voucher_particular || undefined);
        setWithOriginalVoucher(
          salesVoucher?.cash_receipt_voucher_with_original_voucher || undefined
        );
        setPrincipal(salesVoucher?.cash_receipt_voucher_principal || undefined);
      }
    }, [salesVoucher]);

    return (
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div className="flex-grow-1">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-2">
                <p className="font-semibold">Mã khách hàng</p>
                <div className="h-10 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={customer}
                    onChange={(id) => handleSelectCustomer(id)}
                    options={listCustomer.map((item: any) => ({
                      label: `${item?.code || ""} | ${item?.name || ""}`,
                      value: item.id,
                    }))}
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
                <div className="h-10 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={storePerson}
                    onChange={(id) => setStorePerson(id)}
                    options={listEmployee.map((item: any) => ({
                      label: `${item?.code || ""} | ${item?.name || ""}`,
                      value: item.id,
                    }))}
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
            <div className="col-span-6">
              <p className="font-semibold">Ngày hạch toán</p>
              <input
                type="date"
                value={postedDate}
                onChange={(e) => setPostedDate(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-6">
              <p className="font-semibold">Ngày phiếu thu</p>
              <input
                type="date"
                value={voucherDate}
                onChange={(e) => setVoucherDate(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
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
