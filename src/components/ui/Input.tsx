import { FC } from 'react';

interface Props {
    type: string;
    innerRef: any;
    required?: boolean;
    className?: string;
    placeholder: string;
}

const Input: FC<Props> = ({ innerRef, type, required = false, placeholder, className }) => {
    return (
        <div className={`w-full ${className}`}>
            <input
                type={type}
                ref={innerRef}
                required={required}
                placeholder={placeholder}
                className='w-full border-2 border-black rounded py-2 px-4'
            />
        </div>
    );
}

export default Input;