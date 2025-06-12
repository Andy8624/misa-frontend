import { AddCustomer } from "@/components/add-customer";
import { UpdateCustomer } from "@/components/update-customer";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Customer: React.FC = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null)
  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã khách hàng</p>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <p className="whitespace-nowrap">Tên khách hàng</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="whitespace-nowrap">Địa chỉ</p>,
      dataIndex: "address",
      key: "address",
    },
    {
      title: <p className="whitespace-nowrap">Mã số thuế</p>,
      dataIndex: "tax_code",
      key: "tax_code",
    },
    {
      title: <p className="whitespace-nowrap">Điện thoại</p>,
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: <p></p>,
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <div className="flex items-center gap-3">
          <Button type="primary" onClick={() => setItemUpdate(list.find((item: any) => item?.id === id) || null)}>
            Sửa
          </Button>
          <Button onClick={() => setIdDelete(id)}>Xoá</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getListCustomer();
  }, []);

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
      console.log("Khách hàng", response)
      setList(response?.data?.data || []);
    } catch (error) { }
  };

  const handleAddCustomer = async (data: any) => {
    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        getListCustomer();
        setIsModalOpen(false);
        check = true;
      }
    } catch (error) {
    } finally {
      return check;
    }
  };

  const handleUpdateCustomer = async (data: any) => {
    let check = false;
    try {
      if (data?.id) {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner/" + data.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        console.log("Khách hàng", response)
        if (response.data?.data?.id) {
          getListCustomer();
          setItemUpdate(null)
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/partner/" + idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getListCustomer();
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
      <AddCustomer
        handleAddCustomer={handleAddCustomer}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateCustomer
        handleUpdateCustomer={handleUpdateCustomer}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá khách hàng</p>
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
