"use client";

import { PurchaseInvoice } from "@/components/purchase-invoice";
import { SalesInvoice } from "@/components/sales-invoice";
import { Tabs, TabsProps } from "antd";

export default function InvoiceManagement() {

    const items: TabsProps['items'] = [
        {
            key: "1",
            label: "Hoá đơn đầu vào",
            children: <PurchaseInvoice />,
        },
        {
            key: "2",
            label: "Hoá đơn đầu ra",
            children: <SalesInvoice />,
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className="h-full w-full">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    );
}
