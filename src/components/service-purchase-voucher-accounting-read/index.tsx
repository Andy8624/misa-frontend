import { Button } from "antd";
import { PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS } from "@/constants/constants";
import { ChartOfAccountsType, PartnerType, UnitType } from "@/types";
import { ServicePurchaseVoucherItemsAccountingRead } from "@/components/service-purchase-voucher-items-accounting-read";

export const ServicePurchaseVoucherAccountingRead: React.FC<{
  paymentStatus: string;
  itemsOfAccounting: any[];
  setItemsOfAccounting: any;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  itemList: any[];
  handleUpdateItemList: any;
  handleDeleteItemOfAccounting: any;
  listUnit: UnitType[];
}> = ({
  paymentStatus,
  itemsOfAccounting,
  setItemsOfAccounting,
  listPartner,
  listChartOfAccounts,
  itemList,
  handleUpdateItemList,
  handleDeleteItemOfAccounting,
  listUnit,
}) => {
    return (
      <div className="mt-8 w-full overflow-x-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên dịch vụ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK chi phí/TK kho
                </th>
                {paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value ? (
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    TK công nợ
                  </th>
                ) : (
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    TK tiền
                  </th>
                )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Đối tượng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên đối tượng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  ĐVT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Thành tiền
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, idx: number) => (
                <ServicePurchaseVoucherItemsAccountingRead
                  key={idx}
                  itemList={itemList}
                  handleDeleteItemOfAccounting={handleDeleteItemOfAccounting}
                  index={idx}
                  listPartner={listPartner}
                  listChartOfAccounts={listChartOfAccounts}
                  handleUpdateItemList={handleUpdateItemList}
                  listUnit={listUnit}
                  item={item}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="mb-6">
            <p>
              Tổng số: <strong>{itemsOfAccounting.length}</strong> bản ghi
            </p>
          </div>
          <Button
            type="primary"
            onClick={() => setItemsOfAccounting([...itemsOfAccounting, {}])}
          >
            Thêm dòng
          </Button>
        </div>
      </div>
    );
  };
