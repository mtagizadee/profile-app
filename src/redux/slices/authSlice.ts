import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface AuthSlice {
    isAuth: boolean;
}

const initialState: AuthSlice = {
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        logOut: (state) => {
            state = initialState;
        }
    },
})

export const { setIsAuth, logOut } = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;