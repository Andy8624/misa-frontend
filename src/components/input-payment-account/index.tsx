import { BankAccountType } from "@types";
import { Popover } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const InputPaymentAccount: React.FC<{
  list: BankAccountType[];
  value: string | undefined;
  onChange?: any;
  title: string;
}> = ({ list, value, onChange, title }) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleSelectPaymentAccount = (id: string) => {
    const bankAccount = list.find((item: any) => item?.id === id);
    if (bankAccount) {
      if (onChange) {
        onChange(bankAccount);
      }
      setOpenPopover(false);
    }
  };

  return (
    <div>
      <p className="font-medium">{title}</p>
      <div className="h-10 w-full outline-none border rounded-md overflow-hidden">
        <Popover
          content={
            <div>
              <table>
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2.5 text-left">Số tài khoản</th>
                    <th className="px-4 py-2.5 text-left">Tên ngân hàng</th>
                    <th className="px-4 py-2.5 text-left">Chi nhánh</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item: any) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        item?.id === value
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }`}
                      onClick={() => handleSelectPaymentAccount(item.id)}
                    >
                      <td className="px-4 py-2.5">
                        {item?.account_number || ""}
                      </td>
                      <td className="px-4 py-2.5">
                        {item?.bank?.full_name || ""}
                      </td>
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
          <div className="transition-all hover:bg-blue-50 w-full h-full flex justify-between items-center cursor-pointer px-2">
            <p className="text-base">
              {list.find((item: any) => item?.id === value)?.account_number ||
                ""}
            </p>
            <IoIosArrowDown className="text-lg" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
