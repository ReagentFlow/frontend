import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'components/auth/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, role } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (role !== 'admin') {
        return <Navigate to="/" />;
    }
    return children;
};

export default AdminRoute;
