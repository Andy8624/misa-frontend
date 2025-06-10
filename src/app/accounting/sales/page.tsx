"use client";
import { SASales } from "@/components/sales";
import { Tabs } from "antd";

export default function Sales() {
    return (
        <div className="w-100%">
            <Tabs
                items={[
                    {
                        key: "1",
                        label: "Bán hàng",
                        children: <SASales />,
                    },
                ]}
                defaultActiveKey="1"
            />
        </div>
    );
}
