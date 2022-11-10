import { useState } from 'react';

const useHover = () => {
    const [hover, setHover] = useState<boolean>(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    return [hover, onMouseEnter, onMouseLeave] as [boolean, () => void, () => void];
}

export default useHover;