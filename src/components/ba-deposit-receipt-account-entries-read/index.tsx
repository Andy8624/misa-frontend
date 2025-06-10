import { OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE } from "@/constants/constants";
import { BADepositReceiptAccountEntriesItemRead } from "@/components/ba-deposit-receipt-account-entries-item-read";
import { ChartOfAccountsType } from "@types";

export const BADepositReceiptAccountEntriesRead: React.FC<{
  cashReceiptVoucherType: string;
  itemsOfAccounting: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listLoanAgreement: any[]
}> = ({
  cashReceiptVoucherType,
  itemsOfAccounting,
  listChartOfAccounts,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
  listPartner,
  listLoanAgreement
}) => {
    return (
      <div className="w-full mt-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Hạch toán</p>
          <div className="flex items-center gap-2"></div>
        </div>
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
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Số tiền
                </th>
                {(cashReceiptVoucherType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
                  cashReceiptVoucherType ===
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
                {(cashReceiptVoucherType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE
                    .RECEIPT_FROM_FINANCIAL_INVESTMENT_INTEREST.value ||
                  cashReceiptVoucherType ===
                  OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE.RECEIPT_FROM_BORROWING
                    .value) && (
                    <th
                      scope="col"
                      className="px-6 py-3 whitespace-nowrap"
                    >
                      Khế ước vay
                    </th>
                  )}
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <BADepositReceiptAccountEntriesItemRead
                  key={item.id}
                  index={index}
                  listChartOfAccounts={listChartOfAccounts}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  cashReceiptVoucherType={cashReceiptVoucherType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listLoanAgreement={listLoanAgreement}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
