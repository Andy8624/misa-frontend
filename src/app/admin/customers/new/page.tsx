'use client'
import { useRouter } from 'next/navigation'
import { customerService } from '@/services/customer.service'
import { CreateCustomerPayload } from '@/interfaces/customer.interface'
import CreateCustomerForm from '../../components/customers/CreateCustomerForm'
import HeadingTitle from '../../components/layouts/HeadingTitle'
import { ROUTES } from '@/constants/routes'

const CreateCustomerPage = () => {
    const router = useRouter()

    const handleSubmit = async (data: CreateCustomerPayload) => {
        try {
            await customerService.create(data)
            router.push(ROUTES.ADMIN.CUSTOMER.LIST)
        } catch (error) {
            console.error('Error creating customer:', error)
            // TODO: Add error handling/notification
        }
    }

    const handleCancel = () => {
        router.push(ROUTES.ADMIN.CUSTOMER.LIST)
    }

    return (
        <div className="max-w-5xl mx-auto">
            <HeadingTitle title="Thêm khách hàng" />

            <CreateCustomerForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default CreateCustomerPage
