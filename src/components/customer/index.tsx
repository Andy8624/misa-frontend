import { useClient, useCreatePartner, useDeletePartner, useUpdatePartner } from "@/app/accounting/hooks/usePartner";
import { AddCustomer } from "@/components/add-customer";
import { UpdateCustomer } from "@/components/update-customer";
import { CreatePartnerPayload, Partner, PartnerTableKey } from "@/interfaces/partner.interface";
import { Button, Modal, Table } from "antd";
import { useEffect, useState, useMemo } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Customer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<Partner | null>(null);
  const [customerId, setCustomerId] = useState("");

  // Sử dụng React Query
  const { data: customersData, isLoading, error } = useClient(customerId);
  const createPartnerMutation = useCreatePartner();
  const updatePartnerMutation = useUpdatePartner();
  const deletePartnerMutation = useDeletePartner();

  const list = useMemo(() => customersData?.data || [], [customersData?.data]);

  // Chỉ set customerId một lần khi component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customerIdFromStorage = localStorage.getItem("CustomerID") || "";
      setCustomerId(customerIdFromStorage);
    }
  }, []);

  const handleEditClick = (id: string) => {
    const item = list.find(item => item.id === id) || null;
    setItemUpdate(item);
  };

  const handleDeleteClick = (id: string) => {
    setIdDelete(id);
  };

  const columns = [
    {
      title: <p className="whitespace-nowrap">Mã khách hàng</p>,
      dataIndex: PartnerTableKey.PARTNER_CODE,
      key: PartnerTableKey.PARTNER_CODE,
    },
    {
      title: <p className="whitespace-nowrap">Tên khách hàng</p>,
      dataIndex: PartnerTableKey.FULL_NAME,
      key: PartnerTableKey.FULL_NAME,
    },
    {
      title: <p className="whitespace-nowrap">Địa chỉ</p>,
      dataIndex: PartnerTableKey.ADDRESS,
      key: PartnerTableKey.ADDRESS,
    },
    {
      title: <p className="whitespace-nowrap">Mã số thuế</p>,
      dataIndex: PartnerTableKey.TAX_CODE,
      key: PartnerTableKey.TAX_CODE,
    },
    {
      title: <p className="whitespace-nowrap">Điện thoại</p>,
      dataIndex: PartnerTableKey.PHONE_NUMBER,
      key: PartnerTableKey.PHONE_NUMBER,
    },
    {
      title: <p></p>,
      dataIndex: PartnerTableKey.ID,
      key: PartnerTableKey.ID,
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

  const handleAddCustomer = async (data: CreatePartnerPayload) => {
    try {
      await createPartnerMutation.mutateAsync(data);
      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleUpdateCustomer = async (data: CreatePartnerPayload) => {
    if (!itemUpdate?.id) return false;

    try {
      await updatePartnerMutation.mutateAsync({
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
    if (!idDelete) return;

    try {
      await deletePartnerMutation.mutateAsync(idDelete);
      setIdDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra</div>;

  return (
    <div>
      <div className="overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Thêm
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          rowKey={PartnerTableKey.ID}
          pagination={false}
        />
      </div>
      <AddCustomer
        handleAddCustomer={handleAddCustomer}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UpdateCustomer
        handleUpdateCustomer={handleUpdateCustomer}
        isModalOpen={!!itemUpdate?.id}
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
        open={!!idDelete}
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
