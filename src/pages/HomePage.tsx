import { useQuery } from "react-query";
import { getCurrentUser } from "../api";
import getImages from "../api/getImages";
import Error from "../components/Error";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import UserPost from "../components/UserPosts";

const HomePage = () => {
    const { data, isLoading, isError } = useQuery('images', getImages);
    const userQuery = useQuery('current-user', getCurrentUser);

    if (isLoading || userQuery.isLoading) return <Loader />
    if (isError || userQuery.isError) return <Error />
    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-full sm:w-[80%] lg:w-[60%]">
                    {data?.filter(image => {
                        const authorId = image.getUser()?.id;
                        const userId = userQuery.data?.getId();
                        return authorId != userId;
                    }).map(image => <UserPost image={image} key={image.getId()} />)}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;