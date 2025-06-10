import { ProvisionPurchaseVoucherTableRow } from "@/components/provision-purchase-voucher-table-row";
import { Select } from "antd";
import { ChartOfAccountsType, VatTaxType } from "@types";
import { OPTIONS_SA_SERVICE_DISCOUNT } from "@/constants/constants";
import { useEffect, useState } from "react";
import { customRound } from "@/utils/customRound";

export const ProvisionPurchaseVoucherTableList: React.FC<{
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
  listVatTax: VatTaxType[];
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
  listVatTax,
}) => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountVat, setTotalAmountVat] = useState(0);

    useEffect(() => {
      let totalAmount = 0;
      let totalQuantity = 0;
      let totalAmountVat = 0;
      itemsOfAccounting.forEach((item: any) => {
        totalQuantity += item?.quantity || 0;
        totalAmount += (item?.quantity || 0) * (item?.unit_price || 0);
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) => itemVatTax?.id === item?.vat
        );
        totalAmountVat +=
          ((item?.quantity || 0) *
            (item?.unit_price || 0) *
            (vat?.percent || 0)) /
          100;
      });
      setTotalAmount(totalAmount);
      setTotalQuantity(totalQuantity);
      setTotalAmountVat(totalAmountVat)
    }, [itemsOfAccounting, listVatTax]);

    return (
      <div className="w-full mt-6">
        <div className="my-4 flex justify-between">
          <p className="font-medium text-blue-600">Hàng tiền</p>
          <div className="flex items-center gap-3">
            <div className="h-9 min-w-[250px] outline-none border rounded-md">
              <Select
                style={{ width: "100%", height: "100%" }}
                variant="borderless"
                defaultValue={"no"}
                value={discount}
                onChange={(value) => setDiscount(value)}
                options={Object.keys(OPTIONS_SA_SERVICE_DISCOUNT).map(
                  (key: string) => ({
                    label:
                      OPTIONS_SA_SERVICE_DISCOUNT[
                        key as keyof typeof OPTIONS_SA_SERVICE_DISCOUNT
                      ].translate.vi,
                    value:
                      OPTIONS_SA_SERVICE_DISCOUNT[
                        key as keyof typeof OPTIONS_SA_SERVICE_DISCOUNT
                      ].value,
                  })
                )}
              />
            </div>
            {discount ===
              OPTIONS_SA_SERVICE_DISCOUNT.PERCENT_INVOICE_VALUE.value && (
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
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên dịch vụ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK công nợ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK doanh thu
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  ĐVT
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Thành tiền
                </th>
                {discount !== OPTIONS_SA_SERVICE_DISCOUNT.NO.value && (
                  <>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tỷ lệ CK (%)
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tiền chiết khấu
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK chiết khấu
                    </th>
                  </>
                )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế GTGT
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, index: number) => (
                <ProvisionPurchaseVoucherTableRow
                  item={item}
                  itemList={itemList}
                  index={index}
                  key={item.id}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  listChartOfAccounts={listChartOfAccounts}
                  listUnit={listUnit}
                  discount={discount}
                  percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                  listVatTax={listVatTax}
                />
              ))}
              <tr className="bg-blue-50 border-t border-neutral-200">
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  {totalQuantity.toLocaleString("vi-VN")}
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                ></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  {customRound(totalAmount).toLocaleString("vi-VN")}
                </th>
                {discount !== OPTIONS_SA_SERVICE_DISCOUNT.NO.value && (
                  <>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      {/* Tiền chiết khấu */}
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  </>
                )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  {(customRound(totalAmountVat)).toLocaleString("vi-VN")}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
