import { OPTION_CASH_PAYMENT_VOUCHER_TYPE } from "@/constants/constants";
import { BAWithdrawPaymentRegisterInvoiceAndRecordTaxItem } from "@/components/ba-withdraw-payment-register-invoice-and-record-tax-item";
import { CashPaymentRegisterInvoiceAndRecordTaxItem } from "@/components/cash-payment-register-invoice-and-record-tax-item";
import {
  ChartOfAccountsType,
  GroupOfPurchasedGoodsType,
  PartnerType,
  VatTaxType,
} from "@/types";
import { customRound } from "@/utils/customRound";
import { useEffect, useState } from "react";

export const BAWithdrawPaymentRegisterInvoiceAndRecordTax: React.FC<{
  itemsOfAccounting: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listVatTax: VatTaxType[];
  listChartOfAccounts: ChartOfAccountsType[];
  listGroupOfPurchasedGoods: GroupOfPurchasedGoodsType[];
}> = ({
  itemsOfAccounting,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
  listPartner,
  listVatTax,
  listChartOfAccounts,
  listGroupOfPurchasedGoods,
}) => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    useEffect(() => {
      let total = 0;
      itemsOfAccounting.forEach((item: any) => {
        const amount = item?.amount || 0;
        const vat: VatTaxType | undefined = listVatTax.find((itemVatTax: VatTaxType) => itemVatTax?.id === item?.vat)
        total += customRound(amount * (vat?.percent || 0) / 100);
      });
      setTotalAmount(total);
    }, [itemsOfAccounting]);
    return (
      <div className="w-full">
        <div className="w-full overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  #
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Diễn giải thuế
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-center"
                >
                  Có hóa đơn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % thuế GTGT
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 whitespace-nowrap text-right"
                >
                  Tiền thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-center">
                  Ngày hóa đơn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Số hóa đơn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Nhóm HHDV mua vào
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã NCC
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên NCC
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã số thuế NCC
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <BAWithdrawPaymentRegisterInvoiceAndRecordTaxItem
                  key={item.id}
                  index={index}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                  listPartner={listPartner}
                  listVatTax={listVatTax}
                  listChartOfAccounts={listChartOfAccounts}
                  listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                />
              ))}
              <tr className="border-t border-neutral-200 bg-neutral-50">
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-8 py-3 whitespace-nowrap text-right font-semibold">
                  {customRound(totalAmount).toLocaleString('vi-VN')}
                </td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td className="px-6 py-3 whitespace-nowrap"></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
