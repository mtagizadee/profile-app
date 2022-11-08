import Logo from "../Logo";
import { useQuery } from 'react-query';
import getCurrentUser from "../../api/get-current-user";
import Loader from "../Loader";
import ProfileIcon from "../ProfileIcon";

const Header = () => {
    const { data, isLoading, isFetching, isError, error } = useQuery('current-user', getCurrentUser);

    if (isLoading || isFetching) return <Loader />

    return (
        <header className="fixed w-full top-0 flex justify-center items-center border-black border-b-2">
            <div className="w-full max-w-main p-6 flex justify-between items-center">
                <Logo />
                <ProfileIcon navigateTo='/profile' imageUrl={data?.getAvatar()?.getUrl()} />
            </div>
        </header>
    );
}

export default Header;