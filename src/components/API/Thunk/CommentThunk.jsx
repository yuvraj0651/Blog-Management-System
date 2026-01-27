import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    commentData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// fetch Comment Data
export const fetchComment = createAsyncThunk(
    "comment/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/comments");
            if (!response.ok) {
                throw new Error("something went wrong while fetching user comments");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
);

// Adding the comment
export const addingComment = createAsyncThunk(
    "comment/addingComment",
    async (newComment, { rejectWithValue }) => {
        try {
            let response = await fetch('http://localhost:5000/comments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new user comment");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Deleting the comment
export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/comments/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting user comment");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Updating the comment
export const updateComment = createAsyncThunk(
    "comment/updateComment",
    async ({ id, newCommentData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/comments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCommentData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating user comment");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetching user comments
            .addCase(fetchComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.commentData = action.payload;
                state.error = null;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // adding user comment
            .addCase(addingComment.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addingComment.fulfilled, (state, action) => {
                state.addLoading = false;
                state.commentData.push(action.payload);
                state.error = null;
            })
            .addCase(addingComment.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            // deleting user comment
            .addCase(deleteComment.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.commentData = state.commentData.filter((item) => Number(item.id) !== Number(action.payload));
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            // updating user comment
            .addCase(updateComment.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.commentData = state.commentData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    }
});

export default CommentSlice.reducer;