import { OPTION_INVENTORY_IN_VOUCHER_TYPE } from "@/constants/constants";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const InventoryInQuantityValueItem: React.FC<{
  index: number;
  item: any;
  itemList: any[];
  listWarehouse: any;
  listAccount: any[];
  listUnit: any[];
  handleChangeItemsOfAccounting: any;
  inventoryInVoucherType: string;
  handleDeleteItemsOfAccounting: any
}> = ({
  index,
  item,
  itemList,
  listWarehouse,
  listAccount,
  listUnit,
  handleChangeItemsOfAccounting,
  inventoryInVoucherType,
  handleDeleteItemsOfAccounting
}) => {
    const [itemId, setItemId] = useState<string | undefined>();
    const [itemName, setItemName] = useState<string | undefined>();
    const [warehouse, setWarehouse] = useState<string | undefined>();
    const [debitAccount, setDebitAccount] = useState<number | undefined>();
    const [creditAccount, setCreditAccount] = useState<number | undefined>();
    const [unit, setUnit] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [unitPrice, setUnitPrice] = useState<number>(0);

    const handleSelectItem = (id: string) => {
      const item: any = itemList.find((item: any) => item?.id === id);
      if (item) {
        setItemId(item.id);
        setItemName(item?.name || undefined);
        if (
          inventoryInVoucherType ===
          OPTION_INVENTORY_IN_VOUCHER_TYPE.SALES_RETURNS.value &&
          unitPrice === 0
        ) {
          setUnitPrice(item?.latest_purchase_price || 0);
        }
      }
    };

    useEffect(() => {
      handleChangeItemsOfAccounting(
        {
          id: item.id,
          item_id: itemId,
          item_name: itemName,
          warehouse,
          debit_account: debitAccount,
          credit_account: creditAccount,
          unit,
          quantity,
          unit_price: unitPrice,
        },
        index
      );
    }, [
      itemId,
      itemName,
      warehouse,
      debitAccount,
      creditAccount,
      unit,
      quantity,
      unitPrice,
    ]);

    return (
      <tr>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">
          <div className="h-9 min-w-[150px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={itemId}
              onChange={(value) => handleSelectItem(value)}
              options={itemList.map((item: any) => ({
                label: item.code,
                value: item.id,
              }))}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-4">
          <div className="h-9 min-w-[150px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={warehouse}
              onChange={(value) => setWarehouse(value)}
              options={listWarehouse.map((item: any) => ({
                label: `${item?.code || ""} | ${item?.name || ""}`,
                value: item.id,
              }))}
              labelRender={() => (
                <p>
                  {listWarehouse.find((item: any) => item?.id === warehouse)
                    ?.name || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={debitAccount}
              onChange={(id) => setDebitAccount(Number(id))}
              options={listAccount.map((item: any) => ({
                label: `${item?.account_code || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listAccount.find((item: any) => item?.id === debitAccount)
                    ?.account_code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={creditAccount}
              onChange={(id) => setCreditAccount(Number(id))}
              options={listAccount.map((item: any) => ({
                label: `${item?.account_code || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listAccount.find((item: any) => item?.id === creditAccount)
                    ?.account_code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-9 min-w-[100px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={unit}
              onChange={(id) => setUnit(id)}
              options={listUnit.map((item: any) => ({
                label: item?.unit || item?.id,
                value: item.id,
              }))}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[200px]">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 min-w-[200px]">
          {inventoryInVoucherType ===
            OPTION_INVENTORY_IN_VOUCHER_TYPE.SALES_RETURNS.value ? (
            <p>{unitPrice.toLocaleString("vi-VN")}</p>
          ) : (
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
            />
          )}
        </td>
        <td className="px-6 py-4 text-right">
          <p className="font-semibold whitespace-nowrap">
            {((quantity || 0) * (unitPrice || 0)).toLocaleString("vi-VN")}
          </p>
        </td>
        {inventoryInVoucherType ===
          OPTION_INVENTORY_IN_VOUCHER_TYPE.SALES_RETURNS.value && (
            <>
              <td className="px-6 py-4 text-right">Lệnh sản xuất</td>
              <td className="px-6 py-4 text-right">Đối tượng THCP</td>
            </>
          )}
        <td className="px-6 py-4 text-right">
          <Button type="default" onClick={() => handleDeleteItemsOfAccounting(item?.id || undefined)}>Xoá</Button>
        </td>
      </tr>
    );
  };
