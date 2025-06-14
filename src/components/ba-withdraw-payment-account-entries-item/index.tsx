import {
  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE,
} from "@/constants/constants";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputLoanAgreement } from "@/components/input-loan-agreement";
import { InputNumber } from "@/components/input-number";
import { InputSubject } from "@/components/input-subject";
import { InputText } from "@/components/input-text";
import {
  ChartOfAccountsType,
  LoanAgreementType,
  PartnerType,
  SubjectType,
  VatTaxType,
} from "@/types";
import { Button } from "antd";
import { useEffect, useState } from "react";

export const BAWithdrawPaymentAccountEntriesItem: React.FC<{
  index: number;
  item: any;
  handleChangeItemsOfAccounting: any;
  paymentType: string;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listLoanAgreement: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  paymentMethod: string;
  listVatTax: VatTaxType[]
}> = ({
  index,
  item,
  handleChangeItemsOfAccounting,
  paymentType,
  handleDeleteItemsOfAccounting,
  listPartner,
  listLoanAgreement,
  listChartOfAccounts,
  paymentMethod,
  listVatTax
}) => {
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [subject, setSubject] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>(
      item?.description || undefined
    );
    const [amount, setAmount] = useState<number | undefined>(item?.amount || 0);
    const [loanAgreement, setLoanAgreement] = useState<string | undefined>();

    useEffect(() => {
      handleChangeItemsOfAccounting(
        {
          ...item,
          id: item.id,
          description,
          debit_account: debitAccount,
          credit_account: creditAccount,
          amount,
          subject,
          loan_agreement: loanAgreement,
        },
        index
      );
    }, [
      description,
      debitAccount,
      creditAccount,
      amount,
      subject,
      loanAgreement,
    ]);

    useEffect(() => {
      if (!item?.description) {
        if (
          paymentType === OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.OTHERS.value
        ) {
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
      }
    }, [paymentType]);

    useEffect(() => {
      if (item?.vat_rate && listVatTax.length > 0) {
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) =>
            itemVatTax?.percent === Number(item.vat_rate.replace("%", ""))
        );
        handleChangeItemsOfAccounting(
          {
            ...item,
            vat_rate: undefined,
            vat: vat?.id || undefined
          },
          index
        );
      }
    }, [item?.vat_rate, listVatTax]);

    return (
      <tr className="bg-neutral-50 border-t border-neutral-200">
        <td className="px-6 py-2">{index + 1}</td>
        <td className="px-6 py-2 min-w-[400px]">
          {/* Diễn giải */}
          <InputText
            value={description}
            onChange={(value: string) => setDescription(value)}
          />
        </td>
        <td className="px-6 py-2 min-w-[170px]">
          {/* TK Nợ	 */}
          <InputChartOfAccounts
            list={listChartOfAccounts}
            onChange={(acc: ChartOfAccountsType) =>
              setDebitAccount(acc?.id || undefined)
            }
            value={debitAccount}
          />
        </td>
        <td className="px-6 py-2 min-w-[170px]">
          {/* TK Có	 */}
          <InputChartOfAccounts
            list={listChartOfAccounts}
            onChange={(acc: ChartOfAccountsType) =>
              setCreditAccount(acc?.id || undefined)
            }
            value={creditAccount}
          />
        </td>
        <td className="px-6 py-2 min-w-[200px]">
          {/* Số tiền	 */}
          <InputNumber
            value={amount}
            onChange={(value: number) => setAmount(value)}
          />
        </td>
        {(paymentType === OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
          paymentType ===
          OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
            .value) && (
            <>
              <td className="px-6 py-2 min-w-[200px]">
                {/* Đối tượng	 */}
                <InputSubject
                  list={listPartner.map((item: PartnerType) => ({
                    id: item?.id || "",
                    code: item?.code || "",
                    name: item?.name || "",
                    tax_code: item?.tax_code || "",
                    address: item?.address || "",
                    tel: item?.phone_number,
                  }))}
                  value={subject}
                  onChange={(sub: SubjectType) => setSubject(sub?.id || undefined)}
                  fieldDisplay="code"
                />
              </td>
              <td className="px-6 py-2 min-w-[300px]">
                {/* Tên đối tượng */}
                <p className="font-medium">
                  {listPartner.find(
                    (itemOfPartner: any) => itemOfPartner?.id === subject
                  )?.name || ""}
                </p>
              </td>
            </>
          )}
        {paymentType ===
          OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_BORROWINGS.value &&
          paymentMethod ===
          OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER.value && (
            <td className="px-6 py-2 min-w-[150px]">
              {/* Khế ước vay */}
              <InputLoanAgreement
                list={listLoanAgreement}
                onChange={(value: LoanAgreementType) =>
                  setLoanAgreement(value?.id || undefined)
                }
                value={loanAgreement}
              />
            </td>
          )}
        <td className="px-6 py-2 text-right">
          <Button
            type="default"
            onClick={() => handleDeleteItemsOfAccounting(item?.id || undefined)}
          >
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
