import React, { createContext, useState, useEffect } from "react";
import api from "../../api/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

    const register = async (email, firstName, middleName, lastName, password, inviteCode) => {
        const response = await api.post('auth/users/', {
            email: email,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            password: password,
            invite_code: inviteCode,
        });
        return response;
    };

    const login = async (email, password) => {
        const response = await api.post('auth/token/', {
            email: email,
            password: password,
        });
        setAuthTokens(response.data);
        setUser(response.data.access);
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response.data.access));
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return response;
    }

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    };

    const createInviteCode = async (role) => {
        if (role !== 'admin' && role !== 'user') {
            throw new Error('Invalid role');
        }
        const response = await api.post('auth/invite_codes/', {
            role,
        });
        return response;
    };

    const getInviteCodes = async () => {
        const response = await api.get('auth/invite_codes/', {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        });
        return response;
    };

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (authTokens) {
            setUser(authTokens.access);
        }
    }, [authTokens]);

    const contextData = {
        user,
        authTokens,
        register,
        login,
        logout,
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