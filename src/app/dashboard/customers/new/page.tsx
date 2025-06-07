'use client'
import DashboardLayout from '@/app/dashboard/layout'
import { useRouter } from 'next/navigation'
import { customerService } from '@/services/customer.service'
import { CreateCustomerPayload } from '@/interfaces/customer.interface'
import CreateCustomerForm from '../../components/customers/CreateCustomerForm'

const CreateCustomerPage = () => {
    const router = useRouter()

    const handleSubmit = async (data: CreateCustomerPayload) => {
        try {
            await customerService.create(data)
            router.push('/dashboard/customers')
        } catch (error) {
            console.error('Error creating customer:', error)
            // TODO: Add error handling/notification
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/customers')
    }

    return (
        <DashboardLayout title='Thêm khách hàng mới'>
            <div className="max-w-5xl mx-auto">
                <CreateCustomerForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </DashboardLayout>
    )
}

export default CreateCustomerPage
