import {
  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE,
} from "@/constants/constants";
import { BAWithdrawPaymentAccountEntriesItem } from "@/components/ba-withdraw-payment-account-entries-item";
import { ChartOfAccountsType, VatTaxType } from "@types";
import { useEffect, useState } from "react";

export const BAWithdrawPaymentAccountEntries: React.FC<{
  paymentType: string;
  itemsOfAccounting: any[];
  listAccount: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listLoanAgreement: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  paymentMethod: string;
  listVatTax: VatTaxType[];
}> = ({
  paymentType,
  itemsOfAccounting,
  listAccount,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
  listPartner,
  listLoanAgreement,
  listChartOfAccounts,
  paymentMethod,
  listVatTax,
}) => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    useEffect(() => {
      let total = 0;
      itemsOfAccounting.forEach((item: any) => {
        total += item?.amount || 0;
      });
      setTotalAmount(total);
    }, [itemsOfAccounting]);
    return (
      <div className="w-full">
        <div className="w-full overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-sky-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  #
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Diễn giải
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK Nợ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK Có
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Số tiền
                </th>
                {(paymentType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
                  paymentType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
                    .value) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Đối tượng
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Tên đối tượng
                      </th>
                    </>
                  )}
                {paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_BORROWINGS
                    .value &&
                  paymentMethod ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER
                    .value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Khế ước vay
                    </th>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <BAWithdrawPaymentAccountEntriesItem
                  key={item.id}
                  index={index}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  paymentType={paymentType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listLoanAgreement={listLoanAgreement}
                  listChartOfAccounts={listChartOfAccounts}
                  paymentMethod={paymentMethod}
                  listVatTax={listVatTax}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-blue-50">
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-8 py-3 whitespace-nowrap text-right font-semibold">
                  {totalAmount.toLocaleString("vi-VN")}
                </td>
                {(paymentType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
                  paymentType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
                    .value) && (
                    <>
                      <td className="px-6 py-3 whitespace-nowrap"></td>
                      <td className="px-6 py-3 whitespace-nowrap"></td>
                    </>
                  )}
                {paymentType ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_BORROWINGS
                    .value &&
                  paymentMethod ===
                  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD.PAYMENT_ORDER
                    .value && <td className="px-6 py-3 whitespace-nowrap"></td>}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
