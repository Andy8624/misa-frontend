import { Button } from "antd";

export const PurchaseVoucherPreCustomsCost: React.FC = () => {
  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                #
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Ngày hạch toán
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Ngày chứng từ
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Số chứng từ
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Nhà cung cấp
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Loại tiền
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Tỷ giá
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Tổng chi phí NT
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Tổng chi phí QĐ
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Số phân bổ lần này
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Số phân bổ lần này QĐ
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Lũy kế số đã phân bổ
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Lũy kế số đã phân bổ QĐ
              </th>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr>
              <th></th>
              <th className="text-center">Cộng</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button>Chọn chứng từ CP</Button>
        <Button>Phân bổ CP mua hàng</Button>
      </div>
    </div>
  );
};
