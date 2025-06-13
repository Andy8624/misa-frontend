import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CreatePartnerPayload, LegalType, PartnerType } from "@/interfaces/partner.interface";
import { FormField } from "@/components/common/FormField";
import { VALIDATION_PARTNER } from "@/constants/validation-rules";

interface AddCustomerProps {
  handleAddCustomer: (data: CreatePartnerPayload) => Promise<boolean>;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const AddCustomer: React.FC<AddCustomerProps> = ({
  handleAddCustomer,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [legalType, setLegalType] = useState<LegalType>(LegalType.ORGANIZATION);
  const [partnerType, setPartnerType] = useState<PartnerType>(PartnerType.CLIENT);
  const [taxCode, setTaxCode] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [govUnitCode, setGovUnitCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomerId(localStorage.getItem("CustomerID") || "");
    }
  }, []);

  const handleActionAdd = async () => {
    const data: CreatePartnerPayload = {
      partnerCode,
      partnerType,
      legalType,
      taxCode,
      govUnitCode,
      phoneNumber,
      websiteUrl,
      fullName,
      address,
      customerId
    };

    const success: boolean = await handleAddCustomer(data);
    if (success) {
      // Reset form
      setLegalType(LegalType.ORGANIZATION);
      setPartnerType(PartnerType.CLIENT);
      setTaxCode("");
      setPartnerCode("");
      setGovUnitCode("");
      setPhoneNumber("");
      setWebsiteUrl("");
      setFullName("");
      setAddress("");
    }
  };

  return (
    <Modal
      title="Thông tin khách hàng"
      open={isModalOpen}
      onOk={handleActionAdd}
      width={800}
      onCancel={() => setIsModalOpen(false)}
      centered
      okText="Thêm"
      cancelText="Huỷ"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value={LegalType.ORGANIZATION}
                name="legal-type"
                checked={legalType === LegalType.ORGANIZATION}
                onChange={(e) => setLegalType(e.target.value as LegalType)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Tổ chức
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value={LegalType.INDIVIDUAL}
                checked={legalType === LegalType.INDIVIDUAL}
                onChange={(e) => setLegalType(e.target.value as LegalType)}
                name="legal-type"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
              checked={partnerType === PartnerType.SUPPLIER}
              onChange={(e) => setPartnerType(e.target.checked ? PartnerType.SUPPLIER : PartnerType.CLIENT)}
            />
            <p>Là nhà cung cấp</p>
          </div>
        </div>

        {/* Chỉ cần wrap input trong FormField */}
        <div className="flex gap-4">
          <FormField
            label="Mã số thuế"
            value={taxCode}
            rules={VALIDATION_PARTNER.TAX_CODE}
          >
            <input
              type="text"
              value={taxCode}
              onChange={(e) => setTaxCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Mã khách hàng"
            value={partnerCode}
            rules={VALIDATION_PARTNER.PARTNER_CODE}
          >
            <input
              type="text"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>

          <FormField
            label="Mã ĐVCQHVNS"
            value={govUnitCode}
          >
            <input
              type="text"
              value={govUnitCode}
              onChange={(e) => setGovUnitCode(e.target.value)}
              className="w-full h-12 px-3 border outline-none rounded-md text-base"
            />
          </FormField>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              label="Điện thoại"
              value={phoneNumber}
              rules={VALIDATION_PARTNER.PHONE_NUMBER}
            >
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-12 px-3 border outline-none rounded-md text-base"
              />
            </FormField>
          </div>
          <div className="flex-grow-1">
            <FormField
              label="Website"
              value={websiteUrl}
              rules={VALIDATION_PARTNER.WEBSITE_URL}
            >
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full h-12 px-3 border outline-none rounded-md text-base"
              />
            </FormField>
          </div>
        </div>

        <div className="flex gap-4">
          <FormField
            label="Tên khách hàng"
            value={fullName}
            rules={VALIDATION_PARTNER.FULL_NAME}
          >
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
