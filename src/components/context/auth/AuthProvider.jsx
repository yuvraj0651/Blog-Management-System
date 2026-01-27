import { useReducer } from 'react'
import AuthReducer, { initialState } from "../auth/AuthReducer";
import AuthContext from "../auth/AuthContext";

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{state , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider