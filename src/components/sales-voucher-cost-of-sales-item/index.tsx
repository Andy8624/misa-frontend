import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputItem } from "@/components/input-item";
import { InputNumber } from "@/components/input-number";
import { InputText } from "@/components/input-text";
import { ChartOfAccountsType, ItemType } from "@types";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherCostOfSalesItem: React.FC<{
  index: number;
  itemList: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  item: any;
  percentDiscountInvoiceValue: number;
  listWarehouse: any[];
}> = ({
  itemList,
  index,
  handleChangeItemOfOfList,
  handleDeleteItemsOfAccounting,
  listChartOfAccounts,
  listUnit,
  item,
  listWarehouse,
}) => {
    const [itemName, setItemName] = useState<string | undefined>(
      item?.item_name || undefined
    );
    const [itemCode, setItemCode] = useState<string | undefined>();
    const [itemId, setItemId] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>(
      item?.quantity || 1
    );
    const [inventoryAccount, setInventoryAccount] = useState<
      string | undefined
    >();
    const [expenseAccount, setExpenseAccount] = useState<string | undefined>();
    const [warehouse, setWarehouse] = useState<string>();
    const [unit, setUnit] = useState<string | undefined>();
    const [unitCostOfSales, setUnitCostOfSales] = useState<number>(0);
    const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(0);

    useEffect(() => {
      handleChangeItemOfOfList(
        {
          ...item,
          item_id: itemId,
          item_name: itemName,
          unit,
          quantity,
          unit_cost_of_sales: unitCostOfSales,
          cost_of_goods_sold: costOfGoodsSold,
          warehouse,
          expense_account: expenseAccount,
          inventory_account: inventoryAccount,
        },
        index
      );
    }, [
      itemId,
      itemName,
      unit,
      quantity,
      unitCostOfSales,
      costOfGoodsSold,
      warehouse,
      expenseAccount,
      inventoryAccount,
    ]);

    useEffect(() => {
      if (item?.item_id) {
        const itemTmp = itemList.find(
          (itemOfList) => itemOfList?.id === item?.item_id
        );
        setItemId(itemTmp?.id || undefined);
        setItemCode(itemTmp?.code || undefined);
        setItemName(itemTmp?.name || undefined);
        if (item?.unit) {
          setUnit(item.unit);
        }
        if (item?.quantity) {
          setQuantity(item.quantity);
        }
      }
    }, [item]);

    const handleSelectItem = (value: ItemType) => {
      setItemName(value?.name || undefined);
      setItemId(value?.id || undefined);
      setItemCode(value?.code || undefined);
    };

    return (
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-10 min-w-[150px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputItem
              fieldDisplay="code"
              list={itemList}
              value={itemId}
              onChange={handleSelectItem}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[450px]">
          <InputText
            value={itemName}
            onChange={(value: string) => setItemName(value)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap min-w-[300px]">
          <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md">
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
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={expenseAccount}
              onChange={(value: ChartOfAccountsType) =>
                setExpenseAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={inventoryAccount}
              onChange={(value: ChartOfAccountsType) =>
                setInventoryAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[100px] outline-none border border-neutral-400 rounded-md">
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
          <InputNumber
            value={quantity}
            onChange={(value: number) => setQuantity(value)}
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">{unitCostOfSales}</td>
        <td className="px-6 py-4 w-[150px] text-right">{costOfGoodsSold}</td>
        <td>
          <Button onClick={() => handleDeleteItemsOfAccounting(item.id)}>
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
