import React, { createContext, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:8000/auth/';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const [authTokens, setAuthTokens] = useState(() =>
    //     localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    // );
    // const [user, setUser] = useState(() =>
    //     localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    // );

    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem('authTokens');
        try {
            return tokens ? JSON.parse(tokens) : null;
        } catch (error) {
            console.error("Error parsing authTokens from localStorage:", error);
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    const register = async (email, username, password, inviteCode) => {
        const response = await axios.post(API_URL + 'users/', {
            email,
            username,
            password,
            invite_code: inviteCode,
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
        return response;
    };

    const createInviteCode = async (role) => {
        if (role !== 'admin' && role !== 'user') {
            throw new Error('Invalid role');
        }
        const response = await axios.post(API_URL + 'invite-codes/', {
            role,
        });
        return response;
    };

    const getInviteCodes = async () => {
        const response = await axios.get(API_URL + 'invite-codes/', {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        });
        return response;
    };

    const contextData = {
        user,
        authTokens,
        register,
        login,
        logout,
        refreshTokens,
        createInviteCode,
        getInviteCodes,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };