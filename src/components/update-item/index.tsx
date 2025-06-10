import { Modal, Select } from "antd";
import { useEffect, useState } from "react";

export const UpdateItem: React.FC<{
  handleUpdateItem: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any;
  listUnit: { label: string; value: string }[];
  listWarrantyPeriod: { label: string; value: string }[];
  listGoodsAndServicesGroups: { label: string; value: string }[];
  listAccount: any;
  listVatTax: any[];
}> = ({
  handleUpdateItem,
  isModalOpen,
  setIsModalOpen,
  itemUpdate,
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
    if (itemUpdate?.id) {
      setCode(itemUpdate?.code || "");
      setName(itemUpdate?.name || "");
      setPrimaryUnit(itemUpdate?.primary_unit || "");
      setWarrantyPeriod(itemUpdate?.warranty_period || "");
      setVatDecrease(itemUpdate?.vat_decrease || "");
      setMinimumStockQuantity(itemUpdate?.minimum_stock_quantity || 0);
      setSource(itemUpdate?.source || "");
      setDescription(itemUpdate?.description || "");
      setPurchaseDescription(itemUpdate?.purchase_description || "");
      setSaleDescription(itemUpdate?.saleDescription || "");
      setLatestPurchasePrice(itemUpdate?.latestPurchasePrice || 0);
      setDiscountAccount(itemUpdate?.discount_account);
      setWarehouseAccount(itemUpdate?.warehouse_account || "");
      setReturnAccount(itemUpdate?.return_account || "");
      setRevenueAccount(itemUpdate?.revenue_account || "");
      setExpenseAccount(itemUpdate?.expenseAccount || "");
      setSalesAllowanceAccount(itemUpdate?.sales_allowance_account || "");
      setVatTaxId(itemUpdate?.vat_tax || "");
      if (
        itemUpdate?.material_group &&
        Array.isArray(itemUpdate.material_group)
      ) {
        setMaterialGroup(
          itemUpdate.material_group.map(
            (item: any) => item?.goods_and_services_groups_id?.id || ""
          )
        );
      }
    }
  }, [itemUpdate]);

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateItem({
      id: itemUpdate.id,
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
      setVatTaxId(undefined);
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin vật tư hàng hoá"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Cập nhật"
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
