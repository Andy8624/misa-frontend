"use client";
import { Modal, Select } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { ColorModeContext } from "@/contexts/color-mode";
import { v4 as uuidv4 } from "uuid";
import { OPTION_INVENTORY_OUT_VOUCHER_TYPE } from "@/constants/constants";
import { useParams } from "next/navigation";
import { InventoryOutQuantityValueRead } from "@/components/inventory-out-quantity-value-read";

export default function ShowInventoryOut() {
  const { id } = useParams();
  const linkBackRef = useRef<HTMLAnchorElement>(null);
  const { setIsLoading } = useContext(ColorModeContext);
  const [voucherNumber, setVoucherNumber] = useState<string>("XK00001");
  const [openModalConfirmClose, setOpenModalConfirmClose] =
    useState<boolean>(false);
  const [inventoryOutVoucherType, setInventoryOutVoucherType] =
    useState<string>(OPTION_INVENTORY_OUT_VOUCHER_TYPE.OTHERS.value);
  const [listSupplier, setListSupplier] = useState([]);
  const [listCustomer, setListCustomer] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listAccount, setListAccount] = useState<any[]>([]);
  const [object, setObject] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [withOriginalVoucher, setWithOriginalVoucher] = useState<
    number | undefined
  >();
  const [customer, setCustomer] = useState<string | undefined>();
  const [postedDate, setPostedDate] = useState<string | undefined>();
  const [voucherDate, setVoucherDate] = useState<string | undefined>();
  const [storeperson, setStoreperson] = useState<string | undefined>();
  const [itemList, setItemList] = useState<any[]>([]);
  const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
  const [listWarehouse, setListWarehouse] = useState([]);
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [particular, setParticular] = useState<string | undefined>();
  const [receipient, setReceipient] = useState<string | undefined>();
  const [receipientOfProduction, setReceipientOfProduction] = useState<
    string | undefined
  >();
  const [component, setComponent] = useState<string | undefined>();

  useEffect(() => {
    getListInventoryOut();
    getListInventoryOutItems();
    getItems();
    getListSupplier();
    getListCustomer();
    getListEmployee();
    getListAccount();
    // generateVoucherNumber();
    getListWarehouse();
    getListUnit();
  }, []);

  const getListInventoryOut = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out/" + id,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const data = response.data?.data || undefined;
      if (data) {
        const postDate = data?.posted_date
          ? new Date(data?.posted_date)
          : undefined;
        const voucherDate = data?.voucher_date
          ? new Date(data?.voucher_date)
          : undefined;
        setInventoryOutVoucherType(
          data?.inventory_out_voucher_type || undefined
        );
        setObject(data?.object || undefined);
        setAddress(data?.address || undefined);
        setVoucherNumber(data?.voucher_number || undefined);
        setWithOriginalVoucher(
          data?.with_original_voucher === 0
            ? 0
            : data?.with_original_voucher || undefined
        );
        setPostedDate(
          postDate
            ? `${postDate.getFullYear()}-${postDate.getMonth() + 1 < 10
              ? "0" + (postDate.getMonth() + 1)
              : postDate.getMonth() + 1
            }-${postDate.getDate() < 10
              ? "0" + postDate.getDate()
              : postDate.getDate()
            }`
            : undefined
        );
        setVoucherDate(
          voucherDate
            ? `${voucherDate.getFullYear()}-${voucherDate.getMonth() + 1 < 10
              ? "0" + (voucherDate.getMonth() + 1)
              : voucherDate.getMonth() + 1
            }-${voucherDate.getDate() < 10
              ? "0" + voucherDate.getDate()
              : voucherDate.getDate()
            }`
            : undefined
        );
        setStoreperson(data?.storeperson || undefined);
        setCustomer(data?.customer || undefined);
        setReceipient(data?.receipient || undefined);
        setParticular(data?.particular || undefined);
        setReceipientOfProduction(data?.receipient_of_production || undefined);
        setComponent(data?.component || undefined);
      }
    } catch (error) { }
  };

  const getListInventoryOutItems = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out_item",
        {
          params: {
            filter: { inventory_out: { _eq: id } },
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      setItemsOfAccounting(list)
      let total = 0;
      list.forEach((itemPrev: any) => {
        total += (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0);
      });
      setTotalAmount(total);
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

  const getListSupplier = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner",
        {
          params: {
            filter: { type: { _eq: "supplier" } },
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListSupplier(response?.data?.data || []);
    } catch (error) { }
  };

  const getListCustomer = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner",
        {
          params: {
            filter: { type: { _eq: "customer" } },
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListCustomer(response?.data?.data || []);
    } catch (error) { }
  };

  const getListEmployee = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListEmployee(response?.data?.data || []);
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

  const handleSelectObject = (objectId: string) => {
    const obj: any = listCustomer.find((item: any) => item?.id === objectId);
    if (obj) {
      setObject(objectId);
      setAddress(obj?.address || undefined);
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    const obj: any = listCustomer.find((item: any) => item?.id === customerId);
    if (obj) {
      setCustomer(customerId);
      setAddress(obj?.address || undefined);
    }
  };

  const handleConfirmClose = async () => { };

  const generateVoucherNumber = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const list = response.data?.data || [];
      if (list.length === 0) {
        setVoucherNumber("XK000001");
      } else {
        const voucherNumbers = list.map(
          (voucher: any) => voucher.voucher_number
        );
        const maxVoucherNumber = Math.max(
          ...voucherNumbers.map((voucher: any) => {
            const numberPart = voucher.slice(2);
            return parseInt(numberPart, 10);
          })
        );
        setVoucherNumber(
          `XK${(maxVoucherNumber + 1).toString().padStart(5, "0")}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItemsOdAccounting = () => {
    setItemsOfAccounting([...itemsOfAccounting, { id: uuidv4() }]);
  };

  const handleChangeItemsOfAccounting = (item: any, index: number) => {
    setItemsOfAccounting((prev: any) => {
      const list = prev;
      list[index] = item;
      let total = 0;
      list.forEach((itemPrev: any) => {
        total += (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0);
      });
      setTotalAmount(total);
      return [...list];
    });
  };

  const handleSave = async () => {
    const data: any = {};
    data.inventory_out_type = inventoryOutVoucherType;
    data.inventory_out;
    data.posted_date = postedDate;
    data.voucher_date = voucherDate;
    data.voucher_number = voucherNumber;
    data.particular = particular;
    data.with_original_voucher = withOriginalVoucher;
    if (
      inventoryOutVoucherType === OPTION_INVENTORY_OUT_VOUCHER_TYPE.SALES.value
    ) {
      data.customer = customer;
      data.storeperson = storeperson;
      data.address = address;
      data.receipient = receipient;
    }
    if (
      inventoryOutVoucherType ===
      OPTION_INVENTORY_OUT_VOUCHER_TYPE.PRODUCTION.value
    ) {
      data.receipient_of_production = receipientOfProduction;
      data.component = component;
    }
    if (
      inventoryOutVoucherType === OPTION_INVENTORY_OUT_VOUCHER_TYPE.OTHERS.value
    ) {
      data.object = object;
      data.address = address;
      data.receipient = receipient;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        const id = response.data.data.id;
        const responseItemList = await axios.post(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out_item",
          itemsOfAccounting.map((item) => {
            return { ...item, id: undefined, inventory_out: id };
          }),
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        linkBackRef.current?.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

  const handleDeleteItemsOfAccounting = (id: string) => {
    setItemsOfAccounting((prev: any[]) => {
      const list = prev.filter((item) => item?.id !== id);
      let total = 0;
      list.forEach((itemPrev: any) => {
        total += (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0);
      });
      setTotalAmount(total);
      console.log("DEBUG ", list);
      return list;
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <AiOutlineReload
            className="text-2xl cursor-pointer"
          // onClick={generateVoucherNumber}
          />
          <p className="text-2xl font-medium">Phiếu xuất kho {voucherNumber}</p>
          <div className="h-9 w-[340px] border rounded overflow-hidden ml-8 border-neutral-300">
            <Select
              style={{ width: "100%", height: "100%" }}
              variant="borderless"
              value={inventoryOutVoucherType}
              // onChange={(value) => setInventoryOutVoucherType(value)}
              options={Object.keys(OPTION_INVENTORY_OUT_VOUCHER_TYPE).map(
                (key, idx: number) => ({
                  label: `${idx + 1}. ${OPTION_INVENTORY_OUT_VOUCHER_TYPE[
                    key as keyof typeof OPTION_INVENTORY_OUT_VOUCHER_TYPE
                  ].translate.vi
                    }`,
                  value:
                    OPTION_INVENTORY_OUT_VOUCHER_TYPE[
                      key as keyof typeof OPTION_INVENTORY_OUT_VOUCHER_TYPE
                    ].value,
                })
              )}
              labelRender={({ label }: any) => (
                <p className="font-medium">{label}</p>
              )}
              optionRender={({ label }: any) => (
                <div className="py-1.5 px-4 font-medium">
                  <p className="font-medium text-[14.5px]">{label}</p>
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <Link href="/inventory" ref={linkBackRef}>
            <AiOutlineClose className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-full absolute top-0 left-0 p-4">
          <div className="flex justify-between w-full">
            <div className="flex flex-grow-1 items-start">
              <div className="grid grid-cols-7 items-start gap-4 pr-6 w-full max-w-[800px]">
                {inventoryOutVoucherType ===
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.SALES.value && (
                    <div className="col-span-3">
                      <p className="font-medium">Khách hàng</p>
                      <div className="h-10 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={customer}
                          // onChange={(value) => handleSelectCustomer(value)}
                          options={listCustomer.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
                          labelRender={() => (
                            <p className="font-medium">
                              {(
                                listCustomer.find(
                                  (item: any) => item?.id === customer
                                ) as any
                              )?.name || ""}
                            </p>
                          )}
                        />
                      </div>
                    </div>
                  )}
                {inventoryOutVoucherType ===
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.OTHERS.value && (
                    <div className="col-span-3">
                      <p className="font-medium">Đối tượng</p>
                      <div className="h-10 w-full outline-none border rounded-md">
                        <Select
                          style={{ width: "100%", height: "100%" }}
                          variant="borderless"
                          value={object}
                          // onChange={(value) => handleSelectObject(value)}
                          options={listCustomer.map((item: any) => ({
                            label: `${item?.code || ""} | ${item?.name || ""}`,
                            value: item.id,
                          }))}
                          labelRender={() => (
                            <p className="font-medium">
                              {(
                                listCustomer.find(
                                  (item: any) => item?.id === object
                                ) as any
                              )?.name || ""}
                            </p>
                          )}
                        />
                      </div>
                    </div>
                  )}
                {inventoryOutVoucherType ===
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.PRODUCTION.value && (
                    <>
                      <div className="col-span-3">
                        <p className="font-medium">Người nhận</p>
                        <div className="h-10 w-full outline-none border rounded-md">
                          <Select
                            style={{ width: "100%", height: "100%" }}
                            variant="borderless"
                            value={receipientOfProduction}
                            // onChange={(value) => setReceipientOfProduction(value)}
                            options={listCustomer.map((item: any) => ({
                              label: `${item?.code || ""} | ${item?.name || ""}`,
                              value: item.id,
                            }))}
                            labelRender={() => (
                              <p className="font-medium">
                                {(
                                  listCustomer.find(
                                    (item: any) => item?.id === object
                                  ) as any
                                )?.name || ""}
                              </p>
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium">Bộ phận</p>
                        <input
                          type="text"
                          value={component}
                          // onChange={(e) => setComponent(e.target.value)}
                          className="w-full h-9 px-2 outline-none border rounded-md"
                        />
                      </div>
                    </>
                  )}
                {inventoryOutVoucherType !==
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.PRODUCTION.value && (
                    <>
                      <div className="col-span-4">
                        <p className="font-medium">Địa chỉ</p>
                        <input
                          type="text"
                          value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                          className="w-full h-9 px-2 outline-none border rounded-md"
                        />
                      </div>
                      <div className="col-span-3">
                        <p className="font-medium">Người nhận</p>
                        <input
                          type="text"
                          value={receipient}
                          // onChange={(e) => setReceipient(e.target.value)}
                          className="w-full h-9 px-2 outline-none border rounded-md"
                        />
                      </div>
                    </>
                  )}
                <div className="col-span-4">
                  <p className="font-medium">Lý do xuất</p>
                  <input
                    type="text"
                    value={particular}
                    // onChange={(e) => setParticular(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                {inventoryOutVoucherType ===
                  OPTION_INVENTORY_OUT_VOUCHER_TYPE.SALES.value && (
                    <>
                      <div className="col-span-3">
                        <p className="font-medium">Nhân viên bán hàng</p>
                        <div className="h-10 w-full outline-none border rounded-md">
                          <Select
                            style={{ width: "100%", height: "100%" }}
                            variant="borderless"
                            value={storeperson}
                            // onChange={(value) => setStoreperson(value)}
                            options={listEmployee.map((item: any) => ({
                              label: `${item?.code || ""} | ${item?.name || ""}`,
                              value: item.id,
                            }))}
                            labelRender={() => (
                              <p className="font-medium">
                                {(
                                  listEmployee.find(
                                    (item: any) => item?.id === storeperson
                                  ) as any
                                )?.name || ""}
                              </p>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  )}
                <div className="col-span-4">
                  <p className="font-medium">Kèm theo</p>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={withOriginalVoucher}
                      // onChange={(e) =>
                      //   setWithOriginalVoucher(Number(e.target.value))
                      // }
                      className="w-full h-9 px-2 outline-none border rounded-md text-right"
                    />
                    <p className="whitespace-nowrap">chứng từ gốc</p>
                  </div>
                </div>
              </div>
              <div className="border-l border-neutral-300 pl-6 flex flex-col gap-4">
                <div>
                  <p className="font-medium">Ngày hạch toán</p>
                  <input
                    type="date"
                    value={postedDate}
                    // onChange={(e) => setPostedDate(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">Ngày chứng từ</p>
                  <input
                    type="date"
                    value={voucherDate}
                    // onChange={(e) => setVoucherDate(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">Số chứng từ</p>
                  <input
                    type="text"
                    value={voucherNumber}
                    // onChange={(e) => setVoucherNumber(e.target.value)}
                    className="w-full h-9 px-2 outline-none border rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-right">Tổng tiền</p>
              <p className="text-4xl font-bold text-right">
                {totalAmount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <div className="w-full">
            <InventoryOutQuantityValueRead
              inventoryOutVoucherType={inventoryOutVoucherType}
              itemsOfAccounting={itemsOfAccounting}
              itemList={itemList}
              listWarehouse={listWarehouse}
              listAccount={listAccount}
              listUnit={listUnit}
              handleChangeItemsOfAccounting={handleChangeItemsOfAccounting}
              handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
            />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div>
              {/* <Button
                type="primary"
                onClick={() => handleAddItemsOdAccounting()}
              >
                Thêm dòng
              </Button> */}
            </div>
            <div>
              <div>
                <div className=" flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <MdOutlineAttachFile className="text-xl" />
                    <p className="font-medium">Đính kèm</p>
                    <p className="italic text-gray-500">
                      Dung lượng tối đa 5MB
                    </p>
                  </div>
                  <div className="mt-2 p-4 rounded-md border border-gray-400">
                    <span className="whitespace-nowrap italic text-gray-500">
                      Kéo/thả tệp vào đây hoặc bấm vào đây
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title={
            <div className="flex items-center gap-2.5">
              <IoWarningOutline className="text-5xl text-yellow-500" />
              <p className="text-2xl font-semibold">Đóng nhập kho</p>
            </div>
          }
          open={openModalConfirmClose}
          onOk={handleConfirmClose}
          onCancel={() => setOpenModalConfirmClose(false)}
          centered
        >
          <p className="text-base font-medium">
            Bạn có chắc chắn muốn đóng nhạp kho?
          </p>
        </Modal>
      </div>
    </div>
  );
}
