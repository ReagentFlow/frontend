import React, { createContext, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:8000/auth/';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    );

    const register = async (email, username, password, inviteCode) => {
        const response = await axios.post(API_URL + 'users/', {
            email,
            username,
            password,
            inviteCode,
        });
        return response;
    };

    const login = async (email, password) => {
        const response = await axios.post(API_URL + 'token/', {
            email,
            password,
        });
        setAuthTokens(response.data);
        setUser(response.data.user);
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return response;
    }

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    const refreshTokens = async () => {
        const response = await axios.post(API_URL + 'token/refresh/', {
            refresh: authTokens.refresh,
        });
        setAuthTokens(response.data);
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        // return response;
    };

    const contextData = {
        user,
        authTokens,
        register,
        login,
        logout,
        refreshTokens,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };