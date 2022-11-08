import { FC, ReactNode } from "react";
import Header from "./Header";

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="flex justify-center">
                <div className="w-full max-w-main p-6 mt-28">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;