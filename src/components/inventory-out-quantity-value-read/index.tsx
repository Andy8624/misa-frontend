import { OPTION_INVENTORY_OUT_VOUCHER_TYPE } from "@/constants/constants";
import { InventoryOutQuantityValueItemRead } from "@/components/inventory-out-quantity-value-item-read";

export const InventoryOutQuantityValueRead: React.FC<{
  inventoryOutVoucherType: string;
  itemsOfAccounting: any[];
  itemList: any[];
  listWarehouse: any[];
  listAccount: any[];
  listUnit: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any;
}> = ({
  inventoryOutVoucherType,
  itemsOfAccounting,
  itemList,
  listWarehouse,
  listAccount,
  listUnit,
  handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting,
}) => {
    return (
      <div className="w-full mt-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Hàng tiền</p>
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="w-full overflow-x-auto mt-3">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  #
                </th>
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
                  TK Nợ
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  TK Có
                </th>
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
                {inventoryOutVoucherType ===
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.PRODUCTION.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Lệnh sản xuất
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Thành phẩm
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Đối tượng THCP
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Khoản mục CP
                      </th>
                    </>
                  )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <InventoryOutQuantityValueItemRead
                  key={item.id}
                  index={index}
                  itemList={itemList}
                  listWarehouse={listWarehouse}
                  listAccount={listAccount}
                  listUnit={listUnit}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  inventoryOutVoucherType={inventoryOutVoucherType}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  item={item}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
