import { OPTION_SALES_TYPE } from "@/components/sales-voucher";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherDebtVoucherRead: React.FC<{
  listCustomer: any[];
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
  saleType: string;
  listSupplier: any[];
  customer: string | undefined;
  setCustomer: any;
  customerName: string | undefined;
  setCustomerName: any;
  customerTaxCode: string | undefined;
  setCustomerTaxCode: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
  salesVoucher: any
}> = ({
  listCustomer,
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
  saleType,
  listSupplier,
  customer,
  setCustomer,
  customerName,
  setCustomerName,
  customerTaxCode,
  setCustomerTaxCode,
  customerAddress,
  setCustomerAddress,
  salesVoucher
}) => {
    const [contact, setContact] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [storePerson, setStorePerson] = useState<string | undefined>();
    const [principal, setPrincipal] = useState<string | undefined>();
    const [trustor, setTrustor] = useState<string | undefined>();

    // useEffect(() => {
    //   setDebtVoucher({
    //     debt_voucher_contact: contact,
    //     debt_voucher_address: customerAddress,
    //     debt_voucher_storeperson: storePerson,
    //     debt_voucher_description: description,
    //     principal,
    //     trustor,
    //   });
    // }, [
    //   customerName,
    //   contact,
    //   customerAddress,
    //   storePerson,
    //   description,
    //   principal,
    //   trustor,
    // ]);

    useEffect(() => {
      if (salesVoucher?.id) {
        setContact(salesVoucher?.debt_voucher_contact || undefined);
        setDescription(salesVoucher?.debt_voucher_description || undefined);
        setStorePerson(salesVoucher?.debt_voucher_storeperson || undefined);
        setPrincipal(salesVoucher?.principal || undefined)
        setTrustor(salesVoucher?.trustor || undefined);
      }
    }, [salesVoucher])

    const handleSelectCustomer = (id: string) => {
      const customer = listCustomer.find((item: any) => item?.id === id);
      if (customer) {
        setCustomer(customer?.id || undefined);
        setCustomerName(customer?.name || undefined);
        setCustomerAddress(customer?.address || "");
        setCustomerTaxCode(customer?.tax_code || undefined);
        setDescription(
          `Bán hàng ${customer?.name} theo hóa đơn số ${voucherNumber}`
        );
      }
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div>
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
              <div className="col-span-6">
                <p className="font-semibold">Diễn giải</p>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              {saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value && (
                <div className="col-span-6">
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
              {saleType ===
                OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value && (
                  <div className="col-span-6">
                    <p className="font-semibold">Đơn vị ủy thác</p>
                    <div className="h-10 w-full outline-none border rounded-md">
                      <Select
                        style={{ width: "100%", height: "100%" }}
                        variant="borderless"
                        value={trustor}
                        onChange={(id) => setTrustor(id)}
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
              <p className="font-semibold">Ngày chứng từ</p>
              <input
                type="date"
                value={voucherDate}
                onChange={(e) => setVoucherDate(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
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
            <p className="font-semibold">Hạn thanh toán</p>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full h-10 px-2 outline-none border rounded-md"
            />
          </div>
        </div>
      </div>
    );
  };
