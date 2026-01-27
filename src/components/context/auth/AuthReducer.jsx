import React from "react";

export const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};


export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                isLoading: true,
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                error: null,
            };

        case "LOGIN_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case "LOGOUT":
            return {
                ...initialState,
            };

        default:
            return state;
    }
};

export default AuthReducer;
