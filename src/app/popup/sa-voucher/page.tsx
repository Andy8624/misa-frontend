"use client";
import { UploadOutlined } from "@ant-design/icons";
import { SalesVoucherCashReceipt } from "@/components/sales-voucher-cash-receipt";
import { SalesVoucherCashReceiptVoucher } from "@/components/sales-voucher-cash-receipt-voucher";
import { SalesVoucherDebtVoucher } from "@/components/sales-voucher-debt-voucher";
import { SalesVoucherInventoryOutVoucher } from "@/components/sales-voucher-inventory-out-voucher";
import { SalesVoucherInvoice } from "@/components/sales-voucher-invoice";
import { SalesVoucherItemList } from "@/components/sales-voucher-item-list";
import { Button, Select, Tabs } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { SalesVoucherCostOfSales } from "@/components/sales-voucher-cost-of-sales";
import { ColorModeContext } from "@/contexts/color-mode";
import {
  BankAccountType,
  ChartOfAccountsType,
  EmployeeType,
  PartnerType,
  PaymentTermsType,
  VatTaxType,
} from "@/types";
import {
  fetchListBankAccount,
  fetchListChartOfAccounts,
  fetchListEmployee,
  fetchListPartner,
  fetchListPaymentTerms,
  getInvoice,
} from "@/utils/fetchData";
import Link from "next/link";
import { AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import {
  OPTION_SA_VOUCHER_PAYMENT_METHOD,
  OPTION_SA_VOUCHER_PAYMENT_STATUS,
  OPTION_SA_VOUCHER_SALES_TYPE,
} from "@/constants/constants";
import { formatDateToYYYYMMDD } from "@/utils/formatDateToYYYYMMDD";
import { customRound } from "@/utils/customRound";

export default function SalesVoucher() {
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const [backTo, setBackTo] = useState<string>("/sales");
  const [saleType, setSaleType] = useState(
    OPTION_SA_VOUCHER_SALES_TYPE.DOMESTIC_GOODS_SALES.value
  );
  const [showModalConfirmClose, setShowModalConfirmClose] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState<string>("BH00001");
  const [paymentStatus, setPaymentStatus] = useState<string>(
    OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    OPTION_SA_VOUCHER_PAYMENT_METHOD.CASH.value
  );
  const [withInvoice, setWithInvoice] = useState<boolean>(true);
  const [inventoryOutVoucherIncluded, setInventoryOutVoucherIncluded] =
    useState(true);
  const [isSubstituteInvoice, setIsSubstituteInvoice] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState<string | undefined>();
  const [otherTAndC, setOtherTAndC] = useState<string | undefined>();
  const [eInvoiceSearchID, setEInvoiceSearchID] = useState<
    string | undefined
  >();
  const [eInvoiceSearchURL, setEInvoiceSearchURL] = useState<
    string | undefined
  >();
  const { setIsLoading } = useContext(ColorModeContext);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [totalVatAmount, setTotalVatAmount] = useState<number>();
  const [paymentTerms, setPaymentTerms] = useState<string | undefined>();
  const [payWithinDays, setPayWithinDays] = useState<number>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [debtVoucher, setDebtVoucher] = useState<any>();
  const [invoice, setInvoice] = useState<any>();
  const [inventoryOutVoucher, setInventoryOutVoucher] = useState<any>();
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [discount, setDiscount] = useState<string>("no");
  const [percentDiscountInvoiceValue, setPercentDiscountInvoiceValue] =
    useState<number>(0);
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [exportTax, setExportTax] = useState<number>(0);
  const [listWarehouse, setListWarehouse] = useState([]);
  const [cashReceiptVoucher, setCashReceiptVoucher] = useState<any>();
  const [cashReceipt, setCashReceipt] = useState<any>();
  const [contractNumber, setContractNumber] = useState<string | undefined>();
  const [contractDate, setContractDate] = useState<string | undefined>();
  const [exportPickUpLocation, setExportPickUpLocation] = useState<
    string | undefined
  >();
  const [blNo, setBLNo] = useState<string | undefined>();
  const [containerNo, setContainerNo] = useState<string | undefined>();
  const [shippingProvider, setShippingProvider] = useState<
    string | undefined
  >();
  const [listEmployee, setListEmployee] = useState<EmployeeType[]>([]);
  const [listPartner, setListPartner] = useState<PartnerType[]>([]);
  const [listBankAccount, setListBankAccount] = useState<BankAccountType[]>([]);
  const [listPaymentTerms, setListPaymentTerms] = useState<PaymentTermsType[]>(
    []
  );
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [customer, setCustomer] = useState<string | undefined>();
  const [customerName, setCustomerName] = useState<string | undefined>();
  const [customerTaxCode, setCustomerTaxCode] = useState<string | undefined>();
  const [customerAddress, setCustomerAddress] = useState<string | undefined>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoice = urlParams.get("invoice");
    if (invoice) {
      getDataInvoice(invoice);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (itemsOfAccounting.length === 0) {
      setItemsOfAccounting([{ id: uuidv4() }]);
    }
    getItems();
    getListUnit();
    getListVatTax();
    getListWarehouse();
    generateVoucherNumber();
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
  };

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
      setInventoryOutVoucher({
        ...inventoryOutVoucher,
        inventory_out_voucher_receipient:
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

        // goods.push({
        //   id: uuidv4(),
        //   item_name: thhdvu,
        //   unit: dvtinh,
        //   quantity: sluong,
        //   unit_price: dgia,
        //   vat_rate: tsuat,
        // });

        goods.push({
          id: uuidv4(),
          item_name: thhdvu,
          quantity: sluong,
          unit_price: dgia,
          vat_rate: tsuat,
        });
      }
      setItemsOfAccounting(goods);
    } catch (error) {
      console.error("Error fetching XML:", error);
      return null;
    }
  };

  const getListVatTax = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/vat_tax",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListVatTax(response?.data?.data ? response.data.data : []);
    } catch (error) { }
  };

  const getListWarehouse = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warehouse",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListWarehouse(response?.data?.data ? response.data.data : []);
    } catch (error) { }
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

  const handleSelectSalesType = (value: string) => {
    setSaleType(value);
    if (
      value === OPTION_SA_VOUCHER_SALES_TYPE.EXPORTED_GOODS_SALES.value ||
      value ===
      OPTION_SA_VOUCHER_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value
    ) {
      setPaymentStatus(OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value);
    }
  };

  const handleAddItemsOfAccounting = () => {
    setItemsOfAccounting((prev: any) => [...prev, { id: uuidv4() }]);
  };

  const handleDeleteItemsOfAccounting = (id: string) => {
    setItemsOfAccounting((prev: any[]) => {
      const list = prev.filter((item) => item?.id !== id);
      let totalAmount = 0;
      let totalVatAmount = 0;
      let totalExportTaxAmount = 0;
      list.forEach((itemPrev: any) => {
        const total =
          (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0) -
          (itemPrev?.quantity || 0) *
          (itemPrev?.unit_price || 0) *
          (itemPrev?.discount_rate / 100);
        totalAmount += total;
        totalVatAmount += (total * (itemPrev?.percent_vat || 0)) / 100;
        totalExportTaxAmount +=
          ((itemPrev?.export_taxed_value || 0) *
            (itemPrev?.percent_export_tax || 0)) /
          100;
      });
      setTotalAmount(totalAmount);
      setTotalVatAmount(totalVatAmount);
      setExportTax(totalExportTaxAmount);
      return list;
    });
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
      console.log(
        "DEBUG ",
        response.data.data.filter((item: any) =>
          item?.material_group?.find(
            (itemMaterialGroup: any) =>
              itemMaterialGroup?.goods_and_services_groups_id?.code !== "DV"
          )
        )
      );
      setItemList(
        response?.data?.data
          ? response.data.data.filter((item: any) =>
            item?.material_group?.find(
              (itemMaterialGroup: any) =>
                itemMaterialGroup?.goods_and_services_groups_id?.code !== "DV"
            )
          )
          : []
      );
    } catch (error) { }
  };

  const handleChangeItemOfOfList = (item: any, index: number) => {
    setItemsOfAccounting((prev: any) => {
      const list = prev;
      list[index] = item;
      let totalAmount = 0;
      let totalVatAmount = 0;
      let totalExportTaxAmount = 0;
      list.forEach((itemPrev: any) => {
        const total =
          (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0) -
          (itemPrev?.quantity || 0) *
          (itemPrev?.unit_price || 0) *
          ((itemPrev?.discount_rate || 0) / 100);
        totalAmount += total;
        totalVatAmount +=
          (total *
            (listVatTax.find(
              (itemVatTax: VatTaxType) => itemVatTax?.id === itemPrev?.vat
            )?.percent || 0)) /
          100;
        totalExportTaxAmount +=
          ((itemPrev?.export_taxed_value || 0) *
            (itemPrev?.percent_export_tax || 0)) /
          100;
      });
      setTotalAmount(customRound(totalAmount));
      setTotalVatAmount(customRound(totalVatAmount));
      setExportTax(customRound(totalExportTaxAmount));
      return [...list];
    });
  };

  const handleSave = async () => {
    let data: any = {};
    data.voucher_number = voucherNumber;
    data.payment_status = paymentStatus;
    data.payment_method = paymentMethod;
    data.inventory_out_voucher_included = inventoryOutVoucherIncluded;
    data.with_invoice = withInvoice;
    data.is_substitute_invoice = isSubstituteInvoice;
    data.pickup_location = pickUpLocation;
    data.other_t_and_c = otherTAndC;
    data.e_invoice_search_id = eInvoiceSearchID;
    data.e_invoice_search_url = eInvoiceSearchURL;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.payment_t_and_c = paymentTerms;
    data.pay_within_days = payWithinDays;
    data.due_date = dueDate;
    data.percent_discount_invoice_value = percentDiscountInvoiceValue;
    data.discount_type = discount;
    data.customer = customer;
    data.customer_name = customerName;
    data.customer_address = customerAddress;
    data.customer_tax_code = customerTaxCode;
    if (
      saleType ===
      OPTION_SA_VOUCHER_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value ||
      saleType === OPTION_SA_VOUCHER_SALES_TYPE.EXPORTED_GOODS_SALES.value
    ) {
      data.contract_number = contractNumber;
      data.contract_date = contractDate;
      data.export_pick_up_location = exportPickUpLocation;
      data.b_l_no = blNo;
      data.container_no = containerNo;
      data.shipping_provider = shippingProvider;
    }
    for (let key in invoice) {
      if (invoice.hasOwnProperty(key)) {
        data[key] = invoice[key];
      }
    }
    for (let key in inventoryOutVoucher) {
      if (inventoryOutVoucher.hasOwnProperty(key)) {
        data[key] = inventoryOutVoucher[key];
      }
    }
    if (paymentStatus === OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value) {
      for (let key in debtVoucher) {
        if (debtVoucher.hasOwnProperty(key)) {
          data[key] = debtVoucher[key];
        }
      }
    }
    if (
      paymentStatus === OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value &&
      paymentMethod === OPTION_SA_VOUCHER_PAYMENT_METHOD.CASH.value
    ) {
      for (let key in cashReceiptVoucher) {
        if (cashReceiptVoucher.hasOwnProperty(key)) {
          data[key] = cashReceiptVoucher[key];
        }
      }
    }
    if (
      paymentStatus === OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value &&
      paymentMethod === OPTION_SA_VOUCHER_PAYMENT_METHOD.DEPOSIT.value
    ) {
      for (let key in cashReceipt) {
        if (cashReceipt.hasOwnProperty(key)) {
          data[key] = cashReceipt[key];
        }
      }
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/sales_voucher ",
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/sales_voucher_items",
          itemsOfAccounting.map((item) => {
            return {
              sales_voucher: id,
              item_id: item?.item_id || undefined,
              item_name: item?.item_name || undefined,
              debit_account: item?.debit_account || undefined,
              credit_account: item?.credit_account || undefined,
              cash_account: item?.cash_account || undefined,
              liability_account: item?.liability_account || undefined,
              liability_account_or_expense_account:
                item?.liability_account_or_expense_account || undefined,
              sales_account: item?.sales_account || undefined,
              unit: item?.unit || undefined,
              quantity: item?.quantity || 0,
              unit_price: item?.unit_price || 0,
              unit_cost_of_sales: item?.unit_cost_of_sales || 0,
              cost_of_goods_sold: item?.cost_of_goods_sold || 0,
              vat: item?.vat || undefined,
              export_taxed_value: item?.export_taxed_value || undefined,
              percent_export_tax: item?.percent_export_tax || undefined,
              export_tax_account: item?.export_tax_account || undefined,
              discount_rate: item?.discount_rate || 0,
              warehouse: item?.warehouse || undefined,
              expense_account: item?.expense_account || undefined,
              inventory_account: item?.inventory_account || undefined,
            };
          }),
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

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/sales_voucher",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("BH000001");
      } else {
        const voucherNumbers = list.map(
          (voucher: any) => voucher.voucher_number
        );
        const maxVoucherNumber = Math.max(
          ...voucherNumbers.map((voucher: any) => {
            const numberPart = voucher.slice(2);
            return parseInt(numberPart, 10);
          })
        );
        setVoucherNumber(
          `BH${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
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
            Chứng từ bán hàng {voucherNumber}
          </p>
          <div className="h-9 w-[340px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={saleType}
              onChange={(value) => handleSelectSalesType(value)}
              options={Object.keys(OPTION_SA_VOUCHER_SALES_TYPE).map(
                (key, idx: number) => ({
                  label: `${idx + 1}. ${OPTION_SA_VOUCHER_SALES_TYPE[
                    key as keyof typeof OPTION_SA_VOUCHER_SALES_TYPE
                  ].translate.vi
                    }`,
                  value:
                    OPTION_SA_VOUCHER_SALES_TYPE[
                      key as keyof typeof OPTION_SA_VOUCHER_SALES_TYPE
                    ].value,
                })
              )}
              labelRender={({ label }: any) => (
                <p className="font-medium">{label}</p>
              )}
              optionRender={({ label }: any) => (
                <div className="py-2 px-4 font-medium">
                  <p className="font-medium">{label}</p>
                </div>
              )}
            />
          </div>
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
            <div
              className={`flex items-center gap-4 ${(saleType ===
                OPTION_SA_VOUCHER_SALES_TYPE.EXPORTED_GOODS_SALES.value ||
                saleType ===
                OPTION_SA_VOUCHER_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES
                  .value) &&
                "pointer-events-none"
                }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  value={OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value}
                  checked={
                    paymentStatus ===
                    OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value
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
                    paymentStatus ===
                    OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value
                  }
                  type="radio"
                  value={OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Thu tiền ngay
                </label>
              </div>
              <div
                className={`h-10 w-44 border rounded-md overflow-hidden ${paymentStatus !==
                  OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value &&
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
                        OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value
                        ? "#e8e8e8"
                        : "white",
                  }}
                  variant="borderless"
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(value)}
                  options={Object.keys(OPTION_SA_VOUCHER_PAYMENT_METHOD).map(
                    (key) => ({
                      label:
                        OPTION_SA_VOUCHER_PAYMENT_METHOD[
                          key as keyof typeof OPTION_SA_VOUCHER_PAYMENT_METHOD
                        ].translate.vi,
                      value:
                        OPTION_SA_VOUCHER_PAYMENT_METHOD[
                          key as keyof typeof OPTION_SA_VOUCHER_PAYMENT_METHOD
                        ].value,
                    })
                  )}
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={inventoryOutVoucherIncluded}
                onChange={(e) =>
                  setInventoryOutVoucherIncluded(e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Kiêm phiếu xuất
              </label>
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
                      OPTION_SA_VOUCHER_PAYMENT_STATUS.ON_CREDIT.value
                      ? true
                      : false,
                  label: <p className="font-semibold">Chứng từ ghi nợ</p>,
                  children: (
                    <SalesVoucherDebtVoucher
                      key={debtVoucher?.debt_voucher_contact}
                      listCustomer={listPartner}
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
                      saleType={saleType}
                      listSupplier={listPartner}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                      debtVoucher={debtVoucher}
                    />
                  ),
                },
                {
                  key: "4",
                  label: <p className="font-semibold">Phiếu thu</p>,
                  active:
                    paymentStatus ===
                      OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value &&
                      paymentMethod ===
                      OPTION_SA_VOUCHER_PAYMENT_METHOD.CASH.value
                      ? true
                      : false,
                  children: (
                    <SalesVoucherCashReceiptVoucher
                      listEmployee={listEmployee}
                      listCustomer={listPartner}
                      setCashReceiptVoucher={setCashReceiptVoucher}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      postedDate={postedDate}
                      setPostedDate={setPostedDate}
                      voucherDate={voucherDate}
                      setVoucherDate={setVoucherDate}
                      listSupplier={listPartner}
                      saleType={saleType}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                    />
                  ),
                },
                {
                  key: "5",
                  active:
                    paymentStatus ===
                      OPTION_SA_VOUCHER_PAYMENT_STATUS.PAID.value &&
                      paymentMethod ===
                      OPTION_SA_VOUCHER_PAYMENT_METHOD.DEPOSIT.value
                      ? true
                      : false,
                  label: <p className="font-semibold">Thu tiền gửi</p>,
                  children: (
                    <SalesVoucherCashReceipt
                      listEmployee={listEmployee}
                      listCustomer={listPartner}
                      setCashReceipt={setCashReceipt}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      postedDate={postedDate}
                      setPostedDate={setPostedDate}
                      voucherDate={voucherDate}
                      setVoucherDate={setVoucherDate}
                      listSupplier={listPartner}
                      saleType={saleType}
                      listBankAccount={listBankAccount}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                    />
                  ),
                },
                {
                  key: "2",
                  active: true,
                  label: <p className="font-semibold">Phiếu xuất</p>,
                  children: (
                    <SalesVoucherInventoryOutVoucher
                      listEmployee={listEmployee}
                      listCustomer={listPartner}
                      paymentStatus={paymentStatus}
                      listPaymentTerms={listPaymentTerms}
                      paymentTerms={paymentTerms}
                      setPaymentTerms={setPaymentTerms}
                      payWithinDays={payWithinDays}
                      setPayWithinDays={setPayWithinDays}
                      dueDate={dueDate}
                      setDueDate={setDueDate}
                      setInventoryOutVoucher={setInventoryOutVoucher}
                      voucherNumber={voucherNumber}
                      setVoucherNumber={setVoucherNumber}
                      postedDate={postedDate}
                      setPostedDate={setPostedDate}
                      voucherDate={voucherDate}
                      setVoucherDate={setVoucherDate}
                      customer={customer}
                      setCustomer={setCustomer}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
                      inventoryOutVoucher={inventoryOutVoucher}
                    />
                  ),
                },
                {
                  key: "3",
                  active: true,
                  label: <p className="font-semibold">Hoá đơn</p>,
                  children: (
                    <SalesVoucherInvoice
                      listCustomer={listPartner}
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
                      customerTaxCode={customerTaxCode}
                      setCustomerTaxCode={setCustomerTaxCode}
                      customerAddress={customerAddress}
                      setCustomerAddress={setCustomerAddress}
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
                {((totalAmount || 0) + (totalVatAmount || 0)).toLocaleString(
                  "vi-VN"
                )}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Hàng tiền",
                  children: (
                    <SalesVoucherItemList
                      itemsOfAccounting={itemsOfAccounting}
                      itemList={itemList}
                      handleChangeItemOfOfList={handleChangeItemOfOfList}
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listChartOfAccounts={listChartOfAccounts}
                      listUnit={listUnit}
                      discount={discount}
                      setDiscount={setDiscount}
                      percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                      setPercentDiscountInvoiceValue={
                        setPercentDiscountInvoiceValue
                      }
                      saleType={saleType}
                      paymentStatus={paymentStatus}
                      paymentMethod={paymentMethod}
                      listVatTax={listVatTax}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Giá vốn",
                  children: (
                    <SalesVoucherCostOfSales
                      itemsOfAccounting={itemsOfAccounting}
                      itemList={itemList}
                      handleChangeItemOfOfList={handleChangeItemOfOfList}
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listChartOfAccounts={listChartOfAccounts}
                      listUnit={listUnit}
                      discount={discount}
                      setDiscount={setDiscount}
                      percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                      setPercentDiscountInvoiceValue={
                        setPercentDiscountInvoiceValue
                      }
                      listWarehouse={listWarehouse}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className="w-full flex justify-between mt-12">
            <div className="flex flex-col gap-4 w-[600px]">
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
              <div className="w-full">
                <p className="font-semibold">Địa điểm giao hàng</p>
                <input
                  type="text"
                  value={pickUpLocation}
                  onChange={(e) => setPickUpLocation(e.target.value)}
                  className="w-full h-10 px-2 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-6">
                <p className="font-semibold">Điều khoản khác</p>
                <textarea
                  className="w-full min-h-20 px-2 outline-none border rounded-md"
                  value={otherTAndC}
                  onChange={(e) => setOtherTAndC(e.target.value)}
                />
              </div>
              {(saleType ===
                OPTION_SA_VOUCHER_SALES_TYPE.EXPORTED_GOODS_SALES.value ||
                saleType ===
                OPTION_SA_VOUCHER_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES
                  .value) && (
                  <div className="w-full grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <p className="font-semibold">Số hợp đồng</p>
                      <input
                        type="text"
                        value={contractNumber}
                        onChange={(e) => setContractNumber(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Ngày hợp đồng</p>
                      <input
                        type="date"
                        value={contractDate}
                        onChange={(e) => setContractDate(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <p className="font-semibold">Địa điểm nhận hàng</p>
                      <input
                        type="text"
                        value={exportPickUpLocation}
                        onChange={(e) => setExportPickUpLocation(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Số vận đơn</p>
                      <input
                        type="text"
                        value={blNo}
                        onChange={(e) => setBLNo(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Số container</p>
                      <input
                        type="text"
                        value={containerNo}
                        onChange={(e) => setContainerNo(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <p className="font-semibold">Đơn vị vận chuyển</p>
                      <input
                        type="text"
                        value={shippingProvider}
                        onChange={(e) => setShippingProvider(e.target.value)}
                        className="w-full h-10 px-2 outline-none border rounded-md"
                      />
                    </div>
                  </div>
                )}
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
            <div className="w-[450px] flex items-start justify-end">
              <table>
                <tbody>
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Tổng tiền hàng
                    </td>
                    <td className="text-base font-semibold text-right">
                      {(totalAmount || 0).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Thuế GTGT
                    </td>
                    <td className="text-base font-semibold text-right">
                      {(totalVatAmount || 0).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-80 font-semibold text-base py-1">
                      Tổng tiền thanh toán
                    </td>
                    <td className="text-base font-semibold text-right">
                      {(
                        (totalAmount || 0) + (totalVatAmount || 0)
                      ).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                  {(saleType ===
                    OPTION_SA_VOUCHER_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES
                      .value ||
                    saleType ===
                    OPTION_SA_VOUCHER_SALES_TYPE.EXPORTED_GOODS_SALES
                      .value) && (
                      <tr>
                        <td className="w-80 font-semibold text-base py-1 pt-6">
                          Thuế xuất khẩu
                        </td>
                        <td className="text-base font-semibold text-right pt-6">
                          {(exportTax || 0).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-3 bg-cyan-100">
        <Link href="/sales">Huỷ</Link>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
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
        onOk={() => setOpenSalesVoucher(false)}
        onCancel={() => setShowModalConfirmClose(false)}
      ></Modal> */}
    </div>
  );
}
