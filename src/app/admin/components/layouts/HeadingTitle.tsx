import React from 'react'

interface HeadingTitleProps {
    title: string;
}

const HeadingTitle = ({ title }: HeadingTitleProps) => {
    return (
        <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    )
}

export default HeadingTitle
