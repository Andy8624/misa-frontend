// components/auth/withAuth.tsx
'use client';

import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function withAuth<T extends object>(
    WrappedComponent: React.ComponentType<T>,
    redirectTo: string = ROUTES.AUTH.LOGIN
) {
    const AuthenticatedComponent = (props: T) => {
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const checkAuth = () => {
                try {
                    const access_token = localStorage.getItem("access_token");

                    if (access_token) {
                        setIsAuthenticated(true);
                    } else {
                        router.replace(redirectTo);
                        return;
                    }
                } catch (error) {
                    router.replace(redirectTo);
                    return error;
                } finally {
                    setIsLoading(false);
                }
            };

            checkAuth();
        }, [router]);

        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
                    </div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

    return AuthenticatedComponent;
}