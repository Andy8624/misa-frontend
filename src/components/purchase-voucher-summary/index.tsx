import { OPTION_PURCHASE_TYPE, OPTIONS_DISCOUNT } from "@/constants/constants";

export const PurchaseVoucherSummary: React.FC<{
  purchaseType: string;
  total: number;
  discountAmount: number;
  totalAmountPaid: number;
  importTax: number;
  specialConsumptionTax: number;
  environmentalTax: number;
  vatAmount: number;
  discount: string;
  purchaseCost: number;
  preCustomCost: number;
}> = ({
  purchaseType,
  total,
  discountAmount,
  totalAmountPaid,
  importTax,
  specialConsumptionTax,
  environmentalTax,
  vatAmount,
  discount,
  purchaseCost,
  preCustomCost,
}) => {
    if (
      purchaseType ===
      OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
        .value ||
      purchaseType === OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value
    )
      return (
        <div className="w-full">
          <table className="w-full text-[14.5px] font-semibold">
            <tbody>
              <tr>
                <td className="p-1">Tổng tiền hàng</td>
                <td className="p-1">{total.toLocaleString("vi-VN")}</td>
              </tr>
              {discount !== OPTIONS_DISCOUNT.NO.value && (
                <tr>
                  <td className="p-1">Tiền chiết khấu</td>
                  <td className="p-1">
                    {discountAmount.toLocaleString("vi-VN")}
                  </td>
                </tr>
              )}
              <tr>
                <td className="p-1">Thuế GTGT</td>
                <td className="p-1">{vatAmount.toLocaleString("vi-VN")}</td>
              </tr>
              <tr className="border-b border-neutral-300 h-5"></tr>
              <tr className="h-3"></tr>
              <tr>
                <td className="p-1">Tổng tiền thanh toán</td>
                <td className="p-1">{totalAmountPaid.toLocaleString("vi-VN")}</td>
              </tr>
              <tr>
                <td className="p-1">Chi phí mua hàng</td>
                <td className="p-1">{purchaseCost.toLocaleString("vi-VN")}</td>
              </tr>
              <tr>
                <td className="p-1">Tổng giá trị</td>
                <td className="p-1">
                  {(total + purchaseCost - discountAmount).toLocaleString("vi-VN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    return (
      <div className="w-full">
        <table className="w-full text-[14.5px] font-semibold">
          <tbody>
            <tr>
              <td className="p-1">Tổng tiền hàng</td>
              <td className="p-1">{total.toLocaleString("vi-VN")}</td>
            </tr>
            {discount !== OPTIONS_DISCOUNT.NO.value && (
              <tr>
                <td className="p-1">Tiền chiết khấu</td>
                <td className="p-1">{discountAmount.toLocaleString("vi-VN")}</td>
              </tr>
            )}
            <tr className="border-b border-neutral-300 h-5"></tr>
            <tr className="h-3"></tr>
            <tr>
              <td className="p-1">Tổng tiền thanh toán</td>
              <td className="p-1">{totalAmountPaid.toLocaleString("vi-VN")}</td>
            </tr>
            <tr className="h-3"></tr>
            <tr>
              <td className="p-1">Thuế nhập khẩu</td>
              <td className="p-1">{importTax.toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <td className="p-1">Thuế TTĐB</td>
              <td className="p-1">
                {specialConsumptionTax.toLocaleString("vi-VN")}
              </td>
            </tr>
            <tr>
              <td className="p-1">Thuế BVMT</td>
              <td className="p-1">{environmentalTax.toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <td className="p-1">Thuế GTGT</td>
              <td className="p-1">{vatAmount.toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <td className="p-1">Phí trước HQ</td>
              <td className="p-1">{preCustomCost.toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <td className="p-1">Phí hàng về kho</td>
              <td className="p-1">{purchaseCost.toLocaleString("vi-VN")}</td>
            </tr>
            <tr>
              <td className="p-1">Giá trị nhập kho</td>
              <td className="p-1">
                {(
                  totalAmountPaid +
                  purchaseCost +
                  preCustomCost +
                  importTax +
                  specialConsumptionTax
                ).toLocaleString("vi-VN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
