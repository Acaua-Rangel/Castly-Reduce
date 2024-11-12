import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from '@clerk/clerk-react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setAuth(true);
            setLoading(false);
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    return (
        <AuthContext.Provider value={{auth, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
