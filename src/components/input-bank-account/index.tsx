import { BankAccountType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";

export const InputBankAccount: React.FC<{
  list: BankAccountType[];
  value: string | undefined;
  onChange?: any;
}> = ({ list, value, onChange }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: BankAccountType) => {
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
                    <th className="px-4 py-2.5 text-left">Số tài khoản</th>
                    <th className="px-4 py-2.5 text-left">Tên ngân hàng</th>
                    <th className="px-4 py-2.5 text-left">Chi nhánh</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: BankAccountType) => (
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
                      <td className="px-4 py-2.5">{item?.bank.full_name || ""}</td>
                      <td className="px-4 py-2.5">{item?.branch || ""}</td>
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
              {(list.find((item: BankAccountType) => item?.id === value) as any)
                ?.account_number || ""}
            </p>
            <IoMdArrowDropdown className="text-2xl" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
