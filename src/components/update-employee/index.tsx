import { Modal } from "antd";
import { useEffect, useState } from "react";

export const UpdateEmployee: React.FC<{
  handleUpdateEmployee: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any
}> = ({ handleUpdateEmployee, isModalOpen, setIsModalOpen, itemUpdate }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");


  useEffect(() => {
    if(itemUpdate?.id) {
      setCode(itemUpdate?.code || '')
      setName(itemUpdate?.name || '')
      setJobTitle(itemUpdate?.job_title || '')
    }
  }, [itemUpdate])

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateEmployee({
      id: itemUpdate?.id || null,
      code,
      name,
      job_title: jobTitle
    })
    if(check) {
      setCode("")
      setName("")
      setJobTitle("")
    }
  }

  return (
    <Modal
      title="Cập nhật thông tin nhân viên"
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
          <div className="flex-grow-1">
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
          <div className="flex-grow-1">
            <p>Chức vụ</p>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
