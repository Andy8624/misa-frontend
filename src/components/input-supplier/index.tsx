import { PartnerType } from "@/types";
import { Popover } from "antd";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export const InputSupplier: React.FC<{
  list: PartnerType[];
  value: string | undefined;
  onChange?: any;
  fieldDisplay: string;
}> = ({ list, value, onChange, fieldDisplay }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelect = (value: PartnerType) => {
    if (onChange) {
      onChange(value);
    }
    setOpenPopover(false);
  }

  return (
    <div className="w-full h-full">
      <div className="h-full w-full outline-none overflow-hidden">
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
                  {list.map((item: PartnerType) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-all ${value === item?.id
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                        }`}
                      onClick={() => handleSelect(item)}
                    >
                      <td className="px-4 py-2.5">{item?.code || ""}</td>
                      <td className="px-4 py-2.5">{item?.name || ""}</td>
                      <td className="px-4 py-2.5">{item?.tax_code || ""}</td>
                      <td className="px-4 py-2.5 max-w-[300px] whitespace-nowrap text-ellipsis overflow-hidden">{item?.address || ""}</td>
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
              {(list.find((item: PartnerType) => item?.id === value) as any)?.[fieldDisplay] ||
                ""}
            </p>
            <IoMdArrowDropdown className="text-2xl" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
