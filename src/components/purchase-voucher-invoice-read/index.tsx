import { PartnerType } from "@/types";
import { Select } from "antd";
export const PurchaseVoucherInvoiceRead: React.FC<{
  listSupplier: PartnerType[];
  supplier: string | undefined;
  supplierName: string | undefined;
  setSupplierName: any;
  supplierAddress: string | undefined;
  setSupplierAddress: any;
  handleSelectSupplier: any;
  supplierTaxCode: string | undefined;
  setSupplierTaxCode: any;
  invoiceForm: string | undefined;
  setInvoiceForm: any;
  invoiceSign: string | undefined;
  setInvoiceSign: any;
  invoiceNumber: string | undefined;
  setInvoiceNumber: any;
  invoiceDate: string | undefined;
  setInvoiceDate: any;
}> = ({
  listSupplier,
  supplier,
  supplierName,
  setSupplierName,
  supplierAddress,
  setSupplierAddress,
  handleSelectSupplier,
  supplierTaxCode,
  setSupplierTaxCode,
  invoiceForm,
  setInvoiceForm,
  invoiceSign,
  setInvoiceSign,
  invoiceNumber,
  setInvoiceNumber,
  invoiceDate,
  setInvoiceDate,
}) => {
    return (
      <div>
        <div className="flex items-start">
          <div className="grid grid-cols-2 gap-4 flex-grow-1 pr-10">
            <div>
              <p className="font-semibold">Mã nhà cung cấp</p>
              <div className="h-11 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  value={supplier}
                  // onChange={handleSelectSupplier}
                  options={listSupplier.map((item: any) => ({
                    label: `${item?.code || ""} - ${item?.name || ""}`,
                    value: item.id,
                  }))}
                  variant="borderless"
                  labelRender={() => (
                    <p>
                      {listSupplier.find(
                        (item: PartnerType) => item?.id === supplier
                      )?.code || ""}
                    </p>
                  )}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold">Tên nhà cung cấp</p>
              <input
                type="text"
                value={supplierName}
                // onChange={(e) => setSupplierName(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Mã số thuế</p>
              <input
                type="text"
                value={supplierTaxCode}
                // onChange={(e) => setSupplierTaxCode(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Địa chỉ</p>
              <input
                type="text"
                value={supplierAddress}
                // onChange={(e) => setSupplierAddress(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 border-l pl-10 border-neutral-300">
            <div>
              <p className="font-semibold">Mẫu số hóa đơn</p>
              <input
                type="text"
                value={invoiceForm}
                // onChange={(e) => setInvoiceForm(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Ký hiệu hóa đơn</p>
              <input
                type="text"
                value={invoiceSign}
                // onChange={(e) => setInvoiceSign(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Số hóa đơn</p>
              <input
                type="text"
                value={invoiceNumber}
                // onChange={(e) => setInvoiceNumber(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Ngày hóa đơn</p>
              <input
                type="date"
                value={invoiceDate}
                // onChange={(e) => setInvoiceDate(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
