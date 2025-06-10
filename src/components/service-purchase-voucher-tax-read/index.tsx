import { Button } from "antd";
import {
  ChartOfAccountsType,
  PartnerType,
  VatTaxType,
} from "@types";
import { ServicePurchaseVoucherItemsTaxRead } from "@/components/service-purchase-voucher-items-tax-read";

export const ServicePurchaseVoucherTaxRead: React.FC<{
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
    return (
      <div className="mt-8 w-full overflow-x-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 uppercase bg-gray-50">
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
                <ServicePurchaseVoucherItemsTaxRead
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
