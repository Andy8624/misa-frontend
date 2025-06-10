import { Modal } from "antd";
import { useState } from "react";

export const AddGoodsAndServicesGroups: React.FC<{
  handleAddGoodsAndServiceGroups: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}> = ({ handleAddGoodsAndServiceGroups, isModalOpen, setIsModalOpen }) => {
  const [code, setCode] = useState<string>();
  const [name, setName] = useState<string>();

  const handleActionAdd = async () => {
    const check: boolean = await handleAddGoodsAndServiceGroups({
      code, name
    });
    if (check) {
      setCode("");
      setName("");
    }
  };

  return (
    <Modal
      title="Thêm nhóm vật tư, hàng hoá, dịch vụ"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={500}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Thêm"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-full">
            <p>Mã</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <p>Tên</p>
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-24 p-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
