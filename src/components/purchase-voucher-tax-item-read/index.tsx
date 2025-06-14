import { ChartOfAccountsType } from "@/types";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const PurchaseVoucherTaxItemRead: React.FC<{
  itemList: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  listVatTax: any[];
  listGroupOfPurchasedGoods: any[];
  item: any;
  handleChangeItemOfOfList: any;
  index: number;
  handleDeleteItemsOfAccounting: any;
}> = ({
  itemList,
  listChartOfAccounts,
  listVatTax,
  listGroupOfPurchasedGoods,
  item,
  handleChangeItemOfOfList,
  index,
  handleDeleteItemsOfAccounting,
}) => {
    const [itemName, setItemName] = useState<string | undefined>();
    const [itemId, setItemId] = useState<string | undefined>();
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [
      automaticallyCalculateImportTaxCalculationPrice,
      setAutomaticallyCalculateImportTaxCalculationPrice,
    ] = useState<boolean>(true);
    const [preCustomsCostInForeignCurrency, setPreCustomsCostInForeignCurrency] =
      useState<number>(0);
    const [
      preCustomsCostInAccountingCurrency,
      setPreCustomsCostInAccountingCurrency,
    ] = useState<number>(0);
    const [customExchangeRate, setCustomExchangeRate] = useState<number>(1);
    const [importTaxRate, setImportTaxRate] = useState<number>(0);
    const [importTaxAccount, setImportTaxAccount] = useState<
      string | undefined
    >();
    const [specialConsumptionTaxRate, setSpecialConsumptionTaxRate] =
      useState<number>(0);
    const [specialConsumptionTaxAccount, setSpecialConsumptionTaxAccount] =
      useState<string | undefined>();
    const [vatDescription, setVatDescription] = useState<string | undefined>();
    const [vat, setVat] = useState<any>();
    const [vatCorrespondingAccount, setVATCorrespondingAccount] = useState<
      string | undefined
    >();
    const [groupOfPurchasedGoods, setGroupOfPurchasedGoods] = useState<
      string | undefined
    >();
    const [importTaxBase, setImportTaxBase] = useState<number>(0);
    const [importTaxDuty, setImportTaxDuty] = useState<number>(0);
    const [specialConsumptionTaxAmount, setSpecialConsumptionTaxAmount] =
      useState<number>(0);

    const handleSelectItem = (id: string) => {
      const itemService = itemList.find((item: any) => item?.id === id);
      if (itemService) {
        setItemName(itemService?.name || undefined);
        setItemId(itemService?.id || undefined);
      }
    };
    const [translatedVatAmount, setTranslatedVatAmount] = useState<number>(0);

    // useEffect(() => {
    //   handleChangeItemOfOfList(
    //     {
    //       ...item,
    //       item_id: itemId,
    //       item_name: itemName,
    //       automatically_calculate:
    //         automaticallyCalculateImportTaxCalculationPrice,
    //       pre_customs_cost_in_foreign_currency: preCustomsCostInForeignCurrency,
    //       pre_customs_cost_in_accounting_currency:
    //         preCustomsCostInAccountingCurrency,
    //       custom_exchange_rate: customExchangeRate,
    //       vat_account: vatAccount,
    //       import_tax_rate: importTaxRate,
    //       import_tax_account: importTaxAccount,
    //       special_consumption_tax_rate: specialConsumptionTaxRate,
    //       special_consumption_tax_account: specialConsumptionTaxAccount,
    //       vat_description: vatDescription,
    //       vat: vat?.id || undefined,
    //       vat_corresponding_account: vatCorrespondingAccount,
    //       group_of_purchased_goods: groupOfPurchasedGoods,
    //     },
    //     index
    //   );
    // }, 
    // [
    //   itemId,
    //   itemName,
    //   automaticallyCalculateImportTaxCalculationPrice,
    //   preCustomsCostInForeignCurrency,
    //   preCustomsCostInAccountingCurrency,
    //   customExchangeRate,
    //   vatAccount,
    //   importTaxRate,
    //   importTaxAccount,
    //   specialConsumptionTaxRate,
    //   specialConsumptionTaxAccount,
    //   vatDescription,
    //   vat,
    //   vatCorrespondingAccount,
    //   groupOfPurchasedGoods,
    // ]);

    useEffect(() => {
      if (item) {
        setItemId(item?.item_id || undefined);
        setItemName(item?.item_name || undefined);
        setVat(
          listVatTax.find((itemVat: any) => item?.vat === itemVat?.id) ||
          undefined
        );
        setAutomaticallyCalculateImportTaxCalculationPrice(item?.automatically_calculate || false);
        setPreCustomsCostInAccountingCurrency(item?.pre_customs_cost_in_accounting_currency || 0);
        setPreCustomsCostInForeignCurrency(item.pre_customs_cost_in_foreign_currency || 0);
        setCustomExchangeRate(item?.custom_exchange_rate || undefined);
        setVatAccount(item?.vat_account || undefined);
        setImportTaxRate(item?.import_tax_rate || undefined);
        setImportTaxAccount(item?.import_tax_account || undefined);
        setSpecialConsumptionTaxRate(item?.special_consumption_tax_rate || 0);
        setSpecialConsumptionTaxAccount(item?.special_consumption_tax_account || undefined);
        setVatDescription(item?.vat_description || undefined);
        setVATCorrespondingAccount(item?.vat_corresponding_account || undefined);
        setGroupOfPurchasedGoods(item?.group_of_purchased_goods || undefined);
        setVat(item?.vat || undefined);
      }
    }, [item]);

    useEffect(() => {
      let total = (item?.quantity || 0) * (item?.unit_price || 0);
      let totalVat = total * ((item?.discount_rate || 0) / 100);
      setImportTaxBase(
        total -
        totalVat +
        (preCustomsCostInAccountingCurrency | 0) +
        (preCustomsCostInForeignCurrency || 0)
      );
    }, [
      item?.quantity,
      item?.unit_price,
      item?.discount_rate,
      preCustomsCostInAccountingCurrency,
      preCustomsCostInForeignCurrency,
    ]);

    useEffect(() => {
      setImportTaxDuty(importTaxBase * ((importTaxRate || 0) / 100));
    }, [importTaxBase, importTaxRate]);

    useEffect(() => {
      setSpecialConsumptionTaxAmount(
        (importTaxDuty + importTaxBase) * (specialConsumptionTaxRate / 100)
      );
    }, [importTaxDuty, importTaxBase, specialConsumptionTaxRate]);

    useEffect(() => {
      setTranslatedVatAmount((vat?.percent || 0) / 100);
    }, [vat]);

    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap min-w-[300px]">
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={itemId}
              // onChange={(value) => handleSelectItem(value)}
              options={itemList.map((item: any) => ({
                label: `${item?.code || ""} | ${item?.name || ""}`,
                value: item.id,
              }))}
              labelRender={() => (
                <p>
                  {itemList.find((item: any) => item?.id === itemId)?.code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <input
            type="text"
            value={itemName}
            // onChange={(e) => setItemName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-4 text-center">
          {/* Tự động tính Giá tính thuế NK */}
          <input
            type="checkbox"
            checked={automaticallyCalculateImportTaxCalculationPrice}
          // onChange={(e) =>
          //   setAutomaticallyCalculateImportTaxCalculationPrice(e.target.checked)
          // }
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Phí trước HQ bằng ngoại tệ */}
          <input
            type="number"
            value={preCustomsCostInForeignCurrency}
            // onChange={(e) =>
            //   setPreCustomsCostInForeignCurrency(Number(e.target.value))
            // }
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Phí trước HQ bằng tiền hạch toán */}
          <input
            type="number"
            value={preCustomsCostInAccountingCurrency}
            // onChange={(e) =>
            //   setPreCustomsCostInAccountingCurrency(Number(e.target.value))
            // }
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Tỷ giá hải quan */}
          <input
            type="number"
            value={customExchangeRate}
            // onChange={(e) => setCustomExchangeRate(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* TK thuế GTGT */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={vatAccount}
              // onChange={(id) => setVatAccount(id)}
              options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                label: `${item?.account_number || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listChartOfAccounts.find(
                    (item: ChartOfAccountsType) => item?.id === vatAccount
                  )?.account_number || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Giá tính thuế NK */}
          {(importTaxBase || 0).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* % Thuế NK */}
          <input
            type="number"
            value={importTaxRate}
            // onChange={(e) => setImportTaxRate(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Tiền thuế NK */}
          {(importTaxDuty || 0).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* TK thuế NK */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={importTaxAccount}
              // onChange={(id) => setImportTaxAccount(id)}
              options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                label: `${item?.account_number || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listChartOfAccounts.find(
                    (item: ChartOfAccountsType) => item?.id === importTaxAccount
                  )?.account_number || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* % Thuế TTĐB */}
          <input
            type="number"
            value={specialConsumptionTaxRate}
            // onChange={(e) => setSpecialConsumptionTaxRate(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Tiền thuế TTĐB */}
          {(
            (((item?.unit_price || 0) * customExchangeRate +
              preCustomsCostInForeignCurrency * customExchangeRate +
              preCustomsCostInAccountingCurrency) *
              (importTaxRate / 100) +
              ((item?.unit_price || 0) * customExchangeRate +
                preCustomsCostInForeignCurrency * customExchangeRate +
                preCustomsCostInAccountingCurrency)) *
            (specialConsumptionTaxRate / 100)
          ).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* TK Thuế TTĐB */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={specialConsumptionTaxAccount}
              // onChange={(id) => setSpecialConsumptionTaxAccount(id)}
              options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                label: `${item?.account_number || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listChartOfAccounts.find(
                    (item: ChartOfAccountsType) =>
                      item?.id === specialConsumptionTaxAccount
                  )?.account_number || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Diễn giải thuế */}
          <input
            type="text"
            value={vatDescription}
            // onChange={(e) => setVatDescription(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[80px] text-right">
          {/* % Thuế GTGT */}
          <div className="h-9 min-w-[80px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={vat?.id || undefined}
              // onChange={(id) =>
              //   setVat(
              //     listVatTax.find((item: any) => item?.id === id) || undefined
              //   )
              // }
              options={listVatTax.map((item: any) => ({
                label: item?.name || "",
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">{vat?.name || ""}</p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Tiền thuế GTGT */}
          {(
            ((((item?.unit_price || 0) * customExchangeRate +
              preCustomsCostInForeignCurrency * customExchangeRate +
              preCustomsCostInAccountingCurrency) *
              (importTaxRate / 100) +
              ((item?.unit_price || 0) * customExchangeRate +
                preCustomsCostInForeignCurrency * customExchangeRate +
                preCustomsCostInAccountingCurrency)) *
              (specialConsumptionTaxRate / 100) +
              (((item?.unit_price || 0) * customExchangeRate +
                preCustomsCostInForeignCurrency * customExchangeRate +
                preCustomsCostInAccountingCurrency) *
                (importTaxRate / 100) +
                ((item?.unit_price || 0) * customExchangeRate +
                  preCustomsCostInForeignCurrency * customExchangeRate +
                  preCustomsCostInAccountingCurrency))) *
            ((vat?.percent || 0) / 100)
          ).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* TKĐƯ thuế GTGT */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={vatCorrespondingAccount}
              // onChange={(id) => setVATCorrespondingAccount(id)}
              options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                label: `${item?.account_number || ""} | ${item?.account_name || ""
                  }`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listChartOfAccounts.find(
                    (item: ChartOfAccountsType) =>
                      item?.id === vatCorrespondingAccount
                  )?.account_number || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {/* Nhóm HHDV mua vào */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={groupOfPurchasedGoods}
              // onChange={(id) => setGroupOfPurchasedGoods(id)}
              options={listGroupOfPurchasedGoods.map((item: any) => ({
                label: `${item?.code || ""} | ${item?.name || ""}`,
                value: item.id,
              }))}
              labelRender={() => (
                <p className="font-medium text-right">
                  {listGroupOfPurchasedGoods.find(
                    (item: any) => item?.id === groupOfPurchasedGoods
                  )?.code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <MdOutlineDeleteOutline
            className="text-2xl cursor-pointer"
            onClick={() => handleDeleteItemsOfAccounting(item?.id || undefined)}
          />
        </td>
      </tr>
    );
  };
