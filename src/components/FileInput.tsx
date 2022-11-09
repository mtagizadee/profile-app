import { FC, ReactNode, useRef } from 'react';
import useFileUpload from '../hooks/useFileUpload';

interface Props {
    children: ReactNode;
    onSuccess: (file: File) => void;
    validatedExtensions: string[];
    className?: string;
}

const FileInput: FC<Props> = ({ children, onSuccess, validatedExtensions, className }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [onButtonClick, onFileChange] = useFileUpload(
        ref,
        validatedExtensions,
        onSuccess
    );

    return (
        <>
            <div className={className} onClick={onButtonClick}>
                {children}
            </div>
            <input
                onChange={onFileChange}
                ref={ref}
                accept={validatedExtensions.map(ext => `.${ext}`).join(', ')}
                type="file"
                className='hidden'
            />
        </>
    );
}

export default FileInput;