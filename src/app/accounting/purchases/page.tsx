"use client";
import { GoodsServicePurchase } from "@/components/goods-service-purchase";
import { Tabs } from "antd";

export default function Purchase() {
    return (
        <div>
            <Tabs
                items={[
                    {
                        key: "1",
                        label: "Mua hàng hóa, dịch vụ",
                        children: <GoodsServicePurchase />,
                    },
                ]}
                defaultActiveKey="1"
            />
        </div>
    );
}
