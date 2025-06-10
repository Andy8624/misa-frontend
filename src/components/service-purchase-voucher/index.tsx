import { Button, Drawer, Modal, Select } from "antd";
import { useContext, useState } from "react";
import {
  OPTION_PURCHASE_TYPE,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
} from "@/constants/constants";
import axios from "axios";
import { ColorModeContext } from "@/contexts/color-mode";

export const OPTIONS_COLUMN = {
  ACCOUNTING: "accounting",
  VAT: "vat",
};

export const ServicePurchaseVoucher: React.FC<{
  listSupplier: any[];
  listEmployee: any[];
  listPaymentTerms: any[];
  setOpenServicePurchaseVoucher: any;
  openServicePurchaseVoucher: boolean;
  listBankAccount: any[];
}> = ({
  listSupplier,
  listEmployee,
  listPaymentTerms,
  setOpenServicePurchaseVoucher,
  openServicePurchaseVoucher,
  listBankAccount,
}) => {
    const [showModalConfirmClose, setShowModalConfirmClose] = useState(false);
    const { setIsLoading } = useContext(ColorModeContext);
    const [code, setCode] = useState<string>("MDV000001");
    const [itemsOfAccounting, setItemsOfAccounting] = useState([{}]);
    const [purchaseType, setPurchaseType] = useState(
      OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value
    );
    const [paymentStatus, setPaymentStatus] = useState(
      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
    );
    const [paymentMethod, setPaymentMethod] = useState(
      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
    );
    const [invoiceInclusion, setInvoiceInclusion] = useState(
      PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE.value
    );
    const [partnerCode, setPartnerCode] = useState<string>();
    const [partnerName, setPartnerName] = useState<string>();
    const [partnerAddress, setPartnerAddress] = useState<string>();
    const [partnerId, setPartnerId] = useState<string>();
    const [description, setDescription] = useState("");
    const [totalServiceAmount, setTotalServiceAmount] = useState<number>(0);
    const [totalVatAmount, setTotalVatAmount] = useState<number>(0);
    const [columnShow, setColumnShow] = useState(OPTIONS_COLUMN.ACCOUNTING);
    const [purchasingStaffId, setPurchasingStaffId] = useState<
      string | undefined
    >();
    const [paymentTermsId, setPaymentTermsId] = useState<string | undefined>();
    const [payWithinDays, setPayWithinDays] = useState<number>();
    const [dueDate, setDueDate] = useState<string>();
    const [postedDate, setPostedDate] = useState<string>();
    const [voucherDate, setVoucherDate] = useState<string>();
    const [voucherNumber, setVoucherNumber] = useState<string>();
    const [recipient, setRecipient] = useState<string | undefined>();
    const [particular, setParticular] = useState<string | undefined>();
    const [quantityOriginalNumber, setQuantityOriginalNumber] =
      useState<number>();
    const [cashPaymentVoucherDate, setCashPaymentVoucherDate] = useState<
      string | undefined
    >();
    const [cashPaymentVoucherNo, setCashPaymentVoucherNo] = useState<
      string | undefined
    >();
    const [
      purchaseWithoutInvoiceInfoSupplierName,
      setPurchaseWithoutInvoiceInfoSupplierName,
    ] = useState<string | undefined>();
    const [
      purchaseWithoutInvoiceInfoAddress,
      setPurchaseWithoutInvoiceInfoAddress,
    ] = useState<string | undefined>();
    const [
      purchaseWithoutInvoiceInfoIdCardNo,
      setPurchaseWithoutInvoiceInfoIdCardNo,
    ] = useState<string | undefined>();
    const [paymentAccountId, setPaymentAccountId] = useState<
      string | undefined
    >();
    const [paymentAccountBankName, setPaymentAccountBankName] = useState<
      string | undefined
    >();
    const [recipientAccountId, setRecipientAccountId] = useState<
      string | undefined
    >();
    const [recipientAccountBankName, setRecipientAccountBankName] = useState<
      string | undefined
    >();
    const [paymentDetail, setPaymentDetail] = useState<string | undefined>();
    const [idCardNo, setIdCardNo] = useState<string | undefined>();
    const [issuedDate, setIssuedDate] = useState<string | undefined>();
    const [issuedBy, setIssuedBy] = useState<string | undefined>();

    const handleSelectSupplier = (id: string) => {
      const supplier = listSupplier.find((item: any) => item?.id === id);
      if (supplier) {
        setPartnerId(supplier?.id || "");
        setPartnerCode(supplier?.code || "");
        setPartnerName(supplier?.name || "");
        setPartnerAddress(supplier?.address || "");
        setDescription("Mua hàng của " + (supplier?.name || ""));
      }
    };

    const handleSave = async () => {
      let data: any = {};
      if (
        paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
      ) {
        data = {
          payment_status: paymentStatus,
          payment_method: paymentMethod,
          invoice_inclusion: invoiceInclusion,
          partner: partnerId,
          description: description,
          purchasing_staff: purchasingStaffId,
          payment_terms: paymentTermsId,
          pay_within_days: payWithinDays,
          due_date: dueDate,
          posted_date: postedDate,
          voucher_date: voucherDate,
          partner_address: partnerAddress,
        };
      }

      if (
        paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
        paymentMethod === PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
      ) {
        data = {
          payment_status: paymentStatus,
          payment_method: paymentMethod,
          invoice_inclusion: invoiceInclusion,
          partner: partnerId,
          partner_address: partnerAddress,
          recipient,
          particular,
          purchasing_staff: purchasingStaffId,
          quantity_original_number: quantityOriginalNumber,
          posted_date: postedDate,
          cash_payment_voucher_date: cashPaymentVoucherDate,
          cash_payment_voucher_no: cashPaymentVoucherNo,
        };
      }

      if (
        paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
        (paymentMethod ===
          PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.PAYMENT_ORDER.value ||
          paymentMethod === PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CHEQUE.value)
      ) {
        data = {
          payment_status: paymentStatus,
          payment_method: paymentMethod,
          invoice_inclusion: invoiceInclusion,
          payment_account: paymentAccountId,
          payment_account_bank_name: paymentAccountBankName,
          partner: partnerId,
          partner_address: partnerAddress,
          recipient_account: recipientAccountId,
          recipient_account_name: recipientAccountBankName,
          payment_detail: paymentDetail,
          purchasing_staff: purchasingStaffId,
          posted_date: postedDate,
          voucher_date: voucherDate,
          voucher_number: voucherNumber,
        };
      }

      if (
        paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
        paymentMethod ===
        PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE.value
      ) {
        data = {
          payment_status: paymentStatus,
          payment_method: paymentMethod,
          invoice_inclusion: invoiceInclusion,
          payment_account: paymentAccountId,
          payment_account_bank_name: paymentAccountBankName,
          partner: partnerId,
          recipient,
          payment_detail: paymentDetail,
          purchasing_staff: purchasingStaffId,
          posted_date: postedDate,
          voucher_date: voucherDate,
          voucher_number: voucherNumber,
        };
      }

      if (
        paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
      ) {
        data.purchase_without_invoice_info_supplier_name =
          purchaseWithoutInvoiceInfoSupplierName;
        data.purchase_without_invoice_info_address =
          setPurchaseWithoutInvoiceInfoAddress;
        data.purchase_without_invoice_info_id_card_no =
          setPurchaseWithoutInvoiceInfoIdCardNo;
      }

      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher",
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (response.data?.data) {
          const id = response.data.data.id;
          const list: any[] = [];
          itemsOfAccounting.forEach((item: any) => {
            list.push({
              service_voucher: id,
              type: "purchase",
              item_id: item?.itemId || undefined,
              item_name: item?.itemName || undefined,
              debit_account: item?.debitAccount || undefined,
              credit_account: item?.creditAccount || undefined,
              subjects: item?.subjects || undefined,
              customer_name: item?.customerName || undefined,
              unit: item?.unit || undefined,
              quantity: item?.quantity || 0,
              unit_price: item?.unitPrice || 0,
              vat_description: item?.vatDescription || undefined,
              invoice_number: item?.invoiceNumber || undefined,
              invoice_date: item?.invoiceDate || undefined,
              supplier_id: item?.vatPartnerId || undefined,
              supplier_name: item?.vatNamePartner || undefined,
              supplier_tax_code: item?.vatTaxCodePartner || undefined,
              supplier_address: item?.vatAddressPartner || undefined,
            });
          });
          const responseList = await axios.post(
            process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/voucher_account_entries",
            list,
            {
              headers: {
                Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
              },
            }
          );
          if (responseList.data?.data) {
            setOpenServicePurchaseVoucher(false);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const handleSelectPaymentAccount = (id: string) => {
      const account = listBankAccount.find((item: any) => item?.id === id);
      if (account) {
        setPaymentAccountId(id);
        setPaymentAccountBankName(account?.name_account?.fullname || "");
      }
    };

    const handleSelectRecipientAccount = (id: string) => {
      const account = listBankAccount.find((item: any) => item?.id === id);
      if (account) {
        setRecipientAccountId(id);
        setRecipientAccountBankName(account?.name_account?.fullname || "");
      }
    };

    return (
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <p className="font-semibold text-2xl">Chứng từ mua dịch vụ {code}</p>
            <Button type="primary" onClick={() => handleSave()}>
              Lưu
            </Button>
          </div>
        }
        placement={"bottom"}
        height={"100%"}
        onClose={() => setShowModalConfirmClose(true)}
        open={openServicePurchaseVoucher}
      >
        {/* <div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center">
            <input
              type="radio"
              value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value}
              checked={
                paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
              }
              onChange={(e) => {
                setPaymentMethod(
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
                );
                return setPaymentStatus(e.target.value);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
            />
            <label className="ms-2 text-sm font-medium text-gray-900">
              Chưa thanh toán
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={
                paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
              }
              type="radio"
              value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
            />
            <label className="ms-2 text-sm font-medium text-gray-900">
              Thanh toán ngay
            </label>
          </div>
          <div
            className={`h-11 w-44 border rounded-md overflow-hidden ${
              paymentStatus !==
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
              "pointer-events-none"
            }`}
          >
            <Select
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                backgroundColor:
                  paymentStatus !==
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
                    ? "#dbd9d9"
                    : "white",
              }}
              variant="borderless"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
              options={Object.keys(PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD).map(
                (key) => ({
                  label:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].translate.vi,
                  value:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].value,
                })
              )}
            />
          </div>
          <div
            className={`h-11 w-48 border rounded-md ${
              (purchaseType ===
                OPTION_PURCHASE_TYPE.IMPORTED_PURCHASE_WITHOUT_STOCK_RECEIPT
                  .value ||
                purchaseType ===
                  OPTION_PURCHASE_TYPE.IMPORTED_PURCHASE_WITH_STOCK_RECEIPT
                    .value) &&
              "hidden"
            }`}
          >
            <Select
              style={{ border: "none", width: "100%", height: "100%" }}
              variant="borderless"
              value={invoiceInclusion}
              onChange={(value) => setInvoiceInclusion(value)}
              options={Object.keys(
                PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
              ).map((key) => ({
                label:
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION[
                    key as keyof typeof PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                  ].translate.vi,
                value:
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION[
                    key as keyof typeof PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                  ].value,
              }))}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-20">
          <div className="flex-grow-1 flex gap-8 items-start">
            <div className="flex-grow-1 grid grid-cols-2 gap-4">
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                paymentMethod !==
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                  <>
                    <div>
                      <p className="font-semibold">Tài khoản chi</p>
                      <div className="h-11 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          options={listBankAccount.map((item: any) => ({
                            label: `${item?.account_number || ""} - ${
                              item?.account_holder_name || ""
                            }`,
                            value: item.id,
                          }))}
                          value={paymentAccountId}
                          onChange={(value) =>
                            handleSelectPaymentAccount(value)
                          }
                          variant="borderless"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold opacity-0">Tên tài khoản</p>
                      <input
                        type="text"
                        value={paymentAccountBankName}
                        onChange={(e) =>
                          setPaymentAccountBankName(e.target.value)
                        }
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              <div>
                <p className="font-semibold">Nhà cung cấp</p>
                <div className="h-11 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    options={listSupplier.map((item: any) => ({
                      label: `${item?.code || ""} - ${item?.name || ""}`,
                      value: item.id,
                    }))}
                    onChange={(value) => handleSelectSupplier(value)}
                    variant="borderless"
                  />
                </div>
              </div>
              {!(
                paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE.value
              ) && (
                <div>
                  <p className="font-semibold">Địa chỉ</p>
                  <input
                    type="text"
                    value={partnerAddress}
                    onChange={(e) => setPartnerAddress(e.target.value)}
                    className="h-11 w-full px-3 outline-none border rounded-md"
                  />
                </div>
              )}
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                  <>
                    <div>
                      <p className="font-semibold">Người nhận</p>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Lý do chi</p>
                      <input
                        type="text"
                        value={particular}
                        onChange={(e) => setParticular(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value && (
                <div>
                  <p className="font-semibold">Diễn giải</p>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-11 w-full px-3 outline-none border rounded-md"
                  />
                </div>
              )}
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                (paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.PAYMENT_ORDER.value ||
                  paymentMethod ===
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CHEQUE.value) && (
                  <>
                    <div>
                      <p className="font-semibold">Tài khoản nhận</p>
                      <div className="h-11 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          options={listBankAccount.map((item: any) => ({
                            label: `${item?.account_number || ""} - ${
                              item?.account_holder_name || ""
                            }`,
                            value: item.id,
                          }))}
                          value={recipientAccountId}
                          onChange={(value) =>
                            handleSelectRecipientAccount(value)
                          }
                          variant="borderless"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold opacity-0">
                        Tên tài khoản nhận
                      </p>
                      <input
                        type="text"
                        value={recipientAccountBankName}
                        onChange={(e) =>
                          setRecipientAccountBankName(e.target.value)
                        }
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE
                    .value && (
                  <>
                    <div>
                      <p className="font-semibold">Người lĩnh tiền</p>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Số CMND/thẻ căn cước</p>
                      <input
                        type="text"
                        value={idCardNo}
                        onChange={(e) => setIdCardNo(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Ngày cấp</p>
                      <input
                        type="date"
                        value={issuedDate}
                        onChange={(e) => setIssuedDate(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Nơi cấp</p>
                      <input
                        type="text"
                        value={issuedBy}
                        onChange={(e) => setIssuedBy(e.target.value)}
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              {paymentMethod !==
                PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value &&
                paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value && (
                  <div>
                    <p className="font-semibold">Nội dung thanh toán</p>
                    <input
                      type="text"
                      value={paymentDetail}
                      onChange={(e) => setPaymentDetail(e.target.value)}
                      className="h-11 w-full px-3 outline-none border rounded-md"
                    />
                  </div>
                )}
              <div>
                <p className="font-semibold">Nhân viên mua hàng</p>
                <div className="h-11 w-full outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    options={listEmployee.map((item: any) => ({
                      label: `${item?.code || ""} - ${item?.name || ""}`,
                      value: item.id,
                    }))}
                    value={purchasingStaffId}
                    variant="borderless"
                    onChange={(value) => setPurchasingStaffId(value)}
                  />
                </div>
              </div>
              {paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                  <div>
                    <p className="font-semibold">Kèm theo</p>
                    <div className="flex items-center gap-3 w-56">
                      <input
                        type="number"
                        value={quantityOriginalNumber}
                        onChange={(e) =>
                          setQuantityOriginalNumber(Number(e.target.value))
                        }
                        placeholder="Số lượng"
                        className="h-11 w-full px-1 outline-none border rounded-md text-right"
                      />
                      <p className="whitespace-nowrap">chứng từ gốc</p>
                    </div>
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-semibold">Ngày hạch toán</p>
                <input
                  type="date"
                  value={postedDate}
                  onChange={(e) => setPostedDate(e.target.value)}
                  className="h-11 w-full px-3 outline-none border rounded-md"
                />
              </div>
              {!(
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value ===
                  paymentStatus &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
              ) && (
                <>
                  <div>
                    <p className="font-semibold">Ngày chứng từ</p>
                    <input
                      type="date"
                      value={voucherDate}
                      onChange={(e) => setVoucherDate(e.target.value)}
                      className="h-11 w-full px-3 outline-none border rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Số chứng từ</p>
                    <input
                      type="text"
                      value={voucherNumber}
                      onChange={(e) => setVoucherNumber(e.target.value)}
                      className="h-11 w-full px-3 outline-none border rounded-md"
                    />
                  </div>
                </>
              )}
              {PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value ===
                paymentStatus &&
                paymentMethod ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                  <>
                    <div>
                      <p className="font-semibold">Ngày phiếu chi</p>
                      <input
                        type="date"
                        value={cashPaymentVoucherDate}
                        onChange={(e) =>
                          setCashPaymentVoucherDate(e.target.value)
                        }
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Số phiếu chi</p>
                      <input
                        type="text"
                        value={cashPaymentVoucherNo}
                        onChange={(e) =>
                          setCashPaymentVoucherNo(e.target.value)
                        }
                        className="h-11 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <p className="font-semibold">Tổng tiền thanh toán</p>
            <p className="text-4xl font-bold">
              {(totalServiceAmount + totalVatAmount).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
        <div
          className={`mt-8 ${
            paymentStatus !==
              PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value && "hidden"
          }`}
        >
          <div className="flex gap-4 w-1/2">
            <div className="flex-grow-1">
              <p className="font-semibold">Điều khoản thanh toán</p>
              <div className="h-11 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  options={listPaymentTerms.map((item: any) => ({
                    label: `${item?.code || ""} - ${item?.name || ""}`,
                    value: item.id,
                  }))}
                  value={paymentTermsId}
                  onChange={(value) => setPaymentTermsId(value)}
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
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Hạn thanh toán</p>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => setColumnShow(OPTIONS_COLUMN.ACCOUNTING)}
            >
              <input
                id="accounting-radio-1"
                type="radio"
                checked={columnShow === OPTIONS_COLUMN.ACCOUNTING}
                name="accounting-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label className="ms-2 text-sm font-medium">Hạch toán</label>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => setColumnShow(OPTIONS_COLUMN.VAT)}
            >
              <input
                id="accounting-radio-2"
                type="radio"
                checked={columnShow === OPTIONS_COLUMN.VAT}
                name="accounting-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label className="ms-2 text-sm font-medium">Thuế</label>
            </div>
          </div>
          <ServicePurchaseVoucherAccounting
            setTotalServiceAmount={setTotalServiceAmount}
            setTotalVatAmount={setTotalVatAmount}
            paymentStatus={paymentStatus}
            invoiceInclusion={invoiceInclusion}
            columnShow={columnShow}
            itemsOfAccounting={itemsOfAccounting}
            setItemsOfAccounting={setItemsOfAccounting}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-20">
          <div className="w-full mt-8">
            {invoiceInclusion ===
              PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.NO_INVOICE.value && (
              <div className="flex flex-col gap-4">
                <p className="font-semibold">
                  Thông tin lên bảng kê mua vào không có hóa đơn
                </p>
                <div className="w-full">
                  <p>Tên nhà cung cấp</p>
                  <input
                    type="text"
                    value={purchaseWithoutInvoiceInfoSupplierName}
                    onChange={(e) =>
                      setPurchaseWithoutInvoiceInfoSupplierName(e.target.value)
                    }
                    className="w-full h-12 px-3 border outline-none rounded-md text-base"
                  />
                </div>
                <div className="w-full">
                  <p>Địa chỉ</p>
                  <input
                    type="text"
                    value={purchaseWithoutInvoiceInfoAddress}
                    onChange={(e) =>
                      setPurchaseWithoutInvoiceInfoAddress(e.target.value)
                    }
                    className="w-full h-12 px-3 border outline-none rounded-md text-base"
                  />
                </div>
                <div className="w-full">
                  <p>Số CMND</p>
                  <input
                    type="text"
                    value={purchaseWithoutInvoiceInfoIdCardNo}
                    onChange={(e) =>
                      setPurchaseWithoutInvoiceInfoIdCardNo(e.target.value)
                    }
                    className="w-full h-12 px-3 border outline-none rounded-md text-base"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex justify-end items-start">
            <table>
              <tbody>
                <tr>
                  <td className="py-2 pr-28 font-semibold">
                    Tổng tiền dịch vụ
                  </td>
                  <td className="py-2 px-4 font-semibold">
                    {totalServiceAmount.toLocaleString("vi-VN")}
                  </td>
                </tr>
                {invoiceInclusion ===
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                    .RECEIVED_WITH_INVOICE.value && (
                  <tr>
                    <td className="py-2 pr-28 font-semibold">Thuế GTGT</td>
                    <td className="py-2 px-4 font-semibold">
                      {totalVatAmount.toLocaleString("vi-VN")}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 pr-28 font-semibold">
                    Tổng tiền thanh toán
                  </td>
                  <td className="py-2 px-4 font-semibold">
                    {(totalServiceAmount + totalVatAmount).toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="flex items-center gap-3">
            <FaRegQuestionCircle className="text-3xl text-blue-700" />
            <p className="text-lg font-medium">
              Bạn muốn đóng chứng từ bán hàng?
            </p>
          </div>
        }
        centered
        open={showModalConfirmClose}
        onOk={() => setOpenServicePurchaseVoucher(false)}
        onCancel={() => setShowModalConfirmClose(false)}
      ></Modal> */}
      </Drawer>
    );
  };
