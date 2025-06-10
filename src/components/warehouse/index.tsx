import { AddWarehouse } from "@/components/add-warehouse";
import { UpdateWarehouse } from "@/components/update-warehouse";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Warehouse: React.FC = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null);
  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã kho</p>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <p className="whitespace-nowrap">Tên kho</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="whitespace-nowrap">Địa chỉ</p>,
      dataIndex: "address",
      key: "address",
    },
    {
      title: <p></p>,
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <div className="flex items-center gap-3 justify-end">
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
    getListWarehouse();
  }, []);

  const getListWarehouse = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/flows/trigger/cf3c64e2-c18d-43ad-ae39-462dee0ac8af",
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setList(
        response?.data
          ? response.data.map((item: any) => {
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
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warehouse/" + idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getListWarehouse();
      } catch (error) { }
    }
  };

  const handleAddWarehouse = async (data: any) => {
    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warehouse",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        getListWarehouse();
        setIsModalOpen(false);
        check = true;
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleUpdateWarehouse = async (data: any) => {
    let check = false;
    try {
      if (data?.id) {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/warehouse/" + data.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (response.data?.data?.id) {
          getListWarehouse();
          setItemUpdate(null);
          check = true;
        }
      }
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
        <Table dataSource={list} columns={columns} />
      </div>
      <AddWarehouse
        handleAddWarehouse={handleAddWarehouse}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateWarehouse
        handleUpdateWarehouse={handleUpdateWarehouse}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá kho</p>
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
          Bạn có chắc chắn muốn xoá kho?
        </p>
      </Modal>
    </div>
  );
};
