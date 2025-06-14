import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { Select } from "antd";
import { SalesVoucherCostOfSalesItem } from "@/components/sales-voucher-cost-of-sales-item";
import { ChartOfAccountsType } from "@/types";
import { useEffect, useState } from "react";

export const SalesVoucherCostOfSales: React.FC<{
  itemsOfAccounting: any[];
  itemList: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  discount: string;
  setDiscount: any;
  percentDiscountInvoiceValue: number;
  setPercentDiscountInvoiceValue: any;
  listWarehouse: any[];
}> = ({
  itemsOfAccounting,
  itemList,
  handleChangeItemOfOfList,
  handleDeleteItemsOfAccounting,
  listChartOfAccounts,
  listUnit,
  discount,
  setDiscount,
  percentDiscountInvoiceValue,
  setPercentDiscountInvoiceValue,
  listWarehouse,
}) => {
    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    useEffect(() => {
      let totalQuantity = 0;
      itemsOfAccounting.forEach((item: any) => {
        totalQuantity += item?.quantity || 0;
      })
      setTotalQuantity(totalQuantity);
    }, [itemsOfAccounting])

    return (
      <div className="w-full mt-0">
        <div className="mb-4 flex justify-between">
          <p className="font-medium text-blue-600"></p>
          <div className="flex items-center gap-3">
            <div className="h-9 min-w-[250px] outline-none border rounded-md">
              <Select
                style={{ width: "100%", height: "100%" }}
                variant="borderless"
                defaultValue={"no"}
                value={discount}
                onChange={(value) => setDiscount(value)}
                options={Object.keys(OPTIONS_DISCOUNT).map((key: string) => ({
                  label:
                    OPTIONS_DISCOUNT[key as keyof typeof OPTIONS_DISCOUNT]
                      .translate.vi,
                  value:
                    OPTIONS_DISCOUNT[key as keyof typeof OPTIONS_DISCOUNT].value,
                }))}
              />
            </div>
            {discount === OPTIONS_DISCOUNT.PERCENT_INVOICE_VALUE.value && (
              <input
                className="h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right w-16"
                type="text"
                value={percentDiscountInvoiceValue}
                onChange={(e) =>
                  setPercentDiscountInvoiceValue(Number(e.target.value))
                }
              />
            )}
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-blue-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Kho
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK giá vốn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK kho
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
                  Đơn giá vốn
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  Tiền vốn
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, index: number) => (
                <SalesVoucherCostOfSalesItem
                  item={item}
                  itemList={itemList}
                  index={index}
                  key={item.id}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  listChartOfAccounts={listChartOfAccounts}
                  listUnit={listUnit}
                  percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                  listWarehouse={listWarehouse}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-blue-50">
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Mã hàng */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Tên hàng */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Kho */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* TK giá vốn */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* TK kho */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* ĐVT */}
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  {/* Số lượng */}
                  {
                    totalQuantity
                  }
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  {/* Đơn giá vốn */}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-right"
                >
                  {/* Tiền vốn */}
                </th>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
