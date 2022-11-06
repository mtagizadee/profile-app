import { NavLink } from "react-router-dom";
import { FC, ReactNode } from 'react';

interface Props {
    className?: string;
    to: string;
    children: ReactNode;
}

const onClick = () => {
    window.scrollTo(0, 0);
}

const PageLink: FC<Props> = ({ className, to, children }) => {
    return (
        <NavLink
            className={className}
            to={to}
            onClick={onClick}
        >
            {children}
        </NavLink>
    );
}

export default PageLink;