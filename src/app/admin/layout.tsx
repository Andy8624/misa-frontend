'use client'
import Sidebar from './components/layouts/Sidebar'

interface DashboardLayoutProps {
    children: React.ReactNode,
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-72 mt-5 flex-1">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout