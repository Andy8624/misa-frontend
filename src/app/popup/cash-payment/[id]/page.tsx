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
import { useParams } from "next/navigation";
import { CashPaymentAccountEntriesRead } from "@/components/cash-payment-account-entries-read";
import {
  ChartOfAccountsType,
  GroupOfPurchasedGoodsType,
  VatTaxType,
} from "@types";
import {
  fetchListChartOfAccounts,
  fetchListGroupOfPurchasedGoods,
  fetchListVatTax,
} from "@/utils/fetchData";
import { CashPaymentRegisterInvoiceAndRecordTax } from "@/components/cash-payment-register-invoice-and-record-tax";
import { CashPaymentRegisterInvoiceAndRecordTaxRead } from "@/components/cash-payment-register-invoice-and-record-tax-read";
import { customRound } from "@/utils/customRound";

export default function ShowCashReceipt() {
  const { id } = useParams();
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const { setIsLoading } = useContext(ColorModeContext);
  const [voucherNumber, setVoucherNumber] = useState<string>("PC00001");
  const [openModalConfirmClose, setOpenModalConfirmClose] =
    useState<boolean>(false);
  const [cashPaymentVoucherType, setCashPaymentVoucherType] = useState<string>(
    OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value
  );
  const [listPartner, setListPartner] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listAccount, setListAccount] = useState<any[]>([]);
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
  const [employee, setEmployee] = useState<string | undefined>();
  const [recipient, setRecipient] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [reason, setReason] = useState<string | undefined>();
  const [employeeByType, setEmployeeByType] = useState<string | undefined>();
  const [supplierName, setSupplierName] = useState<string | undefined>();
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [listGroupOfPurchasedGoods, setListGroupOfPurchasedGoods] = useState<
    GroupOfPurchasedGoodsType[]
  >([]);

  useEffect(() => {
    getListPartner();
    getListEmployee();
    getListAccount();
    getListBank();
    // generateVoucherNumber();
    getListCashPayment();
    getListCashReceiptItems();
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

  const getListCashPayment = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cash_payment/" + id,
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
        setCashPaymentVoucherType(data?.cash_payment_voucher_type || undefined);
        setAddress(data?.address || undefined);
        setVoucherNumber(data?.voucher_number || undefined);
        setWithOriginalVoucher(
          data?.with_original_voucher === 0
            ? 0
            : data?.with_original_voucher || undefined
        );
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
        setSupplier(data?.supplier || undefined);
        setReason(data?.reason || undefined);
        setSubject(data?.subject || undefined);
        setRecipient(data?.recipient || undefined);
        setEmployee(data?.employee || undefined);
        setEmployeeByType(data?.employee_by_type || undefined);
        setSupplierName(data?.supplier_name || undefined);
      }
    } catch (error) { }
  };

  const getListCashReceiptItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cash_payment_voucher_item",
        {
          params: {
            filter: { cash_payment_voucher: { _eq: id } },
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      setItemsOfAccounting(list);
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
    } catch (error) { }
  };

  useEffect(() => {
    if (listVatTax.length > 0 && itemsOfAccounting.length > 0) {
      let total = 0;
      itemsOfAccounting.forEach((itemPrev: any) => {
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
    }
  }, [itemsOfAccounting, listVatTax]);

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

  const getListAccount = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/account_main_system",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListAccount(response?.data?.data || []);
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
          // onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-medium">Phiếu chi {voucherNumber}</p>
          <div className="h-9 w-[340px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={cashPaymentVoucherType}
              // onChange={(value) => setCashPaymentVoucherType(value)}
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
          <Link
            href={`/cash?tab=${OPTION_TAB_CASH.CASH_PAYMENT}`}
            ref={linkBackRef}
          >
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
                          // onChange={(id) => setSupplier(id)}
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
                      <div className="h-10 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={employee}
                          // onChange={(id) => setEmployee(id)}
                          options={listEmployee.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
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
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={subject}
                          // onChange={(id) => setSubject(id)}
                          options={listPartner.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
                        />
                      </div>
                    </div>
                  )}
                <div className="col-span-4">
                  <p className="font-medium">Người nhận</p>
                  <input
                    type="text"
                    value={recipient}
                    // onChange={(e) => setRecipient(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div className="col-span-7">
                  <p className="font-medium">Địa chỉ</p>
                  <input
                    type="text"
                    value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div className="col-span-7">
                  <p className="font-medium">Lý do chi</p>
                  <input
                    type="text"
                    value={reason}
                    // onChange={(e) => setReason(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                {(cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value) && (
                    <div className="col-span-4">
                      <p className="font-medium">Nhân viên</p>
                      <div className="h-10 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={employeeByType}
                          // onChange={(id) => setEmployeeByType(id)}
                          options={listEmployee.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
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
                      // onChange={(e) =>
                      //   setWithOriginalVoucher(Number(e.target.value))
                      // }
                      className="w-full h-9 px-2 outline-none border rounded-md text-right"
                    />
                    <p className="whitespace-nowrap">chứng từ gốc</p>
                  </div>
                </div>
              </div>
              <div className="border-l border-neutral-300 pl-6 flex flex-col gap-4">
                <div>
                  <p className="font-medium">Ngày hạch toán</p>
                  <input
                    type="date"
                    value={postedDate}
                    // onChange={(e) => setPostedDate(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">Ngày phiếu chi</p>
                  <input
                    type="date"
                    value={voucherDate}
                    // onChange={(e) => setVoucherDate(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">Số phiếu chi</p>
                  <input
                    type="text"
                    value={voucherNumber}
                    // onChange={(e) => setVoucherNumber(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
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
                    <CashPaymentAccountEntriesRead
                      cashPaymentVoucherType={cashPaymentVoucherType}
                      itemsOfAccounting={itemsOfAccounting}
                      listAccount={listAccount}
                      handleChangeItemsOfAccounting={
                        handleChangeItemsOfAccounting
                      }
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listPartner={listPartner}
                      listBank={listBank}
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
                    <CashPaymentRegisterInvoiceAndRecordTaxRead
                      cashPaymentVoucherType={cashPaymentVoucherType}
                      itemsOfAccounting={itemsOfAccounting}
                      listAccount={listAccount}
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
              {/* <Button
                type="primary"
                onClick={() => handleAddItemsOdAccounting()}
              >
                Thêm dòng
              </Button> */}
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
    </div>
  );
}
