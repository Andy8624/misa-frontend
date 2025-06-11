'use client'
import React from 'react'
import HeadingTitle from '../components/layouts/HeadingTitle'
import { Button, message } from 'antd'

const StaffPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleButtonClick = () => {
        messageApi.info('Hello, Ant Design!');
    };

    return (
        <div className="">
            {contextHolder}
            <HeadingTitle title="Trang quản lí nhân viên" />
            Nội dung trang quản lí nhân viên
            <Button type="primary" onClick={handleButtonClick}>
                Bấm vào đây
            </Button>
        </div>
    )
}

export default StaffPage
