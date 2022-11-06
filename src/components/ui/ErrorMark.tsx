import { FC } from 'react';

interface Props {
    errorMessage: string;
}

const ErrorMark: FC<Props> = ({ errorMessage }) => {
    return (
        <div title={errorMessage}>
            <svg
                className='absolute -right-6 bottom-3'
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M18 9C18 10.1819 17.7672 11.3522 17.3149 12.4442C16.8626 13.5361 16.1997 14.5282 15.364 15.364C14.5282 16.1997 13.5361 16.8626 12.4441 17.3149C11.3522 17.7672 10.1819 18 9 18C6.61305 18 4.32386 17.0518 2.63604 15.364C0.94821 13.6761 1.23768e-07 11.3869 0 9C0 6.61305 0.94821 4.32387 2.63604 2.63604C4.32386 0.948213 6.61305 4.95071e-07 9 0C10.1819 -3.06417e-07 11.3522 0.232791 12.4441 0.685083C13.5361 1.13738 14.5282 1.80031 15.364 2.63604C16.1997 3.47177 16.8626 4.46392 17.3149 5.55585C17.7672 6.64778 18 7.8181 18 9Z" fill="#DD3333" />
                <path d="M9.00007 11.6614C8.38203 11.6614 7.88101 11.1604 7.88101 10.5423V3.52104C7.88101 2.903 8.38203 2.40197 9.00007 2.40197C9.61812 2.40197 10.1191 2.903 10.1191 3.52104V10.5423C10.1191 11.1604 9.61812 11.6614 9.00007 11.6614Z" fill="white" />
                <path d="M9.00017 12.975C8.22793 12.975 7.60191 13.601 7.60191 14.3732C7.60191 15.1455 8.22793 15.7715 9.00017 15.7715C9.77241 15.7715 10.3984 15.1455 10.3984 14.3732C10.3984 13.601 9.77241 12.975 9.00017 12.975Z" fill="white" />
            </svg>
        </div>
    );
}

export default ErrorMark;