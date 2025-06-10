import { Modal } from "antd";
import { useEffect, useState } from "react";

export const UpdateCustomer: React.FC<{
  handleUpdateCustomer: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  itemUpdate: any
}> = ({ handleUpdateCustomer, isModalOpen, setIsModalOpen, itemUpdate }) => {
  const [options, setOptions] = useState("organization");
  const [isSupplier, setIsSupplier] = useState<boolean>(false);
  const [taxCode, setTaxCode] = useState("");
  const [code, setCode] = useState("");
  const [govUnitCode, setGovUnitCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if(itemUpdate?.id) {
      setOptions(itemUpdate?.options || '')
      setIsSupplier(itemUpdate?.is_supplier || false)
      setTaxCode(itemUpdate?.tax_code || '')
      setCode(itemUpdate?.code || '')
      setGovUnitCode(itemUpdate?.gov_unit_code || '')
      setPhoneNumber(itemUpdate?.phone_number || '')
      setWebsite(itemUpdate?.website || '')
      setName(itemUpdate?.name || '')
      setAddress(itemUpdate?.address || '')
    }
  }, [itemUpdate])

  const handleActionAdd = async () => {
    const check: boolean = await handleUpdateCustomer({
      id: itemUpdate?.id || null,
      type: 'customer',
      options,
      is_supplier: isSupplier,
      tax_code: taxCode,
      code,
      goc_unit_code: govUnitCode,
      phone_number: phoneNumber,
      website,
      name,
      address
    })
    if(check) {
      setIsSupplier(false)
      setTaxCode("")
      setCode("")
      setGovUnitCode("")
      setPhoneNumber("")
      setWebsite("")
      setName("")
      setAddress("")
    }
  }

  return (
    <Modal
      title="Cập nhật thông tin khách hàng"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value="organization"
                name="default-radio"
                checked={options === "organization"}
                onChange={(e) => setOptions(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Tổ chức
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value="individual"
                checked={options === "individual"}
                onChange={(e) => setOptions(e.target.value)}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Cá nhân
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isSupplier}
              onChange={(e) => setIsSupplier(e.target.checked)}
            />
            <p>Là nhà cung cấp</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow-1">
            <p>Mã số thuế</p>
            <input
              type="text"
              value={taxCode}
              onChange={(e) => setTaxCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Mã khách hàng</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Mã ĐVCQHVNS</p>
            <input
              type="text"
              value={govUnitCode}
              onChange={(e) => setGovUnitCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <p>Điện thoại</p>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
          <div className="flex-grow-1">
            <p>Website</p>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <p>Tên khách hàng</p>
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
