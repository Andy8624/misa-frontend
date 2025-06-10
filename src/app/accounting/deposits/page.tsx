"use client";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { OPTION_TAB_BA_DEPOSIT } from "@/constants/constants";
import { BADepositReceipt } from "@/components/ba-deposit-receipt";
import { BAPayment } from "@/components/ba-payment";

export default function BADeposit() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [activeKey, setActiveKey] = useState(OPTION_TAB_BA_DEPOSIT.WELCOME);

    useEffect(() => {
        const keyTabSelect = searchParams.get("tab");
        if (keyTabSelect) {
            setActiveKey(keyTabSelect);
        }
    }, [searchParams]);

    const handleChangeTab = (key: string) => {
        setActiveKey(key);
        router.push(pathName + `?tab=${key}`);
    };

    return (
        <div className="w-100%">
            <Tabs
                items={[
                    {
                        key: OPTION_TAB_BA_DEPOSIT.WELCOME,
                        label: "Chung",
                        children: (
                            <div className="w-full h-full flex p-10 gap-10 bg-white">
                                <button
                                    className="px-10 py-6 border-2 border-neutral-300 rounded-xl text-base font-medium bg-white cursor-pointer"
                                    onClick={() =>
                                        setActiveKey(OPTION_TAB_BA_DEPOSIT.CASH_RECEIPT)
                                    }
                                >
                                    Thu tiền
                                </button>
                                <button
                                    className="px-10 py-6 border-2 border-neutral-300 rounded-xl text-base font-medium bg-white cursor-pointer"
                                    onClick={() =>
                                        setActiveKey(OPTION_TAB_BA_DEPOSIT.CASH_PAYMENT)
                                    }
                                >
                                    Chi tiền
                                </button>
                            </div>
                        ),
                    },
                    {
                        key: OPTION_TAB_BA_DEPOSIT.CASH_RECEIPT,
                        label: "Thu tiền",
                        children: <BADepositReceipt />,
                    },
                    {
                        key: OPTION_TAB_BA_DEPOSIT.CASH_PAYMENT,
                        label: "Chi tiền",
                        children: <BAPayment />,
                    },
                ]}
                activeKey={activeKey}
                onChange={handleChangeTab}
            />
        </div>
    );
}
