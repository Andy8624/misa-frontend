interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-white p-5">
                    <h2 className="mt-5  text-center text-3xl font-extrabold text-gray-900">
                        {title}
                    </h2>
                    <div className=" py-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;