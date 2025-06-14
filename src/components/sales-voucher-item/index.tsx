import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputItem } from "@/components/input-item";
import { InputNumber } from "@/components/input-number";
import { InputText } from "@/components/input-text";
import {
  OPTION_PAYMENT_METHOD,
  OPTION_PAYMENT_STATUS,
  OPTION_SALES_TYPE,
} from "@/components/sales-voucher";
import { ChartOfAccountsType, ItemType, VatTaxType } from "@/types";
import { customRound } from "@/utils/customRound";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherItem: React.FC<{
  index: number;
  itemList: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  item: any;
  discount: string;
  percentDiscountInvoiceValue: number;
  saleType: string;
  paymentStatus: string;
  paymentMethod: string;
  listVatTax: any[];
}> = ({
  itemList,
  index,
  handleChangeItemOfOfList,
  handleDeleteItemsOfAccounting,
  listChartOfAccounts,
  listUnit,
  item,
  discount,
  percentDiscountInvoiceValue,
  saleType,
  paymentStatus,
  paymentMethod,
  listVatTax,
}) => {
    const [itemName, setItemName] = useState<string | undefined>(
      item?.item_name || undefined
    );
    const [itemId, setItemId] = useState<string | undefined>();
    const [serviceCode, setServiceCode] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>(
      Number(item?.quantity || "1")
    );
    const [unitPrice, setUnitPrice] = useState<number | undefined>(
      Number(item?.unit_price || "0")
    );
    const [amount, setAmount] = useState<number>(0);
    const [vatTax, setVatTax] = useState<
      { id: string; name: string; percent: number } | undefined
    >();
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();
    const [discountRate, setDiscountRate] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number | undefined>();
    const [discountAccount, setDiscountAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [cashAccount, setCashAccount] = useState<string | undefined>();
    const [
      liabilityAccountOrExpenseAccount,
      setLiabilityAccountOrExpenseAccount,
    ] = useState<string | undefined>();
    const [salesAccount, setSalesAccount] = useState<string | undefined>();
    const [liabilityAccount, setLiabilityAccount] = useState<
      string | undefined
    >();
    const [unitCostOfSales, setUnitCostOfSales] = useState<number>(0);
    const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(0);
    const [vatTaxId, setVatTaxId] = useState<string | undefined>();
    const [exportTaxedValue, setExportTaxedValue] = useState<number>();
    const [percentExportTax, setPercentExportTax] = useState<number>();
    const [exportTaxAccount, setExportTaxAccount] = useState<string>();

    useEffect(() => {
      if (item?.item_id) {
        const itemTmp = itemList.find(
          (itemOfList) => itemOfList?.id === item?.item_id
        );
        setItemId(itemTmp?.id || undefined);
        setItemName(itemTmp?.name || undefined);
        if (item?.unit) {
          setUnit(item.unit);
        }
        if (item?.quantity) {
          setQuantity(item.quantity);
        }
      }
    }, [item]);

    useEffect(() => {
      if (listChartOfAccounts.length > 0) {
        const debitAccountTmp = listChartOfAccounts.find(
          (item: any) => item?.account_code === "131"
        );
        const creditAccountTmp = listChartOfAccounts.find(
          (item: any) => item?.account_code === "5113"
        );
        const vatAccountTmp = listChartOfAccounts.find(
          (item: any) => item?.account_code === "33311"
        );
        if (debitAccountTmp) {
          setDebitAccount(debitAccountTmp.id);
        }
        if (creditAccountTmp) {
          setCreditAccount(creditAccountTmp.id);
        }
        if (vatAccountTmp) {
          setVatAccount(vatAccountTmp?.id);
        }
      }
    }, [listChartOfAccounts]);

    useEffect(() => {
      if (discount === OPTIONS_DISCOUNT.PERCENT_INVOICE_VALUE.value) {
        setDiscountRate(0);
      }
    }, [discount]);

    useEffect(() => {
      setDiscountRate(percentDiscountInvoiceValue);
    }, [percentDiscountInvoiceValue]);

    useEffect(() => {
      handleChangeItemOfOfList(
        {
          ...item,
          id: item.id,
          item_id: itemId,
          item_name: itemName,
          debit_account: debitAccount,
          credit_account: creditAccount,
          cash_account: cashAccount,
          liability_account: liabilityAccount,
          liability_account_or_expense_account: liabilityAccountOrExpenseAccount,
          sales_account: salesAccount,
          unit,
          quantity,
          unit_price: unitPrice,
          vat_account: vatAccount,
          vat: vatTaxId || undefined,
          discount_rate: discountRate || 0,
          discount_account: discountAccount || undefined,
          unit_cost_of_sales: unitCostOfSales,
          cost_of_goods_sold: costOfGoodsSold,
          export_taxed_value: exportTaxedValue,
          percent_export_tax: percentExportTax,
          export_tax_account: exportTaxAccount,
        },
        index
      );
    }, [
      itemId,
      itemName,
      debitAccount,
      creditAccount,
      cashAccount,
      liabilityAccount,
      liabilityAccountOrExpenseAccount,
      salesAccount,
      unit,
      quantity,
      unitPrice,
      vatAccount,
      vatTax,
      discountRate,
      discountAccount,
      unitCostOfSales,
      costOfGoodsSold,
      exportTaxedValue,
      percentExportTax,
      exportTaxAccount,
    ]);

    const handleSelectItem = (value: ItemType) => {
      setItemName(value?.name || undefined);
      setItemId(value?.id || undefined);
      setVatTax(value?.vat_tax || undefined);
    };

    const handleCalculator = () => {
      const amount: number = customRound(
        (unitPrice || 0) * (quantity || 0) -
        (unitPrice || 0) * (quantity || 0) * ((discountRate || 0) / 100)
      );
      setAmount(amount);
      setDiscountAmount(
        (unitPrice || 0) * (quantity || 0) * ((discountRate || 0) / 100)
      );
    };

    useEffect(() => {
      handleCalculator();
    }, [unitPrice, quantity, vatTaxId]);

    const handleKeyPress = (e: any) => {
      if (e.key === "Enter") {
        handleCalculator();
      }
    };

    const handleSelectVatTax = (id: string) => {
      const vatTax = listVatTax.find((item: any) => item?.id === id);
      if (vatTax) {
        setVatTaxId(id);
      }
    };

    useEffect(() => {
      if (item?.vat_rate && listVatTax.length > 0) {
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) =>
            itemVatTax?.percent === Number(item.vat_rate.replace("%", ""))
        );
        setVatTaxId(vat?.id || undefined);
        handleChangeItemOfOfList(
          {
            ...item,
            vat_rate: undefined,
            vat: vat?.id || undefined,
          },
          index
        );
      }
    }, [item?.vat_rate, listVatTax]);

    return (
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
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
        {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value) ||
          (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
            saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value &&
            paymentMethod === OPTION_PAYMENT_METHOD.CASH.value)) && (
            <td className="px-6 py-4">
              <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                <InputChartOfAccounts
                  list={listChartOfAccounts}
                  value={liabilityAccount}
                  onChange={(value: ChartOfAccountsType) =>
                    setLiabilityAccount(value?.id || undefined)
                  }
                />
              </div>
            </td>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
            saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value) && (
            <td className="px-6 py-4">
              <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                <InputChartOfAccounts
                  list={listChartOfAccounts}
                  value={salesAccount}
                  onChange={(value: ChartOfAccountsType) =>
                    setSalesAccount(value?.id || undefined)
                  }
                />
              </div>
            </td>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value && (
            <td className="px-6 py-4">
              <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                <InputChartOfAccounts
                  list={listChartOfAccounts}
                  value={liabilityAccountOrExpenseAccount}
                  onChange={(value: ChartOfAccountsType) =>
                    setLiabilityAccountOrExpenseAccount(value?.id || undefined)
                  }
                />
              </div>
            </td>
          )}
        {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          (saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value ||
            saleType ===
            OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value)) ||
          (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
            paymentMethod === OPTION_PAYMENT_METHOD.DEPOSIT.value &&
            (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
              saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value))) && (
            <>
              <td className="px-6 py-4">
                <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
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
                <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                  <InputChartOfAccounts
                    list={listChartOfAccounts}
                    value={creditAccount}
                    onChange={(value: ChartOfAccountsType) =>
                      setCreditAccount(value?.id || undefined)
                    }
                  />
                </div>
              </td>
            </>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
          paymentMethod === OPTION_PAYMENT_METHOD.CASH.value &&
          saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
            <td className="px-6 py-4">
              <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                <InputChartOfAccounts
                  list={listChartOfAccounts}
                  value={cashAccount}
                  onChange={(value: ChartOfAccountsType) =>
                    setCashAccount(value?.id || undefined)
                  }
                />
              </div>
            </td>
          )}
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
        <td className="px-6 py-4 min-w-[200px]">
          <InputNumber
            value={unitPrice}
            onChange={(value: number) => setUnitPrice(value)}
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {amount.toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {(unitCostOfSales || 0).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {(costOfGoodsSold || 0).toLocaleString("vi-VN")}
        </td>
        {(saleType === OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value ||
          saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value) && (
            <>
              <td className="px-6 py-4 w-[150px] text-right">
                <input
                  type="number"
                  value={exportTaxedValue}
                  onChange={(e) => setExportTaxedValue(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                  onBlur={handleCalculator}
                  onKeyPress={handleKeyPress}
                />
              </td>
              <td className="px-6 py-4 w-[150px] text-right">
                <input
                  type="number"
                  value={percentExportTax}
                  onChange={(e) => setPercentExportTax(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                  onBlur={handleCalculator}
                  onKeyPress={handleKeyPress}
                />
              </td>
              <td className="px-6 py-4 w-[150px] text-right">
                {(
                  ((exportTaxedValue || 0) * (percentExportTax || 0)) /
                  100
                ).toLocaleString("vi-VN")}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={exportTaxAccount}
                    onChange={(id) => setExportTaxAccount(id)}
                    options={listChartOfAccounts.map(
                      (item: ChartOfAccountsType) => ({
                        label: `${item?.account_number || ""} | ${item?.account_name || ""
                          }`,
                        value: item.id,
                      })
                    )}
                    labelRender={() => (
                      <p className="font-medium text-right">
                        {listChartOfAccounts.find(
                          (item: ChartOfAccountsType) =>
                            item?.id === exportTaxAccount
                        )?.account_number || ""}
                      </p>
                    )}
                  />
                </div>
              </td>
            </>
          )}
        {discount !== OPTIONS_DISCOUNT.NO.value && (
          <>
            <td className="px-6 py-4 w-[150px] text-right">
              <InputNumber
                value={discountRate}
                onChange={(value: number) => setDiscountRate(value)}
              />
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              {customRound(
                ((quantity || 0) * (unitPrice || 0) * (discountRate || 0)) / 100
              ).toLocaleString("vi-VN")}
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              <div className="h-10 min-w-[200px] outline-none border border-neutral-400 rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={discountAccount}
                  onChange={(id) => setDiscountAccount(id)}
                  options={listChartOfAccounts.map(
                    (item: ChartOfAccountsType) => ({
                      label: `${item?.account_number || ""} | ${item?.account_name || ""
                        }`,
                      value: item.id,
                    })
                  )}
                  labelRender={() => (
                    <p className="font-medium text-right">
                      {listChartOfAccounts.find(
                        (item: ChartOfAccountsType) =>
                          item?.id === discountAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          </>
        )}
        {saleType !== OPTION_SALES_TYPE.ENTRUSTED_EXPORT_SERVICE_SALES.value && (
          <>
            <td className="px-6 py-4 text-right">
              <div className="h-10 min-w-[80px] outline-none border border-neutral-400 rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={vatTaxId}
                  onChange={(id) => handleSelectVatTax(id)}
                  options={listVatTax.map((item: any) => ({
                    label: item?.name || "",
                    value: item.id,
                  }))}
                  labelRender={({ label }) => (
                    <p className="text-left">{label}</p>
                  )}
                />
              </div>
            </td>
            {(saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
              saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value) && (
                <td className="px-6 py-4 text-right">
                  {customRound(
                    (amount *
                      (listVatTax.find(
                        (itemVatTax: VatTaxType) => itemVatTax?.id === vatTaxId
                      )?.percent || 0)) /
                    100
                  ).toLocaleString("vi-VN")}
                </td>
              )}
            {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
              saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                <td className="px-6 py-4 text-right">
                  <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md overflow-hidden">
                    <InputChartOfAccounts
                      list={listChartOfAccounts}
                      value={vatAccount}
                      onChange={(value: ChartOfAccountsType) =>
                        setVatAccount(value?.id || undefined)
                      }
                    />
                  </div>
                </td>
              )}
          </>
        )}
        <td>
          <Button onClick={() => handleDeleteItemsOfAccounting(item.id)}>
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
