import { OPTION_COST_OF_INVENTORY_RETURNED, OPTION_INVENTORY_IN_VOUCHER_TYPE } from "@/constants/constants";
import { InventoryInQuantityValueItemRead } from "@/components/inventory-in-quantity-value-item-read";
import { Select } from "antd";

export const InventoryInQuantityValueRead: React.FC<{
  inventoryInVoucherType: string;
  costOfInventoryReturned: string | undefined;
  setCostOfInventoryReturned: any;
  itemsOfAccounting: any[];
  itemList: any[];
  listWarehouse: any[];
  listAccount: any[];
  listUnit: any[];
  handleChangeItemsOfAccounting: any;
  handleDeleteItemsOfAccounting: any
}> = ({
  inventoryInVoucherType,
  costOfInventoryReturned,
  setCostOfInventoryReturned,
  itemsOfAccounting,
  itemList,
  listWarehouse,
  listAccount,
  listUnit, handleChangeItemsOfAccounting,
  handleDeleteItemsOfAccounting
}) => {
    return (
      <div className="w-full mt-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Hàng tiền</p>
          <div className="flex items-center gap-2">
            {inventoryInVoucherType ===
              OPTION_INVENTORY_IN_VOUCHER_TYPE.SALES_RETURNS.value && (
                <>
                  <p>Đơn giá nhập kho</p>
                  <div className="h-9 w-[340px] border rounded overflow-hidden ml-8 border-neutral-300">
                    <Select
                      style={{ width: "100%", height: "100%" }}
                      variant="borderless"
                      value={costOfInventoryReturned}
                      // onChange={(value) => setCostOfInventoryReturned(value)}
                      options={Object.keys(OPTION_COST_OF_INVENTORY_RETURNED).map(
                        (key, idx: number) => ({
                          label:
                            OPTION_COST_OF_INVENTORY_RETURNED[
                              key as keyof typeof OPTION_COST_OF_INVENTORY_RETURNED
                            ].translate.vi,
                          value:
                            OPTION_COST_OF_INVENTORY_RETURNED[
                              key as keyof typeof OPTION_COST_OF_INVENTORY_RETURNED
                            ].value,
                        })
                      )}
                      labelRender={({ label }: any) => (
                        <p className="font-medium">{label}</p>
                      )}
                      optionRender={({ label }: any) => (
                        <div className="py-1.5 px-4 font-medium">
                          <p className="font-medium text-[14.5px]">{label}</p>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}
          </div>
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
                {inventoryInVoucherType ===
                  OPTION_INVENTORY_IN_VOUCHER_TYPE.SALES_RETURNS.value && (
                    <>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Lệnh sản xuất
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Đối tượng THCP
                      </th>
                    </>
                  )}
              </tr>
            </thead>
            <tbody>
              {itemsOfAccounting.map((item, index: number) => (
                <InventoryInQuantityValueItemRead
                  key={item.id}
                  index={index}
                  itemList={itemList}
                  listWarehouse={listWarehouse}
                  listAccount={listAccount}
                  listUnit={listUnit}
                  handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
                  inventoryInVoucherType={inventoryInVoucherType}
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
