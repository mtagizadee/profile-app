import { FC } from 'react';
import { useNavigate } from 'react-router';

interface Props {
    clickable?: boolean;
    className?: string;
}

const Logo: FC<Props> = ({ clickable = true, className }) => {
    const navigate = useNavigate();
    const onClick = () => {
        if (clickable) {
            navigate('/');
        }
    }

    return (
        <div onClick={onClick} className={`${clickable ? 'hover:cursor-pointer' : ''} font-bold text-2xl ${className}`}>
            Profile <span className="text-main">App</span>
        </div>
    );
}

export default Logo;