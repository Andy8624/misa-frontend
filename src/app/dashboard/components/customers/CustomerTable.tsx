import { Customer } from '@/interfaces/customer.interface'
import Image from 'next/image'
import { format } from 'date-fns'

interface CustomerTableProps {
    customers: Customer[]
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
    return (
        <div className="w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="w-[1000px]">
                <table className="table table-xs border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="sticky left-0 z-10 bg-gray-50 min-w-[350px] px-6 py-3 border-r-5 border-gray-200">
                                Tên khách hàng
                            </th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Mã số thuế</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Loại hình</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Người đại diện</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Chức vụ</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Nhóm KH</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Ngày thành lập</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Kỳ tính thuế</th>
                            <th className="min-w-[300px] px-6 py-3 border-r border-gray-200">Địa chỉ</th>
                            <th className="min-w-[150px] px-6 py-3 border-r border-gray-200">Điện thoại</th>
                            <th className="min-w-[200px] px-6 py-3 border-r border-gray-200">Email</th>
                            <th className="min-w-[150px] px-6 py-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            >
                                <td className="sticky left-0 z-10 bg-gray-50 font-medium min-w-[350px] px-6 py-4 border-r-5 border-gray-200">
                                    <div className="flex items-center gap-3">
                                        {customer?.logoUrl ? (
                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                <Image
                                                    src="/avt-kh.jpg"
                                                    alt={customer?.customerName}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500 text-lg">
                                                    {customer.customerName.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <span>{customer.customerName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.taxCode}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.businessType}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.fullName}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.position}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.customerGroup || '-'}</td>
                                <td className="px-6 py-4 border-r border-gray-200">
                                    {format(new Date(customer.foundedDate), 'dd/MM/yyyy')}
                                </td>
                                <td className="px-6 py-4 border-r border-gray-200">
                                    {customer.vatTaxType === 'month' ? 'Tháng' : 'Quý'}
                                </td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.fullAddress}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.phoneNumber}</td>
                                <td className="px-6 py-4 border-r border-gray-200">{customer.email}</td>
                                <td className="px-6 py-4">
                                    <div
                                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.customerStatus === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : customer.customerStatus === 'new'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {customer.customerStatus === 'active' ? 'Đang hoạt động'
                                            : customer.customerStatus === 'new' ? 'Mới'
                                                : 'Ngừng hoạt động'}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerTable