
import React, { createContext, useContext } from 'react';
import { message } from 'antd';

const MessageContext = createContext<any>(null);

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};