import { PartnerType } from "@/types";
import { Select } from "antd";

export const PurchaseVoucherDebitVoucherRead: React.FC<{
  debtVoucherParticular: string | undefined;
  setDebtVoucherParticular: any;
  listSupplier: PartnerType[];
  listEmployee: any[];
  supplier: string | undefined;
  supplierName: string | undefined;
  setSupplierName: any;
  supplierAddress: string | undefined;
  setSupplierAddress: any;
  handleSelectSupplier: any;
  purchasingStaff: string | undefined;
  setPurchasingStaff: any;
  postedDate: string | undefined;
  setPostedDate: any;
  voucherDate: string | undefined;
  setVoucherDate: any;
  voucherNumber: string | undefined;
  setVoucherNumber: any;
}> = ({
  debtVoucherParticular,
  setDebtVoucherParticular,
  listSupplier,
  listEmployee,
  supplier,
  supplierName,
  setSupplierName,
  supplierAddress,
  setSupplierAddress,
  handleSelectSupplier,
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
            <div className="col-span-2">
              <p className="font-semibold">Địa chỉ</p>
              <input
                type="text"
                value={supplierAddress}
                // onChange={(e) => setSupplierAddress(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Nhân viên mua hàng</p>
              <div className="h-11 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  value={purchasingStaff}
                  // onChange={(value: string) => setPurchasingStaff(value)}
                  options={listEmployee.map((item: any) => ({
                    label: `${item?.code || ""} - ${item?.name || ""}`,
                    value: item.id,
                  }))}
                  variant="borderless"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold">Diễn giải</p>
              <input
                type="text"
                value={debtVoucherParticular}
                // onChange={(e) => setDebtVoucherParticular(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
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
