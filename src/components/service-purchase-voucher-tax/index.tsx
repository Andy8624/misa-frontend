import { Button } from "antd";
import { ChartOfAccountsType, PartnerType, VatTaxType } from "@/types";
import { ServicePurchaseVoucherItemsTax } from "@/components/service-purchase-voucher-items-tax";
import { useEffect, useState } from "react";
import { customRound } from "@/utils/customRound";

export const ServicePurchaseVoucherTax: React.FC<{
  itemsOfAccounting: any[];
  setItemsOfAccounting: any;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  itemList: any[];
  handleUpdateItemList: any;
  handleDeleteItemOfAccounting: any;
  listVatTax: VatTaxType[];
}> = ({
  itemsOfAccounting,
  setItemsOfAccounting,
  listPartner,
  listChartOfAccounts,
  itemList,
  handleUpdateItemList,
  handleDeleteItemOfAccounting,
  listVatTax,
}) => {
    const [totalAmountVat, setTotalAmountVat] = useState<number>(0);
    useEffect(() => {
      let total = 0;
      itemsOfAccounting.forEach((item: any) => {
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) => itemVatTax?.id === item?.vat
        );
        total +=
          (Number(item?.quantity || "0") *
            Number(item?.unit_price || "0") *
            (vat?.percent || 0)) /
          100;
      });
      setTotalAmountVat(customRound(total));
    }, [itemsOfAccounting, listVatTax]);
    return (
      <div className="mt-8 w-full overflow-x-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="text-gray-700 uppercase bg-blue-50 text-left">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Mã hàng
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tên dịch vụ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Diễn giải thuế
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  % thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tiền thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK thuế GTGT
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Số hóa đơn
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Ngày hóa đơn
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
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Địa chỉ NCC
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item: any, idx: number) => (
                <ServicePurchaseVoucherItemsTax
                  key={idx}
                  itemList={itemList}
                  handleDeleteItemOfAccounting={handleDeleteItemOfAccounting}
                  index={idx}
                  listPartner={listPartner}
                  listChartOfAccounts={listChartOfAccounts}
                  handleUpdateItemList={handleUpdateItemList}
                  listVatTax={listVatTax}
                  item={item}
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
                  {/* Diễn giải thuế */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* % thuế GTGT */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">
                  {/* Tiền thuế GTGT */}
                  {totalAmountVat.toLocaleString("vi-VN")}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* TK thuế GTGT */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Số hóa đơn */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Ngày hóa đơn */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Nhóm HHDV mua vào */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Mã NCC */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Tên NCC */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Mã số thuế NCC */}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  {/* Địa chỉ NCC */}
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
