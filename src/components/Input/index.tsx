import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef(({ label, error, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <label>
            {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
            <input {...rest} ref={ref} />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </label>
    );
});

export default Input;