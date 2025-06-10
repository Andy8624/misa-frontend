"use client";

import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { Search } from "@/components/search";

export const SASales: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const listSalesVoucher: any[] = await getListSaleVoucher();
    const listProvisionServiceVoucher: any[] =
      await getListProvisionServiceVoucher();
    const list = listSalesVoucher.concat(listProvisionServiceVoucher);
    let totalAmount = 0;
    list.forEach((item: any) => {
      totalAmount += item?.total_amount || 0;
    });
    setTotalAmount(totalAmount);
    setList(list);
  };

  const getListSaleVoucher = async () => {
    let listSalesVoucher = [];
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/sales_voucher",
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
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/sales_voucher_items",
        {
          params: {
            limit: 100000,
            fields: ["*", "vat.*"],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (responseList?.data?.data && responseItems?.data?.data) {
        listSalesVoucher = responseList.data.data.map((item: any) => {
          let totalAmount = 0;
          responseItems.data.data.forEach((itemOfResItems: any) => {
            if (itemOfResItems?.sales_voucher === item.id) {
              let total =
                (itemOfResItems?.quantity || 0) *
                (itemOfResItems?.unit_price || 0);
              if (itemOfResItems?.vat?.percent) {
                total = total + total * (itemOfResItems?.vat?.percent / 100);
              }
              totalAmount += total;
            }
          });
          return {
            ...item,
            total_amount: totalAmount,
            link_read: `/popup/sa-voucher/${item?.id || ""}`,
          };
        });
      }
    } catch (error) {
    } finally {
      return listSalesVoucher;
    }
  };

  const getListProvisionServiceVoucher = async () => {
    let listProvisionServiceVoucher = [];
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/provision_service_voucher",
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
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/provision_service_voucher_items",
        {
          params: {
            limit: 100000,
            fields: ["*", "vat.*"],
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      if (responseList?.data?.data && responseItems?.data?.data) {
        listProvisionServiceVoucher = responseList.data.data.map(
          (item: any) => {
            let totalAmount = 0;
            responseItems.data.data.forEach((itemOfResItems: any) => {
              if (itemOfResItems?.provision_service_voucher === item.id) {
                let total =
                  (itemOfResItems?.quantity || 0) *
                  (itemOfResItems?.unit_price || 0);
                if (itemOfResItems?.vat?.percent) {
                  total = total + total * (itemOfResItems?.vat?.percent / 100);
                }
                totalAmount += total;
              }
            });
            return {
              ...item,
              total_amount: totalAmount,
              link_read: `/popup/sa-service/${item?.id || ""}`,
            };
          }
        );
      }
    } catch (error) {
    } finally {
      return listProvisionServiceVoucher;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="w-80">
          <Search />
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/popup/sa-voucher">
            <Button type="primary">Chứng từ bán hàng</Button>
          </Link>
          <Link href="/popup/sa-service">
            <Button type="primary">Chứng từ bán dịch vụ</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                Ngày hạch toán
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                Số chứng từ
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                Số hoá đơn
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium min-w-[350px]">
                Khách hàng
              </th>
              <th className="p-3 whitespace-nowrap font-medium text-right">
                Tổng tiền thanh toán
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                TT lập háo đơn
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                TT thanh toán
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                TT xuất hàng
              </th>
              <th className="p-3 text-left whitespace-nowrap font-medium">
                Số phiếu xuất
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => (
              <tr
                key={item.id}
                className="border-b border-neutral-200 transition-all hover:bg-neutral-100"
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
                  <Link href={item?.link_read || ""}>
                    {item?.voucher_number || ""}
                  </Link>
                </td>
                <td className="p-3">{item?.invoice_number || ""}</td>
                <td className="p-3">{item?.customer_name || ""}</td>
                <td className="p-3 text-right">
                  {(item?.total_amount || 0).toLocaleString("vi-VN")}
                </td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">
                  <Link href={item?.link_read || ""}>Xem</Link>
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-3 text-center"></td>
              <td className="p-3 font-semibold">Tổng</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3 text-right font-semibold">
                {(totalAmount || 0).toLocaleString("vi-VN")}
              </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
