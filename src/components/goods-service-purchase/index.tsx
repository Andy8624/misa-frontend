"use client";

import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { Search } from "@/components/search";

export const GoodsServicePurchase: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState(0);
  const [totalInventoryInValue, setTotalInventoryInValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const listServicePurchaseVoucher: any[] =
      await getListServicePurchaseVoucher();
    const listProvisionServiceVoucher: any[] = await getListPurchaseVoucher();
    const list = listServicePurchaseVoucher.concat(listProvisionServiceVoucher);
    let total = 0;
    let totalPurchaseCost = 0;
    let totalInventoryInValue = 0;
    list.forEach((item: any) => {
      total += item?.total_amount || 0;
      totalPurchaseCost += item?.purchase_cost || 0;
      totalInventoryInValue += item?.inventory_in_value || 0;
    });
    setTotalAmount(total);
    setTotalPurchaseCost(totalPurchaseCost);
    setTotalInventoryInValue(totalInventoryInValue);
    setList(list);
  };

  const getListServicePurchaseVoucher = async () => {
    let listSalesVoucher = [];
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher",
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
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/service_purchase_voucher_items",
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
          let totalPurchaseCost = 0;
          responseItems.data.data.forEach((itemOfResItems: any) => {
            if (itemOfResItems?.service_purchase_voucher === item.id) {
              let total =
                (itemOfResItems?.quantity || 0) *
                (itemOfResItems?.unit_price || 0);
              if (itemOfResItems?.vat?.percent) {
                total = total + total * (itemOfResItems.vat.percent / 100);
              }
              totalAmount += total;
              totalPurchaseCost += itemOfResItems?.purchase_cost || 0;
            }
          });
          return {
            ...item,
            purchase_cost: totalPurchaseCost,
            total_amount: totalAmount,
            link_read: `/popup/pu-service/${item?.id || ""}`,
          };
        });
      }
    } catch (error) {
    } finally {
      return listSalesVoucher;
    }
  };

  const getListPurchaseVoucher = async () => {
    let listProvisionServiceVoucher = [];
    try {
      const responseList = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher",
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
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/purchase_voucher_items",
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
            let totalPurchaseCost = 0;
            let totalInventoryInValue = 0;
            responseItems.data.data.forEach((itemOfResItems: any) => {
              if (itemOfResItems?.purchase_voucher === item.id) {
                let total =
                  (itemOfResItems?.quantity || 0) *
                  (itemOfResItems?.unit_price || 0);
                if (itemOfResItems?.vat?.percent) {
                  total = total + total * (itemOfResItems?.vat?.percent / 100);
                }
                totalAmount += total;
                totalPurchaseCost += itemOfResItems?.purchase_cost || 0;
                totalInventoryInValue +=
                  (itemOfResItems?.purchase_cost || 0) +
                  (itemOfResItems?.quantity || 0) *
                  (itemOfResItems?.unit_price || 0);
              }
            });
            return {
              ...item,
              inventory_in_value: totalInventoryInValue,
              purchase_cost: totalPurchaseCost,
              total_amount: totalAmount,
              link_read: `/popup/pu-voucher/${item?.id || ""}`,
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
          <Link href="/popup/pu-voucher">
            <Button type="primary">Chứng từ mua hàng</Button>
          </Link>
          <Link href="/popup/pu-service">
            <Button type="primary">Chứng từ mua dịch vụ</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
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
                Nhà cung cấp
              </th>
              <th className="p-3 text-right whitespace-nowrap font-medium">
                Tổng tiền thanh toán
              </th>
              <th className="p-3 text-right whitespace-nowrap font-medium">
                Chi phí mua hàng
              </th>
              <th className="p-3 text-right whitespace-nowrap font-medium">
                Giá trị nhập kho
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => (
              <tr
                key={item.id}
                className="border-t border-neutral-200 transition-all hover:bg-neutral-100"
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
                <td className="p-3">{item?.supplier_name || ""}</td>
                <td className="p-3 text-right">
                  {(item?.total_amount || 0).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-right">
                  {(item?.purchase_cost || 0).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-right">
                  {(item?.inventory_in_value || 0).toLocaleString("vi-VN")}
                </td>
                <td className="p-3">
                  <Link href={item?.link_read || ""}>Xem</Link>
                </td>
              </tr>
            ))}
            <tr className="border-t border-neutral-200">
              <td className="p-3 text-center"></td>
              <td className="p-3 font-semibold">Tổng</td>
              <td className="p-3"> </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3 font-semibold text-right">
                {(totalAmount || 0).toLocaleString("vi-VN")}
              </td>
              <td className="p-3 font-semibold text-right">
                {(totalPurchaseCost || 0).toLocaleString("vi-VN")}
              </td>
              <td className="p-3 font-semibold text-right">
                {(totalInventoryInValue || 0).toLocaleString("vi-VN")}
              </td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
