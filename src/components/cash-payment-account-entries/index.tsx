import { OPTION_CASH_PAYMENT_VOUCHER_TYPE } from "@/constants/constants";
import { CashPaymentAccountEntriesItem } from "@/components/cash-payment-account-entries-item";
import { ChartOfAccountsType, VatTaxType } from "@/types";
import { useEffect, useState } from "react";

export const CashPaymentAccountEntries: React.FC<{
  cashPaymentVoucherType: string;
  itemsOfAccounting: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listBank: any[];
  listVatTax: VatTaxType[]
}> = ({
  cashPaymentVoucherType,
  itemsOfAccounting,
  listChartOfAccounts,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
  listPartner,
  listBank,
  listVatTax
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
      <div className="w-full mt-8">
        <div className="w-full overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-gray-50">
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
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  Số tiền
                </th>
                {(cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
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
                {cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.DEPOSIT_TO_BANK_ACCOUNT
                    .value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK ngân hàng
                    </th>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <CashPaymentAccountEntriesItem
                  key={item.id}
                  index={index}
                  listChartOfAccounts={listChartOfAccounts}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  cashPaymentVoucherType={cashPaymentVoucherType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listBank={listBank}
                  listVatTax={listVatTax}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-neutral-50">
                <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                <td
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right font-semibold"
                >
                  {totalAmount.toLocaleString('vi-VN')}
                </td>
                {(cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.OTHERS.value ||
                  cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.PAYMENT_TO_SERVICE_INVOICE
                    .value) && (
                    <>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                    </>
                  )}
                {cashPaymentVoucherType ===
                  OPTION_CASH_PAYMENT_VOUCHER_TYPE.DEPOSIT_TO_BANK_ACCOUNT
                    .value && (
                    <td scope="col" className="px-6 py-3 whitespace-nowrap"></td>
                  )}
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
