import {
  OPTION_CASH_PAYMENT_VOUCHER_TYPE,
} from "@/constants/constants";
import { Select } from "antd";
import { useEffect, useState } from "react";

export const CashPaymentAccountEntriesItemRead: React.FC<{
  index: number;
  item: any;
  listAccount: any[];
  handleChangeItemsOfAccounting: any;
  cashPaymentVoucherType: string;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listBank: any[];
}> = ({
  index,
  item,
  listAccount,
  handleChangeItemsOfAccounting,
  cashPaymentVoucherType,
  handleDeleteItemsOfAccounting,
  listPartner,
  listBank,
}) => {
    const [debitAccount, setDebitAccount] = useState<number | undefined>();
    const [creditAccount, setCreditAccount] = useState<number | undefined>();
    const [subject, setSubject] = useState<string | undefined>();
    const [bank, setBank] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [amount, setAmount] = useState<number | undefined>(0);

    // useEffect(() => {
    //   handleChangeItemsOfAccounting(
    //     {
    //       id: item.id,
    //       description,
    //       debit_account: debitAccount,
    //       credit_account: creditAccount,
    //       amount,
    //       subject,
    //       bank,
    //     },
    //     index
    //   );
    // }, [description, debitAccount, creditAccount, amount, subject, bank]);

    useEffect(() => {
      if (item.id) {
        setDebitAccount(item?.debit_account || undefined);
        setCreditAccount(item?.credit_account || undefined);
        setDescription(item?.description || undefined);
        setAmount(item?.amount === 0 ? 0 : item?.amount || undefined);
        setSubject(item?.subject || undefined);
        setBank(item?.bank || undefined);
      }
    }, [item])

    return (
      <tr>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4 min-w-[400px]">
          {/* Diễn giải */}
          <p>{description}</p>
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          {/* TK Nợ	 */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={debitAccount}
              // onChange={(id) => setDebitAccount(Number(id))}
              options={listAccount.map((item: any) => ({
                label: `${item?.account_code || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listAccount.find((item: any) => item?.id === debitAccount)
                    ?.account_code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          {/* TK Có	 */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={creditAccount}
              // onChange={(id) => setCreditAccount(Number(id))}
              options={listAccount.map((item: any) => ({
                label: `${item?.account_code || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listAccount.find((item: any) => item?.id === creditAccount)
                    ?.account_code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          {/* Số tiền	 */}
          <p className="font-medium text-right whitespace-nowrap">{(amount || 0).toLocaleString('vi-VN')}</p>
        </td>
        {(cashPaymentVoucherType ===
          OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
          cashPaymentVoucherType ===
          OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
            .value) && (
            <>
              <td className="px-6 py-4 min-w-[300px]">
                {/* Đối tượng	 */}
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={subject}
                    // onChange={(id) => setSubject(id)}
                    options={listPartner.map((item: any) => ({
                      label: `${item?.code || ""} | ${item?.name || ""}`,
                      value: item.id,
                    }))}
                    labelRender={() => (
                      <p>
                        {listPartner.find(
                          (itemOfPartner: any) => itemOfPartner?.id === subject
                        )?.code || ""}
                      </p>
                    )}
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
                  // onChange={(id) => setBank(id)}
                  options={listBank.map((item: any) => ({
                    label: `${item?.account_number || ""} | ${item?.account_holder_name || ""
                      }`,
                    value: item.id,
                  }))}
                />
              </div>
            </td>
          )}
      </tr>
    );
  };
