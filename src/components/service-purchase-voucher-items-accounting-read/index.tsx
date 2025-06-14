import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { ChartOfAccountsType, PartnerType, UnitType } from "@/types";

export const ServicePurchaseVoucherItemsAccountingRead: React.FC<{
  itemList: any[];
  handleDeleteItemOfAccounting: any;
  index: number;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  handleUpdateItemList: any;
  listUnit: UnitType[];
  item: any;
}> = ({
  itemList,
  handleDeleteItemOfAccounting,
  index,
  listPartner,
  listChartOfAccounts,
  handleUpdateItemList,
  listUnit,
  item,
}) => {
    const [itemId, setItemId] = useState<string | undefined>();
    const [itemName, setItemName] = useState<string | undefined>();
    const [subject, setSubject] = useState<string | undefined>();
    const [subjectName, setSubjectName] = useState<string | undefined>();
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();

    // useEffect(() => {
    //   handleUpdateItemList(
    //     {
    //       item_id: itemId,
    //       item_name: itemName,
    //       debit_account: debitAccount,
    //       credit_account: creditAccount,
    //       subject,
    //       subject_name: subjectName,
    //       quantity,
    //       unit_price: unitPrice,
    //       unit,
    //     },
    //     index
    //   );
    // }, [
    //   itemId,
    //   itemName,
    //   quantity,
    //   unitPrice,
    //   quantity,
    //   unitPrice,
    //   debitAccount,
    //   creditAccount,
    //   unit,
    //   subjectName,
    // ]);

    useEffect(() => {
      if (item?.id) {
        setItemId(item?.item_id || undefined);
        setItemName(item?.item_name || undefined);
        setDebitAccount(item?.debit_account || undefined);
        setCreditAccount(item?.credit_account || undefined);
        setSubject(item?.subject || undefined);
        setSubjectName(item?.subject_name || undefined);
        setQuantity(item?.quantity || 0);
        setUnitPrice(item?.unit_price || 0);
        setUnit(item?.unit || undefined);
      }
    }, [item])

    useEffect(() => {
      console.log(item?.supplier_id)
      if (!subject && item?.supplier_id) {
        {
          handleSelectSubject(item?.supplier_id || undefined);
        }
      }
      if (!itemId && item?.item_id) {
        handleSelectItem(item.item_id);
      }
    }, [item]);

    const handleSelectItem = (id: string) => {
      const item = itemList.find((itemL: any) => itemL?.id === id);
      if (item) {
        setItemId(id);
        setItemName(item?.name || "");
      }
    };

    const handleSelectSubject = (id: string) => {
      const subject: PartnerType | undefined = listPartner.find(
        (item: PartnerType) => item?.id === id
      );
      if (subject) {
        setSubject(id);
        setSubjectName(subject?.name || "");
      }
    };

    return (
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap min-w-[300px]"
        >
          <Select
            style={{ width: "100%" }}
            value={itemId}
            onChange={(value: string) => handleSelectItem(value)}
            options={itemList.map((item: any) => ({
              label: `${item?.code || ""} | ${item?.name || ""}`,
              value: item.id,
            }))}
            labelRender={() => (
              <p>
                {itemList.find((item: PartnerType) => item?.id === itemId)
                  ?.code || ""}
              </p>
            )}
          />
        </th>
        <td className="px-6 py-4 min-w-[300px]">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <Select
            style={{ width: "100%" }}
            value={debitAccount}
            onChange={(value: string) => setDebitAccount(value)}
            options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
              label: `${item?.account_number || ""} | ${item?.account_name || ""
                }`,
              value: item.id,
            }))}
            labelRender={() => (
              <p>
                {listChartOfAccounts.find(
                  (item: ChartOfAccountsType) => item?.id === debitAccount
                )?.account_number || ""}
              </p>
            )}
          />
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <Select
            style={{ width: "100%" }}
            value={creditAccount}
            onChange={(value: string) => setCreditAccount(value)}
            options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
              label: `${item?.account_number || ""} | ${item?.account_name || ""
                }`,
              value: item.id,
            }))}
            labelRender={() => (
              <p>
                {listChartOfAccounts.find(
                  (item: ChartOfAccountsType) => item?.id === creditAccount
                )?.account_number || ""}
              </p>
            )}
          />
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <Select
            style={{ width: "100%" }}
            value={subject}
            onChange={handleSelectSubject}
            options={listPartner.map((item: any) => ({
              label: `${item?.code || ""} | ${item?.name || ""}`,
              value: item.id,
            }))}
            labelRender={() => (
              <p>
                {listPartner.find((item: PartnerType) => item?.id === subject)
                  ?.code || ""}
              </p>
            )}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{subjectName}</td>
        <td className="px-6 py-4 min-w-[150px]">
          <Select
            style={{ width: "100%" }}
            value={unit}
            onChange={(value: string) => setUnit(value)}
            options={listUnit.map((item: UnitType) => ({
              label: item?.unit || "",
              value: item.id,
            }))}
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="text-right p-2 bg-blue-50 font-semibold"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="text-right p-2 bg-blue-50 font-semibold"
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
