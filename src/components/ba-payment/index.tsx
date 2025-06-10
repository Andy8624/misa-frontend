import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { Search } from "@/components/search";

export const BAPayment: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getListInventoryIn();
  }, []);

  const getListInventoryIn = async () => {
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment",
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
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/ba_withdraw_payment_item",
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
              if (itemOfResItems?.ba_withdraw_payment === item.id) {
                totalAmount += itemOfResItems?.amount || 0;
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
        <Link href="/popup/ba-withdraw-payment">
          <Button type="primary">Thêm</Button>
        </Link>
      </div>
      <div className="w-full bg-white p-4 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left font-medium">Ngày hạch toán</th>
              <th className="p-3 text-left font-medium">Số chứng từ</th>
              <th className="p-3 text-left font-medium">Diễn giải</th>
              <th className="p-3 text-right font-medium">Tổng tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => (
              <tr
                key={item.id}
                className="border-b border-neutral-200 transition-all hover:bg-neutral-50"
              >
                <td className="p-3 text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  {item?.posted_date
                    ? formatDateToDDMMYYYY(item?.posted_date)
                    : ""}
                </td>
                <td className="p-3">
                  <Link href={`/popup/ba-withdraw-payment/${item?.id || ""}`}>
                    {item?.voucher_number || ""}
                  </Link>
                </td>
                <td className="p-3">{item?.description || ""}</td>
                <td className="p-3 text-right">
                  <p className="font-medium">
                    {(item?.total_amount || 0).toLocaleString("vi-VN")}
                  </p>
                </td>
                <td className="p-3">
                  <Link href={`/popup/ba-withdraw-payment/${item?.id || ""}`}>
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="transition-all hover:bg-neutral-50">
              <td className="p-3 text-center"></td>
              <td className="p-3 font-semibold">Tổng</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3 text-right">
                <p className="font-semibold">
                  {(totalAmount || 0).toLocaleString("vi-VN")}
                </p>
              </td>
              <td className="p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
