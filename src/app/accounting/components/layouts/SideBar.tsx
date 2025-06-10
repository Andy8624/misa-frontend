'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { MdDashboard } from "react-icons/md";
import { AiOutlineBars, AiFillFileZip } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { PiPiggyBankBold } from "react-icons/pi";
import { BsBank } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { ROUTES } from '@/constants/routes';

interface AccountingLayoutProps {
    children: React.ReactNode
}

const SideBar = ({ children }: AccountingLayoutProps) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + '/')
    }

    const getLinkClassName = (path: string) => {
        return isActive(path)
            ? "flex items-center gap-3 p-3 rounded-lg text-white font-medium"
            : "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
    }

    const getLinkStyle = (path: string) => {
        return isActive(path)
            ? { backgroundColor: '#5932ea' }
            : {}
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            {/* Nội dung chính */}
            <div className="drawer-content p-4">
                <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate lg:hidden">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512">
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                <div>
                    {/* Children nội dung chính */}
                    {children}
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side border-r border-r-gray-200">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>

                <ul className="menu px-4 w-58 min-h-full bg-white text-base-content">
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.DASHBOARD}
                            className={getLinkClassName(ROUTES.ACCOUNTING.DASHBOARD)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.DASHBOARD)}
                        >
                            <MdDashboard className="text-xl" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.INVOICES}
                            className={getLinkClassName(ROUTES.ACCOUNTING.INVOICES)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.INVOICES)}
                        >
                            <AiFillFileZip className="text-xl" />
                            Quản lý hóa đơn
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.PARTNERS}
                            className={getLinkClassName(ROUTES.ACCOUNTING.PARTNERS)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.PARTNERS)}
                        >
                            <AiOutlineBars className="text-xl" />
                            Đối tượng
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.PRODUCTS}
                            className={getLinkClassName(ROUTES.ACCOUNTING.PRODUCTS)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.PRODUCTS)}
                        >
                            <FaCartShopping className="text-xl" />
                            Vật tư hàng hóa
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.WAREHOUSES}
                            className={getLinkClassName(ROUTES.ACCOUNTING.WAREHOUSES)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.WAREHOUSES)}
                        >
                            <FaHouseChimney className="text-xl" />
                            Kho
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.CASH}
                            className={getLinkClassName(ROUTES.ACCOUNTING.CASH)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.CASH)}
                        >
                            <PiPiggyBankBold className="text-xl" />
                            Tiền mặt
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.DEPOSITS}
                            className={getLinkClassName(ROUTES.ACCOUNTING.DEPOSITS)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.DEPOSITS)}
                        >
                            <BsBank className="text-xl" />
                            Tiền gửi
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.SALES}
                            className={getLinkClassName(ROUTES.ACCOUNTING.SALES)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.SALES)}
                        >
                            <FiShoppingCart className="text-xl" />
                            Bán hàng
                        </Link>
                    </li>
                    <li className="pb-1">
                        <Link
                            href={ROUTES.ACCOUNTING.PURCHASES}
                            className={getLinkClassName(ROUTES.ACCOUNTING.PURCHASES)}
                            style={getLinkStyle(ROUTES.ACCOUNTING.PURCHASES)}
                        >
                            <IoBagHandleOutline className="text-xl" />
                            Mua hàng
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
