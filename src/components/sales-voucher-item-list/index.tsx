import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { Select } from "antd";
import { SalesVoucherItem } from "@/components/sales-voucher-item";
import {
  OPTION_PAYMENT_METHOD,
  OPTION_PAYMENT_STATUS,
  OPTION_SALES_TYPE,
} from "@/components/sales-voucher";
import { ChartOfAccountsType, VatTaxType } from "@/types";
import { useEffect, useState } from "react";
import { customRound } from "@/utils/customRound";

export const SalesVoucherItemList: React.FC<{
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
  saleType: string;
  paymentStatus: string;
  paymentMethod: string;
  listVatTax: any[];
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
  saleType,
  paymentStatus,
  paymentMethod,
  listVatTax,
}) => {
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalAmountVat, setTotalAmountVat] = useState<number>(0);

    useEffect(() => {
      let totalQuantity = 0;
      let totalAmount = 0;
      let totalAmountVat = 0;
      itemsOfAccounting.forEach((item: any) => {
        totalQuantity += Number(item?.quantity || 0);
        totalAmount +=
          Number(item?.quantity || "0") * Number(item?.unit_price || "0");
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) => itemVatTax?.id === item?.vat
        );
        totalAmountVat +=
          (Number(item?.quantity || "0") *
            Number(item?.unit_price || "0") *
            (vat?.percent || 0)) /
          100;
      });
      setTotalQuantity(customRound(totalQuantity));
      setTotalAmount(customRound(totalAmount));
      setTotalAmountVat(customRound(totalAmountVat));
    }, [itemsOfAccounting, listVatTax]);

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
                {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value) ||
                  (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                    saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value &&
                    paymentMethod === OPTION_PAYMENT_METHOD.CASH.value)) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK công nợ
                    </th>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK doanh thu
                    </th>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK công nợ/ chi phí
                    </th>
                  )}
                {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value)) ||
                  (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                    paymentMethod === OPTION_PAYMENT_METHOD.DEPOSIT.value &&
                    (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                      saleType ===
                      OPTION_SALES_TYPE.CONSIGNMENT_SALES.value))) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        TK nợ
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        TK có
                      </th>
                    </>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                  paymentMethod === OPTION_PAYMENT_METHOD.CASH.value &&
                  saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TK tiền
                    </th>
                  )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  ĐVT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Thành tiền
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Đơn giá vốn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền vốn
                </th>
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Giá tính thuế XK
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        % thuế xuất khẩu
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Tiền thuế xuất khẩu
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        TK thuế xuất khẩu
                      </th>
                    </>
                  )}
                {discount !== OPTIONS_DISCOUNT.NO.value && (
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
                {saleType !==
                  OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        % thuế GTGT
                      </th>
                      {(saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                        saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value) && (
                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            Tiền thuế GTGT
                          </th>
                        )}
                      {saleType ===
                        OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            TK thuế GTGT
                          </th>
                        )}
                    </>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, index: number) => (
                <SalesVoucherItem
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
                  saleType={saleType}
                  paymentStatus={paymentStatus}
                  paymentMethod={paymentMethod}
                  listVatTax={listVatTax}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-blue-50">
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value) ||
                  (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                    saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value &&
                    paymentMethod === OPTION_PAYMENT_METHOD.CASH.value)) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value) && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  )}
                {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value)) ||
                  (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                    paymentMethod === OPTION_PAYMENT_METHOD.DEPOSIT.value &&
                    (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                      saleType ===
                      OPTION_SALES_TYPE.CONSIGNMENT_SALES.value))) && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                    </>
                  )}
                {paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
                  paymentMethod === OPTION_PAYMENT_METHOD.CASH.value &&
                  saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  )}
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-8 py-3 whitespace-nowrap text-right">
                  {/* Số lượng */}
                  {totalQuantity.toLocaleString("vi-VN")}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  {/* Thành tiền */}
                  {totalAmount.toLocaleString("vi-VN")}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
                  (saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value ||
                    saleType ===
                    OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value) && (
                    <>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap"
                      ></th>
                    </>
                  )}
                {discount !== OPTIONS_DISCOUNT.NO.value && (
                  <>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      {/* Tiền chiết khấu */}
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                  </>
                )}
                {saleType !==
                  OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                      {(saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
                        saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value) && (
                          <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                            {totalAmountVat.toLocaleString("vi-VN")}
                          </th>
                        )}
                      {saleType ===
                        OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          ></th>
                        )}
                    </>
                  )}
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
