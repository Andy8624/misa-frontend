import React, { useState, useEffect } from 'react'
import { IoCardSharp } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { customerService } from '@/services/customer.service';

interface CustomerData {
    id: string;
    customerName: string;
    // ...other fields
}

const TopHeader = () => {
    const router = useRouter()
    const [customerId, setCustomerId] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState<CustomerData | null>(null);

    // Get customerId from localStorage after component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const id = localStorage.getItem("CustomerID");
            setCustomerId(id);
        }
    }, []);

    // Fetch customer data when customerId changes
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (customerId) {
                try {
                    const response = await customerService.callGetOne(customerId.toString());
                    setCustomerData(response);
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            }
        };

        fetchCustomerData();
    }, [customerId]);

    // console.log(customerData)
    return (
        <div className="navbar bg-base-100 border-b border-b-gray-200">
            {/* Logo section */}
            <div className="navbar-start">
                <button className="btn btn-square btn-ghost flex justify-center align-middle">
                    <BsFillGrid3X3GapFill className="text-xl" />
                </button>

                <div className="cursor-pointer ms-5" onClick={() => router.push(ROUTES.ADMIN.CUSTOMER.LIST)}>
                    <span className='flex text-center mx-auto justify-around'>
                        <span className="w-6 border-b border-orange-500 pb-1 border-radius-0">
                            <IoCardSharp className='text-[20px] text-[#504BA3] rotate-40' />
                        </span>
                        <span className='text-[1.2rem] font-bold ms-2'>
                            Accounting
                        </span>
                    </span>
                </div>

                <div className="border ms-5 px-3 ">{customerData?.customerName || 'Chọn khách hàng'}</div>
            </div>

            {/* Search and Avatar section */}
            <div className="navbar-end">
                <div className="flex items-center gap-4">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" required placeholder="Search" />
                    </label>

                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
