interface FormInputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled: boolean;
}

const FormInput = ({ id, name, type, label, value, onChange, required = false, disabled }: FormInputProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default FormInput;