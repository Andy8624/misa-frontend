import { InputCustomer } from "@/components/input-customer";
import { InputDate } from "@/components/input-date";
import { OPTION_PAYMENT_STATUS } from "@/components/sales-voucher";
import { PartnerType } from "@/types";
import { formatDateToYYYYMMDD } from "@/utils/formatDateToYYYYMMDD";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherInvoice: React.FC<{
  paymentStatus: string;
  listPaymentTerms: any[];
  paymentTerms: string | undefined;
  setPaymentTerms: any;
  payWithinDays: number | undefined;
  setPayWithinDays: any;
  dueDate: string | undefined;
  setDueDate: any;
  listCustomer: any[];
  listBankAccount: any[];
  invoice: any;
  setInvoice: any;
  customer: string | undefined;
  setCustomer: any;
  customerName: string | undefined;
  setCustomerName: any;
  customerTaxCode: string | undefined;
  setCustomerTaxCode: any;
  customerAddress: string | undefined;
  setCustomerAddress: any;
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
  listBankAccount,
  invoice,
  setInvoice,
  customer,
  setCustomer,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  customerTaxCode,
  setCustomerTaxCode,
}) => {
    const [purchaser, setPurchaser] = useState<string | undefined>(
      invoice?.invoice_purchaser || undefined
    );
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>(
      invoice?.invoice_payment_method || undefined
    );
    const [bankAccountId, setBankAccountId] = useState<string | undefined>();
    const [invoiceForm, setInvoiceForm] = useState<string | undefined>(
      invoice?.invoice_form || "1"
    );
    const [invoiceSign, setInvoiceSign] = useState<string | undefined>(
      invoice?.invoice_sign || undefined
    );
    const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>(
      invoice?.invoice_number || undefined
    );
    const [invoiceDate, setInvoiceDate] = useState<string | undefined>(
      invoice?.invoice_date
        ? formatDateToYYYYMMDD(invoice.invoice_date)
        : undefined
    );

    const handleSelectCustomer = (value: PartnerType) => {
      setCustomer(value?.id || undefined);
      setCustomerName(value?.name || undefined);
      setCustomerAddress(value?.address || "");
    };

    useEffect(() => {
      setInvoice({
        invoice_purchaser: purchaser,
        invoice_payment_method: paymentMethod,
        invoice_bank_account: bankAccountId,
        invoice_form: invoiceForm,
        invoice_sign: invoiceSign,
        invoice_number: invoiceNumber,
        invoice_date: invoiceDate,
      });
    }, [
      purchaser,
      paymentMethod,
      bankAccountId,
      invoiceForm,
      invoiceSign,
      invoiceNumber,
      invoiceDate,
    ]);

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
                <p className="font-semibold">Mã số thuế</p>
                <input
                  type="text"
                  value={customerTaxCode}
                  onChange={(e) => setCustomerTaxCode(e.target.value)}
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
                <p className="font-semibold">Người mua hàng</p>
                <input
                  type="text"
                  value={purchaser}
                  onChange={(e) => setPurchaser(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-3">
                <p className="font-semibold">Hình thức thanh toán</p>
                <div className="h-10 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={paymentMethod}
                    onChange={(value) => setPaymentMethod(value)}
                    options={[
                      {
                        label: "Tiền mặt",
                        value: "cash",
                      },
                      {
                        label: "Chuyển khoản",
                        value: "deposit",
                      },
                      {
                        label: "TM/CK",
                        value: "tm/ck",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <p className="font-semibold">Tài khoản ngân hàng</p>
                <div className="h-10 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    options={listBankAccount.map((item: any) => ({
                      label: `${item?.account_number || ""} - ${item?.account_holder_name || ""
                        }`,
                      value: item.id,
                    }))}
                    value={bankAccountId}
                    onChange={(value) => setBankAccountId(value)}
                    variant="borderless"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 pl-10 ml-10 border-l border-neutral-300 flex flex-col gap-4">
            <div className="col-span-6">
              <p className="font-semibold">Mẫu số HĐ</p>
              <input
                type="text"
                value={invoiceForm}
                onChange={(e) => setInvoiceForm(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-6">
              <p className="font-semibold">Ký hiệu HĐ</p>
              <input
                type="text"
                value={invoiceSign}
                onChange={(e) => setInvoiceSign(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-6">
              <p className="font-semibold">Số hóa đơn</p>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full h-10 px-2 outline-none border rounded-md"
              />
            </div>
            <InputDate
              title="Ngày HĐ"
              value={invoiceDate}
              onChange={(value: string) => setInvoiceDate(value)}
            />
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
