"use client";
import { Button, Modal, Select, Tabs } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { ColorModeContext } from "@/contexts/color-mode";
import { v4 as uuidv4 } from "uuid";
import {
  OPTION_CASH_PAYMENT_VOUCHER_TYPE,
  OPTION_TAB_CASH,
} from "@/constants/constants";
import { CashPaymentAccountEntries } from "@/components/cash-payment-account-entries";
import {
  fetchListChartOfAccounts,
  fetchListGroupOfPurchasedGoods,
  fetchListVatTax,
  getInvoice,
} from "@/utils/fetchData";
import { CashPaymentRegisterInvoiceAndRecordTax } from "@/components/cash-payment-register-invoice-and-record-tax";
import {
  ChartOfAccountsType,
  EmployeeType,
  GroupOfPurchasedGoodsType,
  SubjectType,
  VatTaxType,
} from "@/types";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { customRound } from "@/utils/customRound";
import { InputSubject } from "@/components/input-subject";
import { InputEmployee } from "@/components/input-employee";
import { InputDate } from "@/components/input-date";

export default function CashPayment() {
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const [backTo, setBackTo] = useState<string>(
    `/cash?tab=${OPTION_TAB_CASH.CASH_PAYMENT}`
  );
  const { setIsLoading } = useContext(ColorModeContext);
  const [voucherNumber, setVoucherNumber] = useState<string>("PC00001");
  const [openModalConfirmClose, setOpenModalConfirmClose] =
    useState<boolean>(false);
  const [cashPaymentVoucherType, setCashPaymentVoucherType] = useState<string>(
    OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value
  );
  const [listPartner, setListPartner] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [withOriginalVoucher, setWithOriginalVoucher] = useState<
    number | undefined
  >();
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [listBank, setListBank] = useState<any[]>([]);
  const [subject, setSubject] = useState<string | undefined>();
  const [supplier, setSupplier] = useState<string | undefined>();
  const [supplierName, setSupplierName] = useState<string | undefined>();
  const [employee, setEmployee] = useState<string | undefined>();
  const [recipient, setRecipient] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [reason, setReason] = useState<string | undefined>();
  const [employeeByType, setEmployeeByType] = useState<string | undefined>();
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [listGroupOfPurchasedGoods, setListGroupOfPurchasedGoods] = useState<
    GroupOfPurchasedGoodsType[]
  >([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoice = urlParams.get("invoice");
    if (invoice) {
      getDataInvoice(invoice);
    }
  }, []);

  const getDataInvoice = async (id: string | null) => {
    const invoice = await getInvoice(id);
    setSupplierName(invoice?.partner_name || undefined);
    try {
      const response = await fetch(
        `https://cms-phong.teknix.dev/assets/${invoice?.file}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch XML: ${response.statusText}`);
      }
      setBackTo("/invoice");
      setCashPaymentVoucherType(
        OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE.value
      );
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDataInvoice = parser.parseFromString(text, "application/xml");

      const xmlTTChung = xmlDataInvoice.getElementsByTagName("TTChung");
      // const xmlKHMSHDon = xmlTTChung[0].getElementsByTagName("KHMSHDon");
      const xmlSHDon = xmlTTChung[0].getElementsByTagName("SHDon");
      const xmlNLap = xmlTTChung[0].getElementsByTagName("NLap");
      // const xmlKHHDon = xmlTTChung[0].getElementsByTagName("KHHDon");
      // setInvoiceForm(xmlKHMSHDon[0]?.textContent || undefined);
      // setInvoiceNumber(xmlSHDon[0]?.textContent || undefined);
      // setInvoiceDate(xmlNLap[0]?.textContent || undefined);
      // setInvoiceSign(xmlKHHDon[0]?.textContent || undefined);

      const xmlNDHDon = xmlDataInvoice.getElementsByTagName("NDHDon");

      const xmlNBan = xmlNDHDon[0].getElementsByTagName("NBan");
      const xmlTen = xmlNBan[0].getElementsByTagName("Ten");
      const xmlMST = xmlNBan[0].getElementsByTagName("MST");
      const xmlDChi = xmlNBan[0].getElementsByTagName("DChi");
      setSupplierName(xmlTen[0]?.textContent || undefined);
      // setSupplierTaxCode(xmlMST[0]?.textContent || undefined);
      setAddress(xmlDChi[0]?.textContent || undefined);

      const xmlDSHHDVu = xmlNDHDon[0].getElementsByTagName("DSHHDVu");
      const xmlHHDVu = xmlDSHHDVu[0].getElementsByTagName("HHDVu");
      const goods: any[] = [];
      setReason(
        `Chi tiền cho ${xmlTen[0]?.textContent || ""} theo hóa đơn ${xmlSHDon[0]?.textContent || ""
        }`
      );
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
          description: thhdvu,
          amount: Number(thtien),
          vat_rate: tsuat,
          vat_description: "Thuế GTGT - " + thhdvu,
          with_invoice: true,
          invoice_date: xmlNLap[0]?.textContent || undefined,
          invoice_number: xmlSHDon[0]?.textContent || undefined,
          supplier_name: xmlTen[0]?.textContent || undefined,
          supplier_tax_code: xmlMST[0]?.textContent || undefined,
        });
      }
      setItemsOfAccounting(goods);
    } catch (error) {
      console.error("Error fetching XML:", error);
      return null;
    }
  };

  useEffect(() => {
    if (itemsOfAccounting.length === 0) {
      setItemsOfAccounting([{ id: uuidv4() }]);
    }
    getListPartner();
    getListEmployee();
    getListBank();
    generateVoucherNumber();
    if (!postedDate) {
      setPostedDate(getCurrentDate());
    }
    if (!voucherDate) {
      setVoucherDate(getCurrentDate());
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const dataListChartOfAccounts = await fetchListChartOfAccounts();
    setListChartOfAccounts(dataListChartOfAccounts);
    const dataListVatTax = await fetchListVatTax();
    setListVatTax(dataListVatTax);
    const dataListGroupOfPurchasedGoods =
      await fetchListGroupOfPurchasedGoods();
    setListGroupOfPurchasedGoods(dataListGroupOfPurchasedGoods);
  };

  const getListPartner = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListPartner(response?.data?.data || []);
    } catch (error) { }
  };

  const getListEmployee = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListEmployee(response?.data?.data || []);
    } catch (error) { }
  };

  const getListBank = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/bank",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListBank(response?.data?.data || []);
    } catch (error) { }
  };

  const handleConfirmClose = async () => { };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cash_payment",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("PC00001");
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
          `PC${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItemsOdAccounting = () => {
    setItemsOfAccounting([...itemsOfAccounting, { id: uuidv4() }]);
  };

  const handleChangeItemsOfAccounting = (item: any, index: number) => {
    setItemsOfAccounting((prev: any) => {
      const list = prev;
      list[index] = item;
      let total = 0;
      list.forEach((itemPrev: any) => {
        let amount = itemPrev?.amount || 0;
        total +=
          amount +
          customRound(
            (amount *
              (listVatTax.find(
                (itemVatTax: VatTaxType) => itemVatTax?.id === itemPrev?.vat
              )?.percent || 0)) /
            100
          );
      });
      setTotalAmount(total);
      return [...list];
    });
  };

  const handleSave = async () => {
    const data: any = {};
    data.cash_payment_voucher_type = cashPaymentVoucherType;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.voucher_number = voucherNumber;
    data.with_original_voucher = withOriginalVoucher;
    data.address = address;
    data.reason = reason;
    data.recipient = recipient;
    data.supplier_name = supplierName;
    if (
      cashPaymentVoucherType ===
      OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER.value
    ) {
      data.supplier = supplier;
      data.employee_by_type = employeeByType;
    }
    if (
      cashPaymentVoucherType ===
      OPTION_CASH_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE.value
    ) {
      data.employee = employee;
    }
    if (
      cashPaymentVoucherType ===
      OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE.value
    ) {
      data.subject = subject;
    }
    if (
      cashPaymentVoucherType === OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value
    ) {
      data.subject = subject;
      data.employee_by_type = employeeByType;
    }
    if (
      cashPaymentVoucherType ===
      OPTION_CASH_PAYMENT_VOUCHER_TYPE.DEPOSIT_TO_BANK_ACCOUNT.value
    ) {
      data.subject = subject;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cash_payment",
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cash_payment_voucher_item",
          itemsOfAccounting.map((item) => {
            return { ...item, id: undefined, cash_payment_voucher: id };
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

  const handleDeleteItemsOfAccounting = (id: string) => {
    setItemsOfAccounting((prev: any[]) => {
      const list = prev.filter((item) => item?.id !== id);
      let total = 0;
      list.forEach((itemPrev: any) => {
        total += itemPrev?.amount || 0;
      });
      setTotalAmount(total);
      return list;
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <AiOutlineReload
            className="text-2xl cursor-pointer"
            onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-medium">Phiếu chi {voucherNumber}</p>
          <div className="h-9 w-[340px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={cashPaymentVoucherType}
              onChange={(value) => setCashPaymentVoucherType(value)}
              options={Object.keys(OPTION_CASH_PAYMENT_VOUCHER_TYPE).map(
                (key, idx: number) => ({
                  label: `${idx + 1}. ${OPTION_CASH_PAYMENT_VOUCHER_TYPE[
                    key as keyof typeof OPTION_CASH_PAYMENT_VOUCHER_TYPE
                  ].translate.vi
                    }`,
                  value:
                    OPTION_CASH_PAYMENT_VOUCHER_TYPE[
                      key as keyof typeof OPTION_CASH_PAYMENT_VOUCHER_TYPE
                    ].value,
                })
              )}
              labelRender={({ label }: any) => (
                <p className="font-medium">{label}</p>
              )}
              optionRender={({ label }: any) => (
                <div className="py-1.5 px-4 font-medium">
                  <p className="font-medium text-[14.5px]">{label}</p>
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
          <div className="flex justify-between w-full">
            <div className="flex flex-grow-1 items-start">
              <div className="grid grid-cols-7 items-start gap-4 pr-6 w-full max-w-[800px]">
                {cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value && (
                    <div className="col-span-3">
                      <p className="font-medium">Nhà cung cấp</p>
                      <div className="h-10 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={supplier}
                          onChange={(id) => setSupplier(id)}
                          options={listPartner
                            .filter((item: any) => item?.type === "customer")
                            .map((item: any) => ({
                              label: `${item?.code || ""} | ${item?.name || ""}`,
                              value: item.id,
                            }))}
                        />
                      </div>
                    </div>
                  )}
                {cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE
                    .value && (
                    <div className="col-span-3">
                      <p className="font-medium">Nhân viên</p>
                      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                        <InputEmployee
                          list={listEmployee}
                          fieldDisplay="name"
                          value={employee}
                          onChange={(value: EmployeeType) =>
                            setEmployee(value?.id || undefined)
                          }
                        />
                      </div>
                    </div>
                  )}
                {(cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.DEPOSIT_TO_BANK_ACCOUNT
                    .value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
                    .value) && (
                    <div className="col-span-3">
                      <p className="font-medium">Đối tượng</p>
                      <div className="h-10 w-full outline-none border rounded-md">
                        <InputSubject
                          list={listPartner}
                          fieldDisplay="code"
                          value={subject}
                          onChange={(value: SubjectType) =>
                            setSubject(value?.id || undefined)
                          }
                        />
                      </div>
                    </div>
                  )}
                <div className="col-span-4">
                  <p className="font-medium">Người nhận</p>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                <div className="col-span-7">
                  <p className="font-medium">Địa chỉ</p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                <div className="col-span-7">
                  <p className="font-medium">Lý do chi</p>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                {(cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value) && (
                    <div className="col-span-4">
                      <p className="font-medium">Nhân viên</p>
                      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                        <InputEmployee
                          list={listEmployee}
                          fieldDisplay="name"
                          value={employeeByType}
                          onChange={(value: EmployeeType) =>
                            setEmployeeByType(value?.id || undefined)
                          }
                        />
                      </div>
                    </div>
                  )}
                <div className="col-span-3">
                  <p className="font-medium">Kèm theo</p>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={withOriginalVoucher}
                      onChange={(e) =>
                        setWithOriginalVoucher(Number(e.target.value))
                      }
                      className="w-full h-10 px-2 outline-none border rounded-md text-right"
                    />
                    <p className="whitespace-nowrap">chứng từ gốc</p>
                  </div>
                </div>
              </div>
              <div className="border-l border-neutral-300 pl-6 flex flex-col gap-4">
                <InputDate
                  title="Ngày hạch toán"
                  value={postedDate}
                  onChange={(value: string) => setPostedDate(value)}
                />
                <InputDate
                  title="Ngày phiếu chi"
                  value={voucherDate}
                  onChange={(value: string) => setVoucherDate(value)}
                />
                <div>
                  <p className="font-medium">Số phiếu chi</p>
                  <input
                    type="text"
                    value={voucherNumber}
                    onChange={(e) => setVoucherNumber(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-right">Tổng tiền</p>
              <p className="text-4xl font-bold text-right">
                {totalAmount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <div className="w-full">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Hạch toán",
                  active: true,
                  children: (
                    <CashPaymentAccountEntries
                      cashPaymentVoucherType={cashPaymentVoucherType}
                      itemsOfAccounting={itemsOfAccounting}
                      handleChangeItemsOfAccounting={
                        handleChangeItemsOfAccounting
                      }
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listPartner={listPartner}
                      listBank={listBank}
                      listVatTax={listVatTax}
                      listChartOfAccounts={listChartOfAccounts}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Kê khai hóa đơn và hạch toán thuế",
                  active:
                    cashPaymentVoucherType ===
                      OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
                        .value
                      ? true
                      : false,
                  children: (
                    <CashPaymentRegisterInvoiceAndRecordTax
                      cashPaymentVoucherType={cashPaymentVoucherType}
                      itemsOfAccounting={itemsOfAccounting}
                      handleChangeItemsOfAccounting={
                        handleChangeItemsOfAccounting
                      }
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listPartner={listPartner}
                      listBank={listBank}
                      listVatTax={listVatTax}
                      listChartOfAccounts={listChartOfAccounts}
                      listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                    />
                  ),
                },
              ].filter((item: any) => item?.active === true)}
            />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div>
              <Button
                type="primary"
                onClick={() => handleAddItemsOdAccounting()}
              >
                Thêm dòng
              </Button>
            </div>
            <div>
              <div>
                <div className=" flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <MdOutlineAttachFile className="text-xl" />
                    <p className="font-medium">Đính kèm</p>
                    <p className="italic text-gray-500">
                      Dung lượng tối đa 5MB
                    </p>
                  </div>
                  <div className="mt-2 p-4 rounded-md border border-gray-400">
                    <span className="whitespace-nowrap italic text-gray-500">
                      Kéo/thả tệp vào đây hoặc bấm vào đây
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title={
            <div className="flex items-center gap-2.5">
              <IoWarningOutline className="text-5xl text-yellow-500" />
              <p className="text-2xl font-semibold">Đóng nhập kho</p>
            </div>
          }
          open={openModalConfirmClose}
          onOk={handleConfirmClose}
          onCancel={() => setOpenModalConfirmClose(false)}
          centered
        >
          <p className="text-base font-medium">
            Bạn có chắc chắn muốn đóng nhạp kho?
          </p>
        </Modal>
      </div>
      <div className="flex justify-between items-center p-3 bg-cyan-100">
        <Link href="/inventory">Huỷ</Link>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </div>
    </div>
  );
}
