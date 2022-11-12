import Logo from "../Logo";
import { useQuery } from 'react-query';
import { getCurrentUser } from "../../api";
import ProfileIcon from "../ProfileIcon";
import PageLink from "../ui/PageLink";
import HomeIcon from "../icons/HomeIcon";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/slices/authSlice";
import Error from "../Error";
import { setMessage, show } from "../../redux/slices/alertSlice";

const Header = () => {
    const { data, isLoading, error, isError } = useQuery('current-user', getCurrentUser);
    const dispatch = useAppDispatch();

    if (error instanceof AxiosError && error.response?.status == 401) {
        dispatch(logOut());
        dispatch(show());
        dispatch(setMessage('Seems like your session is expred. Please procceed authentication again'));
    } else if (isError) {
        return <Error />
    }

    return (
        <header className="fixed w-full top-0 bg-white z-40 flex justify-center items-center border-black border-b-2">
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