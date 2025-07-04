import { OPTION_PURCHASE_TYPE } from "@/constants/constants";
import { BankAccountType } from "@/types";
import { Select } from "antd";
export const PurchaseVoucherPaymentOrderRead: React.FC<{
  listSupplier: any[];
  purchaseType: string;
  listBankAccount: BankAccountType[];
  listEmployee: any[];
  paymentAccount: string | undefined;
  handleSelectPaymentAccount: any;
  paymentAccountBankName: string | undefined;
  setPaymentAccountBankName: any;
  supplier: string | undefined;
  handleSelectSupplier: any;
  supplierName: string | undefined;
  setSupplierName: any;
  supplierAddress: string | undefined;
  setSupplierAddress: any;
  recipientAccount: string | undefined;
  handleSelectRecipientAccount: any;
  recipientAccountBankName: string | undefined;
  setRecipientAccountBankName: any;
  description: string | undefined;
  setDescription: any;
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
  purchaseType,
  listBankAccount,
  listEmployee,
  paymentAccount,
  handleSelectPaymentAccount,
  paymentAccountBankName,
  setPaymentAccountBankName,
  supplier,
  handleSelectSupplier,
  supplierName,
  setSupplierName,
  supplierAddress,
  setSupplierAddress,
  recipientAccount,
  handleSelectRecipientAccount,
  recipientAccountBankName,
  setRecipientAccountBankName,
  description,
  setDescription,
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
              <p className="font-semibold">Tài khoản chi</p>
              <div className="h-10 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  value={paymentAccount}
                  // onChange={handleSelectPaymentAccount}
                  options={listBankAccount.map((item: BankAccountType) => ({
                    label: `${item?.account_number || ""} - ${item?.bank?.full_name || ""
                      }`,
                    value: item.id,
                  }))}
                  variant="borderless"
                  labelRender={() => (
                    <p>
                      {listBankAccount.find(
                        (item: BankAccountType) => item?.id === paymentAccount
                      )?.account_number || ""}
                    </p>
                  )}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold opacity-0">Tên ngân hàng</p>
              <input
                type="text"
                value={paymentAccountBankName}
                // onChange={(e) => setPaymentAccountBankName(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Mã nhà cung cấp</p>
              <div className="h-10 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={supplier}
                  // onChange={handleSelectSupplier}
                  options={listSupplier.map((item: any) => ({
                    label: `${item?.code || ""} | ${item?.name || ""}`,
                    value: item.id,
                  }))}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold">Tên cung cấp</p>
              <input
                type="text"
                value={supplierName}
                // onChange={(e) => setSupplierName(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            {(purchaseType ===
              OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
                .value ||
              purchaseType ===
              OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
                .value) && (
                <div>
                  <p className="font-semibold">Địa chỉ</p>
                  <input
                    type="text"
                    value={supplierAddress}
                    // onChange={(e) => setSupplierAddress(e.target.value)}
                    className="h-11 w-full px-3 outline-none border rounded-md"
                  />
                </div>
              )}
            <div>
              <p className="font-semibold">Tài khoản nhận</p>
              <div className="h-10 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  value={recipientAccount}
                  // onChange={handleSelectRecipientAccount}
                  options={listBankAccount.map((item: any) => ({
                    label: `${item?.account_number || ""} - ${item?.account_holder_name || ""
                      }`,
                    value: item.id,
                  }))}
                  variant="borderless"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold opacity-0">Tên ngân hàng</p>
              <input
                type="text"
                value={recipientAccountBankName}
                // onChange={(e) => setRecipientAccountBankName(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Nội dung thanh toán</p>
              <input
                type="text"
                value={description}
                // onChange={(e) => setDescription(e.target.value)}
                className="h-11 w-full px-3 outline-none border rounded-md"
              />
            </div>
            {(purchaseType ===
              OPTION_PURCHASE_TYPE.PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED
                .value ||
              purchaseType ===
              OPTION_PURCHASE_TYPE.PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED
                .value) && (
                <div>
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
                type="text"
                value={postedDate}
                // onChange={(e) => setPostedDate(e.target.value)}
                className="h-11 px-3 outline-none rounded-md border border-neutral-500"
              />
            </div>
            <div>
              <p className="font-semibold">Ngày chứng từ</p>
              <input
                type="text"
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
