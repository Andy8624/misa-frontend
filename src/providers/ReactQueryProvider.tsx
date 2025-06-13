'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    // Khởi tạo QueryClient chỉ 1 lần bằng useState để đảm bảo client không bị tạo lại khi component re-render
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // staleTime: thời gian (ms) dữ liệu được xem là "fresh", trong thời gian này sẽ không refetch lại
                // -> giúp tránh gọi API lại khi đã có dữ liệu mới
                staleTime: 5 * 60 * 1000, // 5 phút

                // gcTime (garbage collection time): sau khi dữ liệu không còn dùng, sẽ giữ lại trong bộ nhớ thêm bao lâu (ms)
                // -> sau thời gian này nếu không được sử dụng lại thì sẽ bị xóa khỏi cache
                gcTime: 10 * 60 * 1000, // 10 phút

                // retry: số lần tự động thử lại khi gọi API thất bại
                retry: 1,

                // refetchOnWindowFocus: `false` nghĩa là không tự động refetch lại khi user quay lại tab (mặc định là true)
                refetchOnWindowFocus: false,
            },
            mutations: {
                // retry: số lần thử lại khi mutation (POST/PUT/DELETE) bị lỗi
                retry: 1,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
