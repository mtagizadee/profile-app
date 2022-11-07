import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, User } from '../../types';
import type { RootState } from '../store'

interface AuthSlice {
    isAuth: boolean;
    user: User;
}

const initialUser = new User({
    id: '',
    firstName: '',
    secondName: '',
    email: '',
    images: [],
});

const initialState: AuthSlice = {
    isAuth: false,
    user: initialUser
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = new User(action.payload);
        },
        logOut: (state) => {
            state = initialState;
        }
    },
})

export const { setIsAuth, setUser, logOut } = authSlice.actions

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;