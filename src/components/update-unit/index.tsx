import { Modal } from "antd";
import { useEffect, useState } from "react";

export const UpdateUnit: React.FC<{
  handleUpdateUnit: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any;
}> = ({ handleUpdateUnit, isModalOpen, setIsModalOpen, itemUpdate }) => {
  const [unit, setUnit] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    if (itemUpdate?.id) {
      setUnit(itemUpdate?.unit || "");
      setDescription(itemUpdate?.description || "");
    }
  }, [itemUpdate]);

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateUnit({
      id: itemUpdate?.id || null,
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
      title="Cập nhật đon vị tính"
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
