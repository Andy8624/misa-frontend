import { ItemType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export const InputItem: React.FC<{
  list: ItemType[];
  value: string | undefined;
  fieldDisplay: string;
  onChange?: any;
}> = ({ list, value, onChange, fieldDisplay }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: ItemType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  };

  return (
    <div className="w-full h-full">
      <div className="h-full w-full outline-none overflow-hidden">
        <Popover
          content={
            <div>
              <table className="text-[13.5px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Mã hàng</th>
                    <th className="px-4 py-2.5 text-left">Tên hàng</th>
                    <th className="px-4 py-2.5 text-left">Số lượng tồn</th>
                    <th className="px-4 py-2.5 text-left">
                      Đơn giá mua gần nhất
                    </th>
                    <th className="px-4 py-2.5 text-left">Giá bán 1</th>
                    <th className="px-4 py-2.5 text-left">Giá bán 2</th>
                    <th className="px-4 py-2.5 text-left">Giá bán 3</th>
                    <th className="px-4 py-2.5 text-left">Giá bán cố định</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: ItemType) => (
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
                      <td className="px-4 py-2.5 text-right">0</td>
                      <td className="px-4 py-2.5 text-right">0</td>
                      <td className="px-4 py-2.5 text-right">0</td>
                      <td className="px-4 py-2.5 text-right">0</td>
                      <td className="px-4 py-2.5 text-right">0</td>
                      <td className="px-4 py-2.5 text-right">0</td>
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
              {(list.find((item: ItemType) => item?.id === value) as any)?.[
                fieldDisplay
              ] || ""}
            </p>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
