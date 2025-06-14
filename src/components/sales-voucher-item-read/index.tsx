import { OPTIONS_DISCOUNT } from "@/constants/constants";
import {
  OPTION_PAYMENT_METHOD,
  OPTION_PAYMENT_STATUS,
  OPTION_SALES_TYPE,
} from "@/components/sales-voucher";
import { ChartOfAccountsType } from "@/types";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const SalesVoucherItemRead: React.FC<{
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
    const [itemName, setItemName] = useState<string | undefined>();
    const [itemId, setItemId] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const [unitPrice, setUnitPrice] = useState<number | undefined>(0);
    const [amount, setAmount] = useState<number>(0);
    const [vatTax, setVatTax] = useState<
      { id: string; name: string; percent: number } | undefined
    >();
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();
    const [discountRate, setDiscountRate] = useState<number | undefined>(0);
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
    const [percentVat, setPercentVat] = useState<number>(0);
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
        setDiscountRate(undefined);
      }
    }, [discount]);

    useEffect(() => {
      setDiscountRate(percentDiscountInvoiceValue);
    }, [percentDiscountInvoiceValue]);

    // useEffect(() => {
    //   handleChangeItemOfOfList(
    //     {
    //       ...item,
    //       id: item.id,
    //       item_id: itemId,
    //       item_name: itemName,
    //       debit_account: debitAccount,
    //       credit_account: creditAccount,
    //       cash_account: cashAccount,
    //       liability_account: liabilityAccount,
    //       liability_account_or_expense_account: liabilityAccountOrExpenseAccount,
    //       sales_account: salesAccount,
    //       unit,
    //       quantity,
    //       unit_price: unitPrice,
    //       percent_vat: percentVat,
    //       vat_account: vatAccount,
    //       vat: vatTaxId || undefined,
    //       discount_rate: discountRate || 0,
    //       discount_account: discountAccount || undefined,
    //       unit_cost_of_sales: unitCostOfSales,
    //       cost_of_goods_sold: costOfGoodsSold,
    //       export_taxed_value: exportTaxedValue,
    //       percent_export_tax: percentExportTax,
    //       export_tax_account: exportTaxAccount,
    //     },
    //     index
    //   );
    // }, [
    //   itemId,
    //   itemName,
    //   debitAccount,
    //   creditAccount,
    //   cashAccount,
    //   liabilityAccount,
    //   liabilityAccountOrExpenseAccount,
    //   salesAccount,
    //   unit,
    //   quantity,
    //   unitPrice,
    //   percentVat,
    //   vatAccount,
    //   vatTax,
    //   discountRate,
    //   discountAccount,
    //   unitCostOfSales,
    //   costOfGoodsSold,
    //   exportTaxedValue,
    //   percentExportTax,
    //   exportTaxAccount,
    // ]);

    useEffect(() => {
      if (item?.id) {
        setItemId(item?.item_id || undefined);
        setItemName(item?.item_name || undefined);
        setDebitAccount(item?.debit_account || undefined);
        setCreditAccount(item?.credit_account || undefined);
        setCashAccount(item?.cash_account || undefined);
        setLiabilityAccount(item?.liability_account || undefined);
        setLiabilityAccountOrExpenseAccount(
          item?.liability_account_or_expense_account || undefined
        );
        setSalesAccount(item?.sales_account || undefined);
        setUnit(item?.unit || undefined);
        setQuantity(item?.quantity === 0 ? 0 : item?.quantity || undefined);
        setUnitPrice(item?.unit_price === 0 ? 0 : item?.unit_price || undefined);
        setPercentVat(item?.percent_vat || 0);
        setVatAccount(item?.vat_account || undefined);
        setVatTax(item?.vat_tax || undefined);
        setDiscountRate(
          item?.discount_rate === 0 ? 0 : item?.discount_rate || undefined
        );
        setDiscountAccount(item?.discount_account || undefined);
        setUnitCostOfSales(item?.unit_cost_of_sales || undefined);
        setCostOfGoodsSold(item?.cost_of_goods_sold || undefined);
        setExportTaxedValue(item?.export_taxed_value || undefined);
        setPercentExportTax(item?.percent_export_tax || undefined);
        setExportTaxAccount(item?.export_tax_account || undefined);
        handleSelectItem(item?.item_id || undefined);
      }
    }, [item]);

    const handleSelectItem = (id: string) => {
      const itemService = itemList.find((item: any) => item?.id === id);
      if (itemService) {
        setItemName(itemService?.name || undefined);
        setItemId(itemService?.id || undefined);
        setVatTax(itemService?.vat_tax || undefined);
        setDiscountAccount(itemService?.discount_account || undefined);
      }
    };

    const handleCalculator = () => {
      const amount: number =
        (unitPrice || 0) * (quantity || 0) -
        (unitPrice || 0) * (quantity || 0) * ((discountRate || 0) / 100);
      setAmount(amount);
      setDiscountAmount(
        (unitPrice || 0) * (quantity || 0) * ((discountRate || 0) / 100)
      );
    };

    const handleKeyPress = (e: any) => {
      if (e.key === "Enter") {
        handleCalculator();
      }
    };

    const handleSelectVatTax = (id: string) => {
      const vatTax = listVatTax.find((item: any) => item?.id === id);
      if (vatTax) {
        setVatTaxId(id);
        setPercentVat(vatTax?.percent || 0);
      }
    };

    return (
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap min-w-[300px]">
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={itemId}
              onChange={(value) => handleSelectItem(value)}
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
            onChange={(e) => setItemName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        {((paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value) ||
          (paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
            saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value &&
            paymentMethod === OPTION_PAYMENT_METHOD.CASH.value)) && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={liabilityAccount}
                  onChange={(id) => setLiabilityAccount(id)}
                  options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                    label: `${item?.account_number || ""} | ${item?.account_name || ""
                      }`,
                    value: item.id,
                  }))}
                  labelRender={() => (
                    <p className="font-medium text-right">
                      {listChartOfAccounts.find(
                        (item: ChartOfAccountsType) => item?.id === liabilityAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          (saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
            saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value) && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={salesAccount}
                  onChange={(id) => setSalesAccount(id)}
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
                        (item: ChartOfAccountsType) => item?.id === salesAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
          saleType === OPTION_SALES_TYPE.EXPORTED_GOODS_SALES.value && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={liabilityAccountOrExpenseAccount}
                  onChange={(id) => setLiabilityAccountOrExpenseAccount(id)}
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
                          item?.id === liabilityAccountOrExpenseAccount
                      )?.account_number || ""}
                    </p>
                  )}
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
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={debitAccount}
                    onChange={(id) => setDebitAccount(id)}
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
                          (item: ChartOfAccountsType) => item?.id === debitAccount
                        )?.account_number || ""}
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
                    onChange={(id) => setCreditAccount(id)}
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
                          (item: ChartOfAccountsType) => item?.id === creditAccount
                        )?.account_number || ""}
                      </p>
                    )}
                  />
                </div>
              </td>
            </>
          )}
        {paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
          paymentMethod === OPTION_PAYMENT_METHOD.CASH.value &&
          saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={cashAccount}
                  onChange={(id) => setCashAccount(id)}
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
                        (item: ChartOfAccountsType) => item?.id === cashAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          )}
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
            onBlur={handleCalculator}
            onKeyPress={handleKeyPress}
          />
        </td>
        <td className="px-6 py-4 min-w-[200px]">
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
            onBlur={handleCalculator}
            onKeyPress={handleKeyPress}
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
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
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
              <input
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                onBlur={handleCalculator}
                onKeyPress={handleKeyPress}
              />
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              {discountAmount?.toLocaleString("vi-VN")}
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
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
              <div className="h-9 min-w-[150px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={vatTaxId}
                  onChange={(id) => handleSelectVatTax(id)}
                  options={listVatTax.map((item: any) => ({
                    label: item?.name || "",
                    value: item.id,
                  }))}
                />
              </div>
            </td>
            {(saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value ||
              saleType === OPTION_SALES_TYPE.CONSIGNMENT_SALES.value) && (
                <td className="px-6 py-4 text-right">
                  {((amount * percentVat) / 100).toLocaleString("vi-VN")}
                </td>
              )}
            {paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
              saleType === OPTION_SALES_TYPE.DOMESTIC_GOODS_SALES.value && (
                <td className="px-6 py-4 text-right">
                  <div className="h-9 min-w-[200px] outline-none border rounded-md">
                    <Select
                      style={{ width: "100%", height: "100%" }}
                      variant="borderless"
                      value={vatAccount}
                      onChange={(id) => setVatAccount(id)}
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
                            (item: ChartOfAccountsType) => item?.id === vatAccount
                          )?.account_number || ""}
                        </p>
                      )}
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
