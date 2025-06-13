import { AddEmployee } from "@/components/add-employee";
import { UpdateEmployee } from "@/components/update-employee";
import { CreateEmployeePayload, Employee as EmployeeType } from "@/interfaces/employee.interface";
import { Button, Modal, Table } from "antd";
import { useEffect, useState, useMemo } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from "@/app/accounting/hooks/useEmployees";

export const Employee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<EmployeeType | null>(null);
  const [customerId, setCustomerId] = useState("");

  // Sử dụng React Query - giống như Supplier
  const { data: employeesData, isLoading, error } = useEmployees(customerId);
  const createEmployeeMutation = useCreateEmployee();
  const updateEmployeeMutation = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  const list = useMemo(() => employeesData?.data || [], [employeesData?.data]);

  // Chỉ set customerId một lần khi component mount - giống như Supplier
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customerIdFromStorage = localStorage.getItem("CustomerID") || "";
      setCustomerId(customerIdFromStorage);
    }
  }, []);

  const handleEditClick = (id: string) => {
    const item = list.find((item: EmployeeType) => item.id === id) || null;
    setItemUpdate(item);
  };

  const handleDeleteClick = (id: string) => {
    setIdDelete(id);
  };

  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã nhân viên</p>,
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: <p className="whitespace-nowrap">Tên nhân viên</p>,
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: <p className="whitespace-nowrap">Giới tính</p>,
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: <p className="whitespace-nowrap">Chức danh</p>,
      dataIndex: "position",
      key: "position",
    },
    {
      title: <p className="whitespace-nowrap">Điện thoại</p>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: <p></p>,
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <div className="flex items-center gap-3">
          <Button type="primary" onClick={() => handleEditClick(id)}>
            Sửa
          </Button>
          <Button onClick={() => handleDeleteClick(id)}>Xoá</Button>
        </div>
      ),
    },
  ];

  // Sử dụng mutation hooks - giống như Supplier
  const handleAddEmployee = async (data: CreateEmployeePayload) => {
    try {
      await createEmployeeMutation.mutateAsync(data);
      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleUpdateEmployee = async (data: CreateEmployeePayload) => {
    if (!itemUpdate?.id) return false;

    try {
      await updateEmployeeMutation.mutateAsync({
        id: itemUpdate.id,
        data
      });
      setItemUpdate(null);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleAcceptDelete = async () => {
    if (!idDelete || !customerId) return;

    try {
      await deleteEmployeeMutation.mutateAsync({
        employeeId: idDelete,
        customerId
      });
      setIdDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // Wrapper functions - giống như Supplier
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseUpdateModal = () => setItemUpdate(null);
  const handleCancelDelete = () => setIdDelete(null);

  // Debug log - giống như Supplier
  console.log("Employee render count:", {
    customerId,
    hasData: !!employeesData,
    listLength: list.length,
    isLoading
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra</div>;

  return (
    <div>
      <div className="overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <Button type="primary" onClick={handleOpenModal}>
            Thêm
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
      <AddEmployee
        handleAddEmployee={handleAddEmployee}
        isModalOpen={isModalOpen}
        setIsModalOpen={handleCloseModal}
      />
      <UpdateEmployee
        handleUpdateEmployee={handleUpdateEmployee}
        isModalOpen={!!itemUpdate?.id}
        setIsModalOpen={handleCloseUpdateModal}
        itemUpdate={itemUpdate}
      />
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <IoWarningOutline className="text-5xl text-yellow-500" />
            <p className="text-2xl font-semibold">Xoá nhân viên</p>
          </div>
        }
        open={!!idDelete}
        onOk={handleAcceptDelete}
        onCancel={handleCancelDelete}
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
