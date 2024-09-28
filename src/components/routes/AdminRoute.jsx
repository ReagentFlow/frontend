import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'components/auth/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, role, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
