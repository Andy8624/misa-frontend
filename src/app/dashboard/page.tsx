'use client'
import React, { useEffect, useState } from 'react'
import { customerService } from '@/services/customer.service'
import { Customer } from '@/interfaces/customer.interface'
import CustomersPage from './customers/page'

const DashBoardPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await customerService.callGetAll()
                setCustomers(response?.data)
            } catch (error) {
                console.error('Error fetching customers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCustomers()
    }, [])

    return (
        <CustomersPage />
    )
}

export default DashBoardPage