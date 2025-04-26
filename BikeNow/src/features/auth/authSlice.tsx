import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/auth'; // backend URL

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            const token = response.data;

            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            const user = {
                email: payload.sub,
                role: payload.role,
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');

            return user;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/register`, credentials);
            return credentials; // Could improve this if you want auto-login after registration
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Registration failed');
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
