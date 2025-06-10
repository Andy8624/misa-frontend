"use client";
import { useState } from 'react';
import Image from 'next/image';
import { CreateCustomerPayload } from '@/interfaces/customer.interface';

interface CreateCustomerFormProps {
    onSubmit: (data: CreateCustomerPayload) => void;
    onCancel: () => void;
}

const CreateCustomerForm = ({ onSubmit, onCancel }: CreateCustomerFormProps) => {
    const [formData, setFormData] = useState<CreateCustomerPayload>({
        logoUrl: '',
        businessType: 'Doanh nghiệp',
        taxCode: '',
        customerName: '',
        customerGroup: '',
        foundedDate: '',
        vatTaxType: 'month',
        customerStatus: 'new',
        province: '',
        ward: '',
        district: '',
        streetAddress: '',
        fullAddress: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        position: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>

                    {/* Logo Upload */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">Logo</label>
                        <div className="col-span-3 flex items-center gap-4">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                {formData.logoUrl ? (
                                    <Image
                                        src={formData.logoUrl}
                                        alt="Logo"
                                        width={96}
                                        height={96}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    <span className="text-gray-400">Logo</span>
                                )}
                            </div>
                            <button type="button" className="btn btn-outline">Tải ảnh lên</button>
                        </div>
                    </div>

                    {/* Business Type */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Loại hình doanh nghiệp<span className="text-red-500">*</span>
                        </label>
                        <div className="col-span-3">
                            <select
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="Doanh nghiệp">Doanh nghiệp</option>
                                <option value="Hộ kinh doanh">Hộ kinh doanh</option>
                            </select>
                        </div>
                    </div>

                    {/* Tax Code */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Mã số thuế/Mã QHNS/Mã số kinh doanh<span className="text-red-500">*</span>
                        </label>
                        <div className="col-span-3">
                            <input
                                type="text"
                                name="taxCode"
                                value={formData.taxCode}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Customer Name */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Tên khách hàng<span className="text-red-500">*</span>
                        </label>
                        <div className="col-span-3">
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Customer Group */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">Nhóm khách hàng</label>
                        <div className="col-span-3">
                            <select
                                name="customerGroup"
                                value={formData.customerGroup || ''}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Chọn nhóm khách hàng</option>
                                <option value="VIP">VIP</option>
                                <option value="Premium">Premium</option>
                                <option value="Regular">Regular</option>
                            </select>
                        </div>
                    </div>

                    {/* Founded Date */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">Ngày thành lập</label>
                        <div className="col-span-3">
                            <input
                                type="date"
                                name="foundedDate"
                                value={formData.foundedDate}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* VAT Tax Type */}
                    <div className="grid grid-cols-4 gap-4 items-center my-5">
                        <label className="text-sm font-medium">
                            Kê khai thuế GTGT
                            <div className="tooltip" data-tip="Chọn kỳ kê khai thuế">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-1 stroke-current">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <path strokeWidth="2" d="M12 8v4m0 4h.01" />
                                </svg>
                            </div>
                        </label>
                        <div className="col-span-3">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="vatTaxType"
                                        value="month"
                                        checked={formData.vatTaxType === 'month'}
                                        onChange={handleChange}
                                        className="radio radio-primary"
                                    />
                                    <span>Theo tháng</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="vatTaxType"
                                        value="quarter"
                                        checked={formData.vatTaxType === 'quarter'}
                                        onChange={handleChange}
                                        className="radio radio-primary"
                                    />
                                    <span>Theo quý</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Customer Status */}
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Trạng thái khách hàng
                        </label>
                        <div className="col-span-3">
                            <select
                                name="customerStatus"
                                value={formData.customerStatus}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="new">Mới</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">Ngừng hoạt động</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Thông tin địa chỉ</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tỉnh/Thành phố<span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quận/Huyện<span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phường/Xã</span>
                            </label>
                            <input
                                type="text"
                                name="ward"
                                value={formData.ward || ''}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Số nhà, tên đường, phố</span>
                            </label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        </div>
                    </div>

                    {/* Full Address on new row */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Địa chỉ đầy đủ</span>
                        </label>
                        <input
                            type="text"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Người đại diện</h3>
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Họ và tên<span className="text-red-500">*</span>
                        </label>
                        <div className="col-span-3">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">Chức vụ</label>
                        <div className="col-span-3">
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">
                            Số điện thoại<span className="text-red-500">*</span>
                        </label>
                        <div className="col-span-3">
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label className="text-sm font-medium">Email</label>
                        <div className="col-span-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mb-5">
                    <button type="button" onClick={onCancel} className="btn btn-outline">
                        Hủy
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Lưu
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateCustomerForm;