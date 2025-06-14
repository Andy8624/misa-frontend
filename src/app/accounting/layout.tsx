'use client'

import { withAuth } from "../auth/withAuth"
import SideBar from "./components/layouts/SideBar"
import TopHeader from "./components/layouts/TopHeader"

interface AccountingLayoutProps {
    children: React.ReactNode,
}

const AccountingLayout = ({ children }: AccountingLayoutProps) => {
    return (
        <>
            <TopHeader />
            <SideBar>
                {children}
            </SideBar>
        </>
    )
}

export default withAuth(AccountingLayout)