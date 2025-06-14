import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { FormField } from "../common/FormField";
import { CreateEmployeePayload, Employee } from "@/interfaces/employee.interface";
import { VALIDATION_EMPLOYEE } from "@/constants/validation-rules";

interface UpdateEmployeeProps {
  handleUpdateEmployee: (data: CreateEmployeePayload) => Promise<boolean>;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  itemUpdate: Employee | null;
}

export const UpdateEmployee: React.FC<UpdateEmployeeProps> = ({
  handleUpdateEmployee,
  isModalOpen,
  setIsModalOpen,
  itemUpdate
}) => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("male");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [idCardIssuedDate, setIdCardIssuedDate] = useState("");
  const [idCardPlaceOfIssue, setIdCardPlaceOfIssue] = useState("");
  const [customerId, setCustomerId] = useState("");

  // Populate form khi itemUpdate thay đổi
  useEffect(() => {
    if (itemUpdate?.id) {
      setEmployeeCode(itemUpdate?.employeeCode || '');
      setFullName(itemUpdate?.fullName || '');
      // Convert Date to string format for input[type="date"]
      setDob(itemUpdate?.dob ? new Date(itemUpdate.dob).toISOString().split('T')[0] : '');
      setSex(itemUpdate?.sex || 'Nam');
      setAddress(itemUpdate?.address || '');
      setPosition(itemUpdate?.position || '');
      setPhoneNumber(itemUpdate?.phoneNumber || '');
      setPassportNumber(itemUpdate?.passportNumber || '');
      setIdCardNumber(itemUpdate?.idCardNumber || '');
      setIdCardIssuedDate(itemUpdate?.idCardIssuedDate || '');
      setIdCardPlaceOfIssue(itemUpdate?.idCardPlaceOfIssue || '');
    }
  }, [itemUpdate]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomerId(localStorage.getItem("CustomerID") || "");
    }
  }, []);

  const handleActionUpdate = async () => {
    const data: CreateEmployeePayload = {
      employeeCode,
      fullName,
      dob: new Date(dob),
      sex,
      address,
      position,
      phoneNumber,
      passportNumber,
      idCardNumber,
      idCardIssuedDate,
      idCardPlaceOfIssue,
      customerId
    };

    const success = await handleUpdateEmployee(data);
    if (success) {
      // Reset form
      setEmployeeCode("");
      setFullName("");
      setDob("");
      setSex("Nam");
      setAddress("");
      setPosition("");
      setPhoneNumber("");
      setPassportNumber("");
      setIdCardNumber("");
      setIdCardIssuedDate("");
      setIdCardPlaceOfIssue("");
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin nhân viên"
      open={isModalOpen}
      onOk={handleActionUpdate}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        {/* Thông tin cơ bản */}
        <div className="flex gap-4">
          <FormField
            label="Mã nhân viên"
            value={employeeCode}
            rules={VALIDATION_EMPLOYEE.EMPLOYEE_CODE}
          >
            <input
              type="text"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Tên nhân viên"
            value={fullName}
            rules={VALIDATION_EMPLOYEE.FULL_NAME}
          >
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Chức vụ"
            value={position}
            rules={VALIDATION_EMPLOYEE.POSITION}
          >
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>

        {/* Thông tin cá nhân */}
        <div className="flex gap-4">
          <FormField
            label="Ngày sinh"
            value={dob}
            rules={VALIDATION_EMPLOYEE.DOB}
          >
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Giới tính"
            value={sex}
          >
            <Select
              value={sex}
              onChange={(value) => setSex(value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base bg-white"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </Select>
          </FormField>

          <FormField
            label="Điện thoại"
            value={phoneNumber}
            rules={VALIDATION_EMPLOYEE.PHONE_NUMBER}
          >
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>

        {/* Thông tin giấy tờ */}
        <div className="flex gap-4">
          <FormField
            label="Số CMND/CCCD"
            value={idCardNumber}
            rules={VALIDATION_EMPLOYEE.ID_CARD_NUMBER}
          >
            <input
              type="text"
              value={idCardNumber}
              onChange={(e) => setIdCardNumber(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Ngày cấp CMND/CCCD"
            value={idCardIssuedDate}
          >
            <input
              type="date"
              value={idCardIssuedDate}
              onChange={(e) => setIdCardIssuedDate(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Số hộ chiếu"
            value={passportNumber}
          >
            <input
              type="text"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>

        <div className="flex gap-4">
          <FormField
            label="Nơi cấp CMND/CCCD"
            value={idCardPlaceOfIssue}
          >
            <input
              type="text"
              value={idCardPlaceOfIssue}
              onChange={(e) => setIdCardPlaceOfIssue(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>

        <div className="flex gap-4">
          <FormField
            label="Địa chỉ"
            value={address}
          >
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-24 p-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>
      </div>
    </Modal>
  );
};
