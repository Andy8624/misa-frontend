'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '../layout'
import FormInput from '../components/input'
import Button from '../components/button'
import { authService } from '@/services/auth.service'
import { Gender } from '@/interfaces/global.interface'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        birthDate: '',
        gender: 'male' as Gender
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword ||
            !formData.fullName || !formData.phoneNumber || !formData.birthDate) {
            setError('Please fill in all fields')
            return false
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email')
            return false
        }

        // Password validation
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }

        // Phone number validation
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(formData.phoneNumber)) {
            setError('Please enter a valid 10-digit phone number')
            return false
        }

        return true
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setLoading(true)
        try {
            const data = {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                birthDate: formData.birthDate,
                gender: formData.gender
            }
            // console.log(data)
            await authService.register(data)
            router.push('/auth/login')

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.')
            console.error('Registration failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Create an account">
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <FormInput
                    id="fullName"
                    name="fullName"
                    type="text"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <FormInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <FormInput
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    label="Birth Date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <FormInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <FormInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <Button
                    text={loading ? "Creating account..." : "Register"}
                    disabled={loading}
                />
                <div className="text-center">
                    <Link
                        href="/auth/login"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage