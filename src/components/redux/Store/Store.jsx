import { configureStore } from "@reduxjs/toolkit";
import BlogThunk from "../../API/Thunk/BlogThunk";
import AuthThunk from "../../API/Thunk/AuthThunk";
import CommentThunk from "../../API/Thunk/CommentThunk";

const Store = configureStore({
    reducer: {
        // Thunk
        blog: BlogThunk,
        auth: AuthThunk,
        comments: CommentThunk,
    }
});

export default Store;