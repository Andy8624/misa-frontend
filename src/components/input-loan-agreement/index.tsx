import { LoanAgreementType } from "@/types";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const InputLoanAgreement: React.FC<{
  list: LoanAgreementType[];
  value: string | undefined;
  onChange?: any;
}> = ({ list, value, onChange }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: LoanAgreementType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  };

  return (
    <div>
      <div className="h-10 w-full rounded-md overflow-hidden">
        <Popover
          content={
            <div>
              <table className="text-[13.5px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Số khế ước vay</th>
                    <th className="px-4 py-2.5 text-left">Ngày giải ngân</th>
                    <th className="px-4 py-2.5 text-left">Đối tượng cho vay</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: LoanAgreementType) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-all ${value === item?.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100"
                        }`}
                      onClick={() => handleSelect(item)}
                    >
                      <td className="px-4 py-2.5">
                        {item?.agreement_no || ""}
                      </td>
                      <td className="px-4 py-2.5">
                        {item?.disbursement_date
                          ? formatDateToDDMMYYYY(item.disbursement_date)
                          : ""}
                      </td>
                      <td className="px-4 py-2.5">
                        {item?.lender?.name || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          trigger="click"
          open={openPopover}
          onOpenChange={(value) => setOpenPopover(value)}
          style={{ width: "100%", height: "100%" }}
        >
          <div className="bg-white transition-all hover:bg-blue-50 w-full h-full flex justify-between items-center cursor-pointer px-3">
            <p className="font-medium">
              {(
                list.find(
                  (item: LoanAgreementType) => item?.id === value
                ) as any
              )?.agreement_no || ""}
            </p>
            <IoIosArrowDown className="text-lg" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
