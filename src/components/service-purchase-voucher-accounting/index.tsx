import { Button } from "antd";
import { ServicePurchaseVoucherItemsAccounting } from "@/components/service-purchase-voucher-items-accounting";
import { PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS } from "@/constants/constants";
import { ChartOfAccountsType, PartnerType, UnitType, VatTaxType } from "@/types";
import { useEffect, useState } from "react";
import { customRound } from "@/utils/customRound";

export const ServicePurchaseVoucherAccounting: React.FC<{
  paymentStatus: string;
  itemsOfAccounting: any[];
  setItemsOfAccounting: any;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  itemList: any[];
  handleUpdateItemList: any;
  handleDeleteItemOfAccounting: any;
  listUnit: UnitType[];
  listVatTax: VatTaxType[];
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
  listVatTax,
}) => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
      let totalQuantity = 0;
      let totalAmount = 0;
      itemsOfAccounting.forEach((item: any) => {
        totalQuantity += Number(item?.quantity || "0");
        totalAmount +=
          Number(item?.quantity || "0") * Number(item?.unit_price || "0");
      });
      setTotalAmount(customRound(totalAmount));
      setTotalQuantity(totalQuantity);
    }, [itemsOfAccounting]);

    return (
      <div className="mt-8 w-full overflow-x-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 uppercase bg-blue-50">
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
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Đơn giá
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Thành tiền
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, idx: number) => (
                <ServicePurchaseVoucherItemsAccounting
                  key={item?.id || idx}
                  itemList={itemList}
                  handleDeleteItemOfAccounting={handleDeleteItemOfAccounting}
                  index={idx}
                  listPartner={listPartner}
                  listChartOfAccounts={listChartOfAccounts}
                  handleUpdateItemList={handleUpdateItemList}
                  listUnit={listUnit}
                  item={item}
                  listVatTax={listVatTax}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-blue-50">
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Mã hàng */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Tên dịch vụ */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* TK chi phí/TK kho */}
                </th>
                {paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value ? (
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {/* TK công nợ */}
                  </th>
                ) : (
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {/* TK tiền */}
                  </th>
                )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Đối tượng */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Tên đối tượng */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* ĐVT */}
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  {/* Số lượng */}
                  {totalQuantity.toLocaleString("vi-VN")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  {/* Đơn giá */}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  {totalAmount.toLocaleString("vi-VN")}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
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
