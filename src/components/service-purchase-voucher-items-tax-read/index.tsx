import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { ChartOfAccountsType, PartnerType, VatTaxType } from "@/types";

export const ServicePurchaseVoucherItemsTaxRead: React.FC<{
  itemList: any[];
  handleDeleteItemOfAccounting: any;
  index: number;
  listPartner: PartnerType[];
  listChartOfAccounts: ChartOfAccountsType[];
  handleUpdateItemList: any;
  listVatTax: VatTaxType[];
  item: any;
}> = ({
  itemList,
  handleDeleteItemOfAccounting,
  index,
  listPartner,
  listChartOfAccounts,
  handleUpdateItemList,
  listVatTax,
  item,
}) => {
    const [itemId, setItemId] = useState<string | undefined>();
    const [itemName, setItemName] = useState<string | undefined>();
    const [vatDescription, setVatDescription] = useState<string | undefined>();
    const [vat, setVat] = useState<string | undefined>();
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>();
    const [invoiceDate, setInvoiceDate] = useState<string | undefined>();
    const [groupOfPurchasedGoods, setGroupOfPurchasedGoods] = useState<
      string | undefined
    >();
    const [supplierId, setSupplierId] = useState<string | undefined>();
    const [supplierName, setSupplierName] = useState<string | undefined>();
    const [supplierTaxCode, setSupplierTaxCode] = useState<string | undefined>();
    const [supplierAddress, setSupplierAddress] = useState<string | undefined>();
    const [percentVat, setPercentVat] = useState<number>(0);

    // useEffect(() => {
    //   handleUpdateItemList(
    //     {
    //       item_id: itemId,
    //       item_name: itemName,
    //       vat_description: vatDescription,
    //       vat,
    //       vat_account: vatAccount,
    //       invoice_number: invoiceNumber,
    //       invoice_date: invoiceDate,
    //       group_of_purchased_goods: groupOfPurchasedGoods,
    //       supplier_id: supplierId,
    //       supplier_name: supplierName,
    //       supplier_address: supplierAddress,
    //       supplier_tax_code: supplierTaxCode,
    //     },
    //     index
    //   );
    // }, [
    //   itemId,
    //   itemName,
    //   vatDescription,
    //   vat,
    //   vatAccount,
    //   invoiceNumber,
    //   invoiceDate,
    //   groupOfPurchasedGoods,
    //   supplierId,
    //   supplierName,
    //   supplierAddress,
    //   supplierTaxCode,
    // ]);

    useEffect(() => {
      if (item?.id) {
        setItemId(item?.item_id || undefined);
        setItemName(item?.item_name || undefined);
        setVatDescription(item?.vat_description || undefined);
        setVat(item?.vat?.id || undefined);
        setPercentVat(item?.vat?.percent || 0);
        setVatAccount(item?.vat_account || undefined);
        setInvoiceNumber(item?.invoice_number || undefined);
        const invoiceDate = item?.invoice_date
          ? new Date(item?.invoice_date)
          : undefined;
        setInvoiceDate(
          invoiceDate
            ? `${invoiceDate.getFullYear()}-${invoiceDate.getMonth() + 1 < 10
              ? "0" + (invoiceDate.getMonth() + 1)
              : invoiceDate.getMonth() + 1
            }-${invoiceDate.getDate() < 10
              ? "0" + invoiceDate.getDate()
              : invoiceDate.getDate()
            }`
            : undefined
        );
        setGroupOfPurchasedGoods(item?.group_of_purchased_goods || undefined);
        setSupplierId(item?.supplier_id || undefined);
        setSupplierName(item?.supplier_name || undefined);
        setSupplierAddress(item?.supplier_address || undefined);
        setSupplierTaxCode(item?.supplier_tax_code || undefined);
      }
    }, [item]);

    const handleSelectItem = (id: string) => {
      const item = itemList.find((itemL: any) => itemL?.id === id);
      if (item) {
        setItemId(id);
        setItemName(item?.name || "");
        setVatDescription(`Thuế GTGT - ${item?.name || ""}`);
      }
    };
    const handleSelectVat = (value: string) => {
      const vat = listVatTax.find((item: VatTaxType) => item?.id === value);
      if (vat) {
        setVat(value);
        setPercentVat(vat?.percent || 0);
      }
    };

    const handleSelectSupplier = (id: string) => {
      const supplier: PartnerType | undefined = listPartner.find(
        (item: PartnerType) => item?.id === id
      );
      if (supplier) {
        setSupplierId(id);
        setSupplierName(supplier?.name || undefined);
        setSupplierTaxCode(supplier?.tax_code || undefined);
        setSupplierAddress(supplier?.address || undefined);
      }
    };
    return (
      <tr className="bg-white border-b border-gray-200">
        <td
          scope="row"
          className="px-6 py-4 font-medium   whitespace-nowrap min-w-[150px]"
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
        </td>
        <td className="px-6 py-4 min-w-[300px]">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[300px]">
          {/* Diễn giải thuế */}
          <input
            type="text"
            value={vatDescription}
            onChange={(e) => setVatDescription(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* % thuế GTGT */}
          <Select
            style={{ width: "100%" }}
            value={vat}
            onChange={(value: string) => handleSelectVat(value)}
            options={listVatTax.map((item: VatTaxType) => ({
              label: item?.name || "",
              value: item.id,
            }))}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[150px]">
          {/* Tiền thuế GTGT	 */}
          {(
            (item?.quantity || 0) *
            (item?.unit_price || 0) *
            (percentVat / 100)
          ).toLocaleString("vi-VN")}
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* TK thuế GTGT */}
          <Select
            style={{ width: "100%" }}
            value={vatAccount}
            onChange={(value: string) => setVatAccount(value)}
            options={listChartOfAccounts.map((item: ChartOfAccountsType) => ({
              label: `${item?.account_number || ""} | ${item?.account_name || ""
                }`,
              value: item.id,
            }))}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[150px]">
          {/* Số hóa đơn */}
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap">
          {/* Ngày hóa đơn */}
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[150px]">
          {/* Nhóm HHDV mua vào */}
          <input
            type="text"
            value={groupOfPurchasedGoods}
            onChange={(e) => setGroupOfPurchasedGoods(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[150px]">
          {/* Mã NCC */}
          <Select
            style={{ width: "100%" }}
            value={supplierId}
            onChange={handleSelectSupplier}
            options={listPartner.map((item: any) => ({
              label: `${item?.code || ""} | ${item?.name || ""}`,
              value: item.id,
            }))}
            labelRender={() => (
              <p>
                {listPartner.find((item: PartnerType) => item?.id === supplierId)
                  ?.code || ""}
              </p>
            )}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* Tên NCC */}
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px">
          {/* Mã số thuế NCC */}
          <input
            type="text"
            value={supplierTaxCode}
            onChange={(e) => setSupplierTaxCode(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px">
          {/* Địa chỉ NCC */}
          <input
            type="text"
            value={supplierAddress}
            onChange={(e) => setSupplierAddress(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
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
