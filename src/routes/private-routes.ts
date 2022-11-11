import { Route } from '.';
import HomePage from '../pages/HomePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import ProfilePage, { OtherUserPage } from '../pages/ProfilePage';

export const privateRoutes: Route[] = [
    { id: 3, path: '/', element: HomePage },
    { id: 4, path: '/profile', element: ProfilePage },
    { id: 5, path: '/profile/edit', element: ProfileEditPage },
    { id: 6, path: 'users/:id', element: OtherUserPage }
]