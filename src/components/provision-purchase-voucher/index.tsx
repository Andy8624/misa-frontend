// import { ProvisionPurchaseVoucherCashReceipt } from "@/components/provision-purchase-voucher-cash-receipt";
// import { ProvisionPurchaseVoucherCashReceiptVoucher } from "@/components/provision-purchase-voucher-cash-receipt-voucher";
// import { ProvisionPurchaseVoucherDebtVoucher } from "@/components/provision-purchase-voucher-debt-voucher";
// import { ProvisionPurchaseVoucherInvoice } from "@/components/provision-purchase-voucher-invoice";
// import { ProvisionPurchaseVoucherTableList } from "@/components/provision-purchase-voucher-table-list";
// import { Button, Drawer, Modal, Select, Tabs, UploadProps } from "antd";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { UploadOutlined } from "@ant-design/icons";
// import { v4 as uuidv4 } from "uuid";
// import { ColorModeContext } from "@/contexts/color-mode";
// import { FaRegQuestionCircle } from "react-icons/fa";
// const props: UploadProps = {
//   name: "file",
//   action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     // if (info.file.status !== "uploading") {
//     //   console.log(info.file, info.fileList);
//     // }
//     // if (info.file.status === "done") {
//     //   message.success(`${info.file.name} file uploaded successfully`);
//     // } else if (info.file.status === "error") {
//     //   message.error(`${info.file.name} file upload failed.`);
//     // }
//   },
// };

// export const OPTION_PAYMENT_STATUS = {
//   ON_CREDIT: {
//     value: "on-credit",
//     translate: {
//       vi: "Chưa thu tiền",
//     },
//   },
//   PAID: {
//     value: "paid",
//     translate: {
//       vi: "Thu tiền ngay",
//     },
//   },
// };

// export const OPTIONS_COLUMN = {
//   ACCOUNTING: "accounting",
//   VAT: "vat",
// };

// export const OPTIONS_DISCOUNT = {
//   NO: {
//     value: "no",
//     translate: {
//       vi: "Không chiết khấu",
//     },
//   },
//   ITEMS: {
//     value: "items",
//     translate: {
//       vi: "Theo mặt hàng",
//     },
//   },
//   PERCENT_INVOICE_VALUE: {
//     value: "percent_invoice_value",
//     translate: {
//       vi: "Theo % hoá đơn",
//     },
//   },
//   INVOICE_VALUE: {
//     value: "invoice_value",
//     translate: {
//       vi: "Theo số tiền trên tổng háo đơn",
//     },
//   },
// };

// export const OPTION_PAYMENT_METHOD = {
//   CASH: {
//     value: "cash",
//     translate: {
//       vi: "Tiền mặt",
//     },
//   },
//   DEPOSIT: {
//     value: "  ",
//     translate: {
//       vi: "Chuyển khoản",
//     },
//   },
// };

// export const ProvisionPurchaseVoucher: React.FC<{
//   listEmployee: any[];
//   listPaymentTerms: any[];
//   setOpenServiceProvisionVoucher: any;
//   openServiceProvisionVoucher: boolean;
//   listBankAccount: any[];
//   listCustomer: any[];
// }> = ({
//   listEmployee,
//   listPaymentTerms,
//   setOpenServiceProvisionVoucher,
//   openServiceProvisionVoucher,
//   listBankAccount,
//   listCustomer,
// }) => {
//   const [showModalConfirmClose, setShowModalConfirmClose] =
//     useState<boolean>(false);
//   const { setIsLoading } = useContext(ColorModeContext);
//   const [listAccount, setListAccount] = useState<any[]>([]);
//   const [listUnit, setListUnit] = useState<any[]>([]);
//   const [code, setCode] = useState("BDV0001");
//   const [paymentStatus, setPaymentStatus] = useState<string>(
//     OPTION_PAYMENT_STATUS.ON_CREDIT.value
//   );
//   const [paymentMethod, setPaymentMethod] = useState<string>(
//     OPTION_PAYMENT_METHOD.CASH.value
//   );
//   const [withInvoice, setWithInvoice] = useState<boolean>(false);
//   const [itemsOfAccounting, setItemsOfAccounting] = useState<any[]>([]);
//   const [itemList, setItemList] = useState<any[]>([]);
//   const [totalAmount, setTotalAmount] = useState<number>();
//   const [totalVatAmount, setTotalVatAmount] = useState<number>();
//   const [paymentTerms, setPaymentTerms] = useState<string | undefined>();
//   const [payWithinDays, setPayWithinDays] = useState<number>();
//   const [dueDate, setDueDate] = useState<string | undefined>();
//   const [otherTAndC, setOtherTAndC] = useState<string | undefined>();
//   const [eInvoiceSearchID, setEInvoiceSearchID] = useState<
//     string | undefined
//   >();
//   const [eInvoiceSearchURL, setEInvoiceSearchURL] = useState<
//     string | undefined
//   >();
//   const [isSubstituteInvoice, setIsSubstituteInvoice] =
//     useState<boolean>(false);
//   const [debtVoucher, setDebtVoucher] = useState<any>();
//   const [invoice, setInvoice] = useState<any>();
//   const [cashReceiptVoucher, setCashReceiptVoucher] = useState<any>();
//   const [cashReceipt, setCashReceipt] = useState<any>();
//   const [postedDate, setPostedDate] = useState<string | undefined>();
//   const [voucherDate, setVoucherDate] = useState<string | undefined>();
//   const [discount, setDiscount] = useState<string>("no");
//   const [percentDiscountInvoiceValue, setPercentDiscountInvoiceValue] =
//     useState<number>(0);

//   const handleChangeItemOfOfList = (item: any, index: number) => {
//     setItemsOfAccounting((prev: any) => {
//       const list = prev;
//       list[index] = item;
//       let totalAmount = 0;
//       let totalVatAmount = 0;
//       list.forEach((itemPrev: any) => {
//         const total =
//           (itemPrev?.quantity || 0) * (itemPrev?.unit_price || 0) -
//           (itemPrev?.quantity || 0) *
//             (itemPrev?.unit_price || 0) *
//             (itemPrev?.discount_rate / 100);
//         totalAmount += total;
//         totalVatAmount += (total * (itemPrev?.vat_percent || 0)) / 100;
//       });
//       setTotalAmount(totalAmount);
//       setTotalVatAmount(totalVatAmount);
//       return list;
//     });
//   };

//   useEffect(() => {
//     if (itemsOfAccounting.length === 0) {
//       setItemsOfAccounting([{ id: uuidv4() }]);
//     }
//     getItems();
//     getListAccount();
//     getListUnit();
//   }, []);

//   const getListAccount = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/account_main_system",
//         {
//           params: {
//             limit: 100000,
//           },
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListAccount(response?.data?.data || []);
//     } catch (error) {}
//   };

//   const getListUnit = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/unit",
//         {
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListUnit(response?.data?.data || []);
//     } catch (error) {}
//   };

