import { Route } from '.';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const publicRoutes: Route[] = [
    { path: '/', element: LoginPage },
    { path: '/signup', element: SignupPage }
]