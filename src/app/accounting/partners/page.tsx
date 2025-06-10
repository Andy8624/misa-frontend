"use client";

import { Customer } from "@/components/customer";
import { CustomerAndSupplierGroup } from "@/components/customer-and-supplier-group";
import { Employee } from "@/components/employee";
import { Supplier } from "@/components/supplier";
import { Tabs, TabsProps } from "antd";

export default function Subject() {

    const items: TabsProps['items'] = [
        {
            key: "1",
            label: "Khách hàng",
            children: <Customer />,
        },
        {
            key: "2",
            label: "Nhà cung cấp",
            children: <Supplier />,
        },
        {
            key: "3",
            label: "Nhân viên",
            children: <Employee />,
        },
        {
            key: "4",
            label: "Nhóm khách hàng, nhà cung cấp",
            children: <CustomerAndSupplierGroup />,
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
