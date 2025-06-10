import { OPTION_CASH_PAYMENT_VOUCHER_TYPE } from "@/constants/constants";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputNumber } from "@/components/input-number";
import { InputSubject } from "@/components/input-subject";
import { InputText } from "@/components/input-text";
import { ChartOfAccountsType, SubjectType, VatTaxType } from "@types";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const CashPaymentAccountEntriesItem: React.FC<{
  index: number;
  item: any;
  listChartOfAccounts: ChartOfAccountsType[];
  handleChangeItemsOfAccounting: any;
  cashPaymentVoucherType: string;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listBank: any[];
  listVatTax: VatTaxType[];
}> = ({
  index,
  item,
  listChartOfAccounts,
  handleChangeItemsOfAccounting,
  cashPaymentVoucherType,
  handleDeleteItemsOfAccounting,
  listPartner,
  listBank,
  listVatTax,
}) => {
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [subject, setSubject] = useState<string | undefined>();
    const [bank, setBank] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>(
      item?.description || undefined
    );
    const [amount, setAmount] = useState<number | undefined>(item?.amount || 0);

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
          bank,
        },
        index
      );
    }, [description, debitAccount, creditAccount, amount, subject, bank]);

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
            vat: vat?.id || undefined,
          },
          index
        );
      }
    }, [item?.vat_rate, listVatTax]);

    return (
      <tr className="border-t border-neutral-200 bg-neutral-50">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4 min-w-[400px]">
          {/* Diễn giải */}
          <InputText
            value={description}
            onChange={(value: string) => setDescription(value)}
          />
        </td>
        <td className="px-6 py-4">
          {/* TK Nợ	 */}
          <div className="h-9 min-w-[120px] outline-none border rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={debitAccount}
              onChange={(value: ChartOfAccountsType) =>
                setDebitAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4">
          {/* TK Có	 */}
          <div className="h-9 min-w-[120px] outline-none border rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={creditAccount}
              onChange={(value: ChartOfAccountsType) =>
                setCreditAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[200px]">
          {/* Số tiền	 */}
          <InputNumber
            value={amount}
            onChange={(value: number) => setAmount(value)}
          />
        </td>
        {(cashPaymentVoucherType ===
          OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
          cashPaymentVoucherType ===
          OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
            .value) && (
            <>
              <td className="px-6 py-4 min-w-[150px]">
                {/* Đối tượng	 */}
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
                  <InputSubject
                    list={listPartner}
                    value={subject}
                    fieldDisplay="code"
                    onChange={(value: SubjectType) =>
                      setSubject(value?.id || undefined)
                    }
                  />
                </div>
              </td>
              <td className="px-6 py-4 min-w-[300px]">
                {/* Tên đối tượng */}
                <p className="font-medium">
                  {listPartner.find(
                    (itemOfPartner: any) => itemOfPartner?.id === subject
                  )?.name || ""}
                </p>
              </td>
            </>
          )}
        {cashPaymentVoucherType ===
          OPTION_CASH_PAYMENT_VOUCHER_TYPE.DEPOSIT_TO_BANK_ACCOUNT.value && (
            <td className="px-6 py-4 min-w-[300px]">
              {/* TK ngân hàng */}
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={bank}
                  onChange={(id) => setBank(id)}
                  options={listBank.map((item: any) => ({
                    label: `${item?.account_number || ""} | ${item?.account_holder_name || ""
                      }`,
                    value: item.id,
                  }))}
                />
              </div>
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
