import { Modal, Select } from "antd";
import { useEffect, useState } from "react";

export const AddItem: React.FC<{
  handleAddItem: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  listUnit: { label: string; value: string }[];
  listWarrantyPeriod: { label: string; value: string }[];
  listGoodsAndServicesGroups: { label: string; value: string }[];
  listAccount: any;
  listVatTax: any[];
}> = ({
  handleAddItem,
  isModalOpen,
  setIsModalOpen,
  listUnit,
  listWarrantyPeriod,
  listGoodsAndServicesGroups,
  listAccount,
  listVatTax,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [primaryUnit, setPrimaryUnit] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [vatDecrease, setVatDecrease] = useState("");
  const [minimumStockQuantity, setMinimumStockQuantity] = useState<number>();
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [saleDescription, setSaleDescription] = useState("");
  const [latestPurchasePrice, setLatestPurchasePrice] = useState<number>();
  const [materialGroup, setMaterialGroup] = useState<string[]>([]);
  const [discountAccount, setDiscountAccount] = useState<string>();
  const [warehouseAccount, setWarehouseAccount] = useState<string>();
  const [returnAccount, setReturnAccount] = useState<string>();
  const [revenueAccount, setRevenueAccount] = useState<string>();
  const [expenseAccount, setExpenseAccount] = useState<string>();
  const [salesAllowanceAccount, setSalesAllowanceAccount] = useState<string>();
  const [vatTaxID, setVatTaxId] = useState<string>();

  useEffect(() => {
    if (listAccount.length > 0) {
      setSalesAllowanceAccount(
        listAccount.find((item: any) => item?.account_code === "5111").id
      );
      setWarehouseAccount(
        listAccount.find((item: any) => item?.account_code === "153").id
      );
      setReturnAccount(
        listAccount.find((item: any) => item?.account_code === "5111").id
      );
      setRevenueAccount(
        listAccount.find((item: any) => item?.account_code === "5111").id
      );
      setDiscountAccount(
        listAccount.find((item: any) => item?.account_code === "5111").id
      );
      setExpenseAccount(
        listAccount.find((item: any) => item?.account_code === "632").id
      );
    }
  }, [listAccount]);

  const handleActionAdd = async () => {
    const check: boolean = await handleAddItem({
      code,
      name,
      primary_unit: primaryUnit,
      warranty_period: warrantyPeriod,
      vat_decrease: vatDecrease,
      minimum_stock_quantity: minimumStockQuantity,
      source,
      description,
      purchase_description: purchaseDescription,
      sale_description: saleDescription,
      latest_purchase_price: latestPurchasePrice,
      material_group: materialGroup,
      discount_account: discountAccount,
      warehouse_account: warehouseAccount,
      return_account: returnAccount,
      revenue_account: revenueAccount,
      expense_account: expenseAccount,
      sales_allowance_account: salesAllowanceAccount,
      vat_tax: vatTaxID,
    });
    if (check) {
      setCode("");
      setName("");
      setPrimaryUnit("");
      setWarrantyPeriod("");
      setVatDecrease("");
      setMinimumStockQuantity(0);
      setSource("");
      setDescription("");
      setPurchaseDescription("");
      setSaleDescription("");
      setLatestPurchasePrice(0);
      setMaterialGroup([]);
    }
  };

  return (
    <Modal
      title="Thông tin vật tư hàng hoá"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Thêm"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Tên</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Mã</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Đơn vị tính</p>
            <div className="w-full h-12 px-3 border outline-none rounded-md text-base">
              <Select
                style={{ width: "100%", height: "100%" }}
                options={listUnit}
                variant="borderless"
                value={primaryUnit}
                onChange={(value: string) => setPrimaryUnit(value)}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <p>Thời hạn bảo hành</p>
            <div className="w-full h-12 px-3 border outline-none rounded-md text-base">
              <Select
                style={{ width: "100%", height: "100%" }}
                options={listWarrantyPeriod}
                variant="borderless"
                value={warrantyPeriod}
                onChange={(value: string) => setWarrantyPeriod(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Nhóm VTHH</p>
            <div className="w-full h-12 px-3 border outline-none rounded-md text-base">
              <Select
                mode="multiple"
                size={"middle"}
                value={materialGroup}
                onChange={(ids: string[]) => setMaterialGroup(ids)}
                options={listGoodsAndServicesGroups}
                variant="borderless"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="w-1/3">
            <p>Giảm 2% thuế suất thuế GTGT</p>
            <div className="w-full h-12 px-3 border outline-none rounded-md text-base">
              <Select
                style={{ width: "100%", height: "100%" }}
                options={[
                  {
                    label: "Chưa xác định",
                    value: "not-determined",
                  },
                  {
                    label: "Không giảm thuế",
                    value: "no",
                  },
                  {
                    label: "Có giảm thuế",
                    value: "yes",
                  },
                ]}
                variant="borderless"
                value={vatDecrease}
                onChange={(value: string) => setVatDecrease(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <p>Số lượng tồn tối thiểu</p>
            <input
              type="number"
              value={minimumStockQuantity}
              onChange={(e) => setMinimumStockQuantity(Number(e.target.value))}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Nguồn gốc</p>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Mô tả</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-24 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Diễn giải khi mua</p>
            <input
              type="text"
              value={purchaseDescription}
              onChange={(e) => setPurchaseDescription(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Diễn giải khi bán</p>
            <input
              type="text"
              value={saleDescription}
              onChange={(e) => setSaleDescription(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Đơn giá mua gần nhất</p>
            <input
              type="number"
              value={latestPurchasePrice}
              onChange={(e: any) => setLatestPurchasePrice(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Tài khoản giảm giá</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={salesAllowanceAccount}
                onChange={(value: string) => setSalesAllowanceAccount(value)}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <p>Tài khoản kho</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={warehouseAccount}
                onChange={(value: string) => setWarehouseAccount(value)}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <p>Tài khoản trả lại</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={returnAccount}
                onChange={(value: string) => setReturnAccount(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Tài khoản doanh thu</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={revenueAccount}
                onChange={(value: string) => setReturnAccount(value)}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <p>Tài khoản chi phí</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={expenseAccount}
                onChange={(value: string) => setExpenseAccount(value)}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <p>Tài khoản chiết khấu</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listAccount.map((item: any) => ({
                  label: `${item?.account_code || ""} - ${
                    item?.account_name || ""
                  }`,
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={discountAccount}
                onChange={(value: string) => setDiscountAccount(value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Thuế</p>
            <div className="w-full h-12 border outline-none rounded-md text-base">
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  (option.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%", height: "100%" }}
                options={listVatTax.map((item: any) => ({
                  label: item?.name || "",
                  value: item?.id || "",
                }))}
                variant="borderless"
                value={vatTaxID}
                onChange={(value: string) => setVatTaxId(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
