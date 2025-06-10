import { OPTION_PURCHASE_TYPE } from "@/constants/constants";
import { PartnerType } from "@types";
import { Select } from "antd";

export const PurchaseVoucherCashPaymentVoucherRead: React.FC<{
  listSupplier: PartnerType[];
  listEmployee: any[];
  purchaseType: string;
  supplier: string | undefined;
  handleSelectSupplier: any;
  supplierName: string | undefined;
  setSupplierName: any;
  supplierAddress: string | undefined;
  setSupplierAddress: any;
  receipient: string | undefined;
  setReceipient: any;
  cashPaymentVoucherParticular: string | undefined;
  setCashPaymentVoucherParticular: any;
  quantityWithOriginalVoucher: number | undefined;
  setQuantityWithOriginalVoucher: any;
  purchasingStaff: string | undefined;
  setPurchasingStaff: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  voucherNumber: string | undefined;
  setVoucherNumber: any;
}> = ({
  listSupplier,
  listEmployee,
  purchaseType,
  supplier,
  handleSelectSupplier,
  supplierName,
  setSupplierName,
  supplierAddress,
  setSupplierAddress,
  receipient,
  setReceipient,
  cashPaymentVoucherParticular,
  setCashPaymentVoucherParticular,
  quantityWithOriginalVoucher,
  setQuantityWithOriginalVoucher,
  purchasingStaff,
  setPurchasingStaff,
  postedDate,
  setPostedDate,
  voucherDate,
  setVoucherDate,
  voucherNumber,
  setVoucherNumber,
}) => {
    return (
      <div>
        <div className="flex items-start">
          <div className="grid grid-cols-7 gap-4 flex-grow-1 pr-10">
            <div className="col-span-3">
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
            <div className="col-span-4">
              <p className="font-semibold">Tên nhà cung cấp</p>
              <input
                type="text"
                value={supplierName}
                // onChange={(e) => setSupplierName(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-3">
              <p className="font-semibold">Người nhận</p>
              <input
                type="text"
                value={receipient}
                // onChange={(e) => setReceipient(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-4">
              <p className="font-semibold">Địa chỉ</p>
              <input
                type="text"
                value={supplierAddress}
                // onChange={(e) => setSupplierAddress(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-4">
              <p className="font-semibold">Lý do chi</p>
              <input
                type="text"
                value={cashPaymentVoucherParticular}
                // onChange={(e) => setCashPaymentVoucherParticular(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-3">
              <p className="font-semibold">Kèm theo</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={quantityWithOriginalVoucher}
                  // onChange={(e) =>
                  //   setQuantityWithOriginalVoucher(Number(e.target.value))
                  // }
                  className="h-11 px-3 outline-none border rounded-md text-right"
                />
                <p className="whitespace-nowrap">Chứng từ gốc</p>
              </div>
            </div>
            {(purchaseType ===
              OPTION_PURCHASE_TYPE
                .PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED.value ||
              purchaseType ===
              OPTION_PURCHASE_TYPE
                .PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED.value) && (
                <div className="col-span-5">
                  <p className="font-semibold">Nhân viên mua hàng</p>
                  <div className="h-11 w-full outline-none border rounded-md">
                    <Select
                      style={{ width: "100%", height: "100%" }}
                      value={purchasingStaff}
                      // onChange={(value) => setPurchasingStaff(value)}
                      options={listEmployee.map((item: any) => ({
                        label: `${item?.code || ""} - ${item?.name || ""}`,
                        value: item.id,
                      }))}
                      variant="borderless"
                    />
                  </div>
                </div>
              )}
          </div>
          <div className="flex flex-col gap-3 border-l pl-10 border-neutral-300">
            <div>
              <p className="font-semibold">Ngày hạch toán</p>
              <input
                type="date"
                value={postedDate}
                // onChange={(e) => setPostedDate(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Ngày chứng từ</p>
              <input
                type="date"
                value={voucherDate}
                // onChange={(e) => setVoucherDate(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Số chứng từ</p>
              <input
                type="text"
                value={voucherNumber}
                // onChange={(e) => setVoucherNumber(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
