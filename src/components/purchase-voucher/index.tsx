import { Button, Drawer, Select } from "antd";
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  OPTION_PURCHASE_TYPE,
  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION,
  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD,
  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS,
  PURCHASE_VOUCHER_TAB,
} from "@/constants/constants";
import { PurchaseVoucherInventoryInVoucher } from "@/components/purchase-voucher-inventory-in-voucher";
import { PurchaseVoucherInvoice } from "@/components/purchase-voucher-invoice";
import { UploadOutlined } from "@ant-design/icons";
import { PurchaseVoucherSummary } from "@/components/purchase-voucher-summary";
import { PurchaseVoucherCashPaymentVoucher } from "@/components/purchase-voucher-cash-payment-voucher";
import { PurchaseVoucherPaymentOrder } from "@/components/purchase-voucher-payment-order";
import { PurchaseVoucherCheque } from "@/components/purchase-voucher-cheque";
import { PurchaseVoucherCounterCheque } from "@/components/purchase-voucher-counter-cheque";
import { PurchaseVoucherQuantityValue } from "@/components/purchase-voucher-quantity-value";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PurchaseVoucherTax } from "@/components/purchase-voucher-tax";
import { PurchaseVoucherPreCustomsCost } from "@/components/purchase-voucher-pre-customs-cost";
import { PurchaseVoucherFreight } from "@/components/purchase-voucher-freight";

