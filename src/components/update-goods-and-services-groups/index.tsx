import { Modal } from "antd";
import { useEffect, useState } from "react";

export const UpdateGoodsAndServicesGroups: React.FC<{
  handleUpdateGoodsAndServicesGroups: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any;
}> = ({
  handleUpdateGoodsAndServicesGroups,
  isModalOpen,
  setIsModalOpen,
  itemUpdate,
}) => {
  const [code, setCode] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (itemUpdate?.id) {
      setCode(itemUpdate?.code || "");
      setName(itemUpdate?.name || "");
    }
  }, [itemUpdate]);

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateGoodsAndServicesGroups({
      id: itemUpdate?.id || null,
      code,
      name,
    });
    if (check) {
      setCode("");
      setName("");
    }
  };

  return (
    <Modal
      title="Cập nhật nhóm vật tư, hàng hoá, dịch vụ"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={500}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Cập nhật"
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
