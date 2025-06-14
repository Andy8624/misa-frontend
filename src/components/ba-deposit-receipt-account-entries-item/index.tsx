import {
  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE,
} from "@/constants/constants";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputLoanAgreement } from "@/components/input-loan-agreement";
import { InputNumber } from "@/components/input-number";
import { InputSubject } from "@/components/input-subject";
import { InputText } from "@/components/input-text";
import { ChartOfAccountsType, LoanAgreementType, PartnerType, SubjectType } from "@/types";
import { Button } from "antd";
import { useEffect, useState } from "react";

export const BADepositReceiptAccountEntriesItem: React.FC<{
  index: number;
  item: any;
  listChartOfAccounts: ChartOfAccountsType[];
  handleChangeItemsOfAccounting: any;
  cashReceiptVoucherType: string;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listLoanAgreement: LoanAgreementType[];
}> = ({
  index,
  item,
  listChartOfAccounts,
  handleChangeItemsOfAccounting,
  cashReceiptVoucherType,
  handleDeleteItemsOfAccounting,
  listPartner,
  listLoanAgreement,
}) => {
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [subject, setSubject] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [amount, setAmount] = useState<number | undefined>(0);
    const [loanAgreement, setLoanAgreement] = useState<string | undefined>();

    useEffect(() => {
      handleChangeItemsOfAccounting(
        {
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

    useEffect(() => { }, []);

    useEffect(() => {
      if (
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value
      ) {
        setDescription("Thu tiền của");
      }
      if (
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE
          .RECEIPT_FROM_COLLECTING_ADVANCE_FROM_EMPLOYEE.value
      ) {
        setDescription("Thu hoàn ứng của");
      }
      if (
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE
          .RECEIPT_FROM_FINANCIAL_INVESTMENT_INTEREST.value
      ) {
        setDescription("Thu lãi đầu tư tài chính của");
      }
      if (
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING.value
      ) {
        setDescription("Thu tiền vay qua ngân hàng của");
      }
      if (
        cashReceiptVoucherType ===
        OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_TAX_REBATE.value
      ) {
        setDescription("Thu hoàn thuế GTGT của");
      }
    }, [cashReceiptVoucherType]);

    return (
      <tr className="bg-neutral-100 border-t border-neutral-200">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4 min-w-[400px]">
          {/* Diễn giải */}
          <InputText
            value={description}
            onChange={(value: string) => setDescription(value)}
          />
        </td>
        <td className="px-6 py-4 min-w-[170px]">
          {/* TK Nợ	 */}
          <InputChartOfAccounts
            list={listChartOfAccounts}
            onChange={(acc: ChartOfAccountsType) =>
              setDebitAccount(acc?.id || undefined)
            }
            value={debitAccount}
          />
        </td>
        <td className="px-6 py-4 min-w-[170px]">
          {/* TK Có	 */}
          <InputChartOfAccounts
            list={listChartOfAccounts}
            onChange={(acc: ChartOfAccountsType) =>
              setCreditAccount(acc?.id || undefined)
            }
            value={creditAccount}
          />
        </td>
        <td className="px-6 py-4 min-w-[200px]">
          {/* Số tiền	 */}
          <InputNumber
            value={amount}
            onChange={(value: number) => setAmount(value)}
          />
        </td>
        {(cashReceiptVoucherType ===
          OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
          cashReceiptVoucherType ===
          OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
            .value) && (
            <>
              <td className="px-6 py-4 min-w-[180px]">
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
              <td className="px-6 py-4 min-w-[350px]">
                {/* Tên đối tượng */}
                <p className="font-medium">
                  {listPartner.find(
                    (itemOfPartner: any) => itemOfPartner?.id === subject
                  )?.name || ""}
                </p>
              </td>
            </>
          )}
        {(cashReceiptVoucherType ===
          OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE
            .RECEIPT_FROM_FINANCIAL_INVESTMENT_INTEREST.value ||
          cashReceiptVoucherType ===
          OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
            .value) && (
            <td className="px-6 py-4 min-w-[200px]">
              {/* Khế ước vay */}
              <InputLoanAgreement list={listLoanAgreement} value={loanAgreement} onChange={(value: LoanAgreementType) => setLoanAgreement(value?.id || undefined)} />
            </td>
          )}
        <td className="px-6 py-4 text-right">
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
