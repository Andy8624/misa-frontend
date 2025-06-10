import { useEffect, useState } from "react";

function formatDateToVietnamese(date: string): string {
  const months = [
    "Tháng 01",
    "Tháng 02",
    "Tháng 03",
    "Tháng 04",
    "Tháng 05",
    "Tháng 06",
    "Tháng 07",
    "Tháng 08",
    "Tháng 09",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `Ngày ${day} ${month} năm ${year}`;
}

export const VATInvoice: React.FC<{ xmlDataInvoice: Document | null }> = ({
  xmlDataInvoice,
}) => {
  const [formInvoice, setFormInvoice] = useState<string | null>(null);
  const [codeInvoice, setCodeInvoice] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);
  const [taxOfficeCode, setTaxOfficeCode] = useState<string | null>(null);
  const [invoiceDate, setInvoiceDate] = useState<string | null>(null);
  const [supplierName, setSupplierName] = useState<string | null>(null);
  const [supplierTaxCode, setSupplierTaxCode] = useState<string | null>(null);
  const [supplierAddress, setSupplierAddress] = useState<string | null>(null);
  const [supplierPhone, setSupplierPhone] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [customerTaxCode, setCustomerTaxCode] = useState<string | null>(null);
  const [customerAddress, setCustomerAddress] = useState<string | null>(null);
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (xmlDataInvoice) {
      const xmlMCCQT = xmlDataInvoice.getElementsByTagName("MCCQT");
      setTaxOfficeCode(xmlMCCQT[0].textContent);

      const xmlTTChung = xmlDataInvoice.getElementsByTagName("TTChung");
      const xmlKHMSHDon = xmlTTChung[0].getElementsByTagName("KHMSHDon");
      const xmlKHHDon = xmlTTChung[0].getElementsByTagName("KHHDon");
      const xmlSHDon = xmlTTChung[0].getElementsByTagName("SHDon");
      const xmlNLap = xmlTTChung[0].getElementsByTagName("NLap");
      setFormInvoice(xmlKHMSHDon[0].textContent);
      setCodeInvoice(xmlKHHDon[0].textContent);
      setInvoiceNumber(xmlSHDon[0].textContent);
      setInvoiceDate(formatDateToVietnamese(xmlNLap[0].textContent as string));

      const xmlNDHDon = xmlDataInvoice.getElementsByTagName("NDHDon");

      const xmlNBan = xmlNDHDon[0].getElementsByTagName("NBan");
      const xmlTen = xmlNBan[0].getElementsByTagName("Ten");
      const xmlMST = xmlNBan[0].getElementsByTagName("MST");
      const xmlDChi = xmlNBan[0].getElementsByTagName("DChi");
      const xmlSDThoai = xmlNBan[0].getElementsByTagName("SDThoai");
      setSupplierName(xmlTen[0].textContent);
      setSupplierTaxCode(xmlMST[0].textContent);
      setSupplierAddress(xmlDChi[0].textContent);
      setSupplierPhone(xmlSDThoai[0].textContent);

      const xmlNMua = xmlNDHDon[0].getElementsByTagName("NMua");
      const xmlTenNMua = xmlNMua[0].getElementsByTagName("Ten");
      const xmlMSTNMua = xmlNMua[0].getElementsByTagName("MST");
      const xmlDChiNMua = xmlNMua[0].getElementsByTagName("DChi");
      setCustomerName(xmlTenNMua[0].textContent);
      setCustomerTaxCode(xmlMSTNMua[0].textContent);
      setCustomerAddress(xmlDChiNMua[0].textContent);

      const xmlDSHHDVu = xmlNDHDon[0].getElementsByTagName("DSHHDVu");
      const xmlHHDVu = xmlDSHHDVu[0].getElementsByTagName("HHDVu");
      const goods: any[] = [];
      for (let i = 0; i < xmlHHDVu.length; i++) {
        const hhdvuElement = xmlHHDVu[i];

        const stt = hhdvuElement.getElementsByTagName("STT")[0]?.textContent;
        const thhdvu =
          hhdvuElement.getElementsByTagName("THHDVu")[0]?.textContent;
        const dvtinh =
          hhdvuElement.getElementsByTagName("DVTinh")[0]?.textContent;
        const sluong =
          hhdvuElement.getElementsByTagName("SLuong")[0]?.textContent;
        const dgia = hhdvuElement.getElementsByTagName("DGia")[0]?.textContent;
        const thtien =
          hhdvuElement.getElementsByTagName("ThTien")[0]?.textContent;
        const tsuat =
          hhdvuElement.getElementsByTagName("TSuat")[0]?.textContent;

        goods.push({
          no: stt,
          description: thhdvu,
          unit: dvtinh,
          quantity: sluong,
          unit_price: dgia,
          total: thtien,
          vat_rate: tsuat,
        });
      }
      setList(goods)
    }
  }, [xmlDataInvoice]);
  return (
    <div className="w-full max-w-[1200px] block my-0 mx-auto bg-white p-8">
      <div className="flex justify-center items-center relative pb-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-2xl font-semibold">HÓA ĐƠN GIÁ TRỊ GIA TĂNG</p>
            <p className="text-2xl font-semibold italic">(VAT INVOICE)</p>
          </div>
          <p className="italic">{invoiceDate || ""}</p>
          <p className="font-semibold italic">
            Mã của cơ quan thuế: {taxOfficeCode || ""}
          </p>
        </div>
        <div className="absolute right-8 flex flex-col gap-1.5">
          <p className="font-semibold">Ký hiệu (Series): {codeInvoice || ""}</p>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold">Số (No.):</p>
            <p className="text-red-600 font-semibold">{invoiceNumber || ""}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-8 border-y border-gray-400">
        <p>
          Tên đơn vị bán hàng (ComName): <strong>{supplierName}</strong>
        </p>
        <p>Mã số thuế (Tax code): {supplierTaxCode}</p>
        <p>Địa chỉ (Address): {supplierAddress}</p>
        <p>Số điện thoại (Phone): {supplierPhone}</p>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <p>Họ tên người mua hàng (Buyer):</p>
        <p>Tên đơn vị mua hàng(CusName): {customerName || ""}</p>
        <p>Mã số thuế (Tax code): {customerTaxCode || ""}</p>
        <p>Địa chỉ (Address): {customerAddress}</p>
      </div>
      <div className="py-2">
        <table className="w-full table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">STT</p>
                  <p className="font-semibold italic">(No.)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Tên hàng hóa, dịch vụ</p>
                  <p className="font-semibold italic">(Description)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Đơn vị tính</p>
                  <p className="font-semibold italic">(Unit)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Số lượng</p>
                  <p className="font-semibold italic">(Quantity)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Đơn giá</p>
                  <p className="font-semibold italic">(Unit price)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Thành tiền</p>
                  <p className="font-semibold italic">(Total)</p>
                </div>
              </th>
              <th className="py-2.5 px-4 border border-gray-500">
                <div>
                  <p className="font-semibold">Thuế suất GTGT</p>
                  <p className="font-semibold italic">(VAT rate)</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any, idx: number) => (
              <tr key={idx}>
                <td className="py-2.5 px-4 border border-gray-500 text-center">{item?.no || ""}</td>
                <td className="text-left py-2.5 px-4 border border-gray-500">{item?.description || ""}</td>
                <td className="py-2.5 px-4 border border-gray-500 text-center">{item?.unit || ""}</td>
                <td className="py-2.5 px-4 border border-gray-500 text-right">{item?.quantity || ""}</td>
                <td className="py-2.5 px-4 border border-gray-500 text-right">{item?.unit_price || ""}</td>
                <td className="py-2.5 px-4 border border-gray-500 text-right">{item?.total || ""}</td>
                <td className="py-2.5 px-4 border border-gray-500 text-right">{item?.vat_rate || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-around gap-20 mt-8">
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-bold text-[15px]">Người mua hàng</p>
          <p className="italic">(Ký ghi rõ họ tên)</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-bold text-[15px]">Người bán hàng</p>
          <p className="italic">(Ký ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
};
