import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { ChartOfAccountsType, PartnerType, VatTaxType } from "@/types";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { InputItem } from "@/components/input-item";
import { InputText } from "@/components/input-text";
import { InputChartOfAccounts } from "@/components/input-chart-of-accounts";
import { InputSupplier } from "@/components/input-supplier";
import { customRound } from "@/utils/customRound";

export const ServicePurchaseVoucherItemsTax: React.FC<{
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
    const [itemName, setItemName] = useState<string | undefined>(
      item?.item_name || undefined
    );
    const [vatDescription, setVatDescription] = useState<string | undefined>();
    const [vat, setVat] = useState<string | undefined>(item?.vat || undefined);
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>(
      item?.invoice_number || undefined
    );
    const [invoiceDate, setInvoiceDate] = useState(
      item?.invoice_date || getCurrentDate()
    );
    const [groupOfPurchasedGoods, setGroupOfPurchasedGoods] = useState<
      string | undefined
    >();
    const [supplierId, setSupplierId] = useState<string | undefined>();
    const [supplierName, setSupplierName] = useState<string | undefined>(
      item?.supplier_name || undefined
    );
    const [supplierTaxCode, setSupplierTaxCode] = useState<string | undefined>(
      item?.supplier_tax_code || undefined
    );
    const [supplierAddress, setSupplierAddress] = useState<string | undefined>(
      item?.supplier_address || undefined
    );
    const [percentVat, setPercentVat] = useState<number>(
      listVatTax.find((itemVatTax: VatTaxType) => itemVatTax?.id === item?.vat)
        ?.percent || 0
    );

    useEffect(() => {
      handleUpdateItemList(
        {
          item_id: itemId,
          item_name: itemName,
          vat_description: vatDescription,
          vat,
          vat_account: vatAccount,
          invoice_number: invoiceNumber,
          invoice_date: invoiceDate,
          group_of_purchased_goods: groupOfPurchasedGoods,
          supplier_id: supplierId,
          supplier_name: supplierName,
          supplier_address: supplierAddress,
          supplier_tax_code: supplierTaxCode,
        },
        index
      );
    }, [
      itemId,
      itemName,
      vatDescription,
      vat,
      vatAccount,
      invoiceNumber,
      invoiceDate,
      groupOfPurchasedGoods,
      supplierId,
      supplierName,
      supplierAddress,
      supplierTaxCode,
    ]);

    useEffect(() => {
      if (item) {
        handleSelectItem(item?.item_id || undefined);
        if (item?.subject) {
          const subject = listPartner.find(
            (partner: PartnerType) => partner?.id === item?.subject
          );
          if (subject) {
            setSupplierId(subject?.id || undefined);
            setSupplierName(subject.name || undefined);
            setSupplierTaxCode(subject.tax_code || undefined);
            setSupplierAddress(subject.address || undefined);
          }
        }
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

    const handleSelectSupplier = (value: PartnerType) => {
      setSupplierId(value?.id || undefined);
      setSupplierName(value?.name || undefined);
      setSupplierTaxCode(value?.tax_code || undefined);
      setSupplierAddress(value?.address || undefined);
    };
    return (
      <tr className="bg-white border-b border-gray-200">
        <td scope="row" className="px-6 py-4 font-medium   whitespace-nowrap">
          <div className="h-10 min-w-[150px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputItem
              fieldDisplay="code"
              list={itemList}
              value={itemId}
              onChange={handleSelectItem}
            />
          </div>
        </td>
        <td className="px-6 py-4 min-w-[400px]">
          <InputText
            value={itemName}
            onChange={(value: string) => setItemName(value)}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[350px]">
          {/* Diễn giải thuế */}
          <InputText
            value={vatDescription}
            onChange={(value: string) => setVatDescription(value)}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[120px]">
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
        <td scope="col" className="px-6 py-3 whitespace-nowrap text-right">
          {/* Tiền thuế GTGT */}
          {customRound(
            (item?.quantity || 0) *
            (item?.unit_price || 0) *
            ((percentVat || 0) / 100)
          ).toLocaleString("vi-VN")}
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* TK thuế GTGT */}
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
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[150px]">
          {/* Số hóa đơn */}
          <InputText
            value={invoiceNumber}
            onChange={(value: string) => setInvoiceNumber(value)}
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
        <td scope="col" className="px-6 py-3 whitespace-nowrap">
          {/* Mã NCC */}
          <div className="h-10 min-w-[150px] outline-none border border-neutral-400 rounded-md overflow-hidden">
            <InputSupplier
              fieldDisplay="code"
              list={listPartner}
              value={supplierId}
              onChange={handleSelectSupplier}
            />
          </div>
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[300px]">
          {/* Tên NCC */}
          <InputText
            value={supplierName}
            onChange={(value: string) => setSupplierName(value)}
          />
        </td>
        <td scope="col" className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* Mã số thuế NCC */}
          <InputText
            value={supplierTaxCode}
            onChange={(value: string) => setSupplierTaxCode(value)}
          />
        </td>
        <td
          scope="col"
          className="px-6 py-3 whitespace-nowrap min-w-[300px] max-w-[500px]"
        >
          {/* Địa chỉ NCC */}
          <div className="overflow-hidden w-full">
            <InputText
              value={supplierAddress}
              onChange={(value: string) => setSupplierAddress(value)}
            />
          </div>
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
