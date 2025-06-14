import { AddGoodsAndServicesGroups } from "@/components/add-goods-and-services-groups";
import { UpdateGoodsAndServicesGroups } from "@/components/update-goods-and-services-groups";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const GroupsOfItems: React.FC = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null);
  const columns = [
    {
      title: (
        <p className="whitespace-nowrap">Mã nhóm vật tư, hàng hoá, dịch vụ</p>
      ),
      dataIndex: "code",
      key: "code",
    },
    {
      title: (
        <p className="whitespace-nowrap">Tên nhóm vật tư, hàng hoá, dịch vụ</p>
      ),
      dataIndex: "name",
      key: "name",
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
    getListGoodsAndServicesGroups();
  }, []);

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
      setList(response?.data?.data || []);
    } catch (error) { }
  };

  const handleAcceptDelete = async () => {
    if (idDelete) {
      try {
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_groups/" +
          idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getListGoodsAndServicesGroups();
      } catch (error) { }
    }
  };

  const handleUpdateGoodsAndServicesGroups = async (data: any) => {
    let check = false;
    try {
      if (data?.id) {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_groups/" + data.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (response.data?.data?.id) {
          getListGoodsAndServicesGroups();
          setItemUpdate(null);
          check = true;
        }
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleAddGoodsAndServiceGroups = async (data: any) => {
    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/goods_and_services_groups",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        getListGoodsAndServicesGroups();
        setIsModalOpen(false);
        check = true;
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
        <Table dataSource={list} columns={columns} rowKey="id" />
      </div>
      <AddGoodsAndServicesGroups
        handleAddGoodsAndServiceGroups={handleAddGoodsAndServiceGroups}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateGoodsAndServicesGroups
        handleUpdateGoodsAndServicesGroups={handleUpdateGoodsAndServicesGroups}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">
              Xoá nhóm vật tư, hàng hoá, dịch vụ
            </p>
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
          Bạn có chắc chắn muốn xoá nhóm vật tư, hàng hoá, dịch vụ?
        </p>
      </Modal>
    </div>
  );
};
