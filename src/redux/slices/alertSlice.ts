import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface AlertSlice {
    display: boolean;
    message: string;
}

const initialState: AlertSlice = {
    display: false,
    message: ''
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        show: (state) => {
            state.display = true;
        },
        hide: (state) => {
            state.display = false;
        },
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        }
    },
})

export const { show, hide, setMessage } = alertSlice.actions;

export const selectDisplay = (state: RootState) => state.alert.display;
export const selectMessage = (state: RootState) => state.alert.message;
export default alertSlice.reducer;