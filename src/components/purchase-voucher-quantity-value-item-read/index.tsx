import {
  OPTION_PURCHASE_TYPE,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
} from "@/constants/constants";
import { OPTIONS_DISCOUNT } from "@/constants/constants";
import { OPTION_PAYMENT_STATUS } from "@/components/sales-voucher";
import { ChartOfAccountsType, VatTaxType } from "@/types";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const PurchaseVoucherQuantityValueItemRead: React.FC<{
  index: number;
  purchaseType: string;
  paymentStatus: string;
  discount: string;
  invoiceInclusion: string;
  paymentMethod: string;
  itemList: any[];
  listWarehouse: any[];
  listChartOfAccounts: ChartOfAccountsType[];
  listUnit: any[];
  listVatTax: any[];
  listGroupOfPurchasedGoods: any[];
  listCostClassification: any[];
  listConstruction: any[];
  handleChangeItemOfOfList: any;
  handleDeleteItemsOfAccounting: any;
  item: any;
  discountRateOnInvoiceValue: number;
}> = ({
  index,
  purchaseType,
  paymentStatus,
  discount,
  invoiceInclusion,
  paymentMethod,
  itemList,
  listWarehouse,
  listChartOfAccounts,
  listUnit,
  listVatTax,
  listGroupOfPurchasedGoods,
  listCostClassification,
  listConstruction,
  handleChangeItemOfOfList,
  handleDeleteItemsOfAccounting,
  item,
  discountRateOnInvoiceValue,
}) => {
    const [itemName, setItemName] = useState<string | undefined>();
    const [itemId, setItemId] = useState<string | undefined>();
    const [warehouse, setWarehouse] = useState<string | undefined>();
    const [inventoryAccount, setInventoryAccount] = useState<
      string | undefined
    >();
    const [accountPayable, setAccountPayable] = useState<string | undefined>();
    const [cashAccount, setCashAccount] = useState<string | undefined>();
    const [costAccount, setCostAccount] = useState<string | undefined>();
    const [unit, setUnit] = useState<string | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const [unitPrice, setUnitPrice] = useState<number | undefined>(0);
    const [amount, setAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [discountRate, setDiscountRate] = useState<number | undefined>(0);
    const [vatTaxId, setVatTaxId] = useState<string | undefined>();
    const [percentVat, setPercentVat] = useState<number>(0);
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [purchaseCost, setPurchaseCost] = useState<number>(0);
    const [costClassification, setCostClassification] = useState<
      string | undefined
    >();
    const [construction, setConstruction] = useState<string | undefined>();
    const [FOB, setFOB] = useState<number>(0);
    const [preCustomCost, setPreCustomCost] = useState<number>(0);
    const [groupOfPurchasedGoods, setGroupOfPurchasedGoods] = useState<
      string | undefined
    >();
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

    const handleSelectVatTax = (id: string) => {
      const vatTax = listVatTax.find((item: any) => item?.id === id);
      if (vatTax) {
        setVatTaxId(id);
        setPercentVat(vatTax?.percent || 0);
      }
    };

    // useEffect(() => {
    //   handleChangeItemOfOfList(
    //     {
    //       ...item,
    //       item_id: itemId,
    //       item_name: itemName,
    //       cost_account: costAccount,
    //       account_payable: accountPayable,
    //       cash_account: cashAccount,
    //       inventory_account: inventoryAccount,
    //       unit,
    //       quantity,
    //       unit_price: unitPrice,
    //       vat: vatTaxId,
    //       vat_account: vatAccount,
    //       group_of_purchased_goods: groupOfPurchasedGoods,
    //       purchase_cost: purchaseCost,
    //       pre_custom_cost: preCustomCost,
    //       fob: FOB,
    //       discount_rate: discountRate,
    //     },
    //     index
    //   );
    // }, [
    //   itemId,
    //   itemName,
    //   costAccount,
    //   accountPayable,
    //   cashAccount,
    //   inventoryAccount,
    //   unit,
    //   quantity,
    //   unitPrice,
    //   vatTaxId,
    //   vatAccount,
    //   groupOfPurchasedGoods,
    //   purchaseCost,
    //   preCustomCost,
    //   FOB,
    //   discountRate,
    // ]);

    useEffect(() => {
      if (item) {
        setItemId(item?.item_id || undefined);
        setItemName(item?.item_name || undefined);
        setCostAccount(item?.cost_account || undefined);
        setAccountPayable(item?.account_payable || undefined);
        setCashAccount(item?.cash_account || undefined);
        setInventoryAccount(item?.inventory_account || undefined);
        setUnit(item?.unit || undefined);
        setQuantity(item?.quantity || undefined);
        setUnitPrice(item?.unit_price || undefined);
        setVatTaxId(item?.vat?.id || undefined);
        setVatAccount(item?.vat_account || undefined);
        setGroupOfPurchasedGoods(item?.group_of_purchased_goods || undefined);
        setPurchaseCost(item?.purchase_cost || undefined);
        setPreCustomCost(item?.pre_custom_cost || undefined);
        setFOB(item?.fob || undefined);
        setDiscountRate(item?.discount_rate || undefined);
        setWarehouse(item?.warehouse || undefined);
      }
    }, [item]);

    useEffect(() => {
      if (listVatTax && vatTaxId) {
        const vat = listVatTax.find((vatItem: VatTaxType) => vatItem?.id === vatTaxId);
        setPercentVat(vat?.percent || 0);
      }
    }, [listVatTax, vatTaxId])

    useEffect(() => {
      if (discount === OPTIONS_DISCOUNT.INVOICE_VALUE.value) {
        setDiscountRate(discountRateOnInvoiceValue);
      }
    }, [discountRateOnInvoiceValue, discount]);

    useEffect(() => {
      if (discount === OPTIONS_DISCOUNT.NO.value) {
        setDiscountAmount(0);
      } else {
        setDiscountAmount((amount || 0) * ((discountRate || 0) / 100));
      }
    }, [discount, discountRate, amount]);

    useEffect(() => {
      setAmount((unitPrice || 0) * (quantity || 0));
    }, [quantity, unitPrice]);

    useEffect(() => {
      let total = (item?.quantity || 0) * (item?.unit_price || 0);
      let totalVat = total * ((item?.discount_rate || 0) / 100);
      let importTaxBase =
        total -
        totalVat +
        (item?.pre_customs_cost_in_accounting_currency || 0) +
        (item?.pre_customs_cost_in_foreign_currency || 0);
      let importTaxDuty = importTaxBase * ((item?.import_tax_rate || 0) / 100);
      setImportTaxDuty(importTaxDuty);
      setSpecialConsumptionTaxAmount(
        (importTaxDuty + importTaxBase) *
        ((item?.special_consumption_tax_rate || 0) / 100)
      );
    }, [item]);

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
                  {" "}
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
        {(purchaseType ===
          OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value ||
          purchaseType ===
          OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value) && (
            <>
              <td className="px-6 py-4 whitespace-nowrap min-w-[300px]">
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={warehouse}
                    // onChange={(value) => setWarehouse(value)}
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
                    value={inventoryAccount}
                    // onChange={(id) => setInventoryAccount(id)}
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
                            item?.id === inventoryAccount
                        )?.account_number || ""}
                      </p>
                    )}
                  />
                </div>
              </td>
            </>
          )}
        {paymentStatus ===
          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={accountPayable}
                  // onChange={(id) => setAccountPayable(id)}
                  options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                    label: `${item?.account_number || ""} | ${item?.account_name || ""
                      }`,
                    value: item.id,
                  }))}
                  labelRender={() => (
                    <p className="font-medium text-right">
                      {listChartOfAccounts.find(
                        (item: ChartOfAccountsType) => item?.id === accountPayable
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </td>
          )}
        {paymentStatus ===
          PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={cashAccount}
                  // onChange={(id) => setCashAccount(id)}
                  options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                    label: `${item?.account_number || ""} | ${item?.account_name || ""
                      }`,
                    value: item.id,
                  }))}
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
        {(purchaseType ===
          OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
            .value ||
          purchaseType ===
          OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
            .value) && (
            <td className="px-6 py-4">
              <div className="h-9 min-w-[200px] outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={costAccount}
                  // onChange={(id) => setCostAccount(id)}
                  options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
                    label: `${item?.account_number || ""} | ${item?.account_name || ""
                      }`,
                    value: item.id,
                  }))}
                  labelRender={() => (
                    <p className="font-medium text-right">
                      {listChartOfAccounts.find(
                        (item: ChartOfAccountsType) => item?.id === costAccount
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
              // onChange={(id) => setUnit(id)}
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
            // onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 min-w-[200px]">
          <input
            type="number"
            value={unitPrice}
            // onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
          />
        </td>
        <td className="px-6 py-4 w-[150px] text-right">
          {amount.toLocaleString("vi-VN")}
        </td>
        {discount !== OPTIONS_DISCOUNT.NO.value && (
          <>
            <td className="px-6 py-4 w-[150px] text-right">
              <input
                type="number"
                value={discountRate}
                // onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
              />
            </td>
            <td className="px-6 py-4 w-[150px] text-right">
              {(discountAmount || 0).toLocaleString("vi-VN")}
            </td>
          </>
        )}
        {invoiceInclusion ===
          PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE.value &&
          (purchaseType ===
            OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
              .value ||
            purchaseType ===
            OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value) && (
            <>
              <td className="px-6 py-4 text-right">
                <div className="h-9 min-w-[150px] outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={vatTaxId}
                    // onChange={(id) => handleSelectVatTax(id)}
                    options={listVatTax.map((item: any) => ({
                      label: item?.name || "",
                      value: item.id,
                    }))}
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                {((amount * percentVat) / 100).toLocaleString("vi-VN")}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="h-9 min-w-[200px] outline-none border rounded-md">
                  <Select
                    style={{ width: "100%", height: "100%" }}
                    variant="borderless"
                    value={vatAccount}
                    // onChange={(id) => setVatAccount(id)}
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
            </>
          )}
        {invoiceInclusion ===
          PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE.value &&
          (purchaseType ===
            OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
              .value ||
            purchaseType ===
            OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value) && (
            <td className="px-6 py-4 text-right">
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
          )}
        {purchaseType ===
          OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value && (
            <>
              <td className="px-6 py-4 w-[200px]">
                <input
                  type="number"
                  value={purchaseCost}
                  // onChange={(e) => setPurchaseCost(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                />
              </td>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                {(purchaseCost + amount - discountAmount).toLocaleString("vi-VN")}
              </th>
            </>
          )}
        {purchaseType ===
          OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
            .value && (
            <>
              {paymentMethod ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value && (
                  <>
                    <td className="px-6 py-4 w-[200px]">
                      {/* Khoản mục CP */}
                      <div className="h-9 min-w-[200px] outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={costClassification}
                          // onChange={(id) => setCostClassification(id)}
                          options={listCostClassification.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
                          labelRender={() => (
                            <p className="font-medium ">
                              {listCostClassification.find(
                                (item: any) => item?.id === costClassification
                              )?.code || ""}
                            </p>
                          )}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 w-[200px]">
                      {/* Công trình */}
                      <div className="h-9 min-w-[200px] outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={construction}
                          // onChange={(id) => setConstruction(id)}
                          options={listConstruction.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
                          labelRender={() => (
                            <p className="font-medium ">
                              {listConstruction.find(
                                (item: any) => item?.id === construction
                              )?.code || ""}
                            </p>
                          )}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 w-[200px]">
                      {/* Tên công trình */}
                      <p>
                        {listConstruction.find(
                          (item: any) => item?.id === construction
                        )?.name || ""}
                      </p>
                    </td>
                  </>
                )}
            </>
          )}
        {purchaseType ===
          OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value &&
          paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value && (
            <td className="px-6 py-4 min-w-[200px]">
              <input
                type="number"
                value={FOB}
                // onChange={(e) => setFOB(Number(e.target.value))}
                className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
              />
            </td>
          )}
        {purchaseType ===
          OPTION_PURCHASE_TYPE.INVENTORY_IN_IMPORTED_GOODS.value && (
            <>
              <td className="px-6 py-4 min-w-[200px]">
                {/* Phí trước hải quan */}
                <input
                  type="number"
                  value={preCustomCost}
                  // onChange={(e) => setPreCustomCost(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                />
              </td>
              <td className="px-6 py-4 min-w-[200px]">
                {/* Phí hàng về kho */}
                <input
                  type="number"
                  value={purchaseCost}
                  // onChange={(e) => setPurchaseCost(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                />
              </td>
              <td className="px-6 py-4 min-w-[200px] text-right">
                {/* Giá trị nhập kho */}
                {(
                  purchaseCost +
                  preCustomCost +
                  amount -
                  discountAmount +
                  importTaxDuty +
                  specialConsumptionTaxAmount
                ).toLocaleString("vi-VN")}
              </td>
            </>
          )}
        {purchaseType ===
          OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
            .value && (
            <>
              <td className="px-6 py-4 min-w-[200px]">
                {/* Phí trước hải quan */}
                <input
                  type="number"
                  value={preCustomCost}
                  // onChange={(e) => setPreCustomCost(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                />
              </td>
              <td className="px-6 py-4 min-w-[200px]">
                {/* Chi phí mua hàng */}
                <input
                  type="number"
                  value={purchaseCost}
                  // onChange={(e) => setPurchaseCost(Number(e.target.value))}
                  className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-right"
                />
              </td>
              <td className="px-6 py-4 min-w-[200px] text-right">
                {/* Giá trị nhập kho */}
                {(
                  purchaseCost +
                  preCustomCost +
                  amount -
                  discountAmount +
                  importTaxDuty +
                  specialConsumptionTaxAmount
                ).toLocaleString("vi-VN")}
              </td>
            </>
          )}
        <td className="px-6 py-4">
          <MdOutlineDeleteOutline
            className="text-2xl cursor-pointer"
            onClick={() => handleDeleteItemsOfAccounting(item?.id || "")}
          />
        </td>
      </tr>
    );
  };
