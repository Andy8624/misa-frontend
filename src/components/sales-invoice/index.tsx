import { VATInvoice } from "@/components/vat-invoice";
import { Button, Drawer, Popover, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export const SalesInvoice: React.FC = () => {
  const [list, setList] = useState([]);
  const columns = [
    {
      title: <p className="whitespace-nowrap">Ngày hoá đơn</p>,
      dataIndex: "invoice_date",
      key: "invoice_date",
      render: (content: string) => {
        const date = new Date(content);
        return <p className="whitespace-nowrap">{date.toLocaleDateString()}</p>;
      },
    },
    {
      title: <p className="whitespace-nowrap">Số hoá đơn</p>,
      dataIndex: "invoice_number",
      key: "invoice_number",
    },
    {
      title: <p className="whitespace-nowrap">Mẫu số</p>,
      dataIndex: "form_invoice",
      key: "form_invoice",
    },
    {
      title: "Ký hiệu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Khách hàng",
      dataIndex: "partner_name",
      key: "partner_name",
      render: (text: any) => <p className="whitespace-nowrap">{text}</p>,
    },
    {
      title: <p className="whitespace-nowrap">Mã số thuế</p>,
      dataIndex: "tax_id",
      key: "tax_id",
      render: (text: any) => <p className="whitespace-nowrap">{text}</p>,
    },
    {
      title: <p className="whitespace-nowrap">Tiền hàng</p>,
      dataIndex: "goods_amount",
      key: "goods_amount",
      render: (content: number) => (
        <p className="whitespace-nowrap text-right">
          {Number(content).toLocaleString("vi-VN")}
        </p>
      ),
    },
    {
      title: <p className="whitespace-nowrap">Tiền thuế</p>,
      dataIndex: "tax_amount",
      key: "tax_amount",
      render: (content: number) => (
        <p className="whitespace-nowrap text-right">
          {Number(content).toLocaleString("vi-VN")}
        </p>
      ),
    },
    {
      title: <p className="whitespace-nowrap text-right">Giá trị háo đơn</p>,
      dataIndex: "invoice_value",
      key: "invoice_value",
      render: (content: number) => (
        <p className="whitespace-nowrap">
          {Number(content).toLocaleString("vi-VN")}
        </p>
      ),
    },
    // {
    //   title: <p className="whitespace-nowrap">Loại hoá đơn</p>,
    //   dataIndex: "invoice_type",
    //   key: "invoice_type",
    // },
    // {
    //   title: <p className="whitespace-nowrap">Trạng thái hoá đơn</p>,
    //   dataIndex: "invoice_status",
    //   key: "invoice_status",
    // },
    // {
    //   title: <p className="whitespace-nowrap">Kết quả kiểm tra háo đơn</p>,
    //   dataIndex: "invoice_verification_result",
    //   key: "invoice_verification_result",
    // },
    // {
    //   title: <p className="whitespace-nowrap">Thời gian kiểm tra gần nhất</p>,
    //   dataIndex: "last_verification_time",
    //   key: "last_verification_time",
    // },
    // {
    //   title: <p className="whitespace-nowrap">Trạng thái hạch toán</p>,
    //   dataIndex: "accounting_status",
    //   key: "accounting_status",
    // },
    // {
    //   title: <p className="whitespace-nowrap">Chững từ hạch toán</p>,
    //   dataIndex: "accounting_document",
    //   key: "accounting_document",
    // },
    {
      title: <p></p>,
      dataIndex: "id",
      key: "id",
      render: (content: any) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/popup/sa-voucher?invoice=` + content}
            className="whitespace-nowrap block font-medium"
          >
            Lập chứng từ bán hàng
          </Link>
          <Popover
            key={xmlDataInvoice ? content : ""}
            content={
              <div className="flex flex-col">
                <Link
                  href={`/popup/sa-service?invoice=` + content}
                  className="p-1.5 font-medium"
                >
                  <p className="text-gray-800">Lập chứng từ bán dịch vụ</p>
                </Link>
                <div
                  onClick={() => handleFileXml(content)}
                  className="p-1.5 font-medium cursor-pointer"
                >
                  <p className="text-gray-800">Xem</p>
                </div>
              </div>
            }
            trigger="click"
            style={{ padding: 0, margin: 0, border: "none" }}
          >
            <IoMdArrowDropdown className="text-2xl text-blue-600 cursor-pointer" />
          </Popover>
        </div>
      ),
    },
  ];
  const [xmlDataInvoice, setXmlDataInvoice] = useState<Document | null>(null);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "text/xml") {
      const reader: any = new FileReader();
      reader.onload = async () => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(reader.result, "application/xml");
        const xmlCode = xmlDoc.getElementsByTagName("KHHDon");
        const xmlInvoiceNumber = xmlDoc.getElementsByTagName("SHDon");
        const xmlInvoiceContent = xmlDoc.getElementsByTagName("NDHDon");
        const xmlInvoiceDate = xmlDoc.getElementsByTagName("NLap");
        const xmlSeller = xmlInvoiceContent[0].getElementsByTagName("NBan");
        const xmlSellerName = xmlSeller[0].getElementsByTagName("Ten");
        const xmlTaxId = xmlSeller[0].getElementsByTagName("MST");
        const xmlSellerTaxCode = xmlSeller[0].getElementsByTagName("MST");
        const xmlPayment = xmlDoc.getElementsByTagName("TToan");
        const xmlTotalExcludingTax =
          xmlPayment[0].getElementsByTagName("TgTCThue");
        const xmlTotalTax = xmlPayment[0].getElementsByTagName("TgTThue");
        const xmlTotalAmount = xmlPayment[0].getElementsByTagName("TgTTTBSo");
        const data = {
          code: xmlCode[0].textContent,
          invoiceNumber: xmlInvoiceNumber[0].textContent,
          seller: xmlSellerName[0].textContent,
          taxCode: xmlSellerTaxCode[0].textContent,
          TotalExcludingTax: xmlTotalExcludingTax[0].textContent,
          totalTax: xmlTotalTax[0].textContent,
          totalAmount: xmlTotalAmount[0].textContent,
          invoiceDate: xmlInvoiceDate[0].textContent,
          taxId: xmlTaxId[0].textContent,
        };
        try {
          const formData = new FormData();
          formData.append("file", file);
          const responseFile = await axios.post(
            process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/files",
            formData,
            {
              headers: {
                Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
              },
            }
          );
          if (responseFile?.data?.data?.id) {
            const response = await axios.post(
              process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/invoice",
              {
                type: "sales_invoice",
                code: data?.code || "",
                invoice_number: data?.invoiceNumber || "",
                partner_name: data?.seller || "",
                goods_amount: data?.TotalExcludingTax || 0,
                tax_amount: data?.totalTax || 0,
                total_payment_amount: data?.totalAmount || 0,
                invoice_date: data?.invoiceDate || "",
                tax_id: data?.taxId || "",
                file: responseFile?.data?.data?.id || "",
              },
              {
                headers: {
                  Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
                },
              }
            );
            if (response.data?.data) {
              getListInvoice();
            }
          }
        } catch (error) { }
      };
      reader.readAsText(file);
    } else {
      alert("Vui lòng chọn một tệp XML!");
    }
  };

  const handleFileXml = async (id: string) => {
    try {
      const invoice: any = list.find((item: any) => item?.id === id);
      const response = await fetch(
        `https://cms-phong.teknix.dev/assets/${invoice?.file || undefined}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch XML: ${response.statusText}`);
      }
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");
      setXmlDataInvoice(xmlDoc);
    } catch (error) {
      console.error("Error fetching XML:", error);
      return null;
    }
  };

  useEffect(() => {
    getListInvoice();
  }, []);

  const getListInvoice = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ACCOUNTING_URL + "/items/invoice",
        {
          params: {
            filter: { type: { _eq: "sales_invoice" } },
          },
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
          },
        }
      );
      setList(
        response.data?.data
          ? response.data.data.map((item: any) => ({
            ...item,
            invoice_value:
              Number(item?.goods_amount || 0) + Number(item?.tax_amount || 0),
          }))
          : []
      );
    } catch (error) { }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <div className="w-25 relative cursor-pointer h-10 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <p className="absolute text-sm">Nhập XML</p>
          <input
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            className="w-full h-full opacity-0"
          />
        </div>
      </div>
      <div className="overflow-auto bg-white mt-6">
        <Table dataSource={list} columns={columns} rowKey="id" />
      </div>
      <Drawer
        title={<p className="text-xl font-semibold">Chi tiết hóa đơn đầu ra</p>}
        placement={"bottom"}
        closable={false}
        onClose={() => setXmlDataInvoice(null)}
        open={xmlDataInvoice ? true : false}
        height={"100%"}
        key={"bottom"}
        extra={<Button onClick={() => setXmlDataInvoice(null)}>Đóng</Button>}
        style={{ backgroundColor: "#ededed" }}
      >
        {xmlDataInvoice && <VATInvoice xmlDataInvoice={xmlDataInvoice} />}
      </Drawer>
    </div>
  );
};
