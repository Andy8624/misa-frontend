import { Modal } from "antd";
import { useState } from "react";

export const AddUnit: React.FC<{
  handleAddUnit: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}> = ({ handleAddUnit, isModalOpen, setIsModalOpen }) => {
  const [unit, setUnit] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleActionAdd = async () => {
    const check: boolean = await handleAddUnit({
      unit,
      description,
    });
    if (check) {
      setUnit("");
      setDescription("");
    }
  };

  return (
    <Modal
      title="Thêm đơn vị tính"
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
            <p>Đơn vị tính</p>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <p>Mô tả</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 p-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
