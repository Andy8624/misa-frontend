import {
  OPTION_CASH_RECEIPT_VOUCHER_TYPE,
} from "@/constants/constants";
import { CashReceiptAccountEntriesItemRead } from "@/components/cash-receipt-account-entries-item-read";

export const CashReceiptAccountEntriesRead: React.FC<{
  cashReceiptVoucherType: string;
  itemsOfAccounting: any[];
  listAccount: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listBank: any[]
}> = ({
  cashReceiptVoucherType,
  itemsOfAccounting,
  listAccount,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
  listPartner,
  listBank
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
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  Số tiền
                </th>
                {cashReceiptVoucherType ===
                  OPTION_CASH_RECEIPT_VOUCHER_TYPE.OTHERS.value && (
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
                  OPTION_CASH_RECEIPT_VOUCHER_TYPE.OTHERS.value ||
                  cashReceiptVoucherType ===
                  OPTION_CASH_RECEIPT_VOUCHER_TYPE
                    .CASH_RECEIPT_FROM_COLLECTING_DEPOSIT.value) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK ngân hàng
                    </th>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <CashReceiptAccountEntriesItemRead
                  key={item.id}
                  index={index}
                  listAccount={listAccount}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  cashReceiptVoucherType={cashReceiptVoucherType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listBank={listBank}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
