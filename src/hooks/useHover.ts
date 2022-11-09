import { useState } from 'react';

const useHover = () => {
    const [hover, setHover] = useState<boolean>(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    return [hover, onMouseEnter, onMouseLeave] as any;
}

export default useHover;