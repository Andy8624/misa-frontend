import { OPTIONS_SA_SERVICE_DISCOUNT } from "@/constants/constants";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputNumber } from "@/components/input-number";
import { InputText } from "@/components/input-text";
import { ChartOfAccountsType, VatTaxType } from "@types";
import { customRound } from "@/utils/customRound";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const ProvisionPurchaseVoucherTableRow: React.FC<{
  index: number;
  itemList: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  item: any;
  discount: string;
  percentDiscountInvoiceValue: number;
  listVatTax: VatTaxType[];
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
  listVatTax,
}) => {
    const [serviceName, setServiceName] = useState<string | undefined>(
      item?.item_name || undefined
    );
    const [serviceId, setServiceId] = useState<string | undefined>();
    const [serviceCode, setServiceCode] = useState<string | undefined>();
    const [debitAccount, setDebitAccount] = useState<string | undefined>();
    const [creditAccount, setCreditAccount] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>(
      Number(item?.quantity || "1")
    );
    const [unitPrice, setUnitPrice] = useState<number | undefined>(
      Number(item?.unit_price || "0")
    );
    const [amount, setAmount] = useState<number>(0);
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();
    const [discountRate, setDiscountRate] = useState<number | undefined>(0);
    const [discountAmount, setDiscountAmount] = useState<number | undefined>();
    const [discountAccount, setDiscountAccount] = useState<number | undefined>();
    const [vat, setVat] = useState<string | undefined>(item?.vat || undefined);

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
          setVatAccount(vatAccountTmp.id);
        }
      }
    }, [listChartOfAccounts]);

    useEffect(() => {
      if (discount === OPTIONS_SA_SERVICE_DISCOUNT.PERCENT_INVOICE_VALUE.value) {
        setDiscountRate(undefined);
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
          item_id: serviceId,
          item_name: serviceName,
          debit_account: debitAccount,
          credit_account: creditAccount,
          unit,
          quantity,
          unit_price: unitPrice,
          vat_account: vatAccount,
          vat: vat,
          discount_rate: discountRate || 0,
          discount_account: discountAccount || undefined,
        },
        index
      );
    }, [
      serviceId,
      serviceName,
      debitAccount,
      creditAccount,
      quantity,
      unitPrice,
      vatAccount,
      unit,
      discountRate,
      discountAccount,
      vat,
    ]);

    const handleSelectItem = (id: string) => {
      const itemService = itemList.find((item: any) => item?.id === id);
      if (itemService) {
        setServiceName(itemService?.name || undefined);
        setServiceId(itemService?.id || undefined);
        setServiceCode(itemService?.code || undefined);
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

    useEffect(() => {
      if (item?.vat_rate && listVatTax.length > 0) {
        const vat = listVatTax.find(
          (itemVatTax: VatTaxType) =>
            itemVatTax?.percent === Number(item.vat_rate.replace("%", ""))
        );
        setVat(vat?.id || undefined);
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
        <td className="px-6 py-4 whitespace-nowrap min-w-[300px]">
          <div className="h-10 min-w-[150px] outline-none border border-neutral-400 rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={serviceId}
              onChange={(value) => handleSelectItem(value)}
              options={itemList.map((item: any) => ({
                label: `${item?.code || ""} | ${item?.name || ""}`,
                value: item.id,
              }))}
              labelRender={() => <p>{serviceCode}</p>}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[400px]">
          <InputText
            value={serviceName}
            onChange={(value: string) => setServiceName(value)}
          />
        </td>
        <td className="px-6 py-4">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md">
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
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md">
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
        <td className="px-6 py-4 min-w-[150px]">
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
          {customRound((quantity || 0) * (unitPrice || 0)).toLocaleString(
            "vi-VN"
          )}
        </td>
        {discount !== OPTIONS_SA_SERVICE_DISCOUNT.NO.value && (
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
              {customRound(
                ((quantity || 0) * (unitPrice || 0) * (discountRate || 0)) / 100
              ).toLocaleString("vi-VN")}
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={discountAccount}
                  onChange={(id) => setDiscountAccount(Number(id))}
                  options={listChartOfAccounts.map((item: any) => ({
                    label: `${item?.account_code || ""} | ${item?.account_name || ""
                      }`,
                    value: item.id,
                  }))}
                  labelRender={() => (
                    <p className="font-medium text-right">
                      {listChartOfAccounts.find(
                        (item: any) => item?.id === discountAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          </>
        )}
        <td className="px-6 py-4 text-right">
          <div className="h-10 min-w-[80px] outline-none border border-neutral-400 rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={vat}
              onChange={(id) => setVat(id)}
              options={listVatTax.map((item: any) => ({
                label: item?.name || "",
                value: item.id,
              }))}
              labelRender={({ label }) => <p className="text-left">{label}</p>}
            />
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          {customRound(
            (((quantity || 0) * (unitPrice || 0) -
              ((quantity || 0) * (unitPrice || 0) * (discountRate || 0)) / 100) *
              (listVatTax.find((itemVatTax: VatTaxType) => itemVatTax?.id === vat)
                ?.percent || 0)) /
            100
          ).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="h-10 min-w-[125px] outline-none border border-neutral-400 rounded-md">
            <InputChartOfAccounts
              list={listChartOfAccounts}
              value={vatAccount}
              onChange={(value: ChartOfAccountsType) =>
                setVatAccount(value?.id || undefined)
              }
            />
          </div>
        </td>
        <td>
          <Button onClick={() => handleDeleteItemsOfAccounting(item.id)}>
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
