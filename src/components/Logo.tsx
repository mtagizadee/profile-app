import { FC } from 'react';

interface Props {
    clickable?: boolean;
    className?: string;
}

const Logo: FC<Props> = ({ clickable = true, className }) => {
    return (
        <div className={`${clickable ? 'hover:cursor-pointer' : ''} font-bold text-2xl ${className}`}>
            Profile <span className="text-main">App</span>
        </div>
    );
}

export default Logo;