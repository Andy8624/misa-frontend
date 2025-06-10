import { ChartOfAccountsType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";

export const InputChartOfAccounts: React.FC<{
  list: ChartOfAccountsType[];
  value: string | undefined;
  onChange?: any;
}> = ({ list, value, onChange }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: ChartOfAccountsType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  };

  return (
    <div className="h-full w-full">
      <div className="h-full w-full rounded-md overflow-hidden">
        <Popover
          content={
            <div>
              <table className="text-[13.5px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Số tài khoản</th>
                    <th className="px-4 py-2.5 text-left">Tên tài khoản </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: ChartOfAccountsType) => (
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
                      <td className="px-4 py-2.5">
                        {item?.account_name || ""}
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
                  (item: ChartOfAccountsType) => item?.id === value
                ) as any
              )?.account_number || ""}
            </p>
            <IoMdArrowDropdown className="text-xl" />
          </div>  
        </Popover>
      </div>
    </div>
  );
};
