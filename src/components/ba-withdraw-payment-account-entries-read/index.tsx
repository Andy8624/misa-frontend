import {
  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD,
  OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE,
} from "@/constants/constants";
import { BAWithdrawPaymentAccountEntriesItemRead } from "@/components/ba-withdraw-payment-account-entries-item-read";
import { ChartOfAccountsType } from "@/types";

export const BAWithdrawPaymentAccountEntriesRead: React.FC<{
  paymentType: string;
  itemsOfAccounting: any[];
  listAccount: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listLoanAgreement: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  paymentMethod: string;
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
}) => {
    return (
      <div className="w-full mt-8">
        <div className="w-full overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-sky-100">
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
                <BAWithdrawPaymentAccountEntriesItemRead
                  key={item.id}
                  index={index}
                  listAccount={listAccount}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  paymentType={paymentType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listLoanAgreement={listLoanAgreement}
                  listChartOfAccounts={listChartOfAccounts}
                  paymentMethod={paymentMethod}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
