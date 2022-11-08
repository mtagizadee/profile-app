import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_KEY } from '../../api';
import type { RootState } from '../store'

interface AuthSlice {
    isAuth: boolean;
}

const initialState: AuthSlice = {
    isAuth: localStorage.getItem(ACCESS_TOKEN_KEY) !== null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        logOut: (state) => {
            state.isAuth = false;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
    },
})

export const { setIsAuth, logOut } = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;