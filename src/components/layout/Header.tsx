import Logo from "../Logo";
import { useQuery } from 'react-query';
import getCurrentUser from "../../api/get-current-user";
import ProfileIcon from "../ProfileIcon";
import PageLink from "../ui/PageLink";
import HomeIcon from "../icons/HomeIcon";

const Header = () => {
    const { data, isLoading, isError, error } = useQuery('current-user', getCurrentUser);

    return (
        <header className="fixed w-full top-0 bg-white z-50 flex justify-center items-center border-black border-b-2">
            <div className="w-full max-w-main p-6 flex justify-between items-center">
                <Logo />
                <div className="flex items-center gap-6">
                    <PageLink to="/"> <HomeIcon /> </PageLink>
                    {!isLoading ? <ProfileIcon navigateTo='/profile' imageUrl={data?.getAvatar()?.getUrl()} /> : null}
                </div>
            </div>
        </header>
    );
}

export default Header;