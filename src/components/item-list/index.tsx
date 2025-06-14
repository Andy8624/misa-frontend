/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddItem } from "@/components/add-item";
import { UpdateItem } from "@/components/update-item";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const ItemList: React.FC = () => {
  const [list, setList] = useState([]);
  const [listAccount, setListAccount] = useState([]);
  const [listUnit, setListUnit] = useState<{ label: string; value: string }[]>(
    []
  );
  const [listWarrantyPeriod, setListWarrantyPeriod] = useState<
    { label: string; value: string }[]
  >([]);
  const [listGoodsAndServicesGroups, setListGoodsAndServicesGroups] = useState<
    { label: string; value: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null);
  const [listVatTax, setListVatTax] = useState<any[]>([])

  const columns = [
    {
      title: <p className="whitespace-nowrap">Tên</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="whitespace-nowrap">Mã</p>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <p className="whitespace-nowrap">Giảm 2% thuế suất thuế GTGT</p>,
      dataIndex: "vat_decrease",
      key: "vat_decrease",
      render: (content: string) => (
        <p>{content === "not-determined" ? "Không xác định" : content}</p>
      ),
    },
    {
      title: <p className="whitespace-nowrap">Số lượng tồn</p>,
      dataIndex: "minimum_stock_quantity",
      key: "minimum_stock_quantity",
    },
    {
      title: <p className="whitespace-nowrap">Tính chất</p>,
      dataIndex: "material_group",
      key: "material_group",
      render: (material_group: any) => (
        <div className="flex gap-1.5">
          {material_group.map((item: any, idx: number) => (
            <p key={idx}>
              {(item?.goods_and_services_groups_id?.name || "") +
                (idx < material_group.length - 1 ? "," : "")}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: <p className="whitespace-nowrap">Giá trị tồn</p>,
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: <p></p>,
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            onClick={() =>
              setItemUpdate(list.find((item: any) => item?.id === id) || null)
            }
          >
            Sửa
          </Button>
          <Button onClick={() => setIdDelete(id)}>Xoá</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getItems();
    getListUnit();
    getListWarrantyPeriod();
    getListGoodsAndServicesGroups();
    getListAccount();
    getListVatTax();
  }, []);

  const getListWarrantyPeriod = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warranty_period",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListWarrantyPeriod(
        response?.data?.data
          ? response.data.data.map((item: any) => ({
            label: item?.description || "",
            value: item?.id || "",
          }))
          : []
      );
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
      setListVatTax(
        response?.data?.data
          ? response.data.data
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
            limit: 100000
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setListAccount(
        response?.data?.data || []
      );
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
      console.log("Unit", response)
      setListUnit(
        response?.data?.data
          ? response.data.data.map((item: any) => ({
            label: item?.unit || "",
            value: item?.id || "",
          }))
          : []
      );
    } catch (error) { }
  };

  const getListGoodsAndServicesGroups = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_groups",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      console.log("HH and DV group", response)
      setListGoodsAndServicesGroups(
        response?.data?.data
          ? response.data.data.map((item: any) => ({
            label: item?.name || "",
            value: item?.id || "",
          }))
          : []
      );
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
            ],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      console.log("HH and DV LIST", response)
      setList(
        response?.data?.data
          ? response.data.data.map((item: any) => {
            if (item?.minimum_stock_quantity && item?.latest_purchase_price) {
              return {
                ...item,
                total_amount: (
                  item?.minimum_stock_quantity * item.latest_purchase_price
                ).toLocaleString("vi-VN"),
              };
            }
            return {
              ...item,
              total_amount: null,
            };
          })
          : []
      );
    } catch (error) { }
  };

  const handleAcceptDelete = async () => {
    if (idDelete) {
      try {
        await axios.delete(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list/" +
          idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getItems();
      } catch (error) { }
    }
  };

  const handleAddItem = async (data: any) => {
    const materialGroup: string[] = data?.material_group || [];
    delete data.material_group;

    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        if (materialGroup.length > 0) {
          const dataGroup = materialGroup.map((id: string) => ({
            goods_and_services_groups_id: id,
            goods_and_services_list_id: response.data.data.id,
          }));
          const responseGroup = await axios.post(
            process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list_goods_and_services_groups",
            dataGroup,
            {
              headers: {
                Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
              },
            }
          );
          if (
            responseGroup?.data?.data &&
            Array.isArray(responseGroup.data.data)
          ) {
            const dataMap: number[] = responseGroup.data.data.map(
              (item: any) => item.id
            );
            await axios.patch(
              process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list/" +
              response.data.data.id,
              {
                material_group: dataMap,
              },
              {
                headers: {
                  Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
                },
              }
            );
          }
        }
        getItems();
        setIsModalOpen(false);
        check = true;
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleUpdateItem = async (data: any) => {
    const materialGroup: string[] = data?.material_group || [];
    delete data.material_group;

    let check = false;
    try {
      if (materialGroup.length > 0) {
        const dataGroup = materialGroup.map((id: string) => ({
          goods_and_services_groups_id: id,
          goods_and_services_list_id: data.id,
        }));
        const responseGroup = await axios.post(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list_goods_and_services_groups",
          dataGroup,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (
          responseGroup?.data?.data &&
          Array.isArray(responseGroup.data.data)
        ) {
          const dataMap: number[] = responseGroup.data.data.map(
            (item: any) => item.id
          );
          data.material_group = dataMap;
        }
      }
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_list/" + data.id,
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      getItems();
      setItemUpdate(null);
      check = true;
    } catch (error) {
    } finally {
      return check;
    }
  };

  return (
    <div>
      <div className="overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Thêm
          </Button>
        </div>
        <Table dataSource={list} columns={columns} rowKey="id" />
      </div>
      <AddItem
        handleAddItem={handleAddItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listUnit={listUnit}
        listWarrantyPeriod={listWarrantyPeriod}
        listGoodsAndServicesGroups={listGoodsAndServicesGroups}
        listAccount={listAccount}
        listVatTax={listVatTax}
      />
      <UpdateItem
        handleUpdateItem={handleUpdateItem}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
        listUnit={listUnit}
        listWarrantyPeriod={listWarrantyPeriod}
        listGoodsAndServicesGroups={listGoodsAndServicesGroups}
        listAccount={listAccount}
        listVatTax={listVatTax}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá hàng hoá, dịch vụ</p>
          </div>
        }
        open={
          typeof idDelete === "string" && idDelete?.length > 0 ? true : false
        }
        onOk={handleAcceptDelete}
        onCancel={() => setIdDelete(null)}
        centered
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p className="text-lg font-medium my-2">
          Bạn có chắc chắn muốn xoá khách hàng?
        </p>
      </Modal>
    </div>
  );
};
