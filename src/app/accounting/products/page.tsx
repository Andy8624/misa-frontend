"use client";

import { GroupsOfItems } from "@/components/groups-of-Items";
import { ItemList } from "@/components/item-list";
import { Unit } from "@/components/unit";
import { Warehouse } from "@/components/warehouse";
import { Tabs, TabsProps } from "antd";

export default function Items() {

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Vật tư hàng hoá",
      children: <ItemList />,
    },
    {
      key: "2",
      label: "Kho",
      children: <Warehouse />,
    },
    {
      key: "3",
      label: "Nhóm vật tư, hàng hoá, dịch vụ",
      children: <GroupsOfItems />,
    },
    {
      key: "4",
      label: "Đơn vị tính",
      children: <Unit />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
