import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import {
  ChartOfAccountsType,
  ItemType,
  PartnerType,
  SubjectType,
  UnitType,
  VatTaxType,
} from "@types";
import { InputItem } from "@/components/input-item";
import { InputText } from "@/components/input-text";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputSubject } from "@/components/input-subject";
import { InputNumber } from "@/components/input-number";

export const ServicePurchaseVoucherItemsAccounting: React.FC<{
  itemList: any[];
  handleDeleteItemOfAccounting: any;
  index: number;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  handleUpdateItemList: any;
  listUnit: UnitType[];
  item: any;
  listVatTax: VatTaxType[];
}> = ({
  itemList,
  handleDeleteItemOfAccounting,
  index,
  listPartner,
  listChartOfAccounts,
  handleUpdateItemList,
  listUnit,
  item,
  listVatTax,
}) => {
    const [itemId, setItemId] = useState<string | undefined>();
    const [itemName, setItemName] = useState<string | undefined>(
      item?.item_name || undefined
    );
    const [subject, setSubject] = useState<string | undefined>();
    const [subjectName, setSubjectName] = useState<string | undefined>();
    const [unitPrice, setUnitPrice] = useState(item?.unit_price || 0);
    const [quantity, setQuantity] = useState(
      item?.quantity ? Number(item.quantity) : 0
    );
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();

    useEffect(() => {
      handleUpdateItemList(
        {
          item_id: itemId,
          item_name: itemName,
          debit_account: debitAccount,
          credit_account: creditAccount,
          subject,
          subject_name: subjectName,
          quantity,
          unit_price: unitPrice,
          unit,
        },
        index
      );
    }, [
      itemId,
      itemName,
      quantity,
      unitPrice,
      quantity,
      unitPrice,
      debitAccount,
      creditAccount,
      unit,
      subjectName,
    ]);

    useEffect(() => {
      if (item?.vat_rate && listVatTax.length > 0) {
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) =>
            itemVatTax?.percent === Number(item.vat_rate.replace("%", ""))
        );
        handleUpdateItemList(
          {
            ...item,
            vat_rate: undefined,
            vat: vat?.id || undefined,
          },
          index
        );
      }
    }, [item?.vat_rate, listVatTax]);

    useEffect(() => {
      if (!subject && item?.supplier_id) {
        {
          handleSelectSubject(item?.supplier_id || undefined);
        }
      }
      if (!itemId && item?.item_id) {
        handleSelectItem(item.item_id);
      }
    }, [item]);

    const handleSelectItem = (value: ItemType) => {
      setItemId(value?.id);
      setItemName(value?.name || "");
    };

    const handleSelectSubject = (value: SubjectType) => {
      setSubject(value?.id || undefined);
      setSubjectName(value?.name || undefined);
    };

    return (
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <div className="h-10 min-w-[150px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputItem
              fieldDisplay="code"
              list={itemList}
              value={itemId}
              onChange={handleSelectItem}
            />
          </div>
        </th>
        <td className="px-6 py-4 min-w-[300px]">
          <InputText
            value={itemName}
            onChange={(value: string) => setItemName(value)}
          />
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={debitAccount}
              onChange={(value: ChartOfAccountsType) =>
                setDebitAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={creditAccount}
              onChange={(value: ChartOfAccountsType) =>
                setCreditAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputSubject
              fieldDisplay="code"
              list={listPartner as any}
              value={subject}
              onChange={handleSelectSubject}
            />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{subjectName}</td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <Select
              style={{ width: "100%", height: '100%' }}
              value={unit}
              onChange={(value: string) => setUnit(value)}
              options={listUnit.map((item: UnitType) => ({
                label: item?.unit || "",
                value: item.id,
              }))}
              variant="borderless"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <InputNumber
            value={quantity}
            onChange={(value: number) => setQuantity(value)}
          />
        </td>
        <td className="px-6 py-4">
          <InputNumber
            value={unitPrice}
            onChange={(value: number) => setUnitPrice(value)}
          />
        </td>
        <td className="px-6 py-4 text-right font-semibold">
          {((quantity || 0) * (unitPrice || 0)).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4">
          <Button
            type="default"
            onClick={() => handleDeleteItemOfAccounting(index)}
          >
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
