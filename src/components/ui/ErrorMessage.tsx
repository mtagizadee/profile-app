import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
    return (
        <div className='text-main font-bold text-sm'> {children} </div>
    );
}

export default ErrorMessage;