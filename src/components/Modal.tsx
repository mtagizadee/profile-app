import { FC, ReactNode } from 'react';


interface Props {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<Props> = ({ visible, onClose, children }) => {
    return (
        <>
            {visible ?
                <div onClick={onClose} className='flex items-center justify-center w-full h-screen fixed z-50 top-0 left-0 bg-black bg-opacity-20'>
                    <div onClick={(e) => e.stopPropagation()} className='modal'>
                        {children}
                    </div>
                </div> : null
            }
        </>
    );
}

export default Modal;