import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState = {
    adminData: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
    userData: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAdminCredential: (state, action) => {
            state.adminData = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        setUserCredential: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        userLogout: (state) => {
            state.userData = null;
            localStorage.removeItem('userInfo');
        },
        adminLogout: (state) => {
            state.adminData = null;
            localStorage.removeItem('adminInfo');
        }
    },
})


export const {
    setAdminCredential,
    setUserCredential,adminLogout,userLogout } = authSlice.actions

export default authSlice.reducer;