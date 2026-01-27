import { useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children }) => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/account" replace />
    }

    return children;
}

export default ProtectedRoutes