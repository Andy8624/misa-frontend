"use client"

export default function Voucher() {
  return <div></div>
}
// "use client";
// import { HiShoppingBag } from "react-icons/hi2";
// import { FaCartShopping } from "react-icons/fa6";
// import { useEffect, useState } from "react";
// import { PurchaseVoucher } from "@/components/purchase-voucher";
// import axios from "axios";
// import { ServicePurchaseVoucher } from "@/components/service-purchase-voucher";
// import { ProvisionPurchaseVoucher } from "@/components/provision-purchase-voucher";
// import { SalesVoucher } from "@/components/sales-voucher";

// export default function Voucher() {
//   const [openPurchaseVoucher, setOpenPurchaseVoucher] = useState(false);
//   const [openServicePurchaseVoucher, setOpenServicePurchaseVoucher] =
//     useState(false);
//   const [openServiceProvisionVoucher, setOpenServiceProvisionVoucher] =
//     useState(false);
//   const [openSalesVoucher, setOpenSalesVoucher] = useState(false);
//   const [listSupplier, setListSupplier] = useState([]);
//   const [listCustomer, setListCustomer] = useState([]);
//   const [listEmployee, setListEmployee] = useState([]);
//   const [listPaymentTerms, setListPaymentTerms] = useState([]);
//   const [listBankAccount, setListBankAccount] = useState<any[]>([]);

//   useEffect(() => {
//     getListSupplier();
//     getListCustomer();
//     getListEmployee();
//     getListPaymentTerms();
//     getListBankAccount();
//   }, []);

//   const getListSupplier = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/partner",
//         {
//           params: {
//             filter: { type: { _eq: "supplier" } },
//           },
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListSupplier(response?.data?.data || []);
//     } catch (error) {}
//   };
//   const getListCustomer = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/partner",
//         {
//           params: {
//             filter: { type: { _eq: "customer" } },
//           },
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListCustomer(response?.data?.data || []);
//     } catch (error) {}
//   };

//   const getListBankAccount = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/bank",
//         {
//           params: {
//             fields: ["*", "name_account.*"],
//           },
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListBankAccount(response?.data?.data || []);
//     } catch (error) {}
//   };

//   const getListEmployee = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/employee",
//         {
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListEmployee(response?.data?.data || []);
//     } catch (error) {}
//   };

//   const getListPaymentTerms = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ACCOUNTING_URL+ "/items/payment_terms",
//         {
//           headers: {
//             Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_ACCOUNTING_TOKEN,
//           },
//         }
//       );
//       setListPaymentTerms(response?.data?.data || []);
//     } catch (error) {}
//   };

//   return (
//     <div className="h-full w-full flex gap-8 flex-wrap">
//       <div
//         className="p-20 rounded-2xl bg-white text-black cursor-pointer flex flex-col items-center justify-between gap-4"
//         onClick={() => setOpenPurchaseVoucher(true)}
//       >
//         <HiShoppingBag className="text-5xl text-green-600" />
//         <p className="text-base font-medium">Chứng từ mua hàng</p>
//       </div>
//       <div
//         className="p-20 rounded-2xl bg-white text-black cursor-pointer flex flex-col items-center justify-between gap-4"
//         onClick={() => setOpenServicePurchaseVoucher(true)}
//       >
//         <FaCartShopping className="text-5xl text-green-600" />
//         <p className="text-base font-medium">Chứng từ mua dịch vụ</p>
//       </div>
//       <div
//         className="p-20 rounded-2xl bg-white text-black cursor-pointer flex flex-col items-center justify-between gap-4"
//         onClick={() => setOpenSalesVoucher(true)}
//       >
//         <HiShoppingBag className="text-5xl text-green-600" />
//         <p className="text-base font-medium">Chứng từ bán hàng</p>
//       </div>
//       <div
//         className="p-20 rounded-2xl bg-white text-black cursor-pointer flex flex-col items-center justify-between gap-4"
//         onClick={() => setOpenServiceProvisionVoucher(true)}
//       >
//         <FaCartShopping className="text-5xl text-green-600" />
//         <p className="text-base font-medium">Chứng từ bán dịch vụ</p>
//       </div>
      
//         <PurchaseVoucher
//           listSupplier={listSupplier}
//           listEmployee={listEmployee}
//           listPaymentTerms={listPaymentTerms}
//           openPurchaseVoucher={openPurchaseVoucher}
//           setOpenPurchaseVoucher={setOpenPurchaseVoucher}
//           listBankAccount={listBankAccount}
//         />
//       {openServicePurchaseVoucher && (
//         <ServicePurchaseVoucher
//           listSupplier={listSupplier}
//           listEmployee={listEmployee}
//           listPaymentTerms={listPaymentTerms}
//           openServicePurchaseVoucher={openServicePurchaseVoucher}
//           setOpenServicePurchaseVoucher={setOpenServicePurchaseVoucher}
//           listBankAccount={listBankAccount}
//         />
//       )}
//       {openServiceProvisionVoucher && (
//         <ProvisionPurchaseVoucher
//           listEmployee={listEmployee}
//           listPaymentTerms={listPaymentTerms}
//           openServiceProvisionVoucher={openServiceProvisionVoucher}
//           setOpenServiceProvisionVoucher={setOpenServiceProvisionVoucher}
//           listBankAccount={listBankAccount}
//           listCustomer={listCustomer}
//         />
//       )}
//       {openSalesVoucher && (
//         <SalesVoucher
//           openSalesVoucher={openSalesVoucher}
//           setOpenSalesVoucher={setOpenSalesVoucher}
//           listCustomer={listCustomer}
//           listBankAccount={listBankAccount}
//           listEmployee={listEmployee}
//           listPaymentTerms={listPaymentTerms}
//           listSupplier={listSupplier}
//         />
//       )}
//     </div>
//   );
// }
