import { Route } from '.';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const publicRoutes: Route[] = [
    { id: 1, path: '/', element: LoginPage },
    { id: 2, path: '/signup', element: SignupPage }
]