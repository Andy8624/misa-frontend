import { SubjectType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";

export const InputSubject: React.FC<{
  list: SubjectType[];
  value: string | undefined;
  onChange?: any;
  fieldDisplay: string;
}> = ({ list, value, onChange, fieldDisplay }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: SubjectType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  };

  return (
    <div className="w-full h-full">
      <div className="h-full w-full rounded-md overflow-hidden">
        <Popover
          content={
            <div>
              <table className="text-[13.5px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Đối tượng</th>
                    <th className="px-4 py-2.5 text-left">Tên đối tượng</th>
                    <th className="px-4 py-2.5 text-left">Mã số thuế</th>
                    <th className="px-4 py-2.5 text-left">Địa chỉ</th>
                    <th className="px-4 py-2.5 text-left">Điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: SubjectType) => (
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
                      <td className="px-4 py-2.5">{item?.tax_code || ""}</td>
                      <td className="px-4 py-2.5 max-w-[300px] whitespace-nowrap text-ellipsis overflow-hidden">
                        {item?.address || ""}
                      </td>
                      <td className="px-4 py-2.5">{item?.tel || ""}</td>
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
          <div className="bg-white rounded-md transition-all hover:bg-blue-50 w-full h-full flex justify-between items-center cursor-pointer px-2.5">
            <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
              {(list.find((item: SubjectType) => item?.id === value) as any)?.[
                fieldDisplay
              ] || ""}
            </div>
            <IoMdArrowDropdown className="text-lg" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
