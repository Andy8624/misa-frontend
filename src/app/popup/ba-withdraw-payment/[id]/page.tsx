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
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE,
  OPTION_TAB_CASH,
} from "@/constants/constants";
import {
  fetchListBankAccount,
  fetchListChartOfAccounts,
  fetchListEmployee,
  fetchListGroupOfPurchasedGoods,
  fetchListPartner,
  fetchListVatTax,
} from "@/utils/fetchData";
import {
  BankAccountType,
  ChartOfAccountsType,
  EmployeeType,
  GroupOfPurchasedGoodsType,
  PartnerType,
  SubjectBankAccountType,
  VatTaxType,
} from "@types";
import { InputPaymentAccount } from "@/components/input-payment-account";
import { InputSupplier } from "@/components/input-supplier";
import { InputSubject } from "@/components/input-subject";
import { InputEmployee } from "@/components/input-employee";
import { InputSubjectBankAccount } from "@/components/input-subject-bank-account";
import { InputDate } from "@/components/input-date";
import { useParams } from "next/navigation";
import { BAWithdrawPaymentAccountEntriesRead } from "@/components/ba-withdraw-payment-account-entries-read";
import { customRound } from "@/utils/customRound";
import { BAWithdrawPaymentRegisterInvoiceAndRecordTax } from "@/components/ba-withdraw-payment-register-invoice-and-record-tax";
import { BAWithdrawPaymentRegisterInvoiceAndRecordTaxRead } from "@/components/ba-withdraw-payment-register-invoice-and-record-tax-read";

