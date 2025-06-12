'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '../layout'
import FormInput from '../components/input'
import Button from '../components/button'
import { authService } from '@/services/auth.service'
import { ROUTES } from '@/constants/routes'
import { useMessage } from '@/providers/MessageProvider'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const messageApi = useMessage()

    useEffect(() => {
        if (authService.isAuthenticated()) {
            router.push(ROUTES.ADMIN.CUSTOMER.LIST)
        }
    }, [router])

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields')
            return false
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setLoading(true)
        try {
            const response = await authService.login({ email, password })
            // console.log(response)
            if (response?.access_token) {
                messageApi.success("Đăng nhập thành công")
                router.push(ROUTES.ADMIN.CUSTOMER.LIST)
            } else {
                setError('Invalid response from server')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed. Please try again.')
            console.error('Login failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Sign in to your account">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}
                <FormInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <FormInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <Button
                    text={loading ? "Signing in..." : "Sign in"}
                    disabled={loading}
                />
                <div className="text-center">
                    <Link
                        href="/auth/register"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Don&apos;t have an account? Register
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default LoginPage