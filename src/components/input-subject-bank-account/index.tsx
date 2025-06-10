import { SubjectBankAccountType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const InputSubjectBankAccount: React.FC<{
  list: SubjectBankAccountType[];
  value: string | undefined;
  onChange?: any;
  title: string;
}> = ({ list, value, onChange, title }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: SubjectBankAccountType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  };

  return (
    <div>
      <p className="font-medium">{title}</p>
      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
        <Popover
          content={
            <div>
              <table className="text-[13.5px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Số tài khoản</th>
                    <th className="px-4 py-2.5 text-left">Tên ngân hàng</th>
                    <th className="px-4 py-2.5 text-left">Chi nhánh</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: SubjectBankAccountType) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        value === item?.id
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <td className="px-4 py-2.5">
                        {item?.account_number || ""}
                      </td>
                      <td className="px-4 py-2.5">{item?.bank_name || ""}</td>
                      <td className="px-4 py-2.5 max-w-[300px] whitespace-nowrap text-ellipsis overflow-hidden">
                        {item?.branch || ""}
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
          <div className="transition-all hover:bg-blue-50 w-full h-full flex justify-between items-center cursor-pointer px-2">
            <p>
              {(
                list.find(
                  (item: SubjectBankAccountType) => item?.id === value
                ) as any
              )?.account_number || ""}
            </p>
            <IoIosArrowDown className="text-lg" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
