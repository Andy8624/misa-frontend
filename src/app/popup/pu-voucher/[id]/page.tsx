"use client";
import { Button, Select } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { Tabs } from "antd";
import {
  OPTION_PURCHASE_TYPE,
  OPTIONS_DISCOUNT,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
} from "@/constants/constants";
import { UploadOutlined } from "@ant-design/icons";
import { PurchaseVoucherSummary } from "@/components/purchase-voucher-summary";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PurchaseVoucherPreCustomsCost } from "@/components/purchase-voucher-pre-customs-cost";
import { PurchaseVoucherFreight } from "@/components/purchase-voucher-freight";
import {
  BankAccountType,
  ChartOfAccountsType,
  EmployeeType,
  PartnerType,
  PaymentTermsType,
  VatTaxType,
} from "@types";
import { AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import { ColorModeContext } from "@/contexts/color-mode";
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
import { useParams } from "next/navigation";
import { PurchaseVoucherQuantityValueRead } from "@/components/purchase-voucher-quantity-value-read";
import { PurchaseVoucherTaxRead } from "@/components/purchase-voucher-tax-read";
import { PurchaseVoucherDebitVoucherRead } from "@/components/purchase-voucher-debit-voucher-read";
import { PurchaseVoucherInventoryInVoucherRead } from "@/components/purchase-voucher-inventory-in-voucher-read";
import { PurchaseVoucherCashPaymentVoucherRead } from "@/components/purchase-voucher-cash-payment-voucher-read";
import { PurchaseVoucherPaymentOrderRead } from "@/components/purchase-voucher-payment-order-read";
import { PurchaseVoucherChequeRead } from "@/components/purchase-voucher-cheque-read";
import { PurchaseVoucherCounterChequeRead } from "@/components/purchase-voucher-counter-cheque-read";
import { PurchaseVoucherInvoiceRead } from "@/components/purchase-voucher-invoice-read";

export default function PurchaseVoucher() {
  const { id } = useParams();
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const { setIsLoading } = useContext(ColorModeContext);
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
  const [voucherNumber, setVoucherNumber] = useState<string>("NK00001");
  const [description, setDescription] = useState("");
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [discount, setDiscount] = useState<string>(OPTIONS_DISCOUNT.NO.value);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [itemList, setItemList] = useState<any[]>([]);
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [listWarehouse, setListWarehouse] = useState([]);
  const [listGroupOfPurchasedGoods, setListGroupOfPurchasedGoods] = useState<
    any[]
  >([]);
  const [listCostClassification, setListCostClassification] = useState<any[]>(
    []
  );
  const [listConstruction, setListConstruction] = useState<any[]>([]);
  const [listEmployee, setListEmployee] = useState<EmployeeType[]>([]);
  const [listPartner, setListPartner] = useState<PartnerType[]>([]);
  const [listBankAccount, setListBankAccount] = useState<BankAccountType[]>([]);
  const [listPaymentTerms, setListPaymentTerms] = useState<PaymentTermsType[]>(
    []
  );
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [supplier, setSupplier] = useState<string | undefined>();
  const [supplierName, setSupplierName] = useState<string | undefined>();
  const [supplierAddress, setSupplierAddress] = useState<string | undefined>();
  const [supplierTaxCode, setSupplierTaxCode] = useState<string | undefined>();
  const [courier, setCourier] = useState<string | undefined>();
  const [purchasingStaff, setPurchasingStaff] = useState<string | undefined>();
  const [quantityWithOriginalVoucher, setQuantityWithOriginalVoucher] =
    useState<number | undefined>();
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [invoiceForm, setInvoiceForm] = useState<string | undefined>();
  const [invoiceSign, setInvoiceSign] = useState<string | undefined>();
  const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>();
  const [invoiceDate, setInvoiceDate] = useState<string | undefined>();
  const [receipient, setReceipient] = useState<string | undefined>();
  const [paymentAccount, setPaymentAccount] = useState<string | undefined>();
  const [paymentAccountBankName, setPaymentAccountBankName] = useState<
    string | undefined
  >();
  const [recipientAccount, setRecipientAccount] = useState<
    string | undefined
  >();
  const [recipientAccountBankName, setRecipientAccountBankName] = useState<
    string | undefined
  >();
  const [personalIdNumber, setPersonalIdNumber] = useState<
    string | undefined
  >();
  const [issuedDate, setIssuedDate] = useState<string | undefined>();
  const [issuedBy, setIssuedBy] = useState<string | undefined>();
  const [inventoryInVoucherNo, setInventoryInVoucherNo] = useState<
    string | undefined
  >();
  const [inventoryInVoucherParticular, setInventoryInVoucherParticular] =
    useState<string | undefined>();
  const [cashPaymentVoucherParticular, setCashPaymentVoucherParticular] =
    useState<string | undefined>();
  const [debtVoucherParticular, setDebtVoucherParticular] = useState<
    string | undefined
  >();
  const [eInvoiceSearchId, setEInvoiceSearchId] = useState<
    string | undefined
  >();
  const [eInvoiceSearchUrl, setEInvoiceSearchUrl] = useState<
    string | undefined
  >();
  const [payWithinDays, setPayWithinDays] = useState<number | undefined>();
  const [paymentTAndC, setPaymentTAndC] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [purchaseCost, setPurchaseCost] = useState<number>(0);
  const [preCustomCost, setPreCustomCost] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [totalAmountPaid, settTotalAmountPaid] = useState<number>(0);
  const [importTax, setImportTax] = useState<number>(0);
  const [specialConsumptionTax, setSpecialConsumptionTax] = useState<number>(0);
  const [environmentalTax, setEnvironmentalTax] = useState<number>(0);
  const [vatAmount, setVatAmount] = useState<number>(0);

  useEffect(() => {
    getItems();
    getListWarehouse();
    getListGroupOfPurchasedGoods();
    getListCostClassification();
    getListConstruction();
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
    const dataListUnit = await fetchListUnit();
    setListUnit(dataListUnit);
    const dataListVatTax = await fetchListVatTax();
    setListVatTax(dataListVatTax);
    await getPurchaseVoucher();
    await getPurchaseVoucherItems();
  };

  const getPurchaseVoucherItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher_items",
        {
          params: {
            filter: { purchase_voucher: { _eq: id } },
            fields: ["*", "vat.*"],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      setItemsOfAccounting(list);
      handleCalculatorTotalValue(list);
    } catch (error) { }
  };

  const getPurchaseVoucher = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher/" + id,
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
        const invoiceDate = data?.invoice_date
          ? new Date(data?.invoice_date)
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
        setInvoiceDate(
          invoiceDate
            ? `${invoiceDate.getFullYear()}-${invoiceDate.getMonth() + 1 < 10
              ? "0" + (invoiceDate.getMonth() + 1)
              : invoiceDate.getMonth() + 1
            }-${invoiceDate.getDate() < 10
              ? "0" + invoiceDate.getDate()
              : invoiceDate.getDate()
            }`
            : undefined
        );
        setPurchaseType(data?.purchase_type || undefined);
        setInvoiceInclusion(data.invoice_inclusion || undefined);
        setSupplier(data?.supplier || undefined);
        setSupplierName(data?.supplier_name || undefined);
        setSupplierAddress(data?.supplier_address || undefined);
        setSupplierTaxCode(data?.supplier_tax_code || undefined);
        setCourier(data?.courier || undefined);
        setPurchasingStaff(data?.purchasing_staff || undefined);
        setInventoryInVoucherParticular(
          data?.inventory_in_voucher_particular || undefined
        );
        setPaymentTAndC(data?.payment_t_and_c || undefined);
        setPayWithinDays(data?.pay_within_days || undefined);
        setPaymentMethod(data?.payment_method || undefined);
        setPaymentStatus(data?.payment_status || undefined);
        setReceipient(data?.receipient || undefined);
        setCashPaymentVoucherParticular(
          data.cash_payment_voucher_particular || undefined
        );
        setQuantityWithOriginalVoucher(
          data.quantity_original_number || undefined
        );
        setPaymentAccount(data?.payment_account || undefined);
        setPaymentAccountBankName(data?.payment_account_bank_name || undefined);
        setDescription(data?.description || undefined);
        setPersonalIdNumber(data?.personal_id_number || undefined);
        setIssuedDate(data?.issued_date || undefined);
        setIssuedBy(data?.issued_by || undefined);
        setInventoryInVoucherNo(data?.inventory_in_voucher_no || undefined);
        setDiscount(data?.discount || undefined);
        setDiscountRate(data?.discount_rate || 0);
        setInvoiceForm(data?.invoice_form || undefined);
        setInvoiceSign(data?.invoice_sign || undefined);
        setInvoiceNumber(data?.invoice_number || undefined);
      }
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
                itemMaterialGroup?.goods_and_services_groups_id?.code !== "DV"
            )
          )
          : []
      );
    } catch (error) { }
  };

  const getListConstruction = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/construction",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListConstruction(response?.data?.data || []);
    } catch (error) { }
  };

  const getListCostClassification = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cost_classification",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListCostClassification(response?.data?.data || []);
    } catch (error) { }
  };

  const getListGroupOfPurchasedGoods = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/group_of_purchased_goods",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListGroupOfPurchasedGoods(response?.data?.data || []);
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

  const handleChangeItemOfOfList = (item: any, index: number) => {
    setItemsOfAccounting((list: any[]) => {
      list[index] = { ...list[index], ...item };
      handleCalculatorTotalValue(list);
      return [...list];
    });
  };

  const handleCalculatorTotalValue = (list: any) => {
    if (
      purchaseType === OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value ||
      purchaseType ===
      OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
        .value
    ) {
      let total = 0;
      let discountAmount = 0;
      let totalAmountPaid = 0;
      let vatAmount = 0;
      let totalPurchaseCost = 0;
      list.forEach((item: any) => {
        let amount = (item?.unit_price || 0) * (item?.quantity || 0);
        let discountAmountItem = amount * ((item?.discount_rate || 0) / 100);
        total += amount;
        discountAmount += discountAmountItem;
        vatAmount +=
          (amount - discountAmountItem) * ((item?.vat?.percent || 0) / 100);
        totalAmountPaid += amount - discountAmountItem + vatAmount;
        totalPurchaseCost += item?.purchase_cost || 0;
      });
      setTotal(total);
      setDiscountAmount(discountAmount);
      settTotalAmountPaid(totalAmountPaid);
      setImportTax(importTax);
      setSpecialConsumptionTax(specialConsumptionTax);
      setEnvironmentalTax(environmentalTax);
      setVatAmount(vatAmount);
      setPurchaseCost(totalPurchaseCost);
    }
    if (
      purchaseType === OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value ||
      purchaseType ===
      OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
        .value
    ) {
      let total = 0;
      let discountAmount = 0;
      let totalAmountPaid = 0;
      let importTax = 0;
      let specialConsumptionTax = 0;
      let environmentalTax = 0;
      let vatAmount = 0;
      let totalPurchaseCost = 0;
      let totalPreCustomCost = 0;
      list.forEach((item: any) => {
        let amount = (item?.unit_price || 0) * (item?.quantity || 0);
        let discountAmountItem = amount * ((item?.discount_rate || 0) / 100);
        let importTaxBase =
          amount -
          discountAmountItem +
          (item?.pre_customs_cost_in_foreign_currency || 0) +
          (item?.pre_customs_cost_in_accounting_currency || 0);
        total += amount;
        discountAmount += discountAmountItem;
        totalAmountPaid += amount - discountAmountItem;
        let importTaxDuty =
          (importTaxBase * (item?.import_tax_rate || 0)) / 100;
        importTax += importTaxDuty;
        let specialConsumptionTaxAmount =
          (importTaxBase + importTaxDuty) *
          ((item?.special_consumption_tax_rate || 0) / 100);
        specialConsumptionTax += specialConsumptionTaxAmount;
        let translatedVatAmount =
          (importTaxBase + importTaxDuty + specialConsumptionTaxAmount) *
          ((item?.vat?.percent || 0) / 100);
        vatAmount += translatedVatAmount;
        totalPurchaseCost += item?.purchase_cost || 0;
        totalPreCustomCost += item?.pre_custom_cost || 0;
      });
      setTotal(total);
      setDiscountAmount(discountAmount);
      settTotalAmountPaid(totalAmountPaid);
      setImportTax(importTax);
      setSpecialConsumptionTax(specialConsumptionTax);
      setEnvironmentalTax(environmentalTax);
      setVatAmount(vatAmount);
      setPurchaseCost(totalPurchaseCost);
      setPreCustomCost(totalPreCustomCost);
    }
  };

  const handleDeleteItemsOfAccounting = (id: string) => {
    setItemsOfAccounting((prev: any[]) => {
      return prev.filter((item: any) => item?.id !== id);
    });
  };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("NK000001");
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
          `NK${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSupplier = (id: string) => {
    const supplier = listPartner.find((item: PartnerType) => item?.id === id);
    if (supplier) {
      setSupplier(id);
      setSupplierName(supplier?.name || undefined);
      setSupplierAddress(supplier?.address || undefined);
      setSupplierTaxCode(supplier?.tax_code || undefined);
    }
  };

  const handleSelectPaymentAccount = (id: string) => {
    const account = listBankAccount.find(
      (item: BankAccountType) => item?.id === id
    );
    if (account) {
      setPaymentAccount(account?.id || undefined);
      setPaymentAccountBankName(account?.bank?.full_name || undefined);
    }
  };

  const handleSelectRecipientAccount = (id: string) => { };

  const handleSave = async () => {
    let data: any = {};
    data.voucher_number = voucherNumber;
    data.supplier = supplier;
    data.supplier_name = supplierName;
    data.supplier_address = supplierAddress;
    data.payment_status = paymentStatus;
    data.payment_method = paymentMethod;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.payment_t_and_c = paymentTAndC || undefined;
    data.pay_within_days = payWithinDays || undefined;
    data.due_date = dueDate || undefined;
    data.supplier = supplier;
    data.supplier_name = supplierName;
    data.supplier_address = supplierAddress;
    data.supplier_tax_code = supplierTaxCode || undefined;
    data.courier = courier;
    data.receipient = receipient;
    data.quantity_original_number =
      quantityWithOriginalVoucher === 0
        ? 0
        : quantityWithOriginalVoucher || undefined;
    data.inventory_in_voucher_no = inventoryInVoucherNo || undefined;
    data.recipient_account = recipientAccount || undefined;
    data.recipient_account_bank_name = recipientAccountBankName;
    data.description = description;
    data.payment_account = paymentAccount;
    data.payment_account_bank_name = paymentAccountBankName;
    data.e_invoice_search_id = eInvoiceSearchId;
    data.e_invoice_search_url = eInvoiceSearchUrl;
    data.inventory_in_voucher_particular = inventoryInVoucherParticular;
    data.cash_payment_voucher_particular = cashPaymentVoucherParticular;
    data.debt_voucher_particular = debtVoucherParticular;
    data.invoice_form = invoiceForm;
    data.invoice_sign = invoiceSign;
    data.invoice_number = invoiceNumber;
    data.invoice_date = invoiceDate;
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher",
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher_items",
          itemsOfAccounting.map((item: any) => ({
            ...item,
            purchase_voucher: id,
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

  const handleAddItemOfAccounting = () => {
    setItemsOfAccounting([...itemsOfAccounting, { id: uuidv4() }]);
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
            Chứng từ mua hàng {voucherNumber}
          </p>
          <div className="h-9 w-[320px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={purchaseType}
              // onChange={(value) => setPurchaseType(value)}
              options={Object.keys(OPTION_PURCHASE_TYPE).map(
                (key, idx: number) => ({
                  label: `${OPTION_PURCHASE_TYPE[
                    key as keyof typeof OPTION_PURCHASE_TYPE
                  ].translate.vi
                    }`,
                  value:
                    OPTION_PURCHASE_TYPE[
                      key as keyof typeof OPTION_PURCHASE_TYPE
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
          <Link href="/purchase" ref={linkBackRef}>
            <AiOutlineClose className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-full absolute top-0 left-0 p-4 overflow-y-auto">
          <div>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value}
                  name="default-radio"
                  checked={
                    paymentStatus ===
                    PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
                  }
                  // onChange={(e) => {
                  //   setPaymentMethod(
                  //     PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
                  //   );
                  //   return setPaymentStatus(e.target.value);
                  // }}
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
                  id="default-radio-2"
                  type="radio"
                  value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value}
                  name="default-radio"
                  // onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Thanh toán ngay
                </label>
              </div>
              <div
                className={`h-10 w-44 border rounded-md overflow-hidden ${paymentStatus !==
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
                  // onChange={(value) => setPaymentMethod(value)}
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
                className={`h-10 w-48 border rounded-md ${(purchaseType ===
                  OPTION_PURCHASE_TYPE
                    .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED.value ||
                  purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value) &&
                  "hidden"
                  }`}
              >
                <Select
                  style={{ border: "none", width: "100%", height: "100%" }}
                  variant="borderless"
                  value={invoiceInclusion}
                  // onChange={(value) => setInvoiceInclusion(value)}
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
            <div className="mt-4 flex gap-12">
              <div className="flex-grow-1">
                <Tabs
                  defaultActiveKey={"4"}
                  items={[
                    {
                      key: "4",
                      label: (
                        <p className="text-base font-medium">Chứng từ ghi nợ</p>
                      ),
                      active:
                        paymentStatus ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID
                            .value &&
                          (purchaseType ===
                            OPTION_PURCHASE_TYPE
                              .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
                              .value ||
                            purchaseType ===
                            OPTION_PURCHASE_TYPE
                              .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
                              .value)
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherDebitVoucherRead
                          debtVoucherParticular={debtVoucherParticular}
                          setDebtVoucherParticular={setDebtVoucherParticular}
                          listSupplier={listPartner}
                          listEmployee={listEmployee}
                          supplier={supplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          handleSelectSupplier={handleSelectSupplier}
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          voucherNumber={voucherNumber}
                          setVoucherNumber={setVoucherNumber}
                        />
                      ),
                    },
                    {
                      key: "1",
                      label: (
                        <p className="text-base font-medium">Phiếu nhập</p>
                      ),
                      active:
                        purchaseType ===
                          OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS
                            .value ||
                          purchaseType ===
                          OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherInventoryInVoucherRead
                          inventoryInVoucherParticular={
                            inventoryInVoucherParticular
                          }
                          setInventoryInVoucherParticular={
                            setInventoryInVoucherParticular
                          }
                          courier={courier}
                          setCourier={setCourier}
                          listSupplier={listPartner}
                          listEmployee={listEmployee}
                          supplier={supplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          handleSelectSupplier={handleSelectSupplier}
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          inventoryInVoucherNo={inventoryInVoucherNo}
                          setInventoryInVoucherNo={setInventoryInVoucherNo}
                        />
                      ),
                    },
                    {
                      key: "2",
                      label: <p className="text-base font-medium">Phiếu chi</p>,
                      active:
                        paymentStatus ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW
                            .value &&
                          paymentMethod ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherCashPaymentVoucherRead
                          listSupplier={listPartner}
                          listEmployee={listEmployee}
                          purchaseType={purchaseType}
                          supplier={supplier}
                          handleSelectSupplier={handleSelectSupplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          receipient={receipient}
                          setReceipient={setReceipient}
                          cashPaymentVoucherParticular={
                            cashPaymentVoucherParticular
                          }
                          setCashPaymentVoucherParticular={
                            setCashPaymentVoucherParticular
                          }
                          quantityWithOriginalVoucher={
                            quantityWithOriginalVoucher
                          }
                          setQuantityWithOriginalVoucher={
                            setQuantityWithOriginalVoucher
                          }
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          voucherNumber={voucherNumber}
                          setVoucherNumber={setVoucherNumber}
                        />
                      ),
                    },
                    {
                      key: "5",
                      label: (
                        <p className="text-base font-medium">Uỷ nhiệm chi</p>
                      ),
                      active:
                        paymentStatus ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW
                            .value &&
                          paymentMethod ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.PAYMENT_ORDER
                            .value
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherPaymentOrderRead
                          listSupplier={listPartner}
                          purchaseType={purchaseType}
                          listBankAccount={listBankAccount}
                          listEmployee={listEmployee}
                          paymentAccount={paymentAccount}
                          handleSelectPaymentAccount={
                            handleSelectPaymentAccount
                          }
                          paymentAccountBankName={paymentAccountBankName}
                          setPaymentAccountBankName={setPaymentAccountBankName}
                          supplier={supplier}
                          handleSelectSupplier={handleSelectSupplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          recipientAccount={recipientAccount}
                          handleSelectRecipientAccount={
                            handleSelectRecipientAccount
                          }
                          recipientAccountBankName={recipientAccountBankName}
                          setRecipientAccountBankName={
                            setRecipientAccountBankName
                          }
                          description={description}
                          setDescription={setDescription}
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          voucherNumber={voucherNumber}
                          setVoucherNumber={setVoucherNumber}
                        />
                      ),
                    },
                    {
                      key: "6",
                      label: (
                        <p className="text-base font-medium">
                          Séc chuyển khoảng
                        </p>
                      ),
                      active:
                        paymentMethod ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CHEQUE.value &&
                          paymentStatus ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherChequeRead
                          listSupplier={listPartner}
                          listBankAccount={listBankAccount}
                          listEmployee={listEmployee}
                          paymentAccount={paymentAccount}
                          handleSelectPaymentAccount={
                            handleSelectPaymentAccount
                          }
                          paymentAccountBankName={paymentAccountBankName}
                          setPaymentAccountBankName={setPaymentAccountBankName}
                          supplier={supplier}
                          handleSelectSupplier={handleSelectSupplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          recipientAccount={recipientAccount}
                          handleSelectRecipientAccount={
                            handleSelectRecipientAccount
                          }
                          recipientAccountBankName={recipientAccountBankName}
                          setRecipientAccountBankName={
                            setRecipientAccountBankName
                          }
                          description={description}
                          setDescription={setDescription}
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          voucherNumber={voucherNumber}
                          setVoucherNumber={setVoucherNumber}
                        />
                      ),
                    },
                    {
                      key: "7",
                      label: (
                        <p className="text-base font-medium">Séc tiền mặt</p>
                      ),
                      active:
                        paymentStatus ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW
                            .value &&
                          paymentMethod ===
                          PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE
                            .value
                          ? true
                          : false,
                      children: (
                        <PurchaseVoucherCounterChequeRead
                          listSupplier={listPartner}
                          listBankAccount={listBankAccount}
                          listEmployee={listEmployee}
                          purchaseType={purchaseType}
                          paymentAccount={paymentAccount}
                          handleSelectPaymentAccount={
                            handleSelectPaymentAccount
                          }
                          paymentAccountBankName={paymentAccountBankName}
                          setPaymentAccountBankName={setPaymentAccountBankName}
                          supplier={supplier}
                          handleSelectSupplier={handleSelectSupplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          description={description}
                          setDescription={setDescription}
                          purchasingStaff={purchasingStaff}
                          setPurchasingStaff={setPurchasingStaff}
                          postedDate={postedDate}
                          setPostedDate={setPostedDate}
                          voucherDate={voucherDate}
                          setVoucherDate={setVoucherDate}
                          voucherNumber={voucherNumber}
                          setVoucherNumber={setVoucherNumber}
                          receipient={receipient}
                          setReceipient={setReceipient}
                          personalIdNumber={personalIdNumber}
                          setPersonalIdNumber={setPersonalIdNumber}
                          issuedBy={issuedBy}
                          setIssuedBy={setIssuedBy}
                          issuedDate={issuedDate}
                          setIssuedDate={setIssuedDate}
                        />
                      ),
                    },
                    {
                      key: "3",
                      label: <p className="text-base font-medium">Hoá đơn</p>,
                      active:
                        (purchaseType ===
                          OPTION_PURCHASE_TYPE
                            .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
                            .value ||
                          purchaseType ===
                          OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS
                            .value) &&
                          invoiceInclusion !==
                          PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                            .RECEIVED_WITH_INVOICE.value
                          ? false
                          : true,
                      children: (
                        <PurchaseVoucherInvoiceRead
                          listSupplier={listPartner}
                          supplier={supplier}
                          supplierName={supplierName}
                          setSupplierName={setSupplierName}
                          supplierAddress={supplierAddress}
                          setSupplierAddress={setSupplierAddress}
                          handleSelectSupplier={handleSelectSupplier}
                          supplierTaxCode={supplierTaxCode}
                          setSupplierTaxCode={setSupplierTaxCode}
                          invoiceForm={invoiceForm}
                          setInvoiceForm={setInvoiceForm}
                          invoiceSign={invoiceSign}
                          setInvoiceSign={setInvoiceSign}
                          invoiceNumber={invoiceNumber}
                          setInvoiceNumber={setInvoiceNumber}
                          invoiceDate={invoiceDate}
                          setInvoiceDate={setInvoiceDate}
                        />
                      ),
                    },
                  ].filter((item: any) => item?.active === true)}
                />
              </div>
              <div className="flex flex-col items-end gap-3">
                <p>Tổng tiền thanh toán</p>
                <p className="text-5xl font-medium">
                  {totalAmountPaid.toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
            <div
              className={`mt-8 ${paymentStatus !==
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value &&
                "hidden"
                }`}
            >
              <div className="flex gap-4 w-1/2">
                <div className="flex-grow-1">
                  <p className="font-semibold">Điều khoản thanh toán</p>
                  <div className="h-10 w-full outline-none border rounded-md">
                    <Select
                      style={{ width: "100%", height: "100%" }}
                      value={paymentTAndC}
                      // onChange={(value) => setPaymentTAndC(value)}
                      options={listPaymentTerms.map((item: any) => ({
                        label: `${item?.code || ""} - ${item?.name || ""}`,
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
                    // onChange={(e) => setPayWithinDays(Number(e.target.value))}
                    className="h-10 w-full px-3 outline-none border rounded-md"
                  />
                </div>
                <div>
                  <p className="font-semibold">Hạn thanh toán</p>
                  <input
                    type="date"
                    value={dueDate}
                    // onChange={(e) => setDueDate(e.target.value)}
                    className="h-10 w-full px-3 outline-none border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-6">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Hàng tiền",
                  active: true,
                  children: (
                    <PurchaseVoucherQuantityValueRead
                      discount={discount}
                      discountRate={discountRate}
                      setDiscountRate={setDiscountRate}
                      handleChangeItemOfOfList={handleChangeItemOfOfList}
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      itemList={itemList}
                      itemsOfAccounting={itemsOfAccounting}
                      listChartOfAccounts={listChartOfAccounts}
                      listUnit={listUnit}
                      setDiscount={setDiscount}
                      paymentStatus={paymentStatus}
                      purchaseType={purchaseType}
                      invoiceInclusion={invoiceInclusion}
                      paymentMethod={paymentMethod}
                      listWarehouse={listWarehouse}
                      listVatTax={listVatTax}
                      listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                      listCostClassification={listCostClassification}
                      listConstruction={listConstruction}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Thuế",
                  active:
                    purchaseType ===
                      OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value ||
                      purchaseType ===
                      OPTION_PURCHASE_TYPE
                        .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED.value
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherTaxRead
                      discount={discount}
                      discountRate={discountRate}
                      setDiscountRate={setDiscountRate}
                      handleChangeItemOfOfList={handleChangeItemOfOfList}
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      itemList={itemList}
                      itemsOfAccounting={itemsOfAccounting}
                      listChartOfAccounts={listChartOfAccounts}
                      setDiscount={setDiscount}
                      listVatTax={listVatTax}
                      listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                    />
                  ),
                },
                {
                  key: "3",
                  label: "Phí trước hải quan",
                  active:
                    purchaseType ===
                      OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value ||
                      purchaseType ===
                      OPTION_PURCHASE_TYPE
                        .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED.value
                      ? true
                      : false,
                  children: <PurchaseVoucherPreCustomsCost />,
                },
                {
                  key: "4",
                  label: "Chi phí mua hàng",
                  active: true,
                  children: <PurchaseVoucherFreight />,
                },
              ].filter((item: any) => item?.active === true)}
            />
          </div>
          <div className="w-full flex items-start justify-between mt-8">
            <div className="grid grid-cols-3 gap-4 max-w-[500px]">
              <div className="col-span-3">
                <Button type="primary" onClick={handleAddItemOfAccounting}>
                  Thêm dòng
                </Button>
              </div>
              {invoiceInclusion ===
                PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE
                  .value && (
                  <>
                    <div className="col-span-1">
                      <p className="font-semibold">Mã tra cứu HĐĐT</p>
                      <input
                        type="text"
                        value={eInvoiceSearchId}
                        // onChange={(e) => setEInvoiceSearchId(e.target.value)}
                        className="h-10 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Đường dẫn tra cứu HĐĐT</p>
                      <input
                        type="text"
                        value={eInvoiceSearchUrl}
                        // onChange={(e) => setEInvoiceSearchUrl(e.target.value)}
                        className="h-10 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              {invoiceInclusion ===
                PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.NO_INVOICE.value && (
                  <>
                    <p className="col-span-2 font-medium">
                      Thông tin lên bảng kê mua vào không có hóa đơn
                    </p>
                    <div className="col-span-2">
                      <p className="font-semibold">Tên nhà cung cấp</p>
                      <input
                        type="text"
                        className="h-10 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Địa chỉ</p>
                      <input
                        type="text"
                        className="h-10 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Số CMND</p>
                      <input
                        type="text"
                        className="h-10 w-full px-3 outline-none border rounded-md"
                      />
                    </div>
                  </>
                )}
              <div className="col-span-2">
                <p className="font-medium">Đính kèm</p>
                <div>
                  <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[500px]">
              <PurchaseVoucherSummary
                purchaseType={purchaseType}
                total={total}
                discountAmount={discountAmount}
                totalAmountPaid={totalAmountPaid}
                importTax={importTax}
                specialConsumptionTax={specialConsumptionTax}
                environmentalTax={environmentalTax}
                vatAmount={vatAmount}
                discount={discount}
                purchaseCost={purchaseCost}
                preCustomCost={preCustomCost}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
