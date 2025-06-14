import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { PurchaseVoucherTaxItemRead } from "@/components/purchase-voucher-tax-item-read";
import { ChartOfAccountsType } from "@/types";
import { Select } from "antd";

export const PurchaseVoucherTaxRead: React.FC<{
  itemsOfAccounting: any[];
  itemList: any[];
  handleChangeItemOfOfList: any;
  listChartOfAccounts: ChartOfAccountsType[];
  discount: string;
  setDiscount: any;
  listVatTax: any[];
  listGroupOfPurchasedGoods: any[];
  handleDeleteItemsOfAccounting: any;
  discountRate: number;
  setDiscountRate: any;
}> = ({
  itemsOfAccounting,
  itemList,
  handleChangeItemOfOfList,
  listChartOfAccounts,
  discount,
  setDiscount,
  listVatTax,
  listGroupOfPurchasedGoods,
  handleDeleteItemsOfAccounting,
  discountRate,
  setDiscountRate,
}) => {
    return (
      <div className="w-full mt-6">
        <div className="my-4 flex justify-between">
          <p className="font-medium text-blue-600"></p>
          <div className="flex items-center gap-3">
            <div className="h-9 min-w-[250px] outline-none border rounded-md">
              <Select
                style={{ width: "100%", height: "100%" }}
                variant="borderless"
                defaultValue={"no"}
                value={discount}
                // onChange={(value) => setDiscount(value)}
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
                value={discountRate}
              // onChange={(e) =>
              //   setDiscountRate(Number(e.target.value))
              // }
              />
            )}
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tự động tính Giá tính thuế NK
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phí trước HQ bằng ngoại tệ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phí trước HQ bằng tiền hạch toán
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tỷ giá hải quan
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Giá tính thuế NK
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % Thuế NK
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền thuế NK
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế NK
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % Thuế TTĐB
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền thuế TTĐB
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế TTĐB
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Diễn giải thuế
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % Thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TKĐƯ thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Nhóm HHDV mua vào
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, index: number) => (
                <PurchaseVoucherTaxItemRead
                  key={item?.id || index}
                  index={index}
                  item={item}
                  itemList={itemList}
                  listChartOfAccounts={listChartOfAccounts}
                  listVatTax={listVatTax}
                  listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
