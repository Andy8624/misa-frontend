"use client";

import { App as AntdApp, ConfigProvider, theme } from "antd";
import Cookies from "js-cookie";
import React, {
    type PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type ColorModeContextType = {
    mode: string;
    setMode: (mode: string) => void;
    setIsLoading: (loading: boolean) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
    {} as ColorModeContextType
);

type ColorModeContextProviderProps = {
    defaultMode?: string;
};

export const ColorModeContextProvider: React.FC<
    PropsWithChildren<ColorModeContextProviderProps>
> = ({ children, defaultMode }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [mode, setMode] = useState("light");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const setColorMode = () => {
        if (mode === "light") {
            setMode("dark");
            Cookies.set("theme", "dark");
        } else {
            setMode("light");
            Cookies.set("theme", "light");
        }
    };

    const { darkAlgorithm, defaultAlgorithm } = theme;

    // Custom theme thay thế RefineThemes
    const customTheme = {
        token: {
            colorPrimary: '#1890ff', // Màu chính (xanh dương)
            colorSuccess: '#52c41a', // Màu thành công (xanh lá)
            colorWarning: '#faad14', // Màu cảnh báo (vàng)
            colorError: '#ff4d4f',   // Màu lỗi (đỏ)
            borderRadius: 6,         // Bo góc
            fontSize: 14,            // Kích thước font
        },
        components: {
            Button: {
                borderRadius: 6,
            },
            Input: {
                borderRadius: 6,
            },
            Card: {
                borderRadius: 8,
            },
        },
    };

    return (
        <ColorModeContext.Provider
            value={{
                setMode: setColorMode,
                mode,
                setIsLoading
            }}
        >
            <ConfigProvider
                theme={{
                    ...customTheme,
                    algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
                }}
            >
                <AntdApp>{children}</AntdApp>
                <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/40 z-[999999] backdrop-blur ${!isLoading && 'hidden'}`}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            </ConfigProvider>
        </ColorModeContext.Provider>
    );
};
