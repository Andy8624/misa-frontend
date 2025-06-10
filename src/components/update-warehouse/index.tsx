import { Modal } from "antd";
import { useEffect, useState } from "react";

export const UpdateWarehouse: React.FC<{
  handleUpdateWarehouse: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any;
}> = ({ handleUpdateWarehouse, isModalOpen, setIsModalOpen, itemUpdate }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (itemUpdate?.id) {
      setCode(itemUpdate?.code || "");
      setName(itemUpdate?.name || "");
      setAddress(itemUpdate?.address || "");
    }
  }, [itemUpdate]);

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateWarehouse({
      id: itemUpdate?.id || null,
      code,
      name,
      address,
    });
    if (check) {
      setCode("");
      setName("");
      setAddress("");
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin kho"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-1/3">
            <p>Mã</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Tên</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <p>Địa chỉ</p>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-24 p-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
