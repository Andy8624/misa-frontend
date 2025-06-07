interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled: boolean;
}

const Button = ({ text, type = "submit", className = "", disabled }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;