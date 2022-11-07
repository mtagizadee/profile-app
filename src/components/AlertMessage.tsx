import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { hide, selectDisplay, selectMessage } from '../redux/slices/alertSlice';
import CloseButton from './CloseButton';

const AlertMessage = () => {
    const display = useAppSelector(selectDisplay);
    const message = useAppSelector(selectMessage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (display) {
            setTimeout(() => {
                dispatch(hide())
            }, 4500);
        }
    }, [display]);

    return (
        <>
            {display ?
                <div className='alert-message absolute right-3 bottom-3 text-white bg-black max-w-[600px] flex items-center justify-center rounded py-8 px-12'>
                    <CloseButton
                        className='absolute right-0 top-0 p-1'
                        color='white'
                        onClose={() => {
                            dispatch(hide());
                        }}
                    />
                    <p> {message} </p>
                </div> : null
            }
        </>
    );
}

export default AlertMessage;