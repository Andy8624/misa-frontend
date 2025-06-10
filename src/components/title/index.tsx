"use client";
import Link from "next/link";
import { HiCreditCard } from "react-icons/hi2";

export const Title: React.FC = () => {
  return (
    <Link href={'/'} className="flex items-center gap-2.5 px-8 py-5">
      <div className="border-b border-orange-500 pb-1">
        <HiCreditCard className="text-[22px] text-[#504BA3] rotate-45" />
      </div>
      <p
        className="text-[18px] font-semibold text-neutral-800"
      >
        Accounting
      </p>
    </Link>
  );
};
