import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './Context/authContext'

const PrivateRoute = ({ children }) => {
    const { auth, loading } = useAuthContext();

    if (!loading && !auth) {
        return <Navigate to="/login" />;
    }
    
    if (loading) {
        return null;
    }
    
    return children;
};

export default PrivateRoute;
