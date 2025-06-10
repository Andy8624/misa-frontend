import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { Select } from "antd";
import {
  OPTION_PAYMENT_METHOD,
  OPTION_PAYMENT_STATUS,
  OPTION_SALES_TYPE,
} from "@/components/sales-voucher";
import { ChartOfAccountsType } from "@types";
import { SalesVoucherItemRead } from "@/components/sales-voucher-item-read";

export const SalesVoucherItemListRead: React.FC<{
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
            <thead className="text-gray-700 bg-gray-50">
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
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
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
                <SalesVoucherItemRead
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
            </tbody>
          </table>
        </div>
      </div>
    );
  };
