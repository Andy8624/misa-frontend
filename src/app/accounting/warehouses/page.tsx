"use client";
import { InventoryIn } from "@/components/inventory-In";
import { InventoryProductionOrder } from "@/components/inventory-production-order";
import { Tabs } from "antd";

export default function Inventory() {
  return (
    <div className="w-100%">
      <Tabs
        items={[
          {
            key: "1",
            label: "Nhập kho",
            children: <InventoryIn />,
          },
          {
            key: "2",
            label: "Xuất kho",
            children: <InventoryProductionOrder />,
          },
          {
            key: "3",
            label: "Lệnh sản xuất",
            children: "coming soon",
          },
        ]}
        defaultActiveKey="1"
      />
    </div>
  );
}
