import { EmployeeType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const InputDebtCollector: React.FC<{
  list: EmployeeType[];
  value: string | undefined;
  onChange?: any;
  title: string;
}> = ({ list, value, onChange, title }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: EmployeeType) => {
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
                    <th className="px-4 py-2.5 text-left">Mã nhân viên</th>
                    <th className="px-4 py-2.5 text-left">Tên nhân viên</th>
                    <th className="px-4 py-2.5 text-left">Đơn vị</th>
                    <th className="px-4 py-2.5 text-left">ĐT di động</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: EmployeeType) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        value === item?.id
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <td className="px-4 py-2.5">{item?.code || ""}</td>
                      <td className="px-4 py-2.5">{item?.name || ""}</td>
                      <td className="px-4 py-2.5">{item?.job_title || ""}</td>
                      <td className="px-4 py-2.5">
                        {item?.phone_number || ""}
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
              {(list.find((item: EmployeeType) => item?.id === value) as any)
                ?.name || ""}
            </p>
            <IoIosArrowDown className="text-lg" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
