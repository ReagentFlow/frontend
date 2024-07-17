import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../constants/constants";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

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

    useEffect(() => {
        if (authTokens) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [authTokens]);

    const register = async (email, firstName, middleName, lastName, password, rePassword, inviteCode) => {
        const response = await axios.post(`${API_URL}auth/users/`, {
            email: email,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            password: password,
            re_password: rePassword,
            invite_code: inviteCode,
        });
        return response;
    };

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}auth/token/`, {
            email: email,
            password: password,
        });
        setAuthTokens(response.data);
        setUser(response.data.access);
        setIsAuthenticated(true);
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response.data.access));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        try {
            const response = await axios.get(`${API_URL}auth/users/me/`);
            setRole(response.data.role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
        return response;
    }

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    };

    const createInviteCode = async (role) => {
        if (role !== 'admin' && role !== 'user') {
            throw new Error('Invalid role');
        }
        const response = await axios.post(`${API_URL}auth/invite_codes/`, {
            role,
        });
        return response;
    };

    const getInviteCodes = async () => {
        const response = await axios.get(`${API_URL}auth/invite_codes/`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        });
        return response;
    };

    const contextData = {
        user,
        authTokens,
        isAuthenticated,
        role,
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