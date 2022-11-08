import { useQuery } from 'react-query';
import getCurrentUser from '../api/get-current-user';
import Layout from '../components/layout/Layout';
import Loader from '../components/Loader';
import { User } from '../types';

const ProfilePage = () => {
    const { data, isLoading, isFetching, isError, error } = useQuery('current-user', getCurrentUser);

    if (isLoading) return <Loader />

    return (
        <Layout>
            Welcome, {data?.getFullName()}
        </Layout>
    );
}

export default ProfilePage;