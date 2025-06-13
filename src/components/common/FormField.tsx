import React, { useState, useEffect } from 'react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
}

interface FormFieldProps {
    label: string;
    value: string;
    rules?: ValidationRule[];
    children: React.ReactElement<{
        onBlur?: () => void;
        className?: string;
    }>;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    value,
    rules = [],
    children
}) => {
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState(false);

    const validate = (inputValue: string) => {
        if (!rules.length) return;

        for (const rule of rules) {
            // Required validation
            if (rule.required && (!inputValue || inputValue.trim() === '')) {
                setError(rule.message || `${label} là bắt buộc`);
                return;
            }

            // Skip other validations if field is empty and not required
            if (!inputValue && !rule.required) {
                setError('');
                return;
            }

            // Min length validation
            if (rule.minLength && inputValue.length < rule.minLength) {
                setError(rule.message || `${label} phải có ít nhất ${rule.minLength} ký tự`);
                return;
            }

            // Max length validation
            if (rule.maxLength && inputValue.length > rule.maxLength) {
                setError(rule.message || `${label} không được vượt quá ${rule.maxLength} ký tự`);
                return;
            }

            // Pattern validation
            if (rule.pattern && !rule.pattern.test(inputValue)) {
                setError(rule.message || `${label} không đúng định dạng`);
                return;
            }
        }

        setError('');
    };

    useEffect(() => {
        if (touched) {
            validate(value);
        }
    }, [value, touched]);

    const handleBlur = () => {
        setTouched(true);
        validate(value);
    };

    // Clone children và thêm onBlur
    const enhancedChild = React.cloneElement(children, {
        onBlur: handleBlur,
        className: `${children.props.className} ${error && touched ? 'border-red-500' : ''}`.trim()
    });

    return (
        <div className="flex-grow-1">
            <p className={error && touched ? 'text-red-500' : ''}>{label}</p>
            {enhancedChild}
            {error && touched && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};