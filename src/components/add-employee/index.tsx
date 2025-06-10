import { Modal } from "antd";
import { useState } from "react";

export const AddEmployee: React.FC<{
  handleAddEmployee: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}> = ({ handleAddEmployee, isModalOpen, setIsModalOpen }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleActionAdd = async () => {
    const check: boolean = await handleAddEmployee({
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
      title="Thông tin nhân viên"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Thêm"
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
