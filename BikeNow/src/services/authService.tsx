import { createSlice } from '@reduxjs/toolkit';

// Get initial auth state from localStorage
const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true'); // Persist login
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated'); // Remove session
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