//   const getItems = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/goods_and_services_list",
//         {
//           params: {
//             fields: [
//               "*",
//               "material_group.*",
//               "material_group.goods_and_services_groups_id.*",
//               "material_group.goods_and_services_list_id.*",
//               "expense_account.*",
//               "vat_tax.*",
//             ],
//           },
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       console.log(
//         "DEBUG ",
//         response.data.data.filter((item: any) =>
//           item?.material_group?.find(
//             (itemMaterialGroup: any) =>
//               itemMaterialGroup?.goods_and_services_groups_id?.code === "DV"
//           )
//         )
//       );
//       setItemList(
//         response?.data?.data
//           ? response.data.data.filter((item: any) =>
//               item?.material_group?.find(
//                 (itemMaterialGroup: any) =>
//                   itemMaterialGroup?.goods_and_services_groups_id?.code === "DV"
//               )
//             )
//           : []
//       );
//     } catch (error) {}
//   };

//   const handleAddItemsOfAccounting = () => {
//     setItemsOfAccounting((prev: any) => [...prev, { id: uuidv4() }]);
//   };

//   const handleDeleteItemsOfAccounting = (id: string) => {
//     setItemsOfAccounting((prev: any[]) => {
//       return prev.filter((item) => item?.id !== id);
//     });
//   };

//   const handleSave = async () => {
//     const list: any[] = [];
//     if (Array.isArray(itemsOfAccounting)) {
//       itemsOfAccounting.forEach((itemOfAccounting: any) => {
//         const item = { ...itemOfAccounting };
//         delete item.vat_percent;
//         delete item.id;
//         list.push(item);
//       });
//     }
//     let check = false;
//     let data: any = {};
//     data.code = code;
//     data.payment_status = paymentStatus;
//     data.with_invoice = withInvoice;
//     data.is_substitute_invoice = isSubstituteInvoice;
//     data.other_t_and_c = otherTAndC;
//     data.e_invoice_search_id = eInvoiceSearchID;
//     data.e_invoice_search_url = eInvoiceSearchURL;
//     data.payment_t_and_c = paymentTerms || undefined;
//     data.pay_within_days = payWithinDays === 0 ? 0 : payWithinDays || undefined;
//     data.due_date = dueDate || undefined;
//     data.posted_date = postedDate || undefined;
//     data.voucher_date = voucherDate || undefined;
//     data.percent_discount_invoice_value = percentDiscountInvoiceValue;
//     data.discount_type = discount;
//     if (invoice) {
//       check = true;
//       for (let key in invoice) {
//         if (invoice.hasOwnProperty(key)) {
//           data[key] = invoice[key];
//         }
//       }
//     }
//     if (
//       paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value &&
//       debtVoucher
//     ) {
//       check = true;
//       for (let key in debtVoucher) {
//         if (debtVoucher.hasOwnProperty(key)) {
//           data[key] = debtVoucher[key];
//         }
//       }
//     }
//     if (
//       paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
//       paymentMethod === OPTION_PAYMENT_METHOD.DEPOSIT.value &&
//       cashReceipt
//     ) {
//       check = true;
//       for (let key in cashReceipt) {
//         if (cashReceipt.hasOwnProperty(key)) {
//           data[key] = cashReceipt[key];
//         }
//       }
//     }
//     if (
//       paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
//       paymentMethod === OPTION_PAYMENT_METHOD.CASH.value &&
//       cashReceiptVoucher
//     ) {
//       check = true;
//       for (let key in cashReceiptVoucher) {
//         if (cashReceiptVoucher.hasOwnProperty(key)) {
//           data[key] = cashReceiptVoucher[key];
//         }
//       }
//     }
//     if (!check) return;
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/provision_service_voucher",
//         data,
//         {
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       if (response.data?.data) {
//         const id = response.data.data.id;
//         const responseItemList = await axios.post(
//           process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/provision_service_voucher_items",
//           list.map((item: any) => ({ ...item, provision_service_voucher: id })),
//           {
//             headers: {
//               Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//             },
//           }
//         );
//         setOpenServiceProvisionVoucher(false);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Drawer
//       title={
//         <div className="flex justify-between items-center">
//           <p className="font-semibold text-2xl">Chứng từ bán dịch vụ {code}</p>
//           <Button type="primary" onClick={() => handleSave()}>
//             <p className="font-medium">Lưu</p>
//           </Button>
//         </div>
//       }
//       placement={"bottom"}
//       height={"100%"}
//       onClose={() => setShowModalConfirmClose(true)}
//       open={openServiceProvisionVoucher}
//     >
//       <div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center">
//             <input
//               type="radio"
//               value={OPTION_PAYMENT_STATUS.ON_CREDIT.value}
//               checked={paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value}
//               onChange={(e) => {
//                 return setPaymentStatus(e.target.value);
//               }}
//               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
//             />
//             <label className="ms-2 text-sm font-medium text-gray-900">
//               Chưa thu tiền
//             </label>
//           </div>
//           <div className="flex items-center">
//             <input
//               checked={paymentStatus === OPTION_PAYMENT_STATUS.PAID.value}
//               type="radio"
//               value={OPTION_PAYMENT_STATUS.PAID.value}
//               onChange={(e) => setPaymentStatus(e.target.value)}
//               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
//             />
//             <label className="ms-2 text-sm font-medium text-gray-900">
//               Thu tiền ngay
//             </label>
//           </div>
//           <div
//             className={`h-10 w-44 border rounded-md overflow-hidden ${
//               paymentStatus !== OPTION_PAYMENT_STATUS.PAID.value &&
//               "pointer-events-none"
//             }`}
//           >
//             <Select
//               style={{
//                 border: "none",
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor:
//                   paymentStatus !== OPTION_PAYMENT_STATUS.PAID.value
//                     ? "#dbd9d9"
//                     : "white",
//               }}
//               variant="borderless"
//               value={paymentMethod}
//               onChange={(value) => setPaymentMethod(value)}
//               options={Object.keys(OPTION_PAYMENT_METHOD).map((key) => ({
//                 label:
//                   OPTION_PAYMENT_METHOD[
//                     key as keyof typeof OPTION_PAYMENT_METHOD
//                   ].translate.vi,
//                 value:
//                   OPTION_PAYMENT_METHOD[
//                     key as keyof typeof OPTION_PAYMENT_METHOD
//                   ].value,
//               }))}
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               id="default-checkbox"
//               type="checkbox"
//               checked={withInvoice}
//               onChange={(e) => setWithInvoice(e.target.checked)}
//               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
//             />
//             <label className="ms-2 text-sm font-medium text-gray-900">
//               Lập kèm hóa đơn
//             </label>
//           </div>
//         </div>
//         <div className="flex items-center gap-[15%] justify-between">
//           <Tabs
//             className="flex-grow-1"
//             items={[
//               {
//                 key: "1",
//                 active:
//                   paymentStatus === OPTION_PAYMENT_STATUS.ON_CREDIT.value
//                     ? true
//                     : false,
//                 label: <p className="font-semibold">Chứng từ ghi nợ</p>,
//                 children: (
//                   <ProvisionPurchaseVoucherDebtVoucher
//                     listCustomer={listCustomer}
//                     listEmployee={listEmployee}
//                     code={code}
//                     setCode={setCode}
//                     listPaymentTerms={listPaymentTerms}
//                     paymentTerms={paymentTerms}
//                     setPaymentTerms={setPaymentTerms}
//                     payWithinDays={payWithinDays}
//                     setPayWithinDays={setPayWithinDays}
//                     dueDate={dueDate}
//                     setDueDate={setDueDate}
//                     setDebtVoucher={setDebtVoucher}
//                     postedDate={postedDate}
//                     setPostedDate={setPostedDate}
//                     voucherDate={voucherDate}
//                     setVoucherDate={setVoucherDate}
//                   />
//                 ),
//               },
//               {
//                 key: "2",
//                 label: <p className="font-semibold">Phiếu thu</p>,
//                 active:
//                   paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
//                   paymentMethod === OPTION_PAYMENT_METHOD.CASH.value
//                     ? true
//                     : false,
//                 children: (
//                   <ProvisionPurchaseVoucherCashReceiptVoucher
//                     listCustomer={listCustomer}
//                     listEmployee={listEmployee}
//                     code={code}
//                     setCode={setCode}
//                     cashReceiptVoucher={cashReceiptVoucher}
//                     setCashReceiptVoucher={setCashReceiptVoucher}
//                   />
//                 ),
//               },
//               {
//                 key: "3",
//                 label: <p className="font-semibold">Thu tiền gửi</p>,
//                 active:
//                   paymentStatus === OPTION_PAYMENT_STATUS.PAID.value &&
//                   paymentMethod === OPTION_PAYMENT_METHOD.DEPOSIT.value
//                     ? true
//                     : false,
//                 children: (
//                   <ProvisionPurchaseVoucherCashReceipt
//                     listCustomer={listCustomer}
//                     listBankAccount={listBankAccount}
//                     listEmployee={listEmployee}
//                     code={code}
//                     setCode={setCode}
//                     setCashReceipt={setCashReceipt}
//                   />
//                 ),
//               },
//               {
//                 key: "4",
//                 label: <p className="font-semibold">Hoá đơn</p>,
//                 active: true,
//                 children: (
//                   <ProvisionPurchaseVoucherInvoice
//                     listCustomer={listCustomer}
//                     paymentStatus={paymentStatus}
//                     listPaymentTerms={listPaymentTerms}
//                     paymentTerms={paymentTerms}
//                     setPaymentTerms={setPaymentTerms}
//                     payWithinDays={payWithinDays}
//                     setPayWithinDays={setPayWithinDays}
//                     dueDate={dueDate}
//                     setDueDate={setDueDate}
//                     listBankAccount={listBankAccount}
//                     invoice={invoice}
//                     setInvoice={setInvoice}
//                   />
//                 ),
//               },
//             ].filter((item: any) => item?.active === true)}
//           />
//           <div>
//             <p className="text-base whitespace-nowrap text-right">Tổng tiền</p>
//             <p className="text-4xl font-semibold text-right">
//               {((totalAmount || 0) + (totalVatAmount || 0)).toLocaleString(
//                 "vi-VN"
//               )}
//             </p>
//           </div>
//         </div>
//         <ProvisionPurchaseVoucherTableList
//           itemsOfAccounting={itemsOfAccounting}
//           itemList={itemList}
//           handleChangeItemOfOfList={handleChangeItemOfOfList}
//           handleDeleteItemsOfAccounting={handleDeleteItemsOfAccounting}
//           listAccount={listAccount}
//           listUnit={listUnit}
//           discount={discount}
//           setDiscount={setDiscount}
//           percentDiscountInvoiceValue={percentDiscountInvoiceValue}
//           setPercentDiscountInvoiceValue={setPercentDiscountInvoiceValue}
//         />
//         <div className="w-full grid grid-cols-2 justify-between items-start mt-8 gap-[10%]">
//           <div className="flex flex-col gap-3">
//             <div>
//               <Button
//                 type="primary"
//                 onClick={() => handleAddItemsOfAccounting()}
//               >
//                 Thêm dòng
//               </Button>
//             </div>
//             <div className="flex items-center mt-8">
//               <input
//                 type="checkbox"
//                 checked={isSubstituteInvoice}
//                 onChange={(e) => setIsSubstituteInvoice(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
//               />
//               <label className="ms-2 text-sm font-medium text-gray-900">
//                 Là hóa đơn thay thế
//               </label>
//             </div>
//             <div className="col-span-6">
//               <p className="font-semibold">Điều khoản khác</p>
//               <textarea
//                 className="w-full min-h-20 px-2 outline-none border rounded-md"
//                 value={otherTAndC}
//                 onChange={(e) => setOtherTAndC(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-5 gap-3">
//               <div className="col-span-2">
//                 <p className="font-semibold">Mã tra cứu HĐĐT</p>
//                 <input
//                   type="text"
//                   value={eInvoiceSearchID}
//                   onChange={(e) => setEInvoiceSearchID(e.target.value)}
//                   className="w-full h-10 px-2 outline-none border rounded-md"
//                 />
//               </div>
//               <div className="col-span-3">
//                 <p className="font-semibold">Đường dẫn tra cứu HĐĐT</p>
//                 <input
//                   type="text"
//                   value={eInvoiceSearchURL}
//                   onChange={(e) => setEInvoiceSearchURL(e.target.value)}
//                   className="w-full h-10 px-2 outline-none border rounded-md"
//                 />
//               </div>
//             </div>
//             <div>
//               <p className="font-medium">Đính kèm</p>
//               <div>
//                 <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <table>
//               <tbody>
//                 <tr>
//                   <td className="w-80 font-semibold text-base py-1">
//                     Tổng tiền dịch vụ
//                   </td>
//                   <td className="text-base font-semibold text-right">
//                     {(totalAmount || 0).toLocaleString("vi-VN")}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="w-80 font-semibold text-base py-1">
//                     Thuế GTGT
//                   </td>
//                   <td className="text-base font-semibold text-right">
//                     {(totalVatAmount || 0).toLocaleString("vi-VN")}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="w-80 font-semibold text-base py-1">
//                     Tổng tiền dịch vụ
//                   </td>
//                   <td className="text-base font-semibold text-right">
//                     {(
//                       (totalAmount || 0) + (totalVatAmount || 0)
//                     ).toLocaleString("vi-VN")}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Modal
//         title={
//           <div className="flex items-center gap-3">
//             <FaRegQuestionCircle className="text-3xl text-blue-700" />
//             <p className="text-lg font-medium">
//               Bạn muốn đóng chứng từ bán dịch vụ?
//             </p>
//           </div>
//         }
//         centered
//         open={showModalConfirmClose}
//         onOk={() => setOpenServiceProvisionVoucher(false)}
//         onCancel={() => setShowModalConfirmClose(false)}
//       ></Modal>
//     </Drawer>
//   );
// };
