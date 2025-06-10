import { AddUnit } from "@/components/add-unit";
import { UpdateUnit } from "@/components/update-unit";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Unit: React.FC = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null);
  const columns = [
    {
      title: <p className="whitespace-nowrap">Dơn vị tính</p>,
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: <p className="whitespace-nowrap">Mô tả</p>,
      dataIndex: "description",
      key: "description",
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
    getListUnit();
  }, []);

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

  const handleAddUnit = async (data: any) => {
    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        getListUnit();
        setIsModalOpen(false);
        check = true;
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleUpdateUnit = async (data: any) => {
    let check = false;
    try {
      if (data?.id) {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit/" + data.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (response.data?.data?.id) {
          getListUnit();
          setItemUpdate(null);
          check = true;
        }
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleAcceptDelete = async () => {
    if (idDelete) {
      try {
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/unit/" + idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getListUnit();
      } catch (error) { }
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
      <AddUnit
        handleAddUnit={handleAddUnit}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateUnit
        handleUpdateUnit={handleUpdateUnit}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá đơn vị tính</p>
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
          Bạn có chắc chắn muốn xoá đơn vị tính?
        </p>
      </Modal>
    </div>
  );
};
