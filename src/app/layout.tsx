'use client'
import '@ant-design/v5-patch-for-react-19';
import "./globals.css";
import { Inter } from "next/font/google";
import { ConfigProvider } from 'antd';
import { MessageProvider } from '@/providers/MessageProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <ConfigProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </ConfigProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}