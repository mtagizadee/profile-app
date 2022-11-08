import { Route } from '.';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

export const privateRoutes: Route[] = [
    { id: 3, path: '/', element: HomePage },
    { id: 4, path: '/profile', element: ProfilePage }
]