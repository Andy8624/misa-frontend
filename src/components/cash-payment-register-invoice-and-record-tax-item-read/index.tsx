import {
  ChartOfAccountsType,
  GroupOfPurchasedGoodsType,
  PartnerType,
  VatTaxType,
} from "@types";
import { customRound } from "@/utils/customRound";
import { formatDateToYYYYMMDD } from "@/utils/formatDateToYYYYMMDD";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";

export const CashPaymentRegisterInvoiceAndRecordTaxItemRead: React.FC<{
  index: number;
  item: any;
  listAccount: any[];
  handleChangeItemsOfAccounting: any;
  cashPaymentVoucherType: string;
  handleDeleteItemsOfAccounting: any;
  listPartner: any[];
  listBank: any[];
  listVatTax: VatTaxType[];
  listChartOfAccounts: ChartOfAccountsType[];
  listGroupOfPurchasedGoods: GroupOfPurchasedGoodsType[];
}> = ({
  index,
  item,
  listAccount,
  handleChangeItemsOfAccounting,
  cashPaymentVoucherType,
  handleDeleteItemsOfAccounting,
  listPartner,
  listBank,
  listVatTax,
  listChartOfAccounts,
  listGroupOfPurchasedGoods,
}) => {
    const [vatDescription, setVatDescription] = useState<string | undefined>(
      item?.vat_description || undefined
    );
    const [withInvoice, setWithInvoice] = useState<boolean>(
      item?.with_invoice || false
    );
    const [vat, setVat] = useState<string | undefined>(item?.vat || undefined);
    const [invoiceNumber, setInvoiceNumber] = useState<string | undefined>(
      item?.invoice_number || undefined
    );
    const [vatAccount, setVatAccount] = useState<string | undefined>();
    const [groupOfPurchasedGoods, setGroupOfPurchasedGoods] = useState<
      string | undefined
    >();
    const [supplier, setSupplier] = useState<string | undefined>();
    const [supplierName, setSupplierName] = useState<string | undefined>(
      item?.supplier_name || undefined
    );
    const [supplierTaxCode, setSupplierTaxCode] = useState<string | undefined>(
      item?.supplier_tax_code || undefined
    );
    const [invoiceDate, setInvoiceDate] = useState<string | undefined>(item?.invoice_date ? formatDateToYYYYMMDD(item?.invoice_date) : undefined);

    useEffect(() => {
      handleChangeItemsOfAccounting(
        {
          ...item,
          vat_description: vatDescription,
          with_invoice: withInvoice,
          vat,
          vat_account: vatAccount,
          invoice_date: invoiceDate,
          group_of_purchased_goods: groupOfPurchasedGoods,
          supplier,
          supplier_name: supplierName,
          supplier_tax_code: supplierTaxCode,
        },
        index
      );
    }, [
      vatDescription,
      withInvoice,
      vat,
      vatAccount,
      invoiceDate,
      groupOfPurchasedGoods,
      supplier,
      supplierName,
      supplierTaxCode,
    ]);

    const handleSelectSupplier = (id: string) => {
      const partner: PartnerType | undefined = listPartner.find(
        (partner: PartnerType) => partner?.id === id
      );
      if (partner) {
        setSupplier(id);
        if (supplier && supplierName) {
          setSupplierName(partner?.name || undefined);
        }
        if (supplier && supplierTaxCode) {
          setSupplierTaxCode(partner?.tax_code || undefined);
        }
      }
    };

    return (
      <tr className="border-t border-neutral-200">
        <td className="px-6 py-3 whitespace-nowrap">{index + 1}</td>
        <td className="px-6 py-4 min-w-[400px]">
          {/* Diễn giải thuế */}
          <input
            type="text"
            value={vatDescription}
            // onChange={(e) => setVatDescription(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-center">
          {/* Có hóa đơn */}
          <input
            type="checkbox"
            checked={withInvoice}
          // onChange={(e) => setWithInvoice(e.target.checked)}
          />
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
          <div className="h-9 min-w-[150px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={vat}
              // onChange={(id) => setVat(id)}
              options={listVatTax.map((item: any) => ({
                label: item?.name || "",
                value: item.id,
              }))}
            />
          </div>
        </td>
        <td className="px-8 py-3 whitespace-nowrap text-right">
          {customRound(
            ((item?.amount || 0) *
              (listVatTax.find((itemVatTax: VatTaxType) => itemVatTax?.id === vat)
                ?.percent || 0)) /
            100
          ).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
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
        <td className="px-6 py-3 whitespace-nowrap">
          {/* Ngày hóa đơn */}
          <input
            type="date"
            value={invoiceDate}
            // onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base text-center"
          />
        </td>
        <td className="px-6 py-3 whitespace-nowrap min-w-[200px]">
          {/* Số hóa đơn */}
          <input
            type="text"
            value={invoiceNumber}
            // onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
          {/* Nhóm HHDV mua vào */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={groupOfPurchasedGoods}
              // onChange={(id) => setGroupOfPurchasedGoods(id)}
              options={listGroupOfPurchasedGoods.map(
                (item: GroupOfPurchasedGoodsType) => ({
                  label: `${item?.code || ""} | ${item?.name || ""}`,
                  value: item.id,
                })
              )}
            />
          </div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
          {/* Mã NCC */}
          <div className="h-9 min-w-[200px] outline-none border rounded-md">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={supplier}
              // onChange={(id) => handleSelectSupplier(id)}
              options={listPartner.map((item: any) => ({
                label: `${item?.code || ""} | ${item?.name || ""}`,
                value: item.id,
              }))}
              labelRender={() => (
                <p>
                  {listPartner.find(
                    (itemOfPartner: any) => itemOfPartner?.id === supplier
                  )?.code || ""}
                </p>
              )}
            />
          </div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap min-w-[300px]">
          {/* Tên NCC */}
          <input
            type="text"
            value={supplierName}
            // onChange={(e) => setSupplierName(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
          {/* Mã số thuế NCC */}
          <input
            type="text"
            value={supplierTaxCode}
            // onChange={(e) => setSupplierTaxCode(e.target.value)}
            className="w-full h-8 px-2 border-none rounded outline-none bg-blue-50 text-base"
          />
        </td>
        <td className="px-6 py-4 text-right">
          <Button
            type="default"
            onClick={() => handleDeleteItemsOfAccounting(item?.id || undefined)}
          >
            Xoá
          </Button>
        </td>
      </tr>
    );
  };