export const PurchaseVoucher: React.FC<{
  listSupplier: any[];
  listEmployee: any[];
  listPaymentTerms: any[];
  openPurchaseVoucher: boolean;
  setOpenPurchaseVoucher: any;
  listBankAccount: any[];
}> = ({
  listSupplier,
  listEmployee,
  listPaymentTerms,
  openPurchaseVoucher,
  setOpenPurchaseVoucher,
  listBankAccount,
}) => {
    const [purchaseType, setPurchaseType] = useState(
      OPTION_PURCHASE_TYPE.INVENTORY_IN_DOMESTIC_GOODS.value
    );
    const [paymentStatus, setPaymentStatus] = useState(
      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
    );
    const [paymentMethod, setPaymentMethod] = useState(
      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
    );
    const [invoiceInclusion, setInvoiceInclusion] = useState(
      PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE.value
    );
    const [code, setCode] = useState<string>("MH00001");
    const [partnerCode, setPartnerCode] = useState<string>();
    const [partnerName, setPartnerName] = useState<string>();
    const [partnerAddress, setPartnerAddress] = useState<string>();
    const [description, setDescription] = useState("");
    const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
    const [discount, setDiscount] = useState<string>("no");
    const [itemList, setItemList] = useState<any[]>([]);
    const [listAccount, setListAccount] = useState<any[]>([]);
    const [listUnit, setListUnit] = useState<any[]>([]);
    const [percentDiscountInvoiceValue, setPercentDiscountInvoiceValue] =
      useState<number>(0);
    const [listVatTax, setListVatTax] = useState([]);
    const [listWarehouse, setListWarehouse] = useState([]);
    const [listGroupOfPurchasedGoods, setListGroupOfPurchasedGoods] = useState<
      any[]
    >([]);
    const [listCostClassification, setListCostClassification] = useState<any[]>(
      []
    );
    const [listConstruction, setListConstruction] = useState<any[]>([]);

    useEffect(() => {
      if (itemsOfAccounting.length === 0) {
        setItemsOfAccounting([{ id: uuidv4() }]);
      }
      getItems();
      getListAccount();
      getListUnit();
      getListVatTax();
      getListWarehouse();
      getListGroupOfPurchasedGoods();
      getListCostClassification();
      getListConstruction();
    }, []);

    const getItems = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list",
          {
            params: {
              fields: [
                "*",
                "material_group.*",
                "material_group.goods_and_services_groups_id.*",
                "material_group.goods_and_services_list_id.*",
                "expense_account.*",
                "vat_tax.*",
              ],
            },
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        console.log(
          "DEBUG ",
          response.data.data.filter((item: any) =>
            item?.material_group?.find(
              (itemMaterialGroup: any) =>
                itemMaterialGroup?.goods_and_services_groups_id?.code !== "DV"
            )
          )
        );
        setItemList(
          response?.data?.data
            ? response.data.data.filter((item: any) =>
              item?.material_group?.find(
                (itemMaterialGroup: any) =>
                  itemMaterialGroup?.goods_and_services_groups_id?.code !== "DV"
              )
            )
            : []
        );
      } catch (error) { }
    };

    const getListAccount = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/account_main_system",
          {
            params: {
              limit: 100000,
            },
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListAccount(response?.data?.data || []);
      } catch (error) { }
    };

    const getListConstruction = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/construction",
          {
            params: {
              limit: 100000,
            },
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListConstruction(response?.data?.data || []);
      } catch (error) { }
    };

    const getListCostClassification = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/cost_classification",
          {
            params: {
              limit: 100000,
            },
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListCostClassification(response?.data?.data || []);
      } catch (error) { }
    };

    const getListGroupOfPurchasedGoods = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/group_of_purchased_goods",
          {
            params: {
              limit: 100000,
            },
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListGroupOfPurchasedGoods(response?.data?.data || []);
      } catch (error) { }
    };

    const getListUnit = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit",
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListUnit(response?.data?.data || []);
      } catch (error) { }
    };

    const getListVatTax = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/vat_tax",
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListVatTax(response?.data?.data ? response.data.data : []);
      } catch (error) { }
    };

    const getListWarehouse = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warehouse",
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setListWarehouse(response?.data?.data ? response.data.data : []);
      } catch (error) { }
    };

    const selectSupplier = (code: string) => {
      const supplier = listSupplier.find((item: any) => item?.code === code);
      if (supplier) {
        setPartnerCode(supplier?.code || "");
        setPartnerName(supplier?.name || "");
        setPartnerAddress(supplier?.address || "");
        setDescription("Mua hàng của" + (supplier?.name || ""));
      }
    };

    const handleChangeItemOfOfList = (item: any, index: number) => { };

    const handleDeleteItemsOfAccounting = (id: string) => { };

    return (
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <p className="font-semibold text-2xl whitespace-nowrap">
                Chứng từ mua hàng {code}
              </p>
              <div className="h-10 w-[340px] border rounded-md overflow-hidden">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  variant="borderless"
                  value={purchaseType}
                  onChange={(value) => setPurchaseType(value)}
                  options={Object.keys(OPTION_PURCHASE_TYPE).map(
                    (key, idx: number) => ({
                      label: `${idx + 1}. ${OPTION_PURCHASE_TYPE[
                        key as keyof typeof OPTION_PURCHASE_TYPE
                      ].translate.vi
                        }`,
                      value:
                        OPTION_PURCHASE_TYPE[
                          key as keyof typeof OPTION_PURCHASE_TYPE
                        ].value,
                    })
                  )}
                  labelRender={({ label }: any) => (
                    <p className="font-medium">{label}</p>
                  )}
                  optionRender={({ label }: any) => (
                    <div className="py-2 px-4 font-medium">
                      <p className="font-medium">{label}</p>
                    </div>
                  )}
                />
              </div>
            </div>
            <Button type="primary">
              <p className="font-medium">Lưu</p>
            </Button>
          </div>
        }
        placement={"bottom"}
        height={"100%"}
        onClose={() => setOpenPurchaseVoucher(false)}
        open={openPurchaseVoucher}
      >
        {/* <div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value}
              name="default-radio"
              checked={
                paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value
              }
              onChange={(e) => {
                setPaymentMethod(
                  PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
                );
                return setPaymentStatus(e.target.value);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
            />
            <label className="ms-2 text-sm font-medium text-gray-900">
              Chưa thanh toán
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={
                paymentStatus ===
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
              }
              id="default-radio-2"
              type="radio"
              value={PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value}
              name="default-radio"
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
            />
            <label className="ms-2 text-sm font-medium text-gray-900">
              Thanh toán ngay
            </label>
          </div>
          <div
            className={`h-10 w-44 border rounded-md overflow-hidden ${
              paymentStatus !==
                PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
              "pointer-events-none"
            }`}
          >
            <Select
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                backgroundColor:
                  paymentStatus !==
                  PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
                    ? "#dbd9d9"
                    : "white",
              }}
              variant="borderless"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
              options={Object.keys(PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD).map(
                (key) => ({
                  label:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].translate.vi,
                  value:
                    PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD[
                      key as keyof typeof PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD
                    ].value,
                })
              )}
            />
          </div>
          <div
            className={`h-10 w-48 border rounded-md ${
              (purchaseType ===
                OPTION_PURCHASE_TYPE.IMPORTED_PURCHASE_WITHOUT_STOCK_RECEIPT
                  .value ||
                purchaseType ===
                  OPTION_PURCHASE_TYPE.IMPORTED_PURCHASE_WITH_STOCK_RECEIPT
                    .value) &&
              "hidden"
            }`}
          >
            <Select
              style={{ border: "none", width: "100%", height: "100%" }}
              variant="borderless"
              value={invoiceInclusion}
              onChange={(value) => setInvoiceInclusion(value)}
              options={Object.keys(
                PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
              ).map((key) => ({
                label:
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION[
                    key as keyof typeof PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                  ].translate.vi,
                value:
                  PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION[
                    key as keyof typeof PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION
                  ].value,
              }))}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-12">
          <div className="flex-grow-1">
            <Tabs
              defaultActiveKey={"4"}
              items={[
                {
                  key: "4",
                  label: (
                    <p className="text-base font-medium">Chứng từ ghi nợ</p>
                  ),
                  active:
                    paymentStatus ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value &&
                    (purchaseType ===
                      OPTION_PURCHASE_TYPE
                        .DOMESTIC_PURCHASE_WITHOUT_STOCK_RECEIPT.value ||
                      purchaseType ===
                        OPTION_PURCHASE_TYPE
                          .IMPORTED_PURCHASE_WITHOUT_STOCK_RECEIPT.value)
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherDebitNote
                      description={description}
                      listSupplier={listSupplier}
                      partnerAddress={partnerAddress}
                      partnerName={partnerName}
                      setPartnerAddress={setPartnerAddress}
                      setPartnerName={setPartnerName}
                      listEmployee={listEmployee}
                      setDescription={setDescription}
                    />
                  ),
                },
                {
                  key: "1",
                  label: <p className="text-base font-medium">Phiếu nhập</p>,
                  active: true,
                  children: (
                    <PurchaseVoucherInventoryInVoucher
                      selectSupplier={selectSupplier}
                      partnerCode={partnerCode}
                      listSupplier={listSupplier}
                      partnerName={partnerName}
                      partnerAddress={partnerAddress}
                      setPartnerName={setPartnerName}
                      setPartnerAddress={setPartnerAddress}
                      listEmployee={listEmployee}
                      description={description}
                      setDescription={setDescription}
                    />
                  ),
                },
                {
                  key: "2",
                  label: <p className="text-base font-medium">Phiếu chi</p>,
                  active:
                    paymentStatus ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                    paymentMethod ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CASH.value
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherCashPaymentVoucher
                      listSupplier={listSupplier}
                      listEmployee={listEmployee}
                      purchaseType={purchaseType}
                    />
                  ),
                },
                {
                  key: "3",
                  label: <p className="text-base font-medium">Hoá đơn</p>,
                  active: true,
                  children: (
                    <PurchaseVoucherInvoice
                      listSupplier={listSupplier}
                      setPartnerName={setPartnerName}
                      partnerName={partnerName}
                      partnerAddress={partnerAddress}
                      setPartnerAddress={setPartnerAddress}
                    />
                  ),
                },
                {
                  key: "5",
                  label: <p className="text-base font-medium">Uỷ nhiệm chi</p>,
                  active:
                    paymentStatus ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                    paymentMethod ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.PAYMENT_ORDER.value
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherPaymentOrder
                      listSupplier={listSupplier}
                      purchaseType={purchaseType}
                      listBankAccount={listBankAccount}
                      listEmployee={listEmployee}
                    />
                  ),
                },
                {
                  key: "6",
                  label: (
                    <p className="text-base font-medium">Séc chuyển khoảng</p>
                  ),
                  active:
                    paymentMethod ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.CHEQUE.value &&
                    paymentStatus ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherCheque
                      listSupplier={listSupplier}
                      listBankAccount={listBankAccount}
                      listEmployee={listEmployee}
                    />
                  ),
                },
                {
                  key: "7",
                  label: <p className="text-base font-medium">Séc tiền mặt</p>,
                  active:
                    paymentStatus ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.PAID_NOW.value &&
                    paymentMethod ===
                      PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD.COUNTER_CHEQUE
                        .value
                      ? true
                      : false,
                  children: (
                    <PurchaseVoucherCounterCheque
                      listSupplier={listSupplier}
                      listBankAccount={listBankAccount}
                      listEmployee={listEmployee}
                      purchaseType={purchaseType}
                    />
                  ),
                },
              ].filter((item: any) => item?.active === true)}
            />
          </div>
          <div className="flex flex-col items-end gap-3">
            <p>Tổng tiền thanh toán</p>
            <p className="text-5xl font-medium">0</p>
          </div>
        </div>
        <div
          className={`mt-8 ${
            paymentStatus !==
              PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS.NO_PAID.value && "hidden"
          }`}
        >
          <div className="flex gap-4 w-1/2">
            <div className="flex-grow-1">
              <p className="font-semibold">Điều khoản thanh toán</p>
              <div className="h-10 w-full outline-none border rounded-md">
                <Select
                  style={{ width: "100%", height: "100%" }}
                  options={listPaymentTerms.map((item: any) => ({
                    label: `${item?.code || ""} - ${item?.name || ""}`,
                    value: item.id,
                  }))}
                  variant="borderless"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold">Số ngày được nợ</p>
              <input
                type="number"
                className="h-10 w-full px-3 outline-none border rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">Hạn thanh toán</p>
              <input
                type="date"
                className="h-10 w-full px-3 outline-none border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-6">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Hàng tiền",
              children: (
                <PurchaseVoucherQuantityValue
                  discount={discount}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  itemList={itemList}
                  itemsOfAccounting={itemsOfAccounting}
                  listAccount={listAccount}
                  listUnit={listUnit}
                  percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                  setDiscount={setDiscount}
                  setPercentDiscountInvoiceValue={
                    setPercentDiscountInvoiceValue
                  }
                  paymentStatus={paymentStatus}
                  purchaseType={purchaseType}
                  invoiceInclusion={invoiceInclusion}
                  paymentMethod={paymentMethod}
                  listWarehouse={listWarehouse}
                  listVatTax={listVatTax}
                  listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                  listCostClassification={listCostClassification}
                  listConstruction={listConstruction}
                />
              ),
            },
            {
              key: "2",
              label: "Thuế",
              children: (
                <PurchaseVoucherTax
                  discount={discount}
                  handleChangeItemOfOfList={handleChangeItemOfOfList}
                  handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
                  itemList={itemList}
                  itemsOfAccounting={itemsOfAccounting}
                  listAccount={listAccount}
                  listUnit={listUnit}
                  percentDiscountInvoiceValue={percentDiscountInvoiceValue}
                  setDiscount={setDiscount}
                  setPercentDiscountInvoiceValue={
                    setPercentDiscountInvoiceValue
                  }
                  paymentStatus={paymentStatus}
                  purchaseType={purchaseType}
                  invoiceInclusion={invoiceInclusion}
                  paymentMethod={paymentMethod}
                  listWarehouse={listWarehouse}
                  listVatTax={listVatTax}
                  listGroupOfPurchasedGoods={listGroupOfPurchasedGoods}
                  listCostClassification={listCostClassification}
                  listConstruction={listConstruction}
                />
              ),
            },
            {
              key: "3",
              label: "Phí trước hải quan",
              children: <PurchaseVoucherPreCustomsCost />,
            },
            {
              key: "4",
              label: "Chi phí mua hàng",
              children: <PurchaseVoucherFreight />,
            },
          ]}
        />
      </div>
      <div className="w-full flex items-start justify-between mt-8">
        <div className="grid grid-cols-3 gap-4 max-w-[500px]">
          {invoiceInclusion ===
            PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.RECEIVED_WITH_INVOICE
              .value && (
            <>
              <div className="col-span-1">
                <p className="font-semibold">Mã tra cứu HĐĐT</p>
                <input
                  type="text"
                  className="h-10 w-full px-3 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Đường dẫn tra cứu HĐĐT</p>
                <input
                  type="text"
                  className="h-10 w-full px-3 outline-none border rounded-md"
                />
              </div>
            </>
          )}
          {invoiceInclusion ===
            PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION.NO_INVOICE.value && (
            <>
              <p className="col-span-2 font-medium">
                Thông tin lên bảng kê mua vào không có hóa đơn
              </p>
              <div className="col-span-2">
                <p className="font-semibold">Tên nhà cung cấp</p>
                <input
                  type="text"
                  className="h-10 w-full px-3 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Địa chỉ</p>
                <input
                  type="text"
                  className="h-10 w-full px-3 outline-none border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Số CMND</p>
                <input
                  type="text"
                  className="h-10 w-full px-3 outline-none border rounded-md"
                />
              </div>
            </>
          )}
          <div className="col-span-2">
            <p className="font-medium">Đính kèm</p>
            <div>
              <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[500px]">
          <PurchaseVoucherSummary purchaseType={purchaseType} />
        </div>
      </div> */}
      </Drawer>
    );
  };
