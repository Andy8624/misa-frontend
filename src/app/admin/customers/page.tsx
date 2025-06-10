"use client";
import { useEffect, useState } from "react";
import { Customer } from "@/interfaces/customer.interface";
import { customerService } from "@/services/customer.service";
import CustomerTable from "../components/customers/CustomerTable";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import HeadingTitle from "../components/layouts/HeadingTitle";
import { ROUTES } from "@/constants/routes";

interface CustomerResponse {
    data: Customer[];
    total: number;
    page: number;
    pageSize: number;
}

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        total: 0,
        pageSize: 6
    });
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
    const router = useRouter()


    const fetchCustomers = async (page: number, search: string = '') => {
        try {
            setLoading(true);
            const response = await customerService.callGetAll(`?search=${search}&page=${page}&pageSize=6`);
            const { data, total, pageSize } = response as CustomerResponse;
            setCustomers(data);
            setPageInfo({ total, pageSize });
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    // Calculate total pages
    const totalPages = Math.ceil(pageInfo.total / pageInfo.pageSize);

    // Handle search input change with debounce
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleAddCustomer = () => {
        router.push(ROUTES.ADMIN.CUSTOMER.CREATE)
    };


    return (
        <div>
            <HeadingTitle title="Quản lí khách hàng" />
            <div className="mr-5">
                <div className="mb-6 flex justify-between items-center gap-4">
                    <div className="flex-1 flex items-center gap-2">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
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
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Tìm kiếm khách hàng..."
                                />
                            </label>
                        </div>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={handleAddCustomer}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Thêm khách hàng
                    </button>
                </div>

                {loading ? (
                    <div>
                        Đang tải thông tin khách hàng
                        {" "}<span className="loading loading-dots loading-xs"></span>
                    </div>
                ) : (
                    <>
                        <CustomerTable customers={customers} />

                        {/* Pagination */}
                        <div className="flex justify-end mt-6">
                            <div className="join">
                                {/* Previous page button */}
                                <button
                                    className="join-item btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    «
                                </button>

                                {/* First page */}
                                <button
                                    className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    1
                                </button>

                                {/* Dots if needed */}
                                {currentPage > 3 && <button className="join-item btn btn-disabled">...</button>}

                                {/* Current page and surrounding pages */}
                                {Array.from({ length: 3 }, (_, i) => currentPage + i - 1)
                                    .filter(num => num > 1 && num < totalPages)
                                    .map(num => (
                                        <button
                                            key={num}
                                            className={`join-item btn ${currentPage === num ? 'btn-active' : ''}`}
                                            onClick={() => setCurrentPage(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}

                                {/* Dots if needed */}
                                {currentPage < totalPages - 2 && <button className="join-item btn btn-disabled">...</button>}

                                {/* Last page */}
                                {totalPages > 1 && (
                                    <button
                                        className={`join-item btn ${currentPage === totalPages ? 'btn-active' : ''}`}
                                        onClick={() => setCurrentPage(totalPages)}
                                    >
                                        {totalPages}
                                    </button>
                                )}

                                {/* Next page button */}
                                <button
                                    className="join-item btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomersPage;