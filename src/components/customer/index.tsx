import { AddCustomer } from "@/components/add-customer";
import { UpdateCustomer } from "@/components/update-customer";
import { CreatePartnerPayload, Partner, PartnerTableKey } from "@/interfaces/partner.interface";
import { useMessage } from "@/providers/MessageProvider";
import { partnerService } from "@/services/partner.service";
import { Button, Modal, Table } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export const Customer: React.FC = () => {
  const [list, setList] = useState<Partner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [itemUpdate, setItemUpdate] = useState<any | null>(null)
  const messageApi = useMessage()
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
      const responseNew = await partnerService.callGetAll("?search=client")
      setList(responseNew?.data || []);
    } catch (error) {
      return error;
    }
  };

  const handleAddCustomer = async (data: CreatePartnerPayload) => {
    console.log(data)
    let check = false;
    try {
      const response = await partnerService.create(data)
      if (response) {
        getListCustomer();
        setIsModalOpen(false);
        check = true;
      }
    } catch (error) {
      console.log(error)
      messageApi.error(((error as AxiosError<{ message: string }>)?.response?.data?.message) || 'An error occurred')
    } finally {
      return check;
    }
  };

  const handleUpdateCustomer = async (data: CreatePartnerPayload) => {
    let check = false;
    try {
      if (itemUpdate?.id) {
        // console.log(itemUpdate)
        const response = await partnerService.update(itemUpdate.id, data);
        // console.log("Update khách hàng", response)
        if (response) {
          getListCustomer();
          setItemUpdate(null)
          check = true;
        }
      }
    } catch (error) {
      messageApi.error(((error as AxiosError<{ message: string }>)?.response?.data?.message) || 'An error occurred')
    } finally {
      return check;
    }
  };

  const handleAcceptDelete = async () => {
    if (idDelete) {
      try {
        const response = await partnerService.delete(idDelete)
        messageApi.success(response)
        setIdDelete(null);
        await getListCustomer();
      } catch (error) {
        messageApi.error(((error as AxiosError<{ message: string }>)?.response?.data?.message) || 'An error occurred')
      }
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
        <Table dataSource={list} columns={columns} rowKey={PartnerTableKey.ID} />
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
