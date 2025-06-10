import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-xl text-center font-bold">MISA ASP</h1>
            </div>

            <nav className="mt-4">
                <Link
                    href={ROUTES.ADMIN.CUSTOMER.LIST}
                    className={`block px-4 py-2 hover:bg-gray-700 ${pathname === ROUTES.ADMIN.CUSTOMER.LIST ? 'bg-gray-700' : ''
                        }`}
                >
                    Khách hàng
                </Link>
                <Link
                    href={ROUTES.ADMIN.STAFF.LIST}
                    className={`block px-4 py-2 hover:bg-gray-700 ${pathname === ROUTES.ADMIN.STAFF.LIST ? 'bg-gray-700' : ''
                        }`}
                >
                    Nhân viên
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar