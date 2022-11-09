import { MutableRefObject, ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setMessage, show } from '../redux/slices/alertSlice';

const validateFileExtension = (file: File, validatedExtensions: string[]) => {
    const extension = file.name.split('.').pop();
    return validatedExtensions.some(ext => ext == extension);
}

const useFileUpload = (
    ref: MutableRefObject<HTMLInputElement | null>,
    validatedExtensions: string[],
    onSuccess: (file: File) => void
) => {
    const dispatch = useAppDispatch();

    const onButtonClick = () => {
        ref.current?.click();
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];
        if (!validateFileExtension(file, validatedExtensions)) {
            dispatch(show());
            dispatch(setMessage('File extension is invalid...'));
            return;
        }

        onSuccess(file);
    }

    return [onButtonClick, onFileChange] as any[];
}


export default useFileUpload;