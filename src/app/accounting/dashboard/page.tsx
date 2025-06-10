"use client";

import { FaFileInvoice } from "react-icons/fa";

export default function PurchaseInvoice() {
  return (
    <div className="h-full w-full">
      <div className="flex gap-10">
        <div className="flex flex-col p-8 gap-6 rounded-xl bg-white">
          <p className="text-base font-semibold">
            Tự động hạch toán hóa đơn đầu vào
          </p>
          <div className="flex gap-4">
            <FaFileInvoice className="text-8xl text-cyan-500" />
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="flex items-center gap-2">
                <p className="text-5xl font-bold">45</p>
                <p className="text-base">
                  Hóa đơn đầu vào đã xử lý và chờ xác nhận
                </p>
              </div>
              <button className="text-white bg-green-600 font-medium rounded-full text-base px-5 py-2 text-center">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-8 gap-6 rounded-xl bg-white">
          <p className="text-base font-semibold">
            Tự động hạch toán hóa đơn đầu ra
          </p>
          <div className="flex gap-4">
            <FaFileInvoice className="text-8xl text-cyan-500" />
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="flex items-center gap-2">
                <p className="text-5xl font-bold">4</p>
                <p className="text-base">
                  Hóa đơn đầu ra đã xử lý và chờ xác nhận
                </p>
              </div>
              <button className="text-white bg-green-600 font-medium rounded-full text-base px-5 py-2 text-center">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
