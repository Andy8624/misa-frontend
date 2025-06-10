import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "@/components/search";

export const InventoryProductionOrder: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    getListInventoryOut();
  }, []);

  const getListInventoryOut = async () => {
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      const responseItems = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/inventory_out_item",
        {
          params: {
            limit: 100000,
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (responseList?.data?.data && responseItems?.data?.data) {
        let total = 0;
        setList(
          responseList.data.data.map((item: any) => {
            let totalAmount = 0;
            responseItems.data.data.forEach((itemOfResItems: any) => {
              if (itemOfResItems?.inventory_out === item.id) {
                totalAmount +=
                  (itemOfResItems?.quantity || 0) *
                  (itemOfResItems?.unit_price || 0);
              }
            });
            total += totalAmount;
            return {
              ...item,
              total_amount: totalAmount,
            };
          })
        );
        setTotalAmount(total);
      }
    } catch (error) { }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="w-80">
          <Search />
        </div>
        <Link href="/popup/inventory-out">
          <Button type="primary">Thêm</Button>
        </Link>
      </div>
      <div className="w-full bg-white p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 font-semibold text-left">Ngày hạch toán</th>
              <th className="p-3 font-semibold text-left">Số chứng từ</th>
              <th className="p-3 font-semibold text-left">Diễn giải</th>
              <th className="p-3 font-semibold text-right">Tổng tiền</th>
              <th className="p-3 font-semibold text-left">Người giao/người nhận</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => (
              <tr key={item.id} className="border-t border-neutral-200">
                <td className="p-3 text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  {item?.posted_date
                    ? new Date(item?.posted_date).toDateString()
                    : ""}
                </td>
                <td className="p-3">
                  <Link href={`/popup/inventory-in/${item?.id || ""}`}>
                    {item?.voucher_number || ""}
                  </Link>
                </td>
                <td className="p-3">{item?.particular || ""}</td>
                <td className="p-3 text-right">
                  {(item?.total_amount || 0).toLocaleString("vi-VN")}
                </td>
                <td className="p-3">{item?.receipient || ""}</td>
                <td className="p-3">
                  <Link href={`/popup/inventory-out/${item?.id || ""}`}>
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="border-t border-neutral-200">
              <td className="p-3 text-center"></td>
              <td className="p-3 font-semibold">Tổng</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3 text-right font-semibold">
                {(totalAmount || 0).toLocaleString("vi-VN")}
              </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
