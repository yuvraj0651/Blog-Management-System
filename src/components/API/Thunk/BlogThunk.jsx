import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    blogData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetching Blog Data
export const fetchBlogData = createAsyncThunk(
    "blog/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/blogs");
            if (!response.ok) {
                throw new Error("Something went wrong while fetching the api");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Creating or Adding new Blog
export const AddingBlog = createAsyncThunk(
    "blog/addingBlog",
    async (newBlog, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/blogs", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newBlog),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while adding new blog");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Delete Blog Data
export const deleteBlogData = createAsyncThunk(
    "blog/deleteBlog",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/blogs/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Something went wrong while deleting blog");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Update Blog Data
export const updateBlogData = createAsyncThunk(
    "blog/updateBlog",
    async ({ id, newBlogData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/blogs/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newBlogData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while updating blog data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const BlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetching the blog data
            .addCase(fetchBlogData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBlogData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogData = action.payload;
                state.error = null;
            })
            .addCase(fetchBlogData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Adding blog data
            .addCase(AddingBlog.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingBlog.fulfilled, (state, action) => {
                state.addLoading = false;
                state.blogData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingBlog.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            // Deleting blog data
            .addCase(deleteBlogData.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteBlogData.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.blogData = state.blogData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteBlogData.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            // Update blog data
            .addCase(updateBlogData.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateBlogData.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.blogData = state.blogData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(updateBlogData.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    }
});

export default BlogSlice.reducer;