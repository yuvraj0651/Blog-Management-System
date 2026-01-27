import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

export const initialState = {
    authData: [],
    currentUser: parsedAuth?.user || null,
    isAuthenticated: parsedAuth?.isAuthenticated || false,
    token: parsedAuth?.token || null,
    isLoading: false,
    registerLoading: false,
    error: null,
};

// Login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("something went wrong while logging in the user");
            };
            const users = await response.json();

            const existingUser = users.find((u) => u.email === email && u.password === password);

            if (!existingUser) {
                return rejectWithValue("Invalid Credentials");
            };
            return existingUser;

        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Registering new user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        try {
            let userResponse = await fetch("http://localhost:5000/users");
            if (!userResponse.ok) {
                throw new Error("something went wrong while registering new user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((u) => u.email === newUser.email);

            if (existingUser) {
                return rejectWithValue("User already exists");
            };

            let response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newUser,
                    createdAt: new Date().toISOString() 
                }),
            });

            if (!response.ok) {
                throw new Error("something went wrong while logging in the user");
            };

            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Fetch All Users Data
export const fetchAllUsers = createAsyncThunk(
    "auth/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users")
            };
            return await response.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = [];
            state.currentUser = null;
            state.isAuthenticated = false;
            state.token = null;
            state.isLoading = false;
            state.registerLoading = false;
            state.error = null;

            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
            // Logging In User
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.isLoading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    token: fakeToken,
                    isAuthenticated: true,
                }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Registering the user
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.registerLoading = false;
                state.authData.push(action.payload);
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    token: fakeToken,
                    isAuthenticated: true,
                }));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload;
            })
            // Fetch all Users Data
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;

                state.authData = action.payload.map((user, index) => ({
                    ...user,
                    createdAt: user.createdAt
                        ? new Date(user.createdAt)
                        : new Date(Date.now() - index * 1000 * 60)
                }));
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;