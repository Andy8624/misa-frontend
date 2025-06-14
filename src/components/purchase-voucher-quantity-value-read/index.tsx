import {
  OPTION_PURCHASE_TYPE,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
} from "@/constants/constants";
import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { PurchaseVoucherQuantityValueItemRead } from "@/components/purchase-voucher-quantity-value-item-read";
import { OPTION_PAYMENT_STATUS } from "@/components/sales-voucher";
import { ChartOfAccountsType } from "@/types";
import { Select } from "antd";
import { useEffect } from "react";

export const PurchaseVoucherQuantityValueRead: React.FC<{
  itemsOfAccounting: any[];
  itemList: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  discount: string;
  setDiscount: any;
  paymentStatus: string;
  purchaseType: string;
  invoiceInclusion: string;
  paymentMethod: string;
  listWarehouse: any[];
  listVatTax: any[];
  listGroupOfPurchasedGoods: any[];
  listCostClassification: any[];
  listConstruction: any[];
  discountRate: number;
  setDiscountRate: any;
}> = ({
  itemsOfAccounting,
  itemList,
  handleChangeItemOfOfList,
  handleDeleteItemsOfAccounting,
  listChartOfAccounts,
  listUnit,
  discount,
  setDiscount,
  paymentStatus,
  purchaseType,
  invoiceInclusion,
  paymentMethod,
  listWarehouse,
  listVatTax,
  listGroupOfPurchasedGoods,
  listCostClassification,
  listConstruction,
  discountRate,
  setDiscountRate
}) => {

    useEffect(() => {
      if (discount === OPTIONS_DISCOUNT.NO.value) {
        setDiscountRate(0);
      }
    }, [discount])

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
                {(purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value ||
                  purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Kho
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        TK Kho
                      </th>
                    </>
                  )}
                {paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK công nợ
                    </th>
                  )}
                {paymentStatus ===
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK tiền
                    </th>
                  )}
                {(purchaseType ===
                  OPTION_PURCHASE_TYPE
                    .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED.value ||
                  purchaseType ===
                  OPTION_PURCHASE_TYPE
                    .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
                    .value) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK chi phí
                    </th>
                  )}
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
                {discount !== OPTIONS_DISCOUNT.NO.value && (
                  <>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tỷ lệ CK (%)
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tiền chiết khấu
                    </th>
                  </>
                )}
                {invoiceInclusion ===
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE
                    .value &&
                  (purchaseType ===
                    OPTION_PURCHASE_TYPE
                      .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED.value ||
                    purchaseType ===
                    OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        % thuế GTGT
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Tiền thuế GTGT
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        TK thuế GTGT
                      </th>
                    </>
                  )}
                {invoiceInclusion ===
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE
                    .value &&
                  (purchaseType ===
                    OPTION_PURCHASE_TYPE
                      .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED.value ||
                    purchaseType ===
                    OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nhóm HHDV mua vào
                    </th>
                  )}
                {purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Chi phí mua hàng
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Giá trị nhập kho
                      </th>
                    </>
                  )}
                {purchaseType ===
                  OPTION_PURCHASE_TYPE
                    .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED.value && (
                    <>
                      {paymentMethod ===
                        PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                          <>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Khoản mục CP
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Công trình
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                              Tên công trình
                            </th>
                          </>
                        )}
                    </>
                  )}
                {purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value &&
                  paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Giá FOB
                    </th>
                  )}
                {purchaseType ===
                  OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phí trước hải quan
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phí hàng về kho
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Giá trị nhập kho
                      </th>
                    </>
                  )}
                {purchaseType ===
                  OPTION_PURCHASE_TYPE
                    .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phí trước hải quan
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Chi phí mua hàng
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Tổng giá trị
                      </th>
                    </>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, index: number) => (
                <PurchaseVoucherQuantityValueItemRead
                  key={item?.id || index}
                  index={index}
                  purchaseType={purchaseType}
                  discount={discount}
                  invoiceInclusion={invoiceInclusion}
                  paymentMethod={paymentMethod}
                  paymentStatus={paymentStatus}
                  itemList={itemList}
                  listWarehouse={listWarehouse}
                  listChartOfAccounts={listChartOfAccounts}
                  listUnit={listUnit}
                  listVatTax={listVatTax}
                  listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                  listCostClassification={listCostClassification}
                  listConstruction={listConstruction}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  discountRateOnInvoiceValue={discountRate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
