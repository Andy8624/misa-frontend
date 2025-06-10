"use client";
import { Select, Tabs } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import {
  OPTION_PURCHASE_TYPE,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
} from "@/constants/constants";
import axios from "axios";
import { ColorModeContext } from "@/contexts/color-mode";
import {
  BankAccountType,
  ChartOfAccountsType,
  EmployeeType,
  PartnerType,
  PaymentTermsType,
  UnitType,
  VatTaxType,
} from "@types";
import { AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import Link from "next/link";
import {
  fetchListBankAccount,
  fetchListChartOfAccounts,
  fetchListEmployee,
  fetchListPartner,
  fetchListPaymentTerms,
  fetchListUnit,
  fetchListVatTax,
} from "@/utils/fetchData";
import { ServicePurchaseVoucherTax } from "@/components/service-purchase-voucher-tax";
import { useParams } from "next/navigation";
import { ServicePurchaseVoucherAccountingRead } from "@/components/service-purchase-voucher-accounting-read";
import { ServicePurchaseVoucherTaxRead } from "@/components/service-purchase-voucher-tax-read";

export default function PUService() {
  const { id } = useParams();
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const [showModalConfirmClose, setShowModalConfirmClose] = useState(false);
  const { setIsLoading } = useContext(ColorModeContext);
  const [voucherNumber, setVoucherNumber] = useState<string>("MDV000001");
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
  const [description, setDescription] = useState("");
  const [totalServiceAmount, setTotalServiceAmount] = useState<number>(0);
  const [totalVatAmount, setTotalVatAmount] = useState<number>(0);
  const [purchasingStaffId, setPurchasingStaffId] = useState<
    string | undefined
  >();
  const [paymentTermsId, setPaymentTermsId] = useState<string | undefined>();
  const [payWithinDays, setPayWithinDays] = useState<number>();
  const [dueDate, setDueDate] = useState<string>();
  const [postedDate, setPostedDate] = useState<string>();
  const [voucherDate, setVoucherDate] = useState<string>();
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
  const [listPartner, setListPartner] = useState<PartnerType[]>([]);
  const [listBankAccount, setListBankAccount] = useState<BankAccountType[]>([]);
  const [listEmployee, setListEmployee] = useState<EmployeeType[]>([]);
  const [listPaymentTerms, setListPaymentTerms] = useState<PaymentTermsType[]>(
    []
  );
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [supplier, setSupplier] = useState<string | undefined>();
  const [supplierName, setSupplierName] = useState<string | undefined>();
  const [supplierAddress, setSupplierAddress] = useState<string | undefined>();
  const [itemList, setItemList] = useState<any[]>([]);
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [listUnit, setListUnit] = useState<UnitType[]>([]);

  useEffect(() => {
    fetchData();
    getItems();
    // generateVoucherNumber();
    getPurchaseService();
    getPurchaseServiceItems();
  }, []);

  const getPurchaseService = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher/" + id,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const data = response.data?.data || undefined;
      if (data) {
        const postDate = data?.posted_date
          ? new Date(data?.posted_date)
          : undefined;
        const voucherDate = data?.voucher_date
          ? new Date(data?.voucher_date)
          : undefined;
        const dueDate = data?.due_date ? new Date(data?.due_date) : undefined;
        const issuedDate = data?.issued_date
          ? new Date(data?.issued_date)
          : undefined;
        const cashPaymentVoucherDate = data?.cash_payment_voucher_date
          ? new Date(data?.cash_payment_voucher_date)
          : undefined;
        setVoucherNumber(data?.voucher_number || undefined);
        setPostedDate(
          postDate
            ? `${postDate.getFullYear()}-${postDate.getMonth() + 1 < 10
              ? "0" + (postDate.getMonth() + 1)
              : postDate.getMonth() + 1
            }-${postDate.getDate() < 10
              ? "0" + postDate.getDate()
              : postDate.getDate()
            }`
            : undefined
        );
        setVoucherDate(
          voucherDate
            ? `${voucherDate.getFullYear()}-${voucherDate.getMonth() + 1 < 10
              ? "0" + (voucherDate.getMonth() + 1)
              : voucherDate.getMonth() + 1
            }-${voucherDate.getDate() < 10
              ? "0" + voucherDate.getDate()
              : voucherDate.getDate()
            }`
            : undefined
        );
        setVoucherNumber(data?.voucher_number || undefined);
        setPayWithinDays(data?.pay_within_days || undefined);
        setDueDate(
          dueDate
            ? `${dueDate.getFullYear()}-${dueDate.getMonth() + 1 < 10
              ? "0" + (dueDate.getMonth() + 1)
              : dueDate.getMonth() + 1
            }-${dueDate.getDate() < 10
              ? "0" + dueDate.getDate()
              : dueDate.getDate()
            }`
            : undefined
        );
        setCashPaymentVoucherDate(
          cashPaymentVoucherDate
            ? `${cashPaymentVoucherDate.getFullYear()}-${cashPaymentVoucherDate.getMonth() + 1 < 10
              ? "0" + (cashPaymentVoucherDate.getMonth() + 1)
              : cashPaymentVoucherDate.getMonth() + 1
            }-${cashPaymentVoucherDate.getDate() < 10
              ? "0" + cashPaymentVoucherDate.getDate()
              : cashPaymentVoucherDate.getDate()
            }`
            : undefined
        );
        setIssuedDate(
          issuedDate
            ? `${issuedDate.getFullYear()}-${issuedDate.getMonth() + 1 < 10
              ? "0" + (issuedDate.getMonth() + 1)
              : issuedDate.getMonth() + 1
            }-${issuedDate.getDate() < 10
              ? "0" + issuedDate.getDate()
              : issuedDate.getDate()
            }`
            : undefined
        );
        setSupplier(data?.supplier || undefined);
        setSupplierAddress(data?.supplier_address || undefined);
        setDescription(data?.description || undefined);
        setPurchasingStaffId(data?.purchasing_staff || undefined);
        setPaymentTermsId(data?.payment_t_and_c || undefined);
        setPayWithinDays(data?.pay_within_days || undefined);
        setPaymentAccountId(data.payment_account || undefined);
        setPaymentAccountBankName(data?.payment_account_bank_name || undefined);
        setRecipientAccountId(data?.recipient_account || undefined);
        setRecipientAccountBankName(data.recipient_account_name);
        setPaymentDetail(data?.payment_detail || undefined);
        setRecipient(data.recipient || undefined);
        setParticular(data?.particular || undefined);
        setQuantityOriginalNumber(data?.quantity_original_number || undefined);
        setCashPaymentVoucherNo(data?.cash_payment_voucher_no || undefined);
        setIdCardNo(data?.id_card_no || undefined);
        setIssuedBy(data?.issued_by || undefined);
      }
    } catch (error) { }
  };

  const getPurchaseServiceItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher_items",
        {
          params: {
            filter: { service_purchase_voucher: { _eq: id } },
            fields: ["*", "vat.*"],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      setItemsOfAccounting(list);
      let totalAmount = 0;
      let totalAmountVat = 0;
      list.forEach((itemPrev: any) => {
        let total = (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0);
        if (itemPrev?.vat?.percent) {
          totalAmountVat += total * ((itemPrev?.vat?.percent || 0) / 100);
        }
        totalAmount += total;
      });
      setTotalServiceAmount(totalAmount);
      setTotalVatAmount(totalAmountVat);
    } catch (error) { }
  };

  const fetchData = async () => {
    const dataListBankAccount = await fetchListBankAccount();
    setListBankAccount(dataListBankAccount);
    const dataListPartner = await fetchListPartner();
    setListPartner(dataListPartner);
    const dataListEmployee = await fetchListEmployee();
    setListEmployee(dataListEmployee);
    const dataListChartOfAccounts = await fetchListChartOfAccounts();
    setListChartOfAccounts(dataListChartOfAccounts);
    const dataListPaymentTerms = await fetchListPaymentTerms();
    setListPaymentTerms(dataListPaymentTerms);
    const dataListVatTax = await fetchListVatTax();
    setListVatTax(dataListVatTax);
    const dataListUnit = await fetchListUnit();
    setListUnit(dataListUnit);
  };

  const getItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list",
        {
          params: {
            fields: [
              "*",
              "material_group.*",
              "material_group.goods_and_services_groups_id.*",
              "material_group.goods_and_services_list_id.*",
              "expense_account.*",
              "vat_tax.*",
            ],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setItemList(
        response?.data?.data
          ? response.data.data.filter((item: any) =>
            item?.material_group?.find(
              (itemMaterialGroup: any) =>
                itemMaterialGroup?.goods_and_services_groups_id?.code === "DV"
            )
          )
          : []
      );
    } catch (error) { }
  };

  const handleSelectSupplier = (id: string) => {
    const supplier = listPartner.find((item: any) => item?.id === id);
    if (supplier) {
      setSupplier(supplier?.id || "");
      setSupplierName(supplier?.name || "");
      setSupplierAddress(supplier?.address || "");
      setDescription("Mua hàng của " + (supplier?.name || ""));
    }
  };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("MDV000001");
      } else {
        const voucherNumbers = list.map(
          (voucher: any) => voucher.voucher_number
        );
        const maxVoucherNumber = Math.max(
          ...voucherNumbers.map((voucher: any) => {
            const numberPart = voucher.slice(3);
            return parseInt(numberPart, 10);
          })
        );
        setVoucherNumber(
          `MDV${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    let data: any = {};
    data.voucher_number = voucherNumber;
    data.supplier = supplier;
    data.supplier_name = supplierName;
    data.supplier_address = supplierAddress;
    data.payment_status = paymentStatus;
    data.payment_method = paymentStatus;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.payment_t_and_c = paymentTermsId || undefined;
    if (
      paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
    ) {
      data = {
        ...data,
        invoice_inclusion: invoiceInclusion,
        description: description,
        purchasing_staff: purchasingStaffId,
        payment_terms: paymentTermsId,
        pay_within_days: payWithinDays,
        due_date: dueDate,
      };
    }

    if (
      paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
      paymentMethod === PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
    ) {
      data = {
        ...data,
        invoice_inclusion: invoiceInclusion,
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
        ...data,
        invoice_inclusion: invoiceInclusion,
        payment_account: paymentAccountId,
        payment_account_bank_name: paymentAccountBankName,
        recipient_account: recipientAccountId,
        recipient_account_name: recipientAccountBankName,
        payment_detail: paymentDetail,
        purchasing_staff: purchasingStaffId,
        voucher_number: voucherNumber,
      };
    }

    if (
      paymentStatus === PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
      paymentMethod ===
      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE.value
    ) {
      data = {
        ...data,
        invoice_inclusion: invoiceInclusion,
        payment_account: paymentAccountId,
        payment_account_bank_name: paymentAccountBankName,
        recipient,
        payment_detail: paymentDetail,
        purchasing_staff: purchasingStaffId,
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
        const responseList = await axios.post(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher_items",
          itemsOfAccounting.map((item: any) => ({
            ...item,
            service_purchase_voucher: id,
          })),
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (responseList.data?.data) {
          linkBackRef.current?.click();
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
      setPaymentAccountBankName(account?.bank?.full_name || "");
    }
  };

  const handleSelectRecipientAccount = (id: string) => {
    const account = listBankAccount.find((item: any) => item?.id === id);
    if (account) {
      setRecipientAccountId(id);
      setRecipientAccountBankName(account?.bank?.full_name || "");
    }
  };

  const handleDeleteItemOfAccounting = (index: number) => {
    setItemsOfAccounting((prev: any[]) => {
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleUpdateItemList = (item: any, index: number) => {
    setItemsOfAccounting((list: any[]) => {
      list[index] = { ...list[index], ...item };
      handleCalculatorTotalValue(list);
      return list;
    });
  };

  const handleCalculatorTotalValue = (list: any) => {
    if (list.length > 0) {
      let totalAmount = 0;
      let totalAmountVat = 0;
      list.forEach((item: any) => {
        let total = (item?.unit_price || 0) * (item?.quantity || 0);
        let totalVat = 0;
        if (item?.vat) {
          const vat: VatTaxType | undefined = listVatTax.find(
            (vatTax: VatTaxType) => vatTax?.id === item.vat
          );
          if (vat) {
            totalVat = total * ((vat?.percent || 0) / 100);
          }
        }
        totalAmount += total;
        totalAmountVat += totalVat;
      });
      if (
        invoiceInclusion !==
        PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE.value
      ) {
        totalAmountVat = 0;
      }
      setTotalServiceAmount(totalAmount);
      setTotalVatAmount(totalAmountVat);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <AiOutlineReload
            className="text-2xl cursor-pointer"
          // onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-medium">
            Chứng từ mua dịch vụ {voucherNumber}
          </p>
        </div>
        <div>
          <Link href="/purchase" ref={linkBackRef}>
            <AiOutlineClose className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-full absolute top-0 left-0 p-4 overflow-y-auto">
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
              className={`h-11 w-44 border rounded-md overflow-hidden ${paymentStatus !==
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
                options={Object.keys(
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                ).map((key) => ({
                  label:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].translate.vi,
                  value:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].value,
                }))}
              />
            </div>
            <div
              className={`h-11 w-48 border rounded-md ${(purchaseType ===
                OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
                  .value ||
                purchaseType ===
                OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS
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
                              label: `${item?.account_number || ""} - ${item?.account_holder_name || ""
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
                      options={listPartner.map((item: any) => ({
                        label: `${item?.code || ""} - ${item?.name || ""}`,
                        value: item.id,
                      }))}
                      value={supplier}
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
                        value={supplierAddress}
                        onChange={(e) => setSupplierAddress(e.target.value)}
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
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.PAYMENT_ORDER
                      .value ||
                    paymentMethod ===
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CHEQUE.value) && (
                    <>
                      <div>
                        <p className="font-semibold">Tài khoản nhận</p>
                        <div className="h-11 w-full outline-none border rounded-md">
                          <Select
                            style={{ width: "100%", height: "100%" }}
                            options={listBankAccount.map((item: any) => ({
                              label: `${item?.account_number || ""} - ${item?.account_holder_name || ""
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
            className={`mt-8 ${paymentStatus !==
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
            <Tabs
              items={[
                {
                  key: "1",
                  label: "Hạch toán",
                  children: (
                    <ServicePurchaseVoucherAccountingRead
                      paymentStatus={paymentStatus}
                      itemsOfAccounting={itemsOfAccounting}
                      setItemsOfAccounting={setItemsOfAccounting}
                      listPartner={listPartner}
                      listChartOfAccounts={listChartOfAccounts}
                      itemList={itemList}
                      handleUpdateItemList={handleUpdateItemList}
                      handleDeleteItemOfAccounting={
                        handleDeleteItemOfAccounting
                      }
                      listUnit={listUnit}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Thuế",
                  children: (
                    <ServicePurchaseVoucherTaxRead
                      itemsOfAccounting={itemsOfAccounting}
                      setItemsOfAccounting={setItemsOfAccounting}
                      listPartner={listPartner}
                      listChartOfAccounts={listChartOfAccounts}
                      itemList={itemList}
                      handleUpdateItemList={handleUpdateItemList}
                      handleDeleteItemOfAccounting={
                        handleDeleteItemOfAccounting
                      }
                      listVatTax={listVatTax}
                    />
                  ),
                },
              ]}
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
                          setPurchaseWithoutInvoiceInfoSupplierName(
                            e.target.value
                          )
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
      </div>
      {/* <Modal
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
    </div>
  );
}
