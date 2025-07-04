"use client";
import { ProvisionPurchaseVoucherCashReceipt } from "@/components/provision-purchase-voucher-cash-receipt";
import { ProvisionPurchaseVoucherCashReceiptVoucher } from "@/components/provision-purchase-voucher-cash-receipt-voucher";
import { ProvisionPurchaseVoucherDebtVoucher } from "@/components/provision-purchase-voucher-debt-voucher";
import { ProvisionPurchaseVoucherInvoice } from "@/components/provision-purchase-voucher-invoice";
import { ProvisionPurchaseVoucherTableList } from "@/components/provision-purchase-voucher-table-list";
import { Button, Select, Tabs } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { ColorModeContext } from "@/contexts/color-mode";
import {
  ChartOfAccountsType,
  EmployeeType,
  PartnerType,
  PaymentTermsType,
  VatTaxType,
} from "@/types";
import Link from "next/link";
import { AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import {
  fetchListBankAccount,
  fetchListChartOfAccounts,
  fetchListEmployee,
  fetchListPartner,
  fetchListPaymentTerms,
  fetchListVatTax,
  getInvoice,
} from "@/utils/fetchData";
import { getCurrentDate } from "@/utils/getCurrentDate";
import {
  OPTION_SA_SERVICE_PAYMENT_METHOD,
  OPTION_SA_SERVICE_PAYMENT_STATUS,
  OPTIONS_DISCOUNT,
} from "@/constants/constants";
import { formatDateToYYYYMMDD } from "@/utils/formatDateToYYYYMMDD";
import { customRound } from "@/utils/customRound";

export default function ShowProvisionPurchaseVoucher() {
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const [backTo, setBackTo] = useState<string>("/sales");
  const [showModalConfirmClose, setShowModalConfirmClose] =
    useState<boolean>(false);
  const { setIsLoading } = useContext(ColorModeContext);
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [voucherNumber, setVoucherNumber] = useState("BDV0001");
  const [paymentStatus, setPaymentStatus] = useState<string>(
    OPTION_SA_SERVICE_PAYMENT_STATUS.ON_CREDIT.value
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    OPTION_SA_SERVICE_PAYMENT_METHOD.CASH.value
  );
  const [withInvoice, setWithInvoice] = useState<boolean>(false);
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [totalVatAmount, setTotalVatAmount] = useState<number>();
  const [paymentTerms, setPaymentTerms] = useState<string | undefined>();
  const [payWithinDays, setPayWithinDays] = useState<number>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [otherTAndC, setOtherTAndC] = useState<string | undefined>();
  const [eInvoiceSearchID, setEInvoiceSearchID] = useState<
    string | undefined
  >();
  const [eInvoiceSearchURL, setEInvoiceSearchURL] = useState<
    string | undefined
  >();
  const [isSubstituteInvoice, setIsSubstituteInvoice] =
    useState<boolean>(false);
  const [debtVoucher, setDebtVoucher] = useState<any>();
  const [invoice, setInvoice] = useState<any>();
  const [cashReceiptVoucher, setCashReceiptVoucher] = useState<any>();
  const [cashReceipt, setCashReceipt] = useState<any>();
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [discount, setDiscount] = useState<string>("no");
  const [percentDiscountInvoiceValue, setPercentDiscountInvoiceValue] =
    useState<number>(0);
  const [listPartner, setListPartner] = useState<PartnerType[]>([]);
  const [listEmployee, setListEmployee] = useState<EmployeeType[]>([]);
  const [listPaymentTerms, setListPaymentTerms] = useState<PaymentTermsType[]>(
    []
  );
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [listBankAccount, setListBankAccount] = useState<any[]>([]);
  const [customer, setCustomer] = useState<string | undefined>();
  const [customerName, setCustomerName] = useState<string | undefined>();
  const [customerTaxCode, setCustomerTaxCode] = useState<string | undefined>();
  const [customerAddress, setCustomerAddress] = useState<string | undefined>();
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [totalAmountDiscount, setTotalAmountDiscount] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoice = urlParams.get("invoice");
    if (invoice) {
      getDataInvoice(invoice);
    }
  }, []);

  const getDataInvoice = async (id: string | null) => {
    const invoice = await getInvoice(id);
    try {
      const response = await fetch(
        `https://cms-phong.teknix.dev/assets/${invoice?.file}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch XML: ${response.statusText}`);
      }
      setBackTo("/invoice");
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDataInvoice = parser.parseFromString(text, "application/xml");

      const xmlTTChung = xmlDataInvoice.getElementsByTagName("TTChung");
      const xmlKHMSHDon = xmlTTChung[0].getElementsByTagName("KHMSHDon");
      const xmlSHDon = xmlTTChung[0].getElementsByTagName("SHDon");
      const xmlNLap = xmlTTChung[0].getElementsByTagName("NLap");
      const xmlKHHDon = xmlTTChung[0].getElementsByTagName("KHHDon");
      if (xmlNLap[0]?.textContent) {
        setPostedDate(formatDateToYYYYMMDD(xmlNLap[0].textContent));
        setVoucherDate(formatDateToYYYYMMDD(xmlNLap[0].textContent));
      }

      const xmlNDHDon = xmlDataInvoice.getElementsByTagName("NDHDon");

      const xmlNBan = xmlNDHDon[0].getElementsByTagName("NBan");
      const xmlTen = xmlNBan[0].getElementsByTagName("Ten");
      const xmlMST = xmlNBan[0].getElementsByTagName("MST");
      const xmlDChi = xmlNBan[0].getElementsByTagName("DChi");
      setCustomerName(xmlTen[0]?.textContent || undefined);
      setCustomerTaxCode(xmlMST[0]?.textContent || undefined);
      setCustomerAddress(xmlDChi[0]?.textContent || undefined);
      setDebtVoucher({
        ...debtVoucher,
        debt_voucher_contact:
          xmlDataInvoice.querySelector("HVTNMHang")?.textContent || undefined,
      });
      setDebtVoucher({
        ...debtVoucher,
        debt_voucher_contact:
          xmlDataInvoice.querySelector("HVTNMHang")?.textContent || undefined,
      });
      setInvoice({
        ...invoice,
        invoice_form: xmlKHMSHDon[0]?.textContent || undefined,
        invoice_sign: xmlKHHDon[0]?.textContent || undefined,
        invoice_number: xmlSHDon[0]?.textContent || undefined,
        invoice_date: xmlNLap[0]?.textContent || undefined,
        invoice_purchaser:
          xmlDataInvoice.querySelector("HVTNMHang")?.textContent || undefined,
        invoice_payment_method:
          xmlDataInvoice.querySelector("HTTToan")?.textContent?.toLowerCase() ||
          undefined,
      });

      const xmlDSHHDVu = xmlNDHDon[0].getElementsByTagName("DSHHDVu");
      const xmlHHDVu = xmlDSHHDVu[0].getElementsByTagName("HHDVu");
      const goods: any[] = [];
      for (let i = 0; i < xmlHHDVu.length; i++) {
        const hhdvuElement = xmlHHDVu[i];

        const thhdvu =
          hhdvuElement.getElementsByTagName("THHDVu")[0]?.textContent;
        const dvtinh =
          hhdvuElement.getElementsByTagName("DVTinh")[0]?.textContent;
        const sluong =
          hhdvuElement.getElementsByTagName("SLuong")[0]?.textContent;
        const dgia = hhdvuElement.getElementsByTagName("DGia")[0]?.textContent;
        const thtien =
          hhdvuElement.getElementsByTagName("ThTien")[0]?.textContent;
        const tsuat =
          hhdvuElement.getElementsByTagName("TSuat")[0]?.textContent;

        goods.push({
          id: uuidv4(),
          item_name: thhdvu,
          quantity: Number(sluong),
          unit_price: Number(dgia),
          vat_rate: tsuat,
        });
      }
      setItemsOfAccounting([...goods]);
    } catch (error) {
      console.error("Error fetching XML:", error);
      return null;
    }
  };

  const handleChangeItemOfOfList = (item: any, index: number) => {
    setItemsOfAccounting((prev: any) => {
      const list = prev;
      list[index] = item;
      let totalAmount = 0;
      let totalVatAmount = 0;
      let totalAmountDismount = 0;
      list.forEach((itemPrev: any) => {
        const total = (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0);
        totalAmountDismount += (total * (itemPrev?.discount_rate || 0)) / 100;
        totalAmount += total;
        const vat: VatTaxType | any = listVatTax.find(
          (itemVatTax: VatTaxType) => itemVatTax?.id === itemPrev?.vat
        );
        totalVatAmount +=
          ((total - (total * (itemPrev?.discount_rate | 0)) / 100) *
            (vat?.percent || 0)) /
          100;
      });
      setTotalAmount(totalAmount);
      setTotalVatAmount(totalVatAmount);
      setTotalAmountDiscount(totalAmountDismount);
      return list;
    });
  };

  useEffect(() => {
    setPostedDate(getCurrentDate());
    setVoucherDate(getCurrentDate());
    if (itemsOfAccounting.length === 0) {
      setItemsOfAccounting([{ id: uuidv4() }]);
    }
    getItems();
    getListUnit();
    generateVoucherNumber();
    fetchData();
  }, []);

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
  };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/provision_service_voucher",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("BDV000001");
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
          `BDV${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getListUnit = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListUnit(response?.data?.data || []);
    } catch (error) { }
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

  const handleAddItemsOfAccounting = () => {
    setItemsOfAccounting((prev: any) => [...prev, { id: uuidv4() }]);
  };

  const handleDeleteItemsOfAccounting = (id: string) => {
    setItemsOfAccounting((prev: any[]) => {
      return prev.filter((item) => item?.id !== id);
    });
  };

  const handleSave = async () => {
    const list: any[] = [];
    if (Array.isArray(itemsOfAccounting)) {
      itemsOfAccounting.forEach((itemOfAccounting: any) => {
        const item = { ...itemOfAccounting };
        delete item.vat_percent;
        delete item.id;
        list.push(item);
      });
    }
    let check = false;
    let data: any = {};
    data.voucher_number = voucherNumber;
    data.payment_status = paymentStatus;
    data.with_invoice = withInvoice;
    data.is_substitute_invoice = isSubstituteInvoice;
    data.other_t_and_c = otherTAndC;
    data.e_invoice_search_id = eInvoiceSearchID;
    data.e_invoice_search_url = eInvoiceSearchURL;
    data.payment_t_and_c = paymentTerms || undefined;
    data.pay_within_days = payWithinDays === 0 ? 0 : payWithinDays || undefined;
    data.due_date = dueDate || undefined;
    data.posted_date = postedDate || undefined;
    data.voucher_date = voucherDate || undefined;
    data.percent_discount_invoice_value = percentDiscountInvoiceValue;
    data.discount_type = discount;
    data.customer = customer;
    data.customer_name = customerName;
    data.customer_address = customerAddress;
    data.customer_tax_code = customerTaxCode;
    if (invoice) {
      check = true;
      for (let key in invoice) {
        if (invoice.hasOwnProperty(key)) {
          data[key] = invoice[key];
        }
      }
    }
    if (
      paymentStatus === OPTION_SA_SERVICE_PAYMENT_STATUS.ON_CREDIT.value &&
      debtVoucher
    ) {
      check = true;
      for (let key in debtVoucher) {
        if (debtVoucher.hasOwnProperty(key)) {
          data[key] = debtVoucher[key];
        }
      }
    }
    if (
      paymentStatus === OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value &&
      paymentMethod === OPTION_SA_SERVICE_PAYMENT_METHOD.DEPOSIT.value &&
      cashReceipt
    ) {
      check = true;
      for (let key in cashReceipt) {
        if (cashReceipt.hasOwnProperty(key)) {
          data[key] = cashReceipt[key];
        }
      }
    }
    if (
      paymentStatus === OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value &&
      paymentMethod === OPTION_SA_SERVICE_PAYMENT_METHOD.CASH.value &&
      cashReceiptVoucher
    ) {
      check = true;
      for (let key in cashReceiptVoucher) {
        if (cashReceiptVoucher.hasOwnProperty(key)) {
          data[key] = cashReceiptVoucher[key];
        }
      }
    }
    if (!check) return;
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/provision_service_voucher",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        const id = response.data.data.id;
        const responseItemList = await axios.post(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/provision_service_voucher_items",
          list.map((item: any) => ({ ...item, provision_service_voucher: id })),
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        linkBackRef.current?.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <AiOutlineReload
            className="text-2xl cursor-pointer"
            onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-medium">
            Chứng từ bán dịch vụ {voucherNumber}
          </p>
        </div>
        <div>
          <Link href={backTo} ref={linkBackRef}>
            <AiOutlineClose className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-full absolute top-0 left-0 p-4 overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                value={OPTION_SA_SERVICE_PAYMENT_STATUS.ON_CREDIT.value}
                checked={
                  paymentStatus ===
                  OPTION_SA_SERVICE_PAYMENT_STATUS.ON_CREDIT.value
                }
                onChange={(e) => {
                  return setPaymentStatus(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Chưa thu tiền
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={
                  paymentStatus === OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value
                }
                type="radio"
                value={OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Thu tiền ngay
              </label>
            </div>
            <div
              className={`h-10 w-44 border rounded-md overflow-hidden ${paymentStatus !== OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value &&
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
                      OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value
                      ? "#dbd9d9"
                      : "white",
                }}
                variant="borderless"
                value={paymentMethod}
                onChange={(value) => setPaymentMethod(value)}
                options={Object.keys(OPTION_SA_SERVICE_PAYMENT_METHOD).map(
                  (key) => ({
                    label:
                      OPTION_SA_SERVICE_PAYMENT_METHOD[
                        key as keyof typeof OPTION_SA_SERVICE_PAYMENT_METHOD
                      ].translate.vi,
                    value:
                      OPTION_SA_SERVICE_PAYMENT_METHOD[
                        key as keyof typeof OPTION_SA_SERVICE_PAYMENT_METHOD
                      ].value,
                  })
                )}
              />
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={withInvoice}
                onChange={(e) => setWithInvoice(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Lập kèm hóa đơn
              </label>
            </div>
          </div>
          <div className="flex items-center gap-[15%] justify-between">
            <Tabs
              className="flex-grow-1"
              items={[
                {
                  key: "1",
                  active:
                    paymentStatus ===
                      OPTION_SA_SERVICE_PAYMENT_STATUS.ON_CREDIT.value
                      ? true
                      : false,
                  label: <p className="font-semibold">Chứng từ ghi nợ</p>,
                  children: (
                    <ProvisionPurchaseVoucherDebtVoucher
                      key={debtVoucher?.debt_voucher_contact}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      listPartner={listPartner}
                      listEmployee={listEmployee}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      listPaymentTerms={listPaymentTerms}
                      paymentTerms={paymentTerms}
                      setPaymentTerms={setPaymentTerms}
                      payWithinDays={payWithinDays}
                      setPayWithinDays={setPayWithinDays}
                      dueDate={dueDate}
                      setDueDate={setDueDate}
                      setDebtVoucher={setDebtVoucher}
                      postedDate={postedDate}
                      setPostedDate={setPostedDate}
                      voucherDate={voucherDate}
                      setVoucherDate={setVoucherDate}
                      debtVoucher={debtVoucher}
                    />
                  ),
                },
                {
                  key: "2",
                  label: <p className="font-semibold">Phiếu thu</p>,
                  active:
                    paymentStatus ===
                      OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value &&
                      paymentMethod ===
                      OPTION_SA_SERVICE_PAYMENT_METHOD.CASH.value
                      ? true
                      : false,
                  children: (
                    <ProvisionPurchaseVoucherCashReceiptVoucher
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                      listPartner={listPartner}
                      listEmployee={listEmployee}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      cashReceiptVoucher={cashReceiptVoucher}
                      setCashReceiptVoucher={setCashReceiptVoucher}
                    />
                  ),
                },
                {
                  key: "3",
                  label: <p className="font-semibold">Thu tiền gửi</p>,
                  active:
                    paymentStatus ===
                      OPTION_SA_SERVICE_PAYMENT_STATUS.PAID.value &&
                      paymentMethod ===
                      OPTION_SA_SERVICE_PAYMENT_METHOD.DEPOSIT.value
                      ? true
                      : false,
                  children: (
                    <ProvisionPurchaseVoucherCashReceipt
                      listPartner={listPartner}
                      listBankAccount={listBankAccount}
                      listEmployee={listEmployee}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      setCashReceipt={setCashReceipt}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                    />
                  ),
                },
                {
                  key: "4",
                  label: <p className="font-semibold">Hoá đơn</p>,
                  active: true,
                  children: (
                    <ProvisionPurchaseVoucherInvoice
                      listPartner={listPartner}
                      paymentStatus={paymentStatus}
                      listPaymentTerms={listPaymentTerms}
                      paymentTerms={paymentTerms}
                      setPaymentTerms={setPaymentTerms}
                      payWithinDays={payWithinDays}
                      setPayWithinDays={setPayWithinDays}
                      dueDate={dueDate}
                      setDueDate={setDueDate}
                      listBankAccount={listBankAccount}
                      invoice={invoice}
                      setInvoice={setInvoice}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                    />
                  ),
                },
              ].filter((item: any) => item?.active === true)}
            />
            <div>
              <p className="text-base whitespace-nowrap text-right">
                Tổng tiền
              </p>
              <p className="text-4xl font-semibold text-right">
                {customRound(
                  (totalAmount || 0) -
                  (totalAmountDiscount || 0) +
                  (totalVatAmount || 0)
                ).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <ProvisionPurchaseVoucherTableList
            itemsOfAccounting={itemsOfAccounting}
            itemList={itemList}
            handleChangeItemOfOfList={handleChangeItemOfOfList}
            handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
            listChartOfAccounts={listChartOfAccounts}
            listUnit={listUnit}
            discount={discount}
            setDiscount={setDiscount}
            percentDiscountInvoiceValue={percentDiscountInvoiceValue}
            setPercentDiscountInvoiceValue={setPercentDiscountInvoiceValue}
            listVatTax={listVatTax}
          />
          <div className="w-full grid grid-cols-2 justify-between items-start mt-8 gap-[10%]">
            <div className="flex flex-col gap-3">
              <div>
                <Button
                  type="primary"
                  onClick={() => handleAddItemsOfAccounting()}
                >
                  Thêm dòng
                </Button>
              </div>
              <div className="flex items-center mt-8">
                <input
                  type="checkbox"
                  checked={isSubstituteInvoice}
                  onChange={(e) => setIsSubstituteInvoice(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Là hóa đơn thay thế
                </label>
              </div>
              <div className="col-span-6">
                <p className="font-semibold">Điều khoản khác</p>
                <textarea
                  className="w-full min-h-20 px-2 outline-none border rounded-md"
                  value={otherTAndC}
                  onChange={(e) => setOtherTAndC(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <p className="font-semibold">Mã tra cứu HĐĐT</p>
                  <input
                    type="text"
                    value={eInvoiceSearchID}
                    onChange={(e) => setEInvoiceSearchID(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                <div className="col-span-3">
                  <p className="font-semibold">Đường dẫn tra cứu HĐĐT</p>
                  <input
                    type="text"
                    value={eInvoiceSearchURL}
                    onChange={(e) => setEInvoiceSearchURL(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium">Đính kèm</p>
                <div>
                  <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <table>
                <tbody>
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Tổng tiền dịch vụ
                    </td>
                    <td className="text-base font-semibold text-right">
                      {customRound(totalAmount || 0).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                  {discount !== OPTIONS_DISCOUNT.NO.value && (
                    <tr>
                      <td className="w-80 font-semibold text-base py-1">
                        Chiết khấu
                      </td>
                      <td className="text-base font-semibold text-right">
                        {customRound(totalAmountDiscount || 0).toLocaleString(
                          "vi-VN"
                        )}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Thuế GTGT
                    </td>
                    <td className="text-base font-semibold text-right">
                      {customRound(totalVatAmount || 0).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Tổng tiền dịch vụ
                    </td>
                    <td className="text-base font-semibold text-right">
                      {customRound(
                        (totalAmount || 0) +
                        (totalVatAmount || 0) -
                        (totalAmountDiscount || 0)
                      ).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Modal
        title={
          <div className="flex items-center gap-3">
            <FaRegQuestionCircle className="text-3xl text-blue-700" />
            <p className="text-lg font-medium">
              Bạn muốn đóng chứng từ bán dịch vụ?
            </p>
          </div>
        }
        centered
        open={showModalConfirmClose}
        onOk={() => setOpenServiceProvisionVoucher(false)}
        onCancel={() => setShowModalConfirmClose(false)}
      ></Modal> */}
      </div>
      <div className="flex justify-between items-center p-3 bg-cyan-100">
        <Link href="/sales">Huỷ</Link>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </div>
    </div>
  );
}
