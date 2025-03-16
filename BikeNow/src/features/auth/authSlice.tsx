import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const getMockUsers = () => JSON.parse(localStorage.getItem("mockUsers") || "[]");
const saveMockUsers = (users) => localStorage.setItem("mockUsers", JSON.stringify(users));

const MOCK_USER = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "Password@123",
    role: "admin",
};

const MOCK_REGULAR_USER = {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "User@123",
    role: "user",
};

if (!localStorage.getItem("mockUsers")) {
    saveMockUsers([MOCK_USER, MOCK_REGULAR_USER]);
}

const fakeApiCall = (data, success = true, delay = 1000) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            success ? resolve(data) : reject("Error occurred");
        }, delay);
    });

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, {rejectWithValue}) => {
    try {
        let users = getMockUsers();

        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (!user) {
            return rejectWithValue("Invalid credentials");
        }

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (newUser, {rejectWithValue}) => {
    try {
        let users = getMockUsers();

        if (users.find(user => user.email === newUser.email)) {
            return rejectWithValue("User already exists!");
        }

        const newUserData = {
            id: users.length + 1,
            name: newUser.name || "New User",
            email: newUser.email,
            password: newUser.password,
            role: "user"
        };

        users.push(newUserData);
        saveMockUsers(users);

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(newUserData));

        return await fakeApiCall(newUserData);
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, {rejectWithValue}) => {
    try {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const user = JSON.parse(localStorage.getItem('user'));
        if (!isAuthenticated || !user) throw new Error("Not authenticated");
        return user;
    } catch {
        return rejectWithValue("User not authenticated");
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        user: JSON.parse(localStorage.getItem('user')) || null,
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
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
