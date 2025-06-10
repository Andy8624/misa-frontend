import { AddEmployee } from "@/components/add-employee";
import { UpdateEmployee } from "@/components/update-employee";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Employee: React.FC = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null);
  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã nhân viên</p>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <p className="whitespace-nowrap">Tên nhân viên</p>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <p className="whitespace-nowrap">Chức danh</p>,
      dataIndex: "job_title",
      key: "job_title",
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
    getListEmployee();
  }, []);

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
      setList(response?.data?.data || []);
    } catch (error) { }
  };

  const handleAddEmployee = async (data: any) => {
    let check = false;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee",
        data,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (response.data?.data) {
        getListEmployee();
        setIsModalOpen(false);
        check = true;
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
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee/" + idDelete,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        setIdDelete(null);
        await getListEmployee();
      } catch (error) { }
    }
  };

  const handleUpdateEmployee = async (data: any) => {
    let check = false;
    try {
      if (data?.id) {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/employee/" + data.id,
          data,
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
            },
          }
        );
        if (response.data?.data?.id) {
          getListEmployee();
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
      <AddEmployee
        handleAddEmployee={handleAddEmployee}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateEmployee
        handleUpdateEmployee={handleUpdateEmployee}
        isModalOpen={itemUpdate?.id ? true : false}
        setIsModalOpen={() => setItemUpdate(null)}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá nhân viên</p>
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
          Bạn có chắc chắn muốn xoá nhân viên?
        </p>
      </Modal>
    </div>
  );
};