export default function BAWithdraw() {
  const { id } = useParams();
  const [openPopoverListSupplier, setOpenPopoverListSupplier] = useState(false);
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const { setIsLoading } = useContext(ColorModeContext);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER.value
  );
  const [voucherNumber, setVoucherNumber] = useState<string>("UNC00001");
  const [openModalConfirmClose, setOpenModalConfirmClose] =
    useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<string>(
    OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.OTHERS.value
  );
  const [listPartner, setListPartner] = useState<PartnerType[]>([]);
  const [listEmployee, setListEmployee] = useState<EmployeeType[]>([]);
  const [listAccount, setListAccount] = useState<BankAccountType[]>([]);
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [subject, setSubject] = useState<string | undefined>();
  const [employee, setEmployee] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [paymentBankName, setPaymentBankName] = useState<string | undefined>();
  const [listBankAccount, setListBankAccount] = useState<any[]>([]);
  const [listLoanAgreement, setListLoanAgreement] = useState<any[]>([]);
  const [title, setTitle] = useState(
    OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER.translate.vi
  );
  const [paymentAccount, setPaymentAccount] = useState<string | undefined>();
  const [supplier, setSupplier] = useState<string | undefined>();
  const [listChartOfAccounts, setListChartOfAccounts] = useState<
    ChartOfAccountsType[]
  >([]);
  const [listSubjectBankAccount, setListSubjectBankAccount] = useState<
    SubjectBankAccountType[]
  >([]);
  const [recipientAccount, setRecipientAccount] = useState<
    string | undefined
  >();
  const [recipientBankName, setRecipientBankName] = useState<
    string | undefined
  >();
  const [description, setDescription] = useState<string | undefined>();
  const [employeeByType, setEmployeeByType] = useState<string | undefined>();
  const [idCardNo, setIdCardNo] = useState<string | undefined>();
  const [issuedDate, setIssuedDate] = useState<string | undefined>();
  const [issuedBy, setIssuedBy] = useState<string | undefined>();
  const [supplierName, setSupplierName] = useState<string | undefined>();
  const [listVatTax, setListVatTax] = useState<VatTaxType[]>([]);
  const [listGroupOfPurchasedGoods, setListGroupOfPurchasedGoods] = useState<
    GroupOfPurchasedGoodsType[]
  >([]);

  useEffect(() => {
    fetchData();
    getListAccount();
    getListLoanAgreement();
    // generateVoucherNumber();
    getBAWithdrawPayment();
    getListBankPaymentItems();
  }, []);

  const getBAWithdrawPayment = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment/" + id,
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
        const voucherIssuedDate = data?.issued_date
          ? new Date(data?.issued_date)
          : undefined;
        setAddress(data?.address || undefined);
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
        setIssuedDate(
          voucherIssuedDate
            ? `${voucherIssuedDate.getFullYear()}-${voucherIssuedDate.getMonth() + 1 < 10
              ? "0" + (voucherIssuedDate.getMonth() + 1)
              : voucherIssuedDate.getMonth() + 1
            }-${voucherIssuedDate.getDate() < 10
              ? "0" + voucherIssuedDate.getDate()
              : voucherIssuedDate.getDate()
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
        setSubject(data?.subject || undefined);
        setEmployee(data?.employee || undefined);
        setPaymentAccount(data?.payment_account || undefined);
        setPaymentBankName(data?.payment_bank_name || undefined);
        setRecipientAccount(data?.recipient_account || undefined);
        setRecipientBankName(data?.recipient_bank_name || undefined);
        setDescription(data?.description || undefined);
        setEmployeeByType(data?.employee_by_type || undefined);
        setSupplier(data?.supplier || undefined);
        setIdCardNo(data?.idCardNo || undefined);
        setIssuedBy(data?.issued_by || undefined);
        setPaymentType(data?.payment_type || undefined);
      }
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
    const dataListVatTax = await fetchListVatTax();
    setListVatTax(dataListVatTax);
    const dataListGroupOfPurchasedGoods =
      await fetchListGroupOfPurchasedGoods();
    setListGroupOfPurchasedGoods(dataListGroupOfPurchasedGoods);
  };

  const getListBankPaymentItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment_item",
        {
          params: {
            filter: { ba_withdraw_payment: { _eq: id } },
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

  const getListLoanAgreement = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/loan_agreement",
        {
          params: {
            fields: ["*", "lender.name"],
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListLoanAgreement(response?.data?.data || []);
    } catch (error) { }
  };

  const handleConfirmClose = async () => { };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("UNC00001");
      } else {
        const voucherNumbers = list.map(
          (voucher: any) => voucher.voucher_number
        );
        const maxVoucherNumber = Math.max(
          ...voucherNumbers.map((voucher: any) => {
            const numberPart = voucher.slice(4);
            return parseInt(numberPart, 10);
          })
        );
        setVoucherNumber(
          `UNC${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
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
        total += itemPrev?.amount || 0;
      });
      setTotalAmount(total);
      return [...list];
    });
  };

  const handleSave = async () => {
    const data: any = {};
    data.payment_type = paymentType;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.voucher_number = voucherNumber;
    data.address = address;
    data.description = description;
    data.payment_method = paymentMethod;
    data.payment_account = paymentAccount;
    data.payment_bank_name = paymentBankName;
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER.value
    ) {
      data.supplier = supplier;
      data.employee_by_type = employeeByType;
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
        .value ||
      paymentType === OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.OTHERS.value
    ) {
      data.subject = subject;
      data.employee_by_type = employeeByType;
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_BORROWINGS.value
    ) {
      data.subject = subject;
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE.value
    ) {
      data.employee = employee;
    }
    if (
      paymentMethod ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.CHEQUE.value ||
      paymentMethod ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER.value
    ) {
      data.recipient_account = recipientAccount;
      data.recipient_bank_name = recipientBankName;
    }
    if (
      paymentMethod ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.COUNTER_CHEQUE.value
    ) {
      data.id_card_no = idCardNo;
      data.issued_date = issuedDate;
      data.issued_by = issuedBy;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment",
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment_item",
          itemsOfAccounting.map((item) => {
            return { ...item, id: undefined, ba_withdraw_payment: id };
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

  useEffect(() => {
    if (paymentType === OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.OTHERS.value) {
      setDescription("Chi tiền cho");
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER.value
    ) {
      setDescription("Trả tiền nhà cung cấp");
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_BORROWINGS.value
    ) {
      setDescription("Trả các khoản vay cho");
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE.value
    ) {
      setDescription("Tạm ứng cho nhân viên");
    }
    if (
      paymentType ===
      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE.value
    ) {
      setDescription("Chi mua ngoài có hóa đơn cho ");
    }
  }, [paymentType]);

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

  const handleChangePaymentMethod = (value: string) => {
    setPaymentMethod(value);
    const key = Object.keys(OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD).find(
      (key: string) =>
        OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD[
          key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD
        ].value === value
    );
    setTitle(
      key
        ? OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD[
          key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD
        ].translate.vi
        : ""
    );
  };

  const handleSelectPaymentAccount = (account: BankAccountType) => {
    setPaymentAccount(account.id);
    setPaymentBankName(account?.bank?.full_name || undefined);
  };

  const handleSelectSupplier = (value: PartnerType) => {
    setSupplier(value?.id || undefined);
    setAddress(value?.address || undefined);
    setListSubjectBankAccount(value?.bank_account || []);
  };

  const handleSelectSubject = (value: PartnerType) => {
    setSubject(value?.id || undefined);
    setAddress(value?.address || undefined);
    setListSubjectBankAccount(value?.bank_account || []);
  };

  const handleSelectEmployee = (value: EmployeeType) => {
    setEmployee(value?.id || undefined);
    setAddress(value?.address || undefined);
    setListSubjectBankAccount(value?.bank_account || []);
  };

  const handleSelectSubjectBankAccount = (value: SubjectBankAccountType) => {
    setRecipientAccount(value.id);
    setRecipientBankName(value.bank_name);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <AiOutlineReload
            className="text-2xl cursor-pointer"
          // onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-semibold">
            {title} {voucherNumber}
          </p>
          <div className="h-9 w-[370px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={paymentType}
              // onChange={(value) => setPaymentType(value)}
              options={Object.keys(OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE).map(
                (key, idx: number) => ({
                  label: `${idx + 1}. ${OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE[
                    key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE
                  ].translate.vi
                    }`,
                  value:
                    OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE[
                      key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE
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
          <div className="flex items-center gap-2.5 ml-5">
            <p>Phương thức thanh toán</p>
            <div className="h-9 w-[200px] border rounded overflow-hidden border-neutral-300">
              <Select
                style={{ width: "100%", height: "100%" }}
                variant="borderless"
                value={paymentMethod}
                // onChange={handleChangePaymentMethod}
                options={Object.keys(
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD
                ).map((key) => ({
                  label: `${OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD[
                    key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD
                  ].translate.vi
                    }`,
                  value:
                    OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD[
                      key as keyof typeof OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD
                    ].value,
                }))}
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
        </div>
        <div>
          <Link
            href={`/ba-deposit?tab=${OPTION_TAB_CASH.CASH_PAYMENT}`}
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
                <div className="col-span-3">
                  <InputPaymentAccount
                    title="Tài khoản chi"
                    list={listBankAccount}
                    value={paymentAccount}
                  // onChange={handleSelectPaymentAccount}
                  />
                </div>
                <div className="col-span-4">
                  <p className="font-medium opacity-0">Tên ngân hàng</p>
                  <input
                    type="text"
                    value={paymentBankName}
                    // onChange={(e) => setPaymentBankName(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                {paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value && (
                    <div className="col-span-3">
                      <p className="font-semibold">Mã nhà cung cấp</p>
                      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                        <InputSupplier
                          fieldDisplay="code"
                          list={listPartner}
                          value={supplier}
                        // onChange={handleSelectSupplier}
                        />
                      </div>
                    </div>
                  )}
                {paymentType !==
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value &&
                  paymentType !==
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE
                    .value && (
                    <div className="col-span-3">
                      <p className="font-medium">Đối tượng</p>
                      <div className="w-full h-10 outline-none border rounded-md overflow-hidden">
                        <InputSubject
                          list={listPartner.map((item: PartnerType) => ({
                            id: item?.id || "",
                            code: item?.code || "",
                            name: item?.name || "",
                            tax_code: item?.tax_code || "",
                            address: item?.address || "",
                            tel: item?.phone_number,
                          }))}
                          // onChange={handleSelectSubject}
                          value={subject}
                          fieldDisplay="name"
                        />
                      </div>
                    </div>
                  )}
                {paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.ADVANCE_TO_EMPLOYEE
                    .value && (
                    <div className="col-span-3">
                      <p className="font-medium">Nhân viên</p>
                      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                        <InputEmployee
                          list={listEmployee}
                          // onChange={handleSelectEmployee}
                          fieldDisplay="name"
                          value={employee}
                        />
                      </div>
                    </div>
                  )}
                {paymentMethod !==
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.COUNTER_CHEQUE
                    .value && (
                    <>
                      <div className="col-span-4">
                        <p className="font-medium">Địa chỉ</p>
                        <input
                          type="text"
                          value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                          className="w-full h-10 px-2 outline-none border rounded-md"
                        />
                      </div>
                      <div className="col-span-3">
                        <InputSubjectBankAccount
                          list={listSubjectBankAccount}
                          // onChange={handleSelectSubjectBankAccount}
                          title="Tài khoản nhận"
                          value={recipientAccount}
                        />
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium opacity-0">Tên ngân hàng</p>
                        <input
                          type="text"
                          value={recipientBankName}
                          // onChange={(e) => setRecipientBankName(e.target.value)}
                          className="w-full h-10 px-2 outline-none border rounded-md"
                        />
                      </div>
                    </>
                  )}
                {paymentMethod ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.COUNTER_CHEQUE
                    .value && (
                    <>
                      <div className="col-span-4">
                        <p className="font-medium">Người lĩnh tiền</p>
                        <input
                          type="text"
                          className="w-full h-9 px-2 outline-none border rounded-md"
                        />
                      </div>
                      <div className="col-span-7 grid grid-cols-10 gap-4">
                        <div className="col-span-4">
                          <p className="font-medium">Số CMND</p>
                          <input
                            type="text"
                            value={idCardNo}
                            // onChange={(e) => setIdCardNo(e.target.value)}
                            className="w-full h-10 px-2 outline-none border rounded-md"
                          />
                        </div>
                        <div className="col-span-3">
                          <InputDate
                            title="Ngày cấp"
                            value={issuedDate}
                          // onChange={(value: string) => setIssuedDate(value)}
                          />
                        </div>
                        <div className="col-span-3">
                          <p className="font-medium">Nơi cấp</p>
                          <input
                            type="text"
                            value={issuedBy}
                            // onChange={(e) => setIssuedBy(e.target.value)}
                            className="w-full h-9 px-2 outline-none border rounded-md"
                          />
                        </div>
                      </div>
                    </>
                  )}
                <div className="col-span-7">
                  <p className="font-medium">Nội dung thanh toán</p>
                  <input
                    type="text"
                    value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-10 px-2 outline-none border rounded-md"
                  />
                </div>
                {(paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SUPPLIER
                    .value ||
                  paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE
                    .PAYMENT_TO_SERVICE_INVOICE.value ||
                  paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.OTHERS.value) && (
                    <div className="col-span-3">
                      <p className="font-medium">Nhân viên</p>
                      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
                        <InputEmployee
                          list={listEmployee}
                          // onChange={(value: EmployeeType) =>
                          //   setEmployeeByType(value?.id || undefined)
                          // }
                          fieldDisplay="name"
                          value={employeeByType}
                        />
                      </div>
                    </div>
                  )}
              </div>
              <div className="border-l border-neutral-300 pl-6 flex flex-col gap-4">
                <div>
                  <InputDate
                    title="Ngày hạch toán"
                    value={postedDate}
                  // onChange={(value: string) => setPostedDate(value)}
                  />
                </div>
                <div>
                  <InputDate
                    title="Ngày chứng từ"
                    // onChange={(value: string) => setVoucherDate(value)}
                    value={voucherDate}
                  />
                </div>
                <div>
                  <p className="font-medium">Số chứng từ</p>
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
              <p className="text-4xl font-semibold text-right">
                {totalAmount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Hạch toán",
                  active: true,
                  children: (
                    <BAWithdrawPaymentAccountEntriesRead
                      paymentType={paymentType}
                      itemsOfAccounting={itemsOfAccounting}
                      listAccount={listAccount}
                      handleChangeItemsOfAccounting={
                        handleChangeItemsOfAccounting
                      }
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listPartner={listPartner}
                      listLoanAgreement={listLoanAgreement}
                      listChartOfAccounts={listChartOfAccounts}
                      paymentMethod={paymentMethod}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Kê khai hóa đơn và hạch toán thuế",
                  active:
                    paymentType ===
                      OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE
                        .PAYMENT_TO_SERVICE_INVOICE.value
                      ? true
                      : false,
                  children: (
                    <BAWithdrawPaymentRegisterInvoiceAndRecordTaxRead
                      itemsOfAccounting={itemsOfAccounting}
                      handleChangeItemsOfAccounting={
                        handleChangeItemsOfAccounting
                      }
                      handleDeleteItemsOfAccounting={
                        handleDeleteItemsOfAccounting
                      }
                      listPartner={listPartner}
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
            <div></div>
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
