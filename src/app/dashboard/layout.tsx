'use client'
import Sidebar from './components/layout/Sidebar'

interface DashboardLayoutProps {
    children: React.ReactNode,
    title: string
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-36 flex-1">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout